import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      const tryScroll = () => {
        attempts += 1;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (attempts < 25) window.setTimeout(tryScroll, 60);
      };
      window.setTimeout(tryScroll, 50);
      return;
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
