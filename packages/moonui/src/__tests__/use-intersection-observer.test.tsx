import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../use-intersection-observer';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback, options) => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
});

beforeAll(() => {
  global.IntersectionObserver = mockIntersectionObserver;
});

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return ref and isIntersecting state', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
    expect(typeof result.current.ref).toBe('function');
  });

  it('should create IntersectionObserver with default options', () => {
    renderHook(() => useIntersectionObserver());
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
        root: null,
        rootMargin: '0%',
      }
    );
  });

  it('should create IntersectionObserver with custom options', () => {
    const options = {
      threshold: 0.5,
      root: document.body,
      rootMargin: '10px',
    };
    
    renderHook(() => useIntersectionObserver(options));
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    );
  });

  it('should observe element when ref is set', () => {
    const mockObserve = jest.fn();
    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    const { result } = renderHook(() => useIntersectionObserver());
    
    const mockElement = document.createElement('div');
    
    act(() => {
      result.current.ref(mockElement);
    });
    
    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });

  it('should call onChange when intersection state changes', () => {
    const mockOnChange = jest.fn();
    let observerCallback: any;
    
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    const { result } = renderHook(() => 
      useIntersectionObserver({ onChange: mockOnChange })
    );
    
    const mockElement = document.createElement('div');
    const mockEntry = {
      isIntersecting: true,
      target: mockElement,
    };
    
    act(() => {
      result.current.ref(mockElement);
    });
    
    act(() => {
      observerCallback([mockEntry]);
    });
    
    expect(mockOnChange).toHaveBeenCalledWith(true, mockEntry);
  });

  it('should freeze state when freezeOnceVisible is true', () => {
    let observerCallback: any;
    
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    const { result } = renderHook(() => 
      useIntersectionObserver({ freezeOnceVisible: true })
    );
    
    const mockElement = document.createElement('div');
    const mockEntry = {
      isIntersecting: true,
      target: mockElement,
    };
    
    act(() => {
      result.current.ref(mockElement);
    });
    
    // First intersection - should update
    act(() => {
      observerCallback([mockEntry]);
    });
    
    expect(result.current.isIntersecting).toBe(true);
    
    // Second intersection with false - should not update (frozen)
    act(() => {
      observerCallback([{ ...mockEntry, isIntersecting: false }]);
    });
    
    expect(result.current.isIntersecting).toBe(true);
  });

  it('should disconnect observer on unmount', () => {
    const mockDisconnect = jest.fn();
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: mockDisconnect,
    }));

    const { unmount } = renderHook(() => useIntersectionObserver());
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle initialIsIntersecting option', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ initialIsIntersecting: true })
    );
    
    expect(result.current.isIntersecting).toBe(true);
  });

  it('should not create observer when IntersectionObserver is not supported', () => {
    // Temporarily remove IntersectionObserver
    const originalIntersectionObserver = global.IntersectionObserver;
    (global as any).IntersectionObserver = undefined;
    
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
    
    // Restore IntersectionObserver
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('should handle multiple elements with useMultipleIntersectionObserver', () => {
    // This would be a separate hook, but we can test the concept
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    
    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: jest.fn(),
    }));

    const { result } = renderHook(() => useIntersectionObserver());
    
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    
    act(() => {
      result.current.ref(element1);
    });
    
    act(() => {
      result.current.ref(element2);
    });
    
    expect(mockObserve).toHaveBeenCalledWith(element2);
  });
});