import { useEffect, useState } from "react";

/**
 * iOS/Safari-safe keyboard offset.
 * Returns px to lift a bottom dock so it sits above the keyboard.
 */
export default function useKeyboardOffset(enabled = true) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const vv = window.visualViewport;
    if (!vv) return;

    const compute = () => {
      // Keyboard height approximation:
      // layout viewport height - visual viewport height - visual viewport offsetTop
      const keyboard =
        Math.max(0, window.innerHeight - vv.height - vv.offsetTop);

      // Avoid tiny jitter values (Safari sometimes reports 1-2px noise)
      setOffset(keyboard < 8 ? 0 : Math.round(keyboard));
    };

    compute();

    vv.addEventListener("resize", compute);
    vv.addEventListener("scroll", compute);
    window.addEventListener("orientationchange", compute);

    return () => {
      vv.removeEventListener("resize", compute);
      vv.removeEventListener("scroll", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [enabled]);

  return offset;
}