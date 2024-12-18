import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Disable scroll restoration to avoid unexpected behavior
    window.history.scrollRestoration = 'manual';

    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Re-enable scroll restoration if needed (optional)
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
