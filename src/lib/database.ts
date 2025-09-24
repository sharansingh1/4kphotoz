import { Deta } from 'deta';

// Initialize Deta Base (with fallback)
let deta: any = null;
let adminDB: any = null;
let alertsDB: any = null;

if (process.env.DETA_PROJECT_KEY) {
  try {
    deta = Deta(process.env.DETA_PROJECT_KEY);
    adminDB = deta.Base('admin_data');
    alertsDB = deta.Base('alert_signups');
  } catch (error) {
    console.error('Failed to initialize Deta:', error);
  }
}

// Fallback in-memory storage
let fallbackData: AdminSettings = defaultSettings;
let fallbackSignups: AlertSignup[] = [];

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

// Default settings
const defaultSettings: AdminSettings = {
  highlightImages: ['/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg'],
  visibleAlbums: {},
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

// Admin Settings Functions
export const getAdminSettings = async (): Promise<AdminSettings> => {
  if (!adminDB) {
    return fallbackData;
  }
  
  try {
    const result = await adminDB.get('settings');
    if (result) {
      return result as AdminSettings;
    }
  } catch (error) {
    console.error('Error fetching admin settings:', error);
  }
  return defaultSettings;
};

export const updateAdminSettings = async (settings: AdminSettings): Promise<void> => {
  if (!adminDB) {
    fallbackData = settings;
    return;
  }
  
  try {
    await adminDB.put(settings, 'settings');
  } catch (error) {
    console.error('Error updating admin settings:', error);
  }
};

export const updateHighlightImages = async (images: string[]): Promise<void> => {
  const settings = await getAdminSettings();
  settings.highlightImages = images;
  await updateAdminSettings(settings);
};

export const updateAlbumVisibility = async (albumId: string, visible: boolean): Promise<void> => {
  const settings = await getAdminSettings();
  settings.visibleAlbums[albumId] = visible;
  await updateAdminSettings(settings);
};

export const setAlbumVisibility = async (albums: Record<string, boolean>): Promise<void> => {
  const settings = await getAdminSettings();
  settings.visibleAlbums = albums;
  await updateAdminSettings(settings);
};

export const getVisibleAlbums = async (): Promise<Record<string, boolean>> => {
  const settings = await getAdminSettings();
  return settings.visibleAlbums;
};

export const getHighlightImages = async (): Promise<string[]> => {
  const settings = await getAdminSettings();
  return settings.highlightImages;
};

export const updatePageImage = async (page: string, section: string, imageUrl: string): Promise<void> => {
  const settings = await getAdminSettings();
  if (settings.pageImages[page as keyof typeof settings.pageImages]) {
    (settings.pageImages[page as keyof typeof settings.pageImages] as any)[section] = imageUrl;
    await updateAdminSettings(settings);
  }
};

export const getPageImages = async () => {
  const settings = await getAdminSettings();
  return settings.pageImages;
};

// Alert Signup Functions
export const addAlertSignup = async (signup: Omit<AlertSignup, 'id' | 'signupDate' | 'isActive'>): Promise<AlertSignup> => {
  const newSignup: AlertSignup = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    signupDate: new Date(),
    isActive: true,
    ...signup,
  };
  
  if (!alertsDB) {
    fallbackSignups.push(newSignup);
    return newSignup;
  }
  
  try {
    await alertsDB.put(newSignup, newSignup.id);
    return newSignup;
  } catch (error) {
    console.error('Error adding alert signup:', error);
    throw error;
  }
};

export const getAlertSignups = async (): Promise<AlertSignup[]> => {
  if (!alertsDB) {
    return fallbackSignups.filter(s => s.isActive);
  }
  
  try {
    const result = await alertsDB.fetch({ isActive: true });
    return result.items as AlertSignup[];
  } catch (error) {
    console.error('Error fetching alert signups:', error);
    return [];
  }
};

export const getAllAlertSignups = async (): Promise<AlertSignup[]> => {
  if (!alertsDB) {
    return fallbackSignups;
  }
  
  try {
    const result = await alertsDB.fetch();
    return result.items as AlertSignup[];
  } catch (error) {
    console.error('Error fetching all alert signups:', error);
    return [];
  }
};

export const deactivateAlertSignup = async (id: string): Promise<boolean> => {
  if (!alertsDB) {
    const signup = fallbackSignups.find(s => s.id === id);
    if (signup) {
      signup.isActive = false;
      return true;
    }
    return false;
  }
  
  try {
    const signup = await alertsDB.get(id) as AlertSignup;
    if (signup) {
      signup.isActive = false;
      await alertsDB.put(signup, id);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deactivating alert signup:', error);
    return false;
  }
};

export const deleteAlertSignup = async (id: string): Promise<boolean> => {
  if (!alertsDB) {
    const index = fallbackSignups.findIndex(s => s.id === id);
    if (index !== -1) {
      fallbackSignups.splice(index, 1);
      return true;
    }
    return false;
  }
  
  try {
    await alertsDB.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting alert signup:', error);
    return false;
  }
};

export const getAlertSignupsBySport = async (sport: string): Promise<AlertSignup[]> => {
  if (!alertsDB) {
    return fallbackSignups.filter(s => s.isActive && s.sport === sport);
  }
  
  try {
    const result = await alertsDB.fetch({ sport, isActive: true });
    return result.items as AlertSignup[];
  } catch (error) {
    console.error('Error fetching alert signups by sport:', error);
    return [];
  }
};

export const getAlertSignupsByGraduationYear = async (year: string): Promise<AlertSignup[]> => {
  if (!alertsDB) {
    return fallbackSignups.filter(s => s.isActive && s.graduationYear === year);
  }
  
  try {
    const result = await alertsDB.fetch({ graduationYear: year, isActive: true });
    return result.items as AlertSignup[];
  } catch (error) {
    console.error('Error fetching alert signups by graduation year:', error);
    return [];
  }
};
