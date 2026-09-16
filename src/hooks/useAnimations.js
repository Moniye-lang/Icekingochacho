import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all .reveal / .reveal-left / .reveal-right
 * elements inside the given root (defaults to document).
 * Call this hook once in App or a layout component.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Adds a subtle pulse animation class to the audio play button
 * whenever isPlaying changes.
 */
export function usePlayButtonClass(isPlaying) {
  useEffect(() => {
    const btn = document.getElementById('dockPlayBtn');
    if (!btn) return;
    if (isPlaying) {
      btn.classList.add('playing');
    } else {
      btn.classList.remove('playing');
    }
  }, [isPlaying]);
}
