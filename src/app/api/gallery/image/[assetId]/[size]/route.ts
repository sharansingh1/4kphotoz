import { NextRequest, NextResponse } from 'next/server';

// Adobe Lightroom API configuration
const LIGHTROOM_API_BASE = 'https://lr.adobe.io/v2';
const ADOBE_CLIENT_ID = process.env.ADOBE_CLIENT_ID;
const ADOBE_CLIENT_SECRET = process.env.ADOBE_CLIENT_SECRET;
const ADOBE_ACCESS_TOKEN = process.env.ADOBE_ACCESS_TOKEN;
const ADOBE_REFRESH_TOKEN = process.env.ADOBE_REFRESH_TOKEN;
const ADOBE_CATALOG_ID = process.env.ADOBE_CATALOG_ID;

// Simple token refresh function
async function getAdobeAccessToken(): Promise<string> {
  if (ADOBE_REFRESH_TOKEN && ADOBE_CLIENT_ID && ADOBE_CLIENT_SECRET) {
    try {
      const refreshResponse = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: ADOBE_CLIENT_ID,
          client_secret: ADOBE_CLIENT_SECRET,
          refresh_token: ADOBE_REFRESH_TOKEN,
        }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        return refreshData.access_token;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  }
  
  if (ADOBE_ACCESS_TOKEN) {
    return ADOBE_ACCESS_TOKEN;
  }

  throw new Error('No valid Adobe access token available');
}

// GET /api/gallery/image/[assetId]/[size] - Simple image proxy
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string; size: string }> }
) {
  try {
    const { assetId, size } = await params;
    
    console.log(`Fetching ${size} image for asset ${assetId}`);
    
    if (!assetId || !size) {
      return NextResponse.json({ error: 'Asset ID and size required' }, { status: 400 });
    }

    if (!ADOBE_CATALOG_ID) {
      return NextResponse.json({ error: 'Adobe Catalog ID not configured' }, { status: 500 });
    }

    const accessToken = await getAdobeAccessToken();
    
    // First, check if the asset exists
    try {
      const assetResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-api-key': ADOBE_CLIENT_ID!,
        },
      });

      if (!assetResponse.ok) {
        console.log(`Asset ${assetId} not accessible: ${assetResponse.status}`);
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }

      let assetText = await assetResponse.text();
      if (assetText.startsWith('while (1) {}')) {
        assetText = assetText.substring(12);
      }
      
      const assetData = JSON.parse(assetText);
      console.log(`Asset ${assetId} exists, checking for rendition URLs`);
      
      // Look for rendition URLs in the asset data
      let renditionUrl = null;
      
      if (assetData.links) {
        if (size === 'thumbnail' && assetData.links['/rels/rendition_type/640']?.href) {
          renditionUrl = assetData.links['/rels/rendition_type/640'].href;
        } else if (size === 'thumbnail' && assetData.links['/rels/rendition_type/thumbnail2x']?.href) {
          renditionUrl = assetData.links['/rels/rendition_type/thumbnail2x'].href;
        } else if (size === 'fullsize' && assetData.links['/rels/rendition_type/2048']?.href) {
          renditionUrl = assetData.links['/rels/rendition_type/2048'].href;
        } else if (size === 'fullsize' && assetData.links['/rels/rendition_type/1280']?.href) {
          renditionUrl = assetData.links['/rels/rendition_type/1280'].href;
        }
      }
      
      if (renditionUrl) {
        console.log(`Found rendition URL: ${renditionUrl}`);
        
        // Construct full URL if it's a relative path
        const fullRenditionUrl = renditionUrl.startsWith('http') 
          ? renditionUrl 
          : `${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/${renditionUrl}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const imageResponse = await fetch(fullRenditionUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'x-api-key': ADOBE_CLIENT_ID!,
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (imageResponse.ok) {
          const imageBuffer = await imageResponse.arrayBuffer();
          console.log(`Successfully fetched image for ${assetId}`);
          return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'image/jpeg',
              'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', // Cache for 24 hours, stale for 7 days
              'ETag': `"${assetId}-${size}"`,
              'Vary': 'Accept-Encoding',
            },
          });
        } else {
          console.log(`Failed to fetch image from rendition URL: ${imageResponse.status}`);
        }
      } else {
        console.log(`No rendition URL found for ${assetId}, trying renditions endpoint`);
      }
    } catch (error) {
      console.log(`Error checking asset ${assetId}:`, error);
    }
    
    // Fallback: try renditions endpoint
    try {
      const renditionsResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}/renditions`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-api-key': ADOBE_CLIENT_ID!,
        },
      });

      if (renditionsResponse.ok) {
        let responseText = await renditionsResponse.text();
        if (responseText.startsWith('while (1) {}')) {
          responseText = responseText.substring(12);
        }
        
        const renditionsData = JSON.parse(responseText);

        if (renditionsData.resources && renditionsData.resources.length > 0) {
          // Find appropriate rendition based on size
          let bestRendition = null;
          
          if (size === 'thumbnail') {
            // Look for smaller renditions
            bestRendition = renditionsData.resources.find((r: any) => 
              r.type === 'image/jpeg' && (r.width <= 640 || r.height <= 640)
            ) || renditionsData.resources.find((r: any) => r.type === 'image/jpeg');
          } else {
            // Look for larger renditions
            bestRendition = renditionsData.resources.find((r: any) => 
              r.type === 'image/jpeg' && (r.width >= 1024 || r.height >= 1024)
            ) || renditionsData.resources.find((r: any) => r.type === 'image/jpeg');
          }

          if (bestRendition) {
            console.log(`Using rendition: ${bestRendition.width}x${bestRendition.height} for ${size}`);
            
            // Fetch the actual image
            const controller2 = new AbortController();
            const timeoutId2 = setTimeout(() => controller2.abort(), 10000); // 10 second timeout
            
            const imageResponse = await fetch(bestRendition.href, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              signal: controller2.signal,
            });
            
            clearTimeout(timeoutId2);

            if (imageResponse.ok) {
              const imageBuffer = await imageResponse.arrayBuffer();
              console.log(`Successfully fetched image via renditions for ${assetId}`);
              return new NextResponse(imageBuffer, {
                status: 200,
                headers: {
                  'Content-Type': 'image/jpeg',
                  'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', // Cache for 24 hours, stale for 7 days
                  'ETag': `"${assetId}-${size}"`,
                  'Vary': 'Accept-Encoding',
                },
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(`Renditions endpoint failed for ${assetId}:`, error);
    }

    // If all else fails, return 404
    console.log(`All approaches failed for asset ${assetId}`);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}