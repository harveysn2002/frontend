"use client";

import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH = 640;
const MIN_KEYBOARD_HEIGHT = 80;

/**
 * Height hidden by the on-screen keyboard on mobile.
 * `dvh` alone is unreliable on iOS Safari, so fixed bars need the visual viewport.
 */
export function useKeyboardInset(active: boolean) {
  const [state, setState] = useState({ inset: 0, viewportHeight: 0 });

  useEffect(() => {
    if (!active) {
      setState({ inset: 0, viewportHeight: 0 });
      return;
    }

    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      if (window.innerWidth > MOBILE_MAX_WIDTH) {
        setState({ inset: 0, viewportHeight: 0 });
        return;
      }
      const covered = window.innerHeight - viewport.height - viewport.offsetTop;
      setState({
        inset: covered > MIN_KEYBOARD_HEIGHT ? Math.round(covered) : 0,
        viewportHeight: Math.round(viewport.height),
      });
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    window.addEventListener("orientationchange", update);

    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [active]);

  return state;
}
