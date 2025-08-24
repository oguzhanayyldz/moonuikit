"use client";

import * as React from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange,
}: UseIntersectionObserverOptions = {}) {
  const [ref, setRef] = React.useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(initialIsIntersecting);
  const frozen = React.useRef(false);

  React.useEffect(() => {
    if (!ref || !window.IntersectionObserver || (frozen.current && freezeOnceVisible)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        onChange?.(isElementIntersecting, entry);

        if (isElementIntersecting && freezeOnceVisible) {
          frozen.current = true;
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, onChange]);

  return { ref: setRef, isIntersecting };
}

// Lazy load component wrapper
interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function LazyLoad({
  children,
  placeholder = <div className="h-20 bg-muted animate-pulse rounded" />,
  threshold = 0.1,
  rootMargin = "50px",
  className,
}: LazyLoadProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : placeholder}
    </div>
  );
}

// Image lazy loading hook
export function useLazyImageLoading(
  imageSrc: string,
  options?: UseIntersectionObserverOptions
) {
  const [src, setSrc] = React.useState<string | undefined>(undefined);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.01,
    rootMargin: "50px",
    ...options,
  });

  React.useEffect(() => {
    if (isIntersecting && imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => setSrc(imageSrc);
    }
  }, [isIntersecting, imageSrc]);

  return { ref, src, isLoaded: !!src };
}

// Viewport visibility hook
export function useIsInViewport(options?: UseIntersectionObserverOptions) {
  return useIntersectionObserver(options);
}

// Multiple elements observer
export function useMultipleIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [elements, setElements] = React.useState<Map<Element, boolean>>(new Map());
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (!window.IntersectionObserver) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        setElements((prev) => {
          const next = new Map(prev);
          entries.forEach((entry) => {
            next.set(entry.target, entry.isIntersecting);
          });
          return next;
        });
      },
      {
        threshold: options.threshold || 0,
        root: options.root || null,
        rootMargin: options.rootMargin || "0%",
      }
    );

    return () => observer.current?.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  const observe = React.useCallback((element: Element | null) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  }, []);

  const unobserve = React.useCallback((element: Element | null) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
      setElements((prev) => {
        const next = new Map(prev);
        next.delete(element);
        return next;
      });
    }
  }, []);

  return { observe, unobserve, elements };
}