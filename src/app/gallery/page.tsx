'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid3X3, List, X } from 'lucide-react';

interface Album {
  id: string;
  name: string;
  assetCount: number;
  coverImage?: string;
  created: string;
  modified: string;
}

interface Image {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadAlbums();
    
    // Setup intersection observer for better lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src && !img.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1,
      }
    );

    // Handle browser back button
    const handlePopState = () => {
      if (selectedAlbum) {
        handleBackToAlbums();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedAlbum]);

  const loadAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gallery?action=albums');
      const data = await response.json();
      
      if (data.albums) {
        // Filter albums based on admin visibility settings
        const visibilityResponse = await fetch('/api/admin/settings');
        const visibilityData = await visibilityResponse.json();
        const visibleAlbums = visibilityData.visibleAlbums || {};
        
        const filteredAlbums = data.albums.filter((album: Album) => {
          // Show album if it's not explicitly hidden (default to visible)
          return visibleAlbums[album.id] !== false;
        });
        
        setAlbums(filteredAlbums);
      }
    } catch (error) {
      console.error('Error loading albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumImages = async (albumId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gallery?action=images&albumId=${albumId}`);
      const data = await response.json();
      
      if (data.images) {
        setImages(data.images);
        // Initialize loading states for all images
        const loadingStates: Record<string, boolean> = {};
        data.images.forEach((image: Image) => {
          loadingStates[image.id] = true;
        });
        setImageLoadingStates(loadingStates);
        
        const album = albums.find(a => a.id === albumId);
        if (album) {
          setSelectedAlbum(album);
        }

        // Preload first few images for faster display
        preloadImages(data.images.slice(0, 8));
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const preloadImages = (images: Image[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.thumbnail;
      img.onload = () => {
        setImageLoadingStates(prev => ({
          ...prev,
          [image.id]: false
        }));
      };
      img.onerror = () => {
        setImageLoadingStates(prev => ({
          ...prev,
          [image.id]: false
        }));
      };
    });
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    loadAlbumImages(album.id);
    // Push state to prevent browser back from going to previous page
    window.history.pushState({}, '', `/gallery?album=${album.id}`);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setImages([]);
    setImageLoadingStates({});
    setSelectedImage(null);
    // Push state to prevent browser back from going to previous page
    window.history.pushState({}, '', '/gallery');
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = (imageId: string) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  const handleImageError = (imageId: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`Image failed to load: ${target.src}`);
    target.src = '/nature.jpg';
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our complete photography portfolio showcasing professional work across all services
          </p>
        </div>
      </section>

      {!selectedAlbum ? (
        /* Album Grid */
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                All Albums
              </h2>
              <p className="text-lg text-muted-foreground">
                Click on any album to view the photos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => handleAlbumClick(album)}
                  className="group cursor-pointer bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={album.coverImage || '/nature.jpg'}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/nature.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {album.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(album.created).toLocaleDateString()}</span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {album.assetCount} photos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Image Gallery */
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Gallery Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBackToAlbums}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Albums</span>
                </Button>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {selectedAlbum.name}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="group cursor-pointer bg-muted rounded-xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border" onClick={() => handleImageClick(image)}>
                    <div className="aspect-square relative overflow-hidden">
                      {imageLoadingStates[image.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      )}
                      <img
                        data-src={image.thumbnail}
                        alt={image.title}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ${
                          imageLoadingStates[image.id] ? 'opacity-0' : 'opacity-100'
                        }`}
                        onError={(e) => handleImageError(image.id, e)}
                        onLoad={() => handleImageLoad(image.id)}
                        style={{
                          filter: imageLoadingStates[image.id] ? 'blur(5px)' : 'none',
                          transition: 'opacity 0.3s ease, filter 0.3s ease'
                        }}
                        ref={(img) => {
                          if (img && observerRef.current) {
                            observerRef.current.observe(img);
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{images.indexOf(image) + 1}</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          4kphotoz
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {images.map((image) => (
                  <div key={image.id} className="flex items-center space-x-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors border border-border cursor-pointer" onClick={() => handleImageClick(image)}>
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                      {imageLoadingStates[image.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        </div>
                      )}
                      <img
                        data-src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(image.id, e)}
                        onLoad={() => handleImageLoad(image.id)}
                        ref={(img) => {
                          if (img && observerRef.current) {
                            observerRef.current.observe(img);
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{images.indexOf(image) + 1}</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          4kphotoz
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">This album is empty or images are still loading.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-5 h-5" />
            </Button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/nature.jpg';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
