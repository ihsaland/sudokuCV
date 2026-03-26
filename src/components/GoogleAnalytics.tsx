import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../utils/googleAnalytics';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('GoogleAnalytics component mounted');
    initGA();
  }, []);

  useEffect(() => {
    console.log('Location changed:', location.pathname + location.search);
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GoogleAnalytics;
