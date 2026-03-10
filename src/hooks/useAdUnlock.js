import { useState, useEffect } from "react";

const AD_DURATION = 30; // seconds

/**
 * useAdUnlock
 * Manages the 30-second ad watch gate before exam access.
 */
export function useAdUnlock() {
  const [status, setStatus]   = useState("idle"); // idle | watching | done
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);

  useEffect(() => {
    if (status !== "watching") return;
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(id); setStatus("done"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  const startAd = () => {
    setTimeLeft(AD_DURATION);
    setStatus("watching");
  };

  const reset = () => {
    setStatus("idle");
    setTimeLeft(AD_DURATION);
  };

  return { status, timeLeft, startAd, reset, isUnlocked: status === "done" };
}
