import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getAdminSettings, 
  updateHighlightImages, 
  setAlbumVisibility,
  updatePageImage
} from '@/lib/admin-data';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = getAdminSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { highlightImages, visibleAlbums, pageImages } = body;

    if (highlightImages) {
      updateHighlightImages(highlightImages);
    }

    if (visibleAlbums) {
      setAlbumVisibility(visibleAlbums);
    }

    if (pageImages) {
      // Update individual page images
      Object.keys(pageImages).forEach(page => {
        Object.keys(pageImages[page]).forEach(section => {
          updatePageImage(page, section, pageImages[page][section]);
        });
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating admin settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
