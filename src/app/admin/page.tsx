'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { ImageLibrary } from '@/components/ImageLibrary';

interface Album {
  id: string;
  name: string;
  assetCount: number;
  coverImage?: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [highlightImages, setHighlightImages] = useState<string[]>([]);
  const [pageImages, setPageImages] = useState<any>({});
  const [visibleAlbums, setVisibleAlbums] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  
  // Alert management states
  const [alertSubscribers, setAlertSubscribers] = useState<any[]>([]);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertEventName, setAlertEventName] = useState('');
  const [alertGalleryUrl, setAlertGalleryUrl] = useState('');
  const [alertSending, setAlertSending] = useState(false);
  
  // Image picker states
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [activePicker, setActivePicker] = useState<{
    type: 'highlight' | 'page';
    index?: number;
    page?: string;
    section?: string;
  } | null>(null);
  
  // Auto-save timeout ref
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    if (status === 'authenticated') {
      loadData();
    }
  }, [status, router]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load albums and settings in parallel for speed
      const [albumsResponse, settingsResponse] = await Promise.all([
        fetch('/api/gallery?action=albums'),
        fetch('/api/admin/settings')
      ]);
      
      const albumsData = await albumsResponse.json();
      const settings = await settingsResponse.json();
      
      setAlbums(albumsData.albums || []);
      setHighlightImages(settings.highlightImages || ['/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg']);
      setVisibleAlbums(settings.visibleAlbums || {});
      setPageImages(settings.pageImages || {});
      
      // Load alert subscribers
      loadAlertSubscribers();
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAlertSubscribers = async () => {
    try {
      setAlertLoading(true);
      const response = await fetch('/api/alerts/manage');
      const data = await response.json();
      setAlertSubscribers(data.signups || []);
    } catch (error) {
      console.error('Error loading alert subscribers:', error);
    } finally {
      setAlertLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          highlightImages,
          visibleAlbums,
          pageImages,
        }),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleHighlightImageChange = (index: number, imageUrl: string) => {
    const newImages = [...highlightImages];
    newImages[index] = imageUrl;
    setHighlightImages(newImages);
    
    // Auto-save after image change (debounced)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(async () => {
      setAutoSaving(true);
      try {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            highlightImages: newImages,
            visibleAlbums,
            pageImages,
          }),
        });
      } catch (error) {
        console.error('Error auto-saving:', error);
      } finally {
        setAutoSaving(false);
      }
    }, 1000); // Save after 1 second of no changes
  };

  const handlePageImageChange = (page: string, section: string, imageUrl: string) => {
    const newPageImages = {
      ...pageImages,
      [page]: {
        ...pageImages[page],
        [section]: imageUrl
      }
    };
    setPageImages(newPageImages);
    
    // Auto-save after image change (debounced)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(async () => {
      setAutoSaving(true);
      try {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            highlightImages,
            visibleAlbums,
            pageImages: newPageImages,
          }),
        });
      } catch (error) {
        console.error('Error auto-saving:', error);
      } finally {
        setAutoSaving(false);
      }
    }, 1000); // Save after 1 second of no changes
  };

  const openImagePicker = (type: 'highlight' | 'page', index?: number, page?: string, section?: string) => {
    setActivePicker({ type, index, page, section });
    setShowImageLibrary(true);
  };

  const handleImageSelect = (imageUrl: string, imageTitle: string) => {
    if (!activePicker) return;

    if (activePicker.type === 'highlight' && activePicker.index !== undefined) {
      handleHighlightImageChange(activePicker.index, imageUrl);
    } else if (activePicker.type === 'page' && activePicker.page && activePicker.section) {
      handlePageImageChange(activePicker.page, activePicker.section, imageUrl);
    }

    setShowImageLibrary(false);
    setActivePicker(null);
  };

  const toggleAlbumVisibility = (albumId: string) => {
    setVisibleAlbums(prev => ({
      ...prev,
      [albumId]: !prev[albumId]
    }));
  };

  const sendAlert = async (sendToAll: boolean = true, sport?: string, graduationYear?: string) => {
    if (!alertMessage || !alertGalleryUrl) {
      alert('Please fill in the message and gallery URL');
      return;
    }

    setAlertSending(true);
    try {
      const response = await fetch('/api/alerts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: alertMessage,
          galleryUrl: alertGalleryUrl,
          eventName: alertEventName,
          sport,
          graduationYear,
          sendToAll
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Alert sent successfully! Sent to ${result.stats.successful} subscribers.`);
        // Clear form
        setAlertMessage('');
        setAlertEventName('');
        setAlertGalleryUrl('');
      } else {
        alert('Failed to send alert: ' + result.error);
      }
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Error sending alert. Please try again.');
    } finally {
      setAlertSending(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your website content
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Site</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Highlight Images Section */}
          <div className="bg-muted rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Home Page Highlights
            </h2>
            <p className="text-muted-foreground mb-6">
              Choose 6 images to display on your home page
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    Highlight Image {index + 1}
                  </label>
                  <div 
                    className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-border hover:border-primary relative"
                    onClick={() => openImagePicker('highlight', index)}
                  >
                    <img
                      src={highlightImages[index] || '/nature.jpg'}
                      alt={`Highlight ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <ImageIcon className="w-6 h-6 text-white mx-auto mb-1" />
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Album Visibility Section */}
          <div className="bg-muted rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Gallery Visibility
            </h2>
            <p className="text-muted-foreground mb-6">
              Choose which albums are visible on your public gallery
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {albums.map((album) => (
                <div key={album.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={album.coverImage || '/nature.jpg'}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{album.name}</p>
                      <p className="text-sm text-muted-foreground">{album.assetCount} photos</p>
                    </div>
                  </div>
                  <Button
                    variant={visibleAlbums[album.id] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAlbumVisibility(album.id)}
                    className="flex items-center space-x-2"
                  >
                    {visibleAlbums[album.id] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{visibleAlbums[album.id] ? 'Visible' : 'Hidden'}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Page Images Management */}
          <div className="bg-muted rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Page Images Management
            </h2>
            <p className="text-muted-foreground mb-6">
              Manage images displayed on each page of your website
            </p>
            
            <div className="space-y-6">
              {/* Photography Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Photography Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'portraits', label: 'Portraits' },
                    { key: 'events', label: 'Events' },
                    { key: 'mediaDay', label: 'Media Day' },
                    { key: 'sports', label: 'Sports' },
                    { key: 'marketing', label: 'Marketing' },
                    { key: 'sportsPortraits', label: 'Sports Portraits' },
                    { key: 'littleLeague', label: 'Little League' },
                  ].map((item) => (
                    <div key={item.key} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <div 
                        className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                        onClick={() => openImagePicker('page', undefined, 'photography', item.key)}
                      >
                        <img
                          src={pageImages?.photography?.[item.key] || '/nature.jpg'}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Design Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Graphic Design Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'logos', label: 'Logos' },
                    { key: 'posters', label: 'Posters' },
                    { key: 'banners', label: 'Banners' },
                    { key: 'socialMedia', label: 'Social Media' },
                    { key: 'portfolio', label: 'Portfolio' },
                  ].map((item) => (
                    <div key={item.key} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <div 
                        className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                        onClick={() => openImagePicker('page', undefined, 'graphicDesign', item.key)}
                      >
                        <img
                          src={pageImages?.graphicDesign?.[item.key] || '/nature.jpg'}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Print Lab Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Print Lab Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'banners', label: 'Banners' },
                    { key: 'posters', label: 'Posters' },
                    { key: 'businessCards', label: 'Business Cards' },
                    { key: 'stickers', label: 'Stickers' },
                    { key: 'flyers', label: 'Flyers' },
                    { key: 'packaging', label: 'Packaging' },
                    { key: 'showcase', label: 'Showcase' },
                  ].map((item) => (
                    <div key={item.key} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <div 
                        className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                        onClick={() => openImagePicker('page', undefined, 'printLab', item.key)}
                      >
                        <img
                          src={pageImages?.printLab?.[item.key] || '/nature.jpg'}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Booth Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Photo Booth Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'mirrorBooth', label: 'Mirror Booth' },
                    { key: 'stationaryBooth', label: 'Stationary Booth' },
                    { key: 'events1', label: 'Birthday Parties' },
                    { key: 'events2', label: 'Corporate Events' },
                    { key: 'events3', label: 'School Events' },
                    { key: 'events4', label: 'Holiday Parties' },
                    { key: 'events5', label: 'Anniversaries' },
                    { key: 'events6', label: 'Weddings' },
                  ].map((item) => (
                    <div key={item.key} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <div 
                        className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                        onClick={() => openImagePicker('page', undefined, 'photoBooth', item.key)}
                      >
                        <img
                          src={pageImages?.photoBooth?.[item.key] || '/nature.jpg'}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Contact Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Studio</label>
                    <div 
                      className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                      onClick={() => openImagePicker('page', undefined, 'contact', 'studio')}
                    >
                      <img
                        src={pageImages?.contact?.studio || '/nature.jpg'}
                        alt="Studio"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="text-center">
                          <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                          <span className="text-white text-xs font-medium">Change</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moreau Catholic Page */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Moreau Catholic Page</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Athletics {item}</label>
                      <div 
                        className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border hover:border-primary relative"
                        onClick={() => openImagePicker('page', undefined, 'moreauCatholic', `athletics${item}`)}
                      >
                        <img
                          src={pageImages?.moreauCatholic?.[`athletics${item}` as keyof typeof pageImages.moreauCatholic] || '/nature.jpg'}
                          alt={`Athletics ${item}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <ImageIcon className="w-4 h-4 text-white mx-auto mb-1" />
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alert Management Section */}
          <div className="bg-muted rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Alert Management
            </h2>
            <p className="text-muted-foreground mb-6">
              Manage Moreau Catholic alert signups and send notifications
            </p>
            
            <div className="space-y-6">
              {/* Send Alert Section */}
              <div className="bg-background rounded-lg p-4">
                <h3 className="text-lg font-accent font-semibold text-foreground mb-4">
                  Send New Alert
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={alertEventName}
                      onChange={(e) => setAlertEventName(e.target.value)}
                      placeholder="e.g., Football vs. De La Salle"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Gallery URL
                    </label>
                    <input
                      type="url"
                      value={alertGalleryUrl}
                      onChange={(e) => setAlertGalleryUrl(e.target.value)}
                      placeholder="https://yourdomain.com/gallery"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                    placeholder="Hi {parentName}, new photos from {athleteName}'s {sport} game are now available!"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div className="mt-4 flex gap-4">
                  <Button 
                    onClick={() => sendAlert(true)}
                    disabled={alertSending}
                    className="gradient-bg hover:opacity-90 disabled:opacity-50"
                  >
                    {alertSending ? 'Sending...' : `Send to All Subscribers (${alertSubscribers.length})`}
                  </Button>
                  <Button 
                    onClick={() => sendAlert(false, 'Football')}
                    disabled={alertSending}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-foreground disabled:opacity-50"
                  >
                    Send to Football Only
                  </Button>
                </div>
              </div>

              {/* View Subscribers Section */}
              <div className="bg-background rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-accent font-semibold text-foreground">
                    Alert Subscribers ({alertSubscribers.length})
                  </h3>
                  <Button 
                    onClick={loadAlertSubscribers}
                    disabled={alertLoading}
                    variant="outline" 
                    size="sm"
                  >
                    {alertLoading ? 'Loading...' : 'Refresh'}
                  </Button>
                </div>
                
                {alertSubscribers.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    <p>No subscribers yet. Subscribers will appear here when they sign up on the Moreau Catholic page.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alertSubscribers.map((subscriber) => (
                      <div key={subscriber.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-foreground">{subscriber.parentName}</div>
                            <div className="text-sm text-muted-foreground">{subscriber.email}</div>
                            {subscriber.athleteName && (
                              <div className="text-sm text-muted-foreground">Athlete: {subscriber.athleteName}</div>
                            )}
                            {subscriber.sport && (
                              <div className="text-sm text-muted-foreground">Sport: {subscriber.sport}</div>
                            )}
                            {subscriber.graduationYear && (
                              <div className="text-sm text-muted-foreground">Class: {subscriber.graduationYear}</div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              Signed up: {new Date(subscriber.signupDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                if (confirm('Deactivate this subscriber?')) {
                                  fetch('/api/alerts/manage', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ signupId: subscriber.id, action: 'deactivate' })
                                  }).then(() => loadAlertSubscribers());
                                }
                              }}
                            >
                              Deactivate
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Library */}
          <ImageLibrary
            isOpen={showImageLibrary}
            onClose={() => {
              setShowImageLibrary(false);
              setActivePicker(null);
            }}
            onImageSelect={handleImageSelect}
            currentImage={
              activePicker?.type === 'highlight' && activePicker.index !== undefined
                ? highlightImages[activePicker.index] || '/nature.jpg'
                : activePicker?.type === 'page' && activePicker.page && activePicker.section
                ? pageImages?.[activePicker.page]?.[activePicker.section] || '/nature.jpg'
                : '/nature.jpg'
            }
            title={
              activePicker?.type === 'highlight' && activePicker.index !== undefined
                ? `Choose Image for Highlight ${activePicker.index + 1}`
                : activePicker?.type === 'page' && activePicker.page && activePicker.section
                ? `Choose Image for ${activePicker.page} - ${activePicker.section}`
                : 'Choose Image'
            }
          />

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSaveSettings}
              disabled={saving || autoSaving}
              className="flex items-center space-x-2 px-8"
            >
              <Save className="w-4 h-4" />
              <span>
                {saving ? 'Saving...' : autoSaving ? 'Auto-saving...' : 'Save Settings'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}