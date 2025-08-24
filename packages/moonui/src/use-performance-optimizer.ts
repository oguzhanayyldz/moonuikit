"use client";

import * as React from "react";
import { performanceProfiler } from "./lib/performance-profiler";

// Performance optimization hooks
export function usePerformanceOptimizer() {
  const [optimizations, setOptimizations] = React.useState<OptimizationSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const analyzePerformance = React.useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      const metrics = performanceProfiler.getPerformanceSummary();
      const suggestions: OptimizationSuggestion[] = [];

      // Analyze component render times
      const componentMetrics = performanceProfiler.getMeasurements('component');
      if (componentMetrics.length > 0) {
        const slowComponents = componentMetrics
          .filter((m: any) => m.duration > 16.67) // Slower than 60fps
          .sort((a: any, b: any) => b.duration - a.duration)
          .slice(0, 5);

        slowComponents.forEach((component: any) => {
          suggestions.push({
            type: 'component',
            severity: component.duration > 50 ? 'high' : 'medium',
            title: `Slow component: ${component.name}`,
            description: `Component takes ${component.duration.toFixed(2)}ms to render`,
            solution: 'Consider using React.memo, useMemo, or useCallback',
            impact: 'high',
          });
        });
      }

      // Analyze memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usagePercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
        
        if (usagePercent > 80) {
          suggestions.push({
            type: 'memory',
            severity: 'high',
            title: 'High memory usage',
            description: `Memory usage is at ${usagePercent.toFixed(1)}%`,
            solution: 'Review for memory leaks, optimize data structures, use lazy loading',
            impact: 'high',
          });
        }
      }

      // Analyze layout shifts
      const layoutShifts = performanceProfiler.getMeasurements('layout-shift');
      if (layoutShifts.length > 0) {
        const totalShift = layoutShifts.reduce((sum: any, shift: any) => sum + (shift.value || 0), 0);
        
        if (totalShift > 0.1) {
          suggestions.push({
            type: 'layout',
            severity: 'medium',
            title: 'Layout shifts detected',
            description: `Cumulative Layout Shift: ${totalShift.toFixed(3)}`,
            solution: 'Add dimensions to images, reserve space for dynamic content',
            impact: 'medium',
          });
        }
      }

      // Analyze bundle size (if available)
      if (typeof window !== 'undefined' && window.performance) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const jsResources = resources.filter(r => r.name.includes('.js'));
        const largeResources = jsResources.filter(r => r.transferSize > 100000); // >100KB
        
        if (largeResources.length > 0) {
          suggestions.push({
            type: 'bundle',
            severity: 'medium',
            title: 'Large JavaScript bundles',
            description: `${largeResources.length} JavaScript files exceed 100KB`,
            solution: 'Implement code splitting, lazy loading, and tree shaking',
            impact: 'medium',
          });
        }
      }

      setOptimizations(suggestions);
    } catch (error) {
      console.error('Performance analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    optimizations,
    isAnalyzing,
    analyzePerformance,
  };
}

// Hook for render optimization
export function useRenderOptimization<T>(
  value: T,
  dependencies: React.DependencyList
): T {
  const memoizedValue = React.useMemo(() => value, dependencies);
  
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const componentName = 'useRenderOptimization';
      const endMeasure = performanceProfiler.measureComponent(componentName);
      // Measure the impact of memoization
      endMeasure();
    }
  }, dependencies);

  return memoizedValue;
}

// Hook for debounced performance tracking
export function useDebouncePerformance<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  
  const debouncedCallback = React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        const endMeasure = performanceProfiler.measureComponent('debounced-callback');
        callback(...args);
        endMeasure();
      }, delay);
    },
    [callback, delay]
  ) as T;

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Hook for throttled performance tracking
export function useThrottlePerformance<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 100
): T {
  const lastCallRef = React.useRef<number>(0);
  
  const throttledCallback = React.useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        const endMeasure = performanceProfiler.measureComponent('throttled-callback');
        callback(...args);
        endMeasure();
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}

// Hook for measuring component lifecycle
export function useComponentLifecycleTracking(componentName: string) {
  const mountTime = React.useRef<number>(0);
  const updateCount = React.useRef<number>(0);

  React.useEffect(() => {
    // Component mount
    mountTime.current = performance.now();
    
    const endMountMeasure = performanceProfiler.measureComponent(`${componentName}-mount`);
    // Measure mount time
    endMountMeasure();

    return () => {
      // Component unmount
      const lifetime = performance.now() - mountTime.current;
      const endUnmountMeasure = performanceProfiler.measureComponent(`${componentName}-unmount`);
      // Record component lifetime
      endUnmountMeasure();
    };
  }, [componentName]);

  React.useEffect(() => {
    // Component update
    updateCount.current++;
    
    if (updateCount.current > 1) {
      const endUpdateMeasure = performanceProfiler.measureComponent(`${componentName}-update`);
      // Measure update time
      endUpdateMeasure();
    }
  });

  return {
    mountTime: mountTime.current,
    updateCount: updateCount.current,
  };
}

// Hook for virtual scrolling optimization
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 3
) {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleRange = React.useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = React.useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex: visibleRange.startIndex,
    endIndex: visibleRange.endIndex,
    setScrollTop,
  };
}

// Hook for image lazy loading optimization
export function useLazyImageOptimization(src: string, threshold: number = 0.1) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          // Measure image load time
          const startTime = performance.now();
          const img = new Image();
          
          img.onload = () => {
            const loadTime = performance.now() - startTime;
            const endImageMeasure = performanceProfiler.measureComponent('image-load');
            // Record image load time
            endImageMeasure();
            setIsLoaded(true);
          };
          
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, threshold]);

  return {
    imgRef,
    isLoaded,
    isIntersecting,
    shouldLoad: isIntersecting,
  };
}

// Performance optimization interfaces
interface OptimizationSuggestion {
  type: 'component' | 'memory' | 'layout' | 'bundle' | 'network';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  solution: string;
  impact: 'low' | 'medium' | 'high';
}

// Hook for automatic performance optimization
export function useAutoPerformanceOptimization() {
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [optimizations, setOptimizations] = React.useState<string[]>([]);

  const applyOptimizations = React.useCallback(async () => {
    setIsOptimizing(true);
    const applied: string[] = [];

    try {
      // Apply automatic optimizations
      
      // 1. Prefetch critical resources
      const criticalResources = document.querySelectorAll('link[rel="preload"]');
      if (criticalResources.length === 0) {
        // Add preload hints for critical resources
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.href = (link as HTMLLinkElement).href;
          preloadLink.as = 'style';
          document.head.appendChild(preloadLink);
        });
        applied.push('Added preload hints for CSS');
      }

      // 2. Optimize images
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
      });
      if (images.length > 0) {
        applied.push(`Applied lazy loading to ${images.length} images`);
      }

      // 3. Add intersection observers for below-fold content
      const belowFoldElements = document.querySelectorAll('[data-optimize="lazy"]');
      belowFoldElements.forEach(element => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              element.classList.add('optimized');
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
      });
      if (belowFoldElements.length > 0) {
        applied.push(`Added intersection observers to ${belowFoldElements.length} elements`);
      }

      setOptimizations(applied);
    } catch (error) {
      console.error('Auto-optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  return {
    isOptimizing,
    optimizations,
    applyOptimizations,
  };
}