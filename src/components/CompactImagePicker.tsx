'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CompactImagePickerProps {
  currentImage: string;
  onImageSelect: (imageUrl: string) => void;
  albums: Array<{ id: string; name: string; coverImage?: string; assetCount: number }>;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function CompactImagePicker({ 
  currentImage, 
  onImageSelect, 
  albums, 
  isOpen, 
  onClose, 
  title 
}: CompactImagePickerProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [albumImages, setAlbumImages] = useState<Array<{ id: string; url: string; thumbnail: string; title: string }>>([]);

  const selectAlbum = async (albumId: string) => {
    setSelectedAlbum(albumId);
    try {
      const response = await fetch(`/api/gallery?action=images&albumId=${albumId}`);
      const data = await response.json();
      setAlbumImages(data.images || []);
    } catch (error) {
      console.error('Error loading album images:', error);
      setAlbumImages([]);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    onImageSelect(imageUrl);
    onClose();
    setSelectedAlbum(null);
    setAlbumImages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl max-w-4xl max-h-[75vh] w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-display font-bold text-foreground">{title}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {!selectedAlbum ? (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Choose an album:</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {/* Default Image */}
                <div
                  className="cursor-pointer group"
                  onClick={() => handleImageSelect('/nature.jpg')}
                >
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border group-hover:border-primary transition-colors">
                    <img
                      src="/nature.jpg"
                      alt="Default"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">Default</p>
                </div>
                
                {/* Albums */}
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="cursor-pointer group"
                    onClick={() => selectAlbum(album.id)}
                  >
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border group-hover:border-primary transition-colors">
                      <img
                        src={album.coverImage || '/nature.jpg'}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-center truncate">
                      {album.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">
                  {albums.find(a => a.id === selectedAlbum)?.name}
                </h4>
                <button
                  onClick={() => {
                    setSelectedAlbum(null);
                    setAlbumImages([]);
                  }}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  ← Back
                </button>
              </div>
              
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {albumImages.map((image) => (
                  <div
                    key={image.id}
                    className="cursor-pointer group"
                    onClick={() => handleImageSelect(image.url)}
                  >
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border group-hover:border-primary transition-colors">
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

