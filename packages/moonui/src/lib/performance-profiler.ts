export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

export interface PerformanceSummary {
  totalRenderTime: number;
  componentCount: number;
  averageRenderTime: number;
  slowestComponent: string | null;
  memoryUsage?: number;
}

class PerformanceProfiler {
  private measurements: Map<string, PerformanceMetric[]> = new Map();

  startMeasurement(category: string, name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.measurements.has(category)) {
        this.measurements.set(category, []);
      }
      
      this.measurements.get(category)!.push({
        name,
        duration,
        timestamp: Date.now()
      });
    };
  }

  getMeasurements(category: string): PerformanceMetric[] {
    return this.measurements.get(category) || [];
  }

  getPerformanceSummary(): PerformanceSummary {
    const componentMetrics = this.getMeasurements('component');
    
    if (componentMetrics.length === 0) {
      return {
        totalRenderTime: 0,
        componentCount: 0,
        averageRenderTime: 0,
        slowestComponent: null
      };
    }

    const totalRenderTime = componentMetrics.reduce((sum, m) => sum + m.duration, 0);
    const slowestComponent = componentMetrics.reduce((max, m) => 
      m.duration > (max?.duration || 0) ? m : max, componentMetrics[0]);

    return {
      totalRenderTime,
      componentCount: componentMetrics.length,
      averageRenderTime: totalRenderTime / componentMetrics.length,
      slowestComponent: slowestComponent.name,
      memoryUsage: (performance as any).memory?.usedJSHeapSize
    };
  }

  clearMeasurements(category?: string): void {
    if (category) {
      this.measurements.delete(category);
    } else {
      this.measurements.clear();
    }
  }

  measureComponent(componentName: string): () => void {
    return this.startMeasurement('component', componentName);
  }
}

export const performanceProfiler = new PerformanceProfiler();