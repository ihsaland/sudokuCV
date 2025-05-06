import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not found in environment variables');
    return;
  }

  console.log('Initializing Google Analytics with ID:', measurementId);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Add GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      send_page_view: true,
      debug_mode: true
    });
  `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
};

// Track page views
export const trackPageView = (path: string) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  console.log('Tracking page view:', path);
  window.gtag('config', measurementId, {
    page_path: path,
    debug_mode: true
  });
};

// Track events
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  console.log('Tracking event:', { action, category, label, value });
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    debug_mode: true
  });
};

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on component mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GoogleAnalytics; 