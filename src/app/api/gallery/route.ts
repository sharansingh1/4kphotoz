import { NextRequest, NextResponse } from 'next/server';

// Adobe Lightroom API configuration
const LIGHTROOM_API_BASE = 'https://lr.adobe.io/v2';
const ADOBE_CLIENT_ID = process.env.ADOBE_CLIENT_ID;
const ADOBE_CLIENT_SECRET = process.env.ADOBE_CLIENT_SECRET;
const ADOBE_ACCESS_TOKEN = process.env.ADOBE_ACCESS_TOKEN;
const ADOBE_CATALOG_ID = process.env.ADOBE_CATALOG_ID;

interface AdobeImage {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  created: string;
  modified: string;
  size: number;
  tags?: string[];
}

interface AdobeAlbum {
  id: string;
  name: string;
  assetCount: number;
  coverImage?: string;
  created: string;
  modified: string;
}

// Get access token from Adobe (using stored token or client credentials)
async function getAdobeAccessToken(): Promise<string> {
  console.log(`ADOBE_ACCESS_TOKEN exists: ${!!ADOBE_ACCESS_TOKEN}`);
  console.log(`Token length: ${ADOBE_ACCESS_TOKEN?.length || 0}`);
  
  // If we have a stored access token, use it directly (skip expiration check for now)
  if (ADOBE_ACCESS_TOKEN) {
    console.log('Using existing access token from .env.local');
    return ADOBE_ACCESS_TOKEN;
  }

  // If no token, try client credentials as fallback
  if (!ADOBE_CLIENT_ID || !ADOBE_CLIENT_SECRET) {
    throw new Error('Adobe API credentials not configured');
  }

  console.log('No access token found, attempting client credentials flow...');
  const response = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: ADOBE_CLIENT_ID,
      client_secret: ADOBE_CLIENT_SECRET,
      scope: 'lr_partner_apis,lr_partner_rendition_apis',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Adobe token request failed: ${response.status} ${response.statusText}`);
    console.error(`Error response: ${errorText}`);
    
    // If client credentials fails, throw a more helpful error
    if (response.status === 400) {
      throw new Error('Adobe API configured as OAuth Web App - client credentials not supported. Please use OAuth flow or configure as Service Account.');
    }
    
    throw new Error(`Failed to get Adobe access token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Successfully obtained new access token via client credentials');
  return data.access_token;
}

// Helper function to clean album names
function cleanAlbumName(name: string): string {
  return name
    .replace(/_/g, ' ')  // Replace underscores with spaces
    .replace(/-/g, ' ')  // Replace dashes with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
}

// Helper function to check if album name looks like a date
function isDateAlbum(name: string): boolean {
  // Check for patterns like "April 21, 2023 12:56 PM" or "2022-12-01"
  const datePatterns = [
    /^\w+\s+\d{1,2},\s+\d{4}/,  // "April 21, 2023"
    /^\d{4}-\d{2}-\d{2}/,        // "2022-12-01"
    /^\d{1,2}\/\d{1,2}\/\d{4}/,  // "12/01/2022"
  ];
  
  return datePatterns.some(pattern => pattern.test(name));
}

