import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  section: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, section }) => {
  const { unlockedSections } = useUnlockedSections();

  if (!unlockedSections.includes(section)) {
    return <Navigate to="/game" replace />;
  }

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