import { useRef } from 'react';

/** Anchor for reveal animations. Each Reveal observes itself. */
export function useReveal(): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  return ref;
}