// Get all albums from the catalog
async function getAllAlbums(accessToken: string): Promise<AdobeAlbum[]> {
  if (!ADOBE_CATALOG_ID) {
    throw new Error('Adobe Catalog ID not configured');
  }

  try {
    const response = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': ADOBE_CLIENT_ID!,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.statusText}`);
    }

    let responseText = await response.text();
    
    // Remove JSONP wrapper if present
    if (responseText.startsWith('while (1) {}')) {
      responseText = responseText.substring(12);
    }
    
    const data = JSON.parse(responseText);
    const albums: AdobeAlbum[] = [];

    // Process each album
    for (const albumData of data.resources || []) {
      try {
        const originalName = albumData.payload.name;
        
        // Skip date-based albums that don't exist in Lightroom
        if (isDateAlbum(originalName)) {
          console.log(`Skipping date album: ${originalName}`);
          continue;
        }
        
        // Clean the album name
        const cleanName = cleanAlbumName(originalName);
        
        // Get actual asset count by checking the album
        let assetCount = 0;
        let coverImageUrl = undefined;
        
        try {
          // Check if album has assets
          const assetsResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums/${albumData.id}/assets`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'x-api-key': ADOBE_CLIENT_ID!,
            },
          });
          
          if (assetsResponse.ok) {
            let assetsText = await assetsResponse.text();
            if (assetsText.startsWith('while (1) {}')) {
              assetsText = assetsText.substring(12);
            }
            
            const assetsData = JSON.parse(assetsText);
            assetCount = assetsData.resources?.length || 0;
            
            // Get cover image from first asset if available
            if (assetCount > 0 && assetsData.resources[0]?.asset?.id) {
              const firstAssetId = assetsData.resources[0].asset.id;
              coverImageUrl = `/api/gallery/image/${firstAssetId}/thumbnail`;
            }
          }
        } catch (error) {
          console.error(`Error checking assets for album ${albumData.id}:`, error);
        }
        
        // Only include albums that have assets
        if (assetCount > 0) {
          albums.push({
            id: albumData.id,
            name: cleanName,
            assetCount: assetCount,
            coverImage: coverImageUrl,
            created: albumData.created,
            modified: albumData.updated,
          });
          
          console.log(`Including album: ${cleanName} (${assetCount} assets)`);
        } else {
          console.log(`Skipping empty album: ${cleanName}`);
        }
      } catch (error) {
        console.error(`Error processing album ${albumData.id}:`, error);
      }
    }

    console.log(`Found ${albums.length} albums with images`);
    return albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
}

// GET /api/gallery - Get all albums or images from a specific album
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'albums';
    const albumId = searchParams.get('albumId');

    if (action === 'albums') {
      try {
        const accessToken = await getAdobeAccessToken();
        const albums = await getAllAlbums(accessToken);
        return NextResponse.json({ albums });
      } catch (error) {
        console.error('Error fetching albums from Adobe:', error);
        // Return mock albums for testing
        const mockAlbums = [
          {
            id: 'mock-portraits',
            name: '25 Karina Headshots',
            assetCount: 15,
            coverImage: '/nature.jpg',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          },
          {
            id: 'mock-events',
            name: '24 Tiana Grad',
            assetCount: 23,
            coverImage: '/nature.jpg',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          },
          {
            id: 'mock-media-day',
            name: '22 Winter Media Day',
            assetCount: 18,
            coverImage: '/nature.jpg',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          },
          {
            id: 'mock-sports',
            name: '23 MCHS Baseball',
            assetCount: 31,
            coverImage: '/nature.jpg',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          },
          {
            id: 'mock-marketing',
            name: '23 Moreau SB vs Kennedy',
            assetCount: 12,
            coverImage: '/nature.jpg',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          },
        ];
        return NextResponse.json({ albums: mockAlbums });
      }
    }

    if (action === 'images') {
      // Return images in a specific album
      if (!albumId) {
        return NextResponse.json({ error: 'Album ID required' }, { status: 400 });
      }

      try {
        const accessToken = await getAdobeAccessToken();
        console.log(`Using access token: ${accessToken.substring(0, 20)}...`);
        
        if (!ADOBE_CATALOG_ID) {
          throw new Error('Adobe Catalog ID not configured');
        }

        const response = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums/${albumId}/assets`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'x-api-key': ADOBE_CLIENT_ID!,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch album images: ${response.statusText}`);
        }

        let responseText = await response.text();
        
        // Remove JSONP wrapper if present
        if (responseText.startsWith('while (1) {}')) {
          responseText = responseText.substring(12);
        }
        
        const data = JSON.parse(responseText);
        const images = data.resources || [];

        console.log(`Found ${images.length} images in album ${albumId}`);
        
        if (images.length === 0) {
          console.log(`Album ${albumId} is empty, returning empty array`);
          return NextResponse.json({ images: [] });
        }
        
        console.log('First few image IDs:', images.slice(0, 3).map((img: any) => img.id));
        
        // Log the structure of the first image to understand the data format
        if (images.length > 0) {
          console.log('First image structure:', JSON.stringify(images[0], null, 2));
        }
        
        // Process images to get actual rendition URLs
        const formattedImages = await Promise.all(images.map(async (image: any) => {
          // Handle date properly
          let imageDate = new Date().toISOString();
          if (image.created && image.created !== '0000-00-00T00:00:00') {
            imageDate = image.created;
          } else if (image.updated && image.updated !== '0000-00-00T00:00:00') {
            imageDate = image.updated;
          }
          
          // Get the actual asset ID from the album asset object
          const actualAssetId = image.asset?.id || image.id;
          console.log(`Using asset ID: ${actualAssetId} (from album asset: ${image.id})`);
          
          // Get renditions for this asset
          let thumbnailUrl = '/nature.jpg'; // fallback
          let fullSizeUrl = '/nature.jpg'; // fallback
          
          try {
            // Try to get the asset details to see if it exists
            const assetResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/assets/${actualAssetId}`, {
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
              console.log(`Asset ${actualAssetId} exists, payload:`, assetData.payload?.filename || 'no filename');
              
              // If the asset exists, use our proxy
              thumbnailUrl = `/api/gallery/image/${actualAssetId}/thumbnail`;
              fullSizeUrl = `/api/gallery/image/${actualAssetId}/fullsize`;
              console.log(`Asset ${actualAssetId} exists, using proxy for images`);
            } else {
              console.log(`Asset ${actualAssetId} not accessible: ${assetResponse.status}`);
            }
          } catch (error) {
            console.error(`Error checking asset ${actualAssetId}:`, error);
          }
          
          return {
            id: actualAssetId, // Use the actual asset ID
            url: fullSizeUrl,
            thumbnail: thumbnailUrl,
            title: image.payload?.filename || image.payload?.name || `Image ${actualAssetId.substring(0, 8)}`,
            description: `Professional photography`,
            date: imageDate,
            tags: ['professional', 'photography'],
          };
        }));

        return NextResponse.json({ images: formattedImages });
      } catch (error) {
        console.error('Error fetching images:', error);
        // Return mock images for testing
        const mockImages = Array.from({ length: 12 }, (_, i) => ({
          id: `${albumId}-${i + 1}`,
          url: '/nature.jpg',
          thumbnail: '/nature.jpg',
          title: `Image ${i + 1}`,
          description: `Professional photography`,
          date: new Date().toISOString(),
          tags: ['professional', 'photography'],
        }));
        return NextResponse.json({ images: mockImages });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Gallery API error:', error);
    
    // Return mock data if Adobe API is not configured
    if (error instanceof Error && error.message.includes('not configured')) {
      const mockAlbums = [
        {
          id: 'mock-portraits',
          name: '25 Karina Headshots',
          assetCount: 15,
          coverImage: '/nature.jpg',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
        {
          id: 'mock-events',
          name: '24 Tiana Grad',
          assetCount: 23,
          coverImage: '/nature.jpg',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
        {
          id: 'mock-media-day',
          name: '22 Winter Media Day',
          assetCount: 18,
          coverImage: '/nature.jpg',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
        {
          id: 'mock-sports',
          name: '23 MCHS Baseball',
          assetCount: 31,
          coverImage: '/nature.jpg',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
        {
          id: 'mock-marketing',
          name: '23 Moreau SB vs Kennedy',
          assetCount: 12,
          coverImage: '/nature.jpg',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
      ];

      return NextResponse.json({ albums: mockAlbums });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}