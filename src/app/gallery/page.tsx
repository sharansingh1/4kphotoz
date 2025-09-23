'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid3X3, List, Search, Calendar, Tag } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gallery?action=albums');
      const data = await response.json();
      
      if (data.albums) {
        setAlbums(data.albums);
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
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    loadAlbumImages(album.id);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setImages([]);
    setSearchQuery('');
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {album.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(album.created).toLocaleDateString()}
                      </span>
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
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

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
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer bg-muted rounded-xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-foreground mb-1 truncate">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(image.date).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-1">
                          {image.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-primary/10 text-primary px-1 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center space-x-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors border border-border"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 truncate">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(image.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-1">
                          {image.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="bg-primary/10 text-primary px-1 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredImages.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images found matching "{searchQuery}"</p>
              </div>
            )}

            {filteredImages.length === 0 && !searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">This album appears to be empty or the images are still loading.</p>
                <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page or selecting a different album.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}