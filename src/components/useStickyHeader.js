import { useState, useEffect, useRef, useCallback } from "react";


const useStickyHeader = (defaultSticky = false) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const tableRef = useRef(null);

  const toggleStickiness = useCallback(
    ({ top, bottom }) => {
      
      if (
        top <= 0 &&
        // When scrolling from bottom to top when and
        // the last row is visible enough, sticky header will be triggered.
        // This number (68) could be adjusted or skipped.
        bottom > 2 * 100
        
      ) {
        !isSticky && setIsSticky(true);
      } else {
        isSticky && setIsSticky(false);
      }
    },
    [isSticky]
  );

  useEffect(() => {
    const handleScroll = () => {
      toggleStickiness(tableRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleStickiness]);

  return { tableRef, isSticky };
  };

export default useStickyHeader;
