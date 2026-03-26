declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not found in environment variables');
    return;
  }

  console.log('Initializing Google Analytics with ID:', measurementId);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

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
      debug_mode: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);

  console.log('Google Analytics scripts added to document head');
};

export const trackPageView = (path: string) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    console.warn('Cannot track page view: Measurement ID not found');
    return;
  }

  console.log('Tracking page view:', path);
  window.gtag('config', measurementId, {
    page_path: path,
    debug_mode: true,
  });
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    console.warn('Cannot track event: Measurement ID not found');
    return;
  }

  console.log('Tracking event:', { action, category, label, value });
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    debug_mode: true,
  });
};
