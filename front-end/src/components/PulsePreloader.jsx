import React, { useEffect, useState } from "react";
import "./PulsePreloader.css";

const PulsePreloader = ({ loading = true }) => {
  const [percent, setPercent] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Manage the interval that increments percent while loading is true
  useEffect(() => {
    if (!loading) return; // do nothing if not loading

    // Make sure percent starts at 0 when loading starts
    setPercent(0);
    setFadeOut(false);

    const interval = setInterval(() => {
      setPercent((prev) => {
        // Cap at 100; the percent effect (below) will handle fade+reset
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 30); // adjust speed here

    return () => clearInterval(interval);
  }, [loading]);

  // When percent reaches 100 -> trigger a fade, then reset to 0 after fade
  useEffect(() => {
    if (percent < 100) return;

    // trigger fade
    setFadeOut(true);

    const t = setTimeout(() => {
      setFadeOut(false);
      setPercent((prev) => (prev >= 100 ? 0 : prev));
    }, 400); // fade duration (match CSS transition)

    return () => clearTimeout(t);
  }, [percent]);
  return (
    <div className="preloader-container" role="status" aria-live="polite">
      <div className={`pulse ${fadeOut ? "fade" : ""} bg-yellow-600`}>
        {loading && <span className="ripple" />}
      </div>
      <div className={`percentage ${fadeOut ? "fade" : ""}`}>{percent}%</div>
    </div>
  );
};

export default PulsePreloader;
