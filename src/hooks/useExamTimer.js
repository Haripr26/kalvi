import { useState, useEffect, useRef } from "react";

/**
 * useExamTimer
 * @param {number} initialSeconds  - total seconds for the exam
 * @param {Function} onExpire      - callback when timer hits zero
 */
export function useExamTimer(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning]   = useState(true);
  const expiredRef               = useRef(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id);
          if (!expiredRef.current) { expiredRef.current = true; onExpire?.(); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const pause  = () => setRunning(false);
  const resume = () => setRunning(true);
  const stop   = () => { setRunning(false); setTimeLeft(0); };

  const format = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`
      : `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  const isUrgent = timeLeft < 300; // < 5 minutes

  return { timeLeft, formatted: format(timeLeft), isUrgent, pause, resume, stop };
}
