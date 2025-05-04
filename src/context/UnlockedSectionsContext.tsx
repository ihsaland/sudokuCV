import React, { createContext, useContext, useState, useEffect } from 'react';
import { cache } from '../utils/cache';

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
    return cached || [];
  });

  useEffect(() => {
    cache.set(CACHE_KEY, unlockedSections);
  }, [unlockedSections]);

  const unlockSection = (section: string) => {
    setUnlockedSections(prev => {
      if (!prev.includes(section)) {
        return [...prev, section];
      }
      return prev;
    });
  };

  const isSectionUnlocked = (section: string) => {
    return unlockedSections.includes(section);
  };

  const resetProgress = () => {
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