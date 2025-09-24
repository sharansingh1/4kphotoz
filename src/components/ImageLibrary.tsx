'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Search, Filter } from 'lucide-react';

interface Album {
  id: string;
  name: string;
  coverImage?: string;
  assetCount: number;
}

interface Image {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  albumName: string;
}

interface ImageLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string, imageTitle: string) => void;
  currentImage?: string;
  title: string;
}

export function ImageLibrary({ isOpen, onClose, onImageSelect, currentImage, title }: ImageLibraryProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [imagesPerPage] = useState(20);
  
  // Cache for loaded images to avoid re-fetching
  const imagesCache = useRef<Record<string, Image[]>>({});

  useEffect(() => {
    if (isOpen) {
      loadAlbums();
    } else {
      // Reset state when modal closes
      setSelectedAlbum(null);
      setImages([]);
      setAllImages([]);
      setSearchTerm('');
      setHasMoreImages(false);
      setCurrentOffset(0);
    }
  }, [isOpen]);

  const loadAlbums = async () => {
    try {
      const response = await fetch('/api/gallery?action=albums');
      const data = await response.json();
      setAlbums(data.albums || []);
    } catch (error) {
      console.error('Error loading albums:', error);
    }
  };

  const loadAlbumImages = async (albumId: string) => {
    // Check cache first
    if (imagesCache.current[albumId]) {
      const cachedImages = imagesCache.current[albumId];
      setAllImages(cachedImages);
      setImages(cachedImages.slice(0, imagesPerPage));
      setCurrentOffset(imagesPerPage);
      setHasMoreImages(cachedImages.length > imagesPerPage);
      return;
    }

    setLoading(true);
    try {
      // Load all images at once to avoid pagination issues
      const response = await fetch(`/api/gallery?action=images&albumId=${albumId}&limit=100`);
      const data = await response.json();
      const imagesData = data.images || [];
      
      // Cache all images
      imagesCache.current[albumId] = imagesData;
      setAllImages(imagesData);
      
      // Show first page
      setImages(imagesData.slice(0, imagesPerPage));
      setCurrentOffset(imagesPerPage);
      setHasMoreImages(imagesData.length > imagesPerPage);
    } catch (error) {
      console.error('Error loading images:', error);
      setImages([]);
      setAllImages([]);
      setHasMoreImages(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumSelect = (albumId: string) => {
    setSelectedAlbum(albumId);
    setCurrentOffset(0);
    loadAlbumImages(albumId);
  };

  const loadMoreImages = () => {
    if (hasMoreImages && !loading && allImages.length > 0) {
      const nextOffset = currentOffset + imagesPerPage;
      const nextImages = allImages.slice(currentOffset, nextOffset);
      
      if (nextImages.length > 0) {
        setImages(prev => [...prev, ...nextImages]);
        setCurrentOffset(nextOffset);
        setHasMoreImages(nextOffset < allImages.length);
      } else {
        setHasMoreImages(false);
      }
    }
  };

  const handleImageSelect = (imageUrl: string, imageTitle: string) => {
    // Close immediately for instant feedback
    onClose();
    // Then call the selection handler
    onImageSelect(imageUrl, imageTitle);
  };

  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.albumName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl max-w-6xl max-h-[90vh] w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-bold text-foreground">{title}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="flex h-[70vh]">
          {/* Album Sidebar */}
          <div className="w-1/3 border-r border-border p-4 overflow-y-auto">
            <h4 className="font-medium text-foreground mb-3">Albums</h4>
            <div className="space-y-2">
              {/* Default Image Option */}
              <div
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAlbum === 'default' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => {
                  setSelectedAlbum('default');
                  setImages([{
                    id: 'default',
                    url: '/nature.jpg',
                    thumbnail: '/nature.jpg',
                    title: 'Default Image',
                    albumName: 'Default'
                  }]);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <img
                      src="/nature.jpg"
                      alt="Default"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Default Image</p>
                    <p className="text-sm opacity-75">Fallback image</p>
                  </div>
                </div>
              </div>
              
              {albums.map((album) => (
                <div
                  key={album.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedAlbum === album.id ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => handleAlbumSelect(album.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={album.coverImage || '/nature.jpg'}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium truncate">{album.name}</p>
                      <p className="text-sm opacity-75">{album.assetCount} photos</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Images Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filteredImages.map((image, index) => (
                    <div
                      key={`${image.id}-${index}`}
                      className={`cursor-pointer group relative ${
                        currentImage === image.url ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleImageSelect(image.url, image.title)}
                    >
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border group-hover:border-primary transition-colors">
                        <img
                          src={image.thumbnail}
                          alt={image.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/nature.jpg';
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {image.title}
                      </p>
                      {currentImage === image.url && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <div className="w-2 h-2"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {hasMoreImages && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={loadMoreImages}
                      disabled={loading}
                      className="flex items-center space-x-2"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <span>Load More Images</span>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
