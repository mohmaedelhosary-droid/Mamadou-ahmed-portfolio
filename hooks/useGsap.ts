'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap(callback: () => (() => void) | void, deps: React.DependencyList = []) {
  useEffect(() => {
    const cleanup = callback();
    return () => {
      if (cleanup) cleanup();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
