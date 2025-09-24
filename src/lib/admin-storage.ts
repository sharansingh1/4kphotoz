import fs from 'fs';
import path from 'path';

// File-based storage for admin settings
const ADMIN_DATA_FILE = path.join(process.cwd(), 'admin-data.json');

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

interface AdminData {
  alertSignups: AlertSignup[];
  adminSettings: AdminSettings;
}

// Default data
const defaultData: AdminData = {
  alertSignups: [],
  adminSettings: {
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
  },
};

// Read data from file
function readData(): AdminData {
  try {
    if (fs.existsSync(ADMIN_DATA_FILE)) {
      const fileContent = fs.readFileSync(ADMIN_DATA_FILE, 'utf8');
      const data = JSON.parse(fileContent);
      
      // Convert date strings back to Date objects
      data.alertSignups = data.alertSignups.map((signup: any) => ({
        ...signup,
        signupDate: new Date(signup.signupDate),
      }));
      
      return data;
    }
  } catch (error) {
    console.error('Error reading admin data:', error);
  }
  
  return defaultData;
}

// Write data to file
function writeData(data: AdminData): void {
  try {
    fs.writeFileSync(ADMIN_DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing admin data:', error);
  }
}

// Get current data
let currentData = readData();

// Export functions
export const getAdminSettings = (): AdminSettings => {
  return currentData.adminSettings;
};

export const updateHighlightImages = (images: string[]) => {
  currentData.adminSettings.highlightImages = images;
  writeData(currentData);
};

export const updateAlbumVisibility = (albumId: string, visible: boolean) => {
  currentData.adminSettings.visibleAlbums[albumId] = visible;
  writeData(currentData);
};

export const setAlbumVisibility = (albums: Record<string, boolean>) => {
  currentData.adminSettings.visibleAlbums = albums;
  writeData(currentData);
};

export const getVisibleAlbums = (): Record<string, boolean> => {
  return currentData.adminSettings.visibleAlbums;
};

export const getHighlightImages = (): string[] => {
  return currentData.adminSettings.highlightImages;
};

export const updatePageImage = (page: string, section: string, imageUrl: string) => {
  if (currentData.adminSettings.pageImages[page as keyof typeof currentData.adminSettings.pageImages]) {
    (currentData.adminSettings.pageImages[page as keyof typeof currentData.adminSettings.pageImages] as any)[section] = imageUrl;
    writeData(currentData);
  }
};

export const getPageImages = () => {
  return currentData.adminSettings.pageImages;
};

// Alert management functions
export const addAlertSignup = (signup: Omit<AlertSignup, 'id' | 'signupDate' | 'isActive'>): AlertSignup => {
  const newSignup: AlertSignup = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    signupDate: new Date(),
    isActive: true,
    ...signup,
  };
  currentData.alertSignups.push(newSignup);
  writeData(currentData);
  return newSignup;
};

export const getAlertSignups = (): AlertSignup[] => {
  return currentData.alertSignups.filter(signup => signup.isActive);
};

export const getAllAlertSignups = (): AlertSignup[] => {
  return currentData.alertSignups;
};

export const deactivateAlertSignup = (id: string): boolean => {
  const signup = currentData.alertSignups.find(s => s.id === id);
  if (signup) {
    signup.isActive = false;
    writeData(currentData);
    return true;
  }
  return false;
};

export const deleteAlertSignup = (id: string): boolean => {
  const index = currentData.alertSignups.findIndex(s => s.id === id);
  if (index !== -1) {
    currentData.alertSignups.splice(index, 1);
    writeData(currentData);
    return true;
  }
  return false;
};

export const getAlertSignupsBySport = (sport: string): AlertSignup[] => {
  return currentData.alertSignups.filter(signup => signup.isActive && signup.sport === sport);
};

export const getAlertSignupsByGraduationYear = (year: string): AlertSignup[] => {
  return currentData.alertSignups.filter(signup => signup.isActive && signup.graduationYear === year);
};
