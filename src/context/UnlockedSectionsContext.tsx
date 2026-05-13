/* eslint-disable react-refresh/only-export-components -- context module exports Provider + hook */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cache } from '../utils/cache';
import { trackEvent } from '../utils/googleAnalytics';

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
    return cache.get<string[]>(CACHE_KEY) || [];
  });

  const notificationTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Persist to cache whenever sections change
  useEffect(() => {
    cache.set(CACHE_KEY, unlockedSections);
  }, [unlockedSections]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    };
  }, []);

  const unlockSection = (section: string) => {
    if (unlockedSections.includes(section)) return;

    const newUnlockedSections = [...unlockedSections, section];
    setUnlockedSections(newUnlockedSections);
    trackEvent('section_unlock', 'cv', section, newUnlockedSections.length);
  };

  const isSectionUnlocked = (section: string) => unlockedSections.includes(section);

  const resetProgress = () => {
    setUnlockedSections([]);
    cache.remove(CACHE_KEY);
  };

  return (
    <UnlockedSectionsContext.Provider value={{ unlockedSections, unlockSection, isSectionUnlocked, resetProgress }}>
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
