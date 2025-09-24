// Simple in-memory storage for admin settings
// In production, you'd want to use a database

interface AlertSignup {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  athleteName?: string;
  sport?: string;
  graduationYear?: string;
  signupDate: Date;
  isActive: boolean;
}

interface AdminSettings {
  highlightImages: string[];
  visibleAlbums: Record<string, boolean>;
  pageImages: {
    photography: {
      portraits: string;
      events: string;
      mediaDay: string;
      sports: string;
      marketing: string;
      sportsPortraits: string;
      littleLeague: string;
    };
    graphicDesign: {
      logos: string;
      posters: string;
      banners: string;
      socialMedia: string;
      portfolio: string;
    };
    printLab: {
      banners: string;
      posters: string;
      businessCards: string;
      stickers: string;
      flyers: string;
      packaging: string;
      showcase: string;
    };
    photoBooth: {
      mirrorBooth: string;
      stationaryBooth: string;
      events1: string;
      events2: string;
      events3: string;
      events4: string;
      events5: string;
      events6: string;
    };
    contact: {
      studio: string;
    };
    moreauCatholic: {
      athletics1: string;
      athletics2: string;
      athletics3: string;
      athletics4: string;
      athletics5: string;
      athletics6: string;
    };
  };
}

let alertSignups: AlertSignup[] = [];

let adminSettings: AdminSettings = {
  highlightImages: ['/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg'], // Default to 6 nature images
  visibleAlbums: {}, // Will be populated with album IDs
  pageImages: {
    photography: {
      portraits: '/nature.jpg',
      events: '/nature.jpg',
      mediaDay: '/nature.jpg',
      sports: '/nature.jpg',
      marketing: '/nature.jpg',
      sportsPortraits: '/nature.jpg',
      littleLeague: '/nature.jpg',
    },
    graphicDesign: {
      logos: '/nature.jpg',
      posters: '/nature.jpg',
      banners: '/nature.jpg',
      socialMedia: '/nature.jpg',
      portfolio: '/nature.jpg',
    },
    printLab: {
      banners: '/nature.jpg',
      posters: '/nature.jpg',
      businessCards: '/nature.jpg',
      stickers: '/nature.jpg',
      flyers: '/nature.jpg',
      packaging: '/nature.jpg',
      showcase: '/nature.jpg',
    },
    photoBooth: {
      mirrorBooth: '/nature.jpg',
      stationaryBooth: '/nature.jpg',
      events1: '/nature.jpg',
      events2: '/nature.jpg',
      events3: '/nature.jpg',
      events4: '/nature.jpg',
      events5: '/nature.jpg',
      events6: '/nature.jpg',
    },
    contact: {
      studio: '/nature.jpg',
    },
    moreauCatholic: {
      athletics1: '/nature.jpg',
      athletics2: '/nature.jpg',
      athletics3: '/nature.jpg',
      athletics4: '/nature.jpg',
      athletics5: '/nature.jpg',
      athletics6: '/nature.jpg',
    },
  },
};

export const getAdminSettings = (): AdminSettings => {
  return adminSettings;
};

export const updateHighlightImages = (images: string[]) => {
  adminSettings.highlightImages = images;
};

export const updateAlbumVisibility = (albumId: string, visible: boolean) => {
  adminSettings.visibleAlbums[albumId] = visible;
};

export const setAlbumVisibility = (albums: Record<string, boolean>) => {
  adminSettings.visibleAlbums = albums;
};

export const getVisibleAlbums = (): Record<string, boolean> => {
  return adminSettings.visibleAlbums;
};

export const getHighlightImages = (): string[] => {
  return adminSettings.highlightImages;
};

export const updatePageImage = (page: string, section: string, imageUrl: string) => {
  if (adminSettings.pageImages[page as keyof typeof adminSettings.pageImages]) {
    (adminSettings.pageImages[page as keyof typeof adminSettings.pageImages] as any)[section] = imageUrl;
  }
};

export const getPageImages = () => {
  return adminSettings.pageImages;
};

// Alert management functions
export const addAlertSignup = (signup: Omit<AlertSignup, 'id' | 'signupDate' | 'isActive'>): AlertSignup => {
  const newSignup: AlertSignup = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    signupDate: new Date(),
    isActive: true,
    ...signup,
  };
  alertSignups.push(newSignup);
  return newSignup;
};

export const getAlertSignups = (): AlertSignup[] => {
  return alertSignups.filter(signup => signup.isActive);
};

export const getAllAlertSignups = (): AlertSignup[] => {
  return alertSignups;
};

export const deactivateAlertSignup = (id: string): boolean => {
  const signup = alertSignups.find(s => s.id === id);
  if (signup) {
    signup.isActive = false;
    return true;
  }
  return false;
};

export const deleteAlertSignup = (id: string): boolean => {
  const index = alertSignups.findIndex(s => s.id === id);
  if (index !== -1) {
    alertSignups.splice(index, 1);
    return true;
  }
  return false;
};

export const getAlertSignupsBySport = (sport: string): AlertSignup[] => {
  return alertSignups.filter(signup => signup.isActive && signup.sport === sport);
};

export const getAlertSignupsByGraduationYear = (year: string): AlertSignup[] => {
  return alertSignups.filter(signup => signup.isActive && signup.graduationYear === year);
};
