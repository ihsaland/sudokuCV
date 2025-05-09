import React, { createContext, useContext, useState, useEffect } from 'react';
import { cache } from '../utils/cache';
import { trackEvent } from '../components/GoogleAnalytics';

interface UnlockedSectionsContextType {
  unlockedSections: string[];
  unlockSection: (section: string) => void;
  isSectionUnlocked: (section: string) => boolean;
  resetProgress: () => void;
}

const UnlockedSectionsContext = createContext<UnlockedSectionsContextType | undefined>(undefined);

const CACHE_KEY = 'unlocked_sections';

export const UnlockedSectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedSections, setUnlockedSections] = useState<string[]>(() => {
    const cached = cache.get<string[]>(CACHE_KEY);
    console.log('Initial unlocked sections from cache:', cached);
    return cached || [];
  });

  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const notificationTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('Saving unlocked sections to cache:', unlockedSections);
    cache.set(CACHE_KEY, unlockedSections);
  }, [unlockedSections]);

  const unlockSection = (section: string) => {
    console.log('Attempting to unlock section:', section);
    if (!unlockedSections.includes(section)) {
      console.log('Section not previously unlocked, adding to unlocked sections');
      const newUnlockedSections = [...unlockedSections, section];
      setUnlockedSections(newUnlockedSections);
      localStorage.setItem('unlockedSections', JSON.stringify(newUnlockedSections));
      
      // Set notification with proper cleanup
      setNotification({
        message: `New CV section unlocked: ${section.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        type: 'success'
      });
      
      // Clear any existing timeout
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
      
      // Set new timeout
      notificationTimeout.current = setTimeout(() => {
        console.log('Clearing notification after timeout');
        setNotification(null);
        notificationTimeout.current = null;
      }, 5000);
      
      // Track the unlock event
      trackEvent('section_unlock', 'cv', section, newUnlockedSections.length);
    } else {
      console.log('Section already unlocked:', section);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeout.current) {
        console.log('Cleaning up notification timeout');
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  const isSectionUnlocked = (section: string) => {
    const isUnlocked = unlockedSections.includes(section);
    console.log('Checking if section is unlocked:', section, isUnlocked);
    return isUnlocked;
  };

  const resetProgress = () => {
    console.log('Resetting all progress');
    setUnlockedSections([]);
    cache.remove(CACHE_KEY);
  };

  return (
    <UnlockedSectionsContext.Provider
      value={{
        unlockedSections,
        unlockSection,
        isSectionUnlocked,
        resetProgress,
      }}
    >
      {children}
    </UnlockedSectionsContext.Provider>
  );
};

export const useUnlockedSections = () => {
  const context = useContext(UnlockedSectionsContext);
  if (context === undefined) {
    throw new Error('useUnlockedSections must be used within an UnlockedSectionsProvider');
  }
  return context;
}; 