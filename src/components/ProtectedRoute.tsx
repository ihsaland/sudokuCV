import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  section: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, section }) => {
  const { isSectionUnlocked } = useUnlockedSections();
  const isUnlocked = isSectionUnlocked(section);

  console.log(`Checking access to section: ${section}, unlocked: ${isUnlocked}`);

  if (!isUnlocked) {
    console.log(`Access denied to section: ${section}, redirecting to game`);
    return <Navigate to="/game" replace />;
  }

  console.log(`Access granted to section: ${section}`);
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      overflow: 'auto',
      position: 'relative'
    }}>
      {children}
    </div>
  );
};

export default ProtectedRoute; 