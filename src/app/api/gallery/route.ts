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

// GET /api/gallery - Simple album and image fetching
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'albums';
    const albumId = searchParams.get('albumId');

    if (!ADOBE_CATALOG_ID) {
      return NextResponse.json({ error: 'Adobe Catalog ID not configured' }, { status: 500 });
    }

    const accessToken = await getAdobeAccessToken();

    if (action === 'albums') {
      // Fetch all albums - single API call
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
      if (responseText.startsWith('while (1) {}')) {
        responseText = responseText.substring(12);
      }
      
      const data = JSON.parse(responseText);
      const albums = [];

      // Process albums and get cover images efficiently
      const albumPromises = [];
      
      for (const albumData of data.resources || []) {
        const albumName = albumData.payload.name;
        
        // Skip empty albums
        if (albumData.payload.assetCount === 0) {
          continue;
        }

        // Create a promise for each album to get its cover image and accurate count
        const albumPromise = (async () => {
          let coverImageUrl = '/nature.jpg'; // Default fallback
          let actualAssetCount = 0;
          
          // Get the actual asset count and first image from the album
          try {
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
              const assets = assetsData.resources || [];
              actualAssetCount = assets.length;
              
              console.log(`Album ${albumName} has ${actualAssetCount} assets`);
              
              if (assets.length > 0) {
                const firstAsset = assets[0];
                const assetId = firstAsset.asset?.id || firstAsset.id;
                
                if (assetId) {
                  coverImageUrl = `/api/gallery/image/${assetId}/thumbnail`;
                  console.log(`Using first asset ${assetId} as cover for album: ${albumName}`);
                }
              }
            }
          } catch (error) {
            console.log(`Error fetching assets for album ${albumName}:`, error);
            // Fallback to album's designated cover image if asset fetch fails
            if (albumData.payload.cover?.id) {
              coverImageUrl = `/api/gallery/image/${albumData.payload.cover.id}/thumbnail`;
              console.log(`Using album cover ID: ${albumData.payload.cover.id} for ${albumName}`);
            }
          }

          return {
            id: albumData.id,
            name: albumName.replace(/_/g, ' ').replace(/-/g, ' ').trim(),
            assetCount: actualAssetCount,
            coverImage: coverImageUrl,
            created: albumData.created,
            modified: albumData.updated,
          };
        })();
        
        albumPromises.push(albumPromise);
      }

      // Wait for all album processing to complete
      const albumResults = await Promise.all(albumPromises);
      albums.push(...albumResults);

      return NextResponse.json({ albums });
    }

    if (action === 'images' && albumId) {
      // Fetch images for specific album - single API call with limit and offset
      const limit = searchParams.get('limit') || '20';
      const offset = parseInt(searchParams.get('offset') || '0');
      
      // For better pagination, try different approaches
      let apiUrl = `${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums/${albumId}/assets?limit=${limit}`;
      
      // If offset is 0, don't add offset parameter (get first batch)
      if (offset > 0) {
        apiUrl += `&offset=${offset}`;
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-api-key': ADOBE_CLIENT_ID!,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch album images: ${response.statusText}`);
      }

      let responseText = await response.text();
      if (responseText.startsWith('while (1) {}')) {
        responseText = responseText.substring(12);
      }
      
      const data = JSON.parse(responseText);
      const images = [];

        // Process images without testing accessibility
        for (const image of data.resources || []) {
          const assetId = image.asset?.id || image.id;
          
          console.log(`Processing image: ${assetId}, filename: ${image.payload?.filename}`);
          
          // Create a professional title from filename or use a generic one
          let title = 'Professional Photography';
          if (image.payload?.filename) {
            // Remove file extension and clean up the filename
            const cleanFilename = image.payload.filename
              .replace(/\.[^/.]+$/, '') // Remove file extension
              .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
              .replace(/\s+/g, ' ') // Replace multiple spaces with single space
              .trim();
            
            if (cleanFilename && cleanFilename.length > 0) {
              title = cleanFilename;
            }
          }
          
          // Format the date properly
          let formattedDate = 'Date not available';
          const dateValue = image.created || image.updated;
          if (dateValue && dateValue !== '0000-00-00T00:00:00') {
            try {
              const date = new Date(dateValue);
              if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
              }
            } catch (error) {
              console.log(`Error formatting date for ${assetId}:`, error);
            }
          }
          
          images.push({
            id: assetId,
            url: `/api/gallery/image/${assetId}/fullsize`,
            thumbnail: `/api/gallery/image/${assetId}/thumbnail`,
            title: title,
            description: 'Professional photography services',
            date: formattedDate,
            tags: ['photography'],
          });
        }

      return NextResponse.json({ images });
    }

    if (action === 'all-images') {
      console.log('Fetching all images for admin panel');
      
      // Get all albums first
      const albumsResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-api-key': ADOBE_CLIENT_ID!,
        },
      });

      if (!albumsResponse.ok) {
        console.error('Failed to fetch albums:', albumsResponse.status, albumsResponse.statusText);
        return NextResponse.json({ error: 'Failed to fetch albums' }, { status: albumsResponse.status });
      }

      let albumsText = await albumsResponse.text();
      if (albumsText.startsWith('while (1) {}')) {
        albumsText = albumsText.substring(12);
      }

      const albumsData = JSON.parse(albumsText);
      const allImages = [];

      // Fetch images from first few albums to avoid too many API calls
      const albumsToProcess = albumsData.resources?.slice(0, 10) || [];
      
      for (const album of albumsToProcess) {
        if (album.payload.assetCount === 0) continue;
        
        try {
          const assetsResponse = await fetch(`${LIGHTROOM_API_BASE}/catalogs/${ADOBE_CATALOG_ID}/albums/${album.id}/assets?limit=20`, {
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
            
            for (const image of assetsData.resources || []) {
              const assetId = image.asset?.id || image.id;
              let title = 'Professional Photography';
              if (image.payload?.filename) {
                const cleanFilename = image.payload.filename
                  .replace(/\.[^/.]+$/, '')
                  .replace(/[-_]/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
                if (cleanFilename && cleanFilename.length > 0) {
                  title = cleanFilename;
                }
              }
              
              allImages.push({
                id: assetId,
                url: `/api/gallery/image/${assetId}/fullsize`,
                thumbnail: `/api/gallery/image/${assetId}/thumbnail`,
                title: title,
                albumName: album.payload.name,
              });
            }
          }
        } catch (error) {
          console.log(`Error fetching images from album ${album.payload.name}:`, error);
        }
      }

      return NextResponse.json({ images: allImages });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}