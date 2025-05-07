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

  useEffect(() => {
    console.log('Saving unlocked sections to cache:', unlockedSections);
    cache.set(CACHE_KEY, unlockedSections);
  }, [unlockedSections]);

  const unlockSection = (section: string) => {
    console.log('Attempting to unlock section:', section);
    setUnlockedSections(prev => {
      if (!prev.includes(section)) {
        console.log('Section unlocked:', section);
        trackEvent('section_unlock', 'cv', section, prev.length + 1);
        return [...prev, section];
      }
      console.log('Section already unlocked:', section);
      return prev;
    });
  };

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