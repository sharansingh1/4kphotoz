import { NextRequest, NextResponse } from 'next/server';

// Adobe Lightroom API configuration
const LIGHTROOM_API_BASE = 'https://lr.adobe.io/v2';
const ADOBE_CLIENT_ID = process.env.ADOBE_CLIENT_ID;
const ADOBE_CLIENT_SECRET = process.env.ADOBE_CLIENT_SECRET;
const ADOBE_ACCESS_TOKEN = process.env.ADOBE_ACCESS_TOKEN;
const ADOBE_CATALOG_ID = process.env.ADOBE_CATALOG_ID;

// Get access token from Adobe
async function getAdobeAccessToken(): Promise<string> {
  if (ADOBE_ACCESS_TOKEN) {
    return ADOBE_ACCESS_TOKEN;
  }

  if (!ADOBE_CLIENT_ID || !ADOBE_CLIENT_SECRET) {
    throw new Error('Adobe API credentials not configured');
  }

  const response = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: ADOBE_CLIENT_ID,
      client_secret: ADOBE_CLIENT_SECRET,
      scope: 'lr_partner_apis',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Adobe access token');
  }

  const data = await response.json();
  return data.access_token;
}

// GET /api/gallery/image/[assetId]/[size] - Proxy image requests
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string; size: string }> }
) {
  try {
    const { assetId, size } = await params;
    
    if (!assetId || !size) {
      return NextResponse.json({ error: 'Asset ID and size required' }, { status: 400 });
    }

    if (!ADOBE_CATALOG_ID) {
      return NextResponse.json({ error: 'Adobe Catalog ID not configured' }, { status: 500 });
    }

    const accessToken = await getAdobeAccessToken();
    
    console.log(`Fetching ${size} image for asset ${assetId}`);
    
    // Try different approaches to get the image
    let imageBuffer = null;
    
    // Approach 1: Try to get renditions
    try {
      const renditionsResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}/renditions`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-api-key': ADOBE_CLIENT_ID!,
        },
      });

      if (renditionsResponse.ok) {
        // Handle JSONP wrapper
        let responseText = await renditionsResponse.text();
        if (responseText.startsWith('while (1) {}')) {
          responseText = responseText.substring(12);
        }
        
        const renditionsData = JSON.parse(responseText);
        console.log(`Asset ${assetId} has ${renditionsData.resources?.length || 0} renditions available`);

        if (renditionsData.resources && renditionsData.resources.length > 0) {
          // Find the best rendition for the requested size
          let bestRendition = null;
          
          if (size === 'thumbnail') {
            // Look for smaller renditions first
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
            
            // Fetch the actual image from the rendition URL
            const imageResponse = await fetch(bestRendition.href, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
            });

            if (imageResponse.ok) {
              imageBuffer = await imageResponse.arrayBuffer();
              console.log(`Successfully fetched image via renditions for ${assetId}`);
            } else {
              console.log(`Failed to fetch image from rendition URL: ${imageResponse.status}`);
            }
          }
        }
      } else {
        console.log(`Renditions not accessible for asset ${assetId}: ${renditionsResponse.status}`);
      }
    } catch (error) {
      console.log(`Error with renditions approach for ${assetId}:`, error);
    }
    
    // Approach 2: If renditions failed, try direct asset access
    if (!imageBuffer) {
      try {
        console.log(`Trying direct asset access for ${assetId}`);
        const assetResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'x-api-key': ADOBE_CLIENT_ID!,
          },
        });

        if (assetResponse.ok) {
          // Handle JSONP wrapper like we do for albums
          let responseText = await assetResponse.text();
          if (responseText.startsWith('while (1) {}')) {
            responseText = responseText.substring(12);
          }
          
          const assetData = JSON.parse(responseText);
          console.log(`Asset ${assetId} details:`, assetData.payload?.filename || 'no filename');
          console.log(`Asset ${assetId} full payload:`, JSON.stringify(assetData.payload, null, 2));
          
            // Check multiple possible locations for rendition URLs
            let renditionUrl = null;
            
            // First, check for direct rendition links in the links section
            if (assetData.links) {
              if (size === 'thumbnail' && assetData.links['/rels/rendition_type/640']?.href) {
                renditionUrl = assetData.links['/rels/rendition_type/640'].href;
                console.log(`Found thumbnail rendition URL in links: ${renditionUrl}`);
              } else if (size === 'thumbnail' && assetData.links['/rels/rendition_type/thumbnail2x']?.href) {
                renditionUrl = assetData.links['/rels/rendition_type/thumbnail2x'].href;
                console.log(`Found thumbnail2x rendition URL in links: ${renditionUrl}`);
              } else if (size === 'fullsize' && assetData.links['/rels/rendition_type/2048']?.href) {
                renditionUrl = assetData.links['/rels/rendition_type/2048'].href;
                console.log(`Found fullsize rendition URL in links: ${renditionUrl}`);
              } else if (size === 'fullsize' && assetData.links['/rels/rendition_type/1280']?.href) {
                renditionUrl = assetData.links['/rels/rendition_type/1280'].href;
                console.log(`Found 1280 rendition URL in links: ${renditionUrl}`);
              }
            }
            
            // Fallback to other locations if direct links not found
            if (!renditionUrl) {
              if (assetData.payload?.links?.rendition?.href) {
                renditionUrl = assetData.payload.links.rendition.href;
                console.log(`Found rendition URL in payload.links: ${renditionUrl}`);
              } else if (assetData.links?.rendition?.href) {
                renditionUrl = assetData.links.rendition.href;
                console.log(`Found rendition URL in links: ${renditionUrl}`);
              } else if (assetData.payload?.rendition?.href) {
                renditionUrl = assetData.payload.rendition.href;
                console.log(`Found rendition URL in payload.rendition: ${renditionUrl}`);
              } else if (assetData.rendition?.href) {
                renditionUrl = assetData.rendition.href;
                console.log(`Found rendition URL in rendition: ${renditionUrl}`);
              }
            }
          
            if (renditionUrl) {
              // Construct full URL if it's a relative path
              const fullRenditionUrl = renditionUrl.startsWith('http') 
                ? renditionUrl 
                : `${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/${renditionUrl}`;
              
              console.log(`Attempting to fetch image from: ${fullRenditionUrl}`);
              
              const imageResponse = await fetch(fullRenditionUrl, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'x-api-key': ADOBE_CLIENT_ID!,
                },
              });

            if (imageResponse.ok) {
              imageBuffer = await imageResponse.arrayBuffer();
              console.log(`Successfully fetched image via direct URL for ${assetId}`);
            } else {
              console.log(`Failed to fetch image from rendition URL: ${imageResponse.status}`);
            }
          } else {
            console.log(`No rendition URL found in asset data for ${assetId}`);
            
            // Try to get the asset revision and then request a rendition
            console.log(`Asset ${assetId} revision_ids:`, assetData.payload?.revision_ids);
            console.log(`Asset ${assetId} full structure:`, JSON.stringify(assetData, null, 2));
            
            if (assetData.payload?.revision_ids && assetData.payload.revision_ids.length > 0) {
              const revisionId = assetData.payload.revision_ids[0];
              console.log(`Trying to get rendition for revision: ${revisionId}`);
              
              try {
                // Request a rendition for this revision
                const renditionRequestUrl = `${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}/revisions/${revisionId}/renditions`;
                console.log(`Requesting rendition from: ${renditionRequestUrl}`);
                
                const renditionRequestResponse = await fetch(renditionRequestUrl, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'x-api-key': ADOBE_CLIENT_ID!,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    rendition_type: size === 'thumbnail' ? 'thumbnail' : 'fullsize'
                  }),
                });

                if (renditionRequestResponse.ok) {
                  let renditionRequestText = await renditionRequestResponse.text();
                  if (renditionRequestText.startsWith('while (1) {}')) {
                    renditionRequestText = renditionRequestText.substring(12);
                  }
                  
                  const renditionRequestData = JSON.parse(renditionRequestText);
                  console.log(`Rendition request response:`, JSON.stringify(renditionRequestData, null, 2));
                  
                  if (renditionRequestData.href) {
                    console.log(`Found rendition URL: ${renditionRequestData.href}`);
                    
                    const imageResponse = await fetch(renditionRequestData.href, {
                      headers: {
                        'Authorization': `Bearer ${accessToken}`,
                      },
                    });

                    if (imageResponse.ok) {
                      imageBuffer = await imageResponse.arrayBuffer();
                      console.log(`Successfully fetched image via rendition request for ${assetId}`);
                    } else {
                      console.log(`Failed to fetch image from rendition request URL: ${imageResponse.status}`);
                    }
                  }
                } else {
                  const errorText = await renditionRequestResponse.text();
                  console.log(`Failed to request rendition: ${renditionRequestResponse.status}`);
                  console.log(`Error response: ${errorText}`);
                }
              } catch (error) {
                console.log(`Error requesting rendition for ${assetId}:`, error);
              }
            } else {
              console.log(`No revision_ids found, trying direct rendition request`);
              
              try {
                // Try direct rendition request without revision ID
                const directRenditionUrl = `${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${assetId}/renditions`;
                console.log(`Requesting direct rendition from: ${directRenditionUrl}`);
                
                const directRenditionResponse = await fetch(directRenditionUrl, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'x-api-key': ADOBE_CLIENT_ID!,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    rendition_type: size === 'thumbnail' ? 'thumbnail' : 'fullsize'
                  }),
                });

                if (directRenditionResponse.ok) {
                  let directRenditionText = await directRenditionResponse.text();
                  if (directRenditionText.startsWith('while (1) {}')) {
                    directRenditionText = directRenditionText.substring(12);
                  }
                  
                  const directRenditionData = JSON.parse(directRenditionText);
                  console.log(`Direct rendition response:`, JSON.stringify(directRenditionData, null, 2));
                  
                  if (directRenditionData.href) {
                    console.log(`Found direct rendition URL: ${directRenditionData.href}`);
                    
                    const imageResponse = await fetch(directRenditionData.href, {
                      headers: {
                        'Authorization': `Bearer ${accessToken}`,
                      },
                    });

                    if (imageResponse.ok) {
                      imageBuffer = await imageResponse.arrayBuffer();
                      console.log(`Successfully fetched image via direct rendition request for ${assetId}`);
                    } else {
                      console.log(`Failed to fetch image from direct rendition URL: ${imageResponse.status}`);
                    }
                  }
                } else {
                  const errorText = await directRenditionResponse.text();
                  console.log(`Failed direct rendition request: ${directRenditionResponse.status}`);
                  console.log(`Error response: ${errorText}`);
                }
              } catch (error) {
                console.log(`Error with direct rendition request for ${assetId}:`, error);
              }
            }
          }
        } else {
          console.log(`Asset ${assetId} not accessible: ${assetResponse.status}`);
        }
      } catch (error) {
        console.log(`Error with direct asset approach for ${assetId}:`, error);
      }
    }

    if (!imageBuffer) {
      console.log(`All approaches failed for asset ${assetId}, using fallback`);
      return getFallbackImage();
    }
    
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return getFallbackImage();
  }
}

// Helper function to return fallback image
async function getFallbackImage() {
  try {
    // Try to read the fallback image from the file system
    const fs = await import('fs');
    const path = await import('path');
    
    const fallbackPath = path.join(process.cwd(), 'public', 'nature.jpg');
    const fallbackBuffer = fs.readFileSync(fallbackPath);
    
    return new NextResponse(fallbackBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=300', // Shorter cache for fallbacks
      },
    });
  } catch (error) {
    console.error('Error reading fallback image:', error);
  }
  
  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}
