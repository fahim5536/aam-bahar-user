import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to absolute top instantly when path or query changes
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);

  return null;
}
