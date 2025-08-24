import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../use-local-storage'

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
    jest.clearAllMocks()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('initial')
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key')
  })

  it('returns stored value from localStorage', () => {
    mockLocalStorage.setItem('test-key', JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('stored-value')
  })

  it('stores value in localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(result.current[0]).toBe('new-value')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
  })

  it('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10))
    
    act(() => {
      result.current[1]((prev) => prev + 5)
    })
    
    expect(result.current[0]).toBe(15)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(15))
  })

  it('handles complex objects', () => {
    const initialObject = { name: 'test', count: 0 }
    const { result } = renderHook(() => useLocalStorage('object-key', initialObject))
    
    const newObject = { name: 'updated', count: 5 }
    
    act(() => {
      result.current[1](newObject)
    })
    
    expect(result.current[0]).toEqual(newObject)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('object-key', JSON.stringify(newObject))
  })

  it('handles localStorage errors gracefully', () => {
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    // Should still update the state even if localStorage fails
    expect(result.current[0]).toBe('new-value')
    expect(consoleSpy).toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  it('handles malformed JSON in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json{')
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    // Should fall back to initial value when JSON parsing fails
    expect(result.current[0]).toBe('initial')
    expect(consoleSpy).toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  it('removes item from localStorage when value is undefined', () => {
    mockLocalStorage.setItem('test-key', JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1](undefined)
    })
    
    expect(result.current[0]).toBeUndefined()
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key')
  })

  it('handles boolean values correctly', () => {
    const { result } = renderHook(() => useLocalStorage('bool-key', false))
    
    act(() => {
      result.current[1](true)
    })
    
    expect(result.current[0]).toBe(true)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('bool-key', JSON.stringify(true))
  })

  it('handles null values correctly', () => {
    const { result } = renderHook(() => useLocalStorage('null-key', null))
    
    act(() => {
      result.current[1]('not-null')
    })
    
    expect(result.current[0]).toBe('not-null')
    
    act(() => {
      result.current[1](null)
    })
    
    expect(result.current[0]).toBe(null)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('null-key', JSON.stringify(null))
  })

  it('maintains state consistency across multiple hook instances with same key', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('shared-key', 'initial'))
    const { result: result2 } = renderHook(() => useLocalStorage('shared-key', 'initial'))
    
    act(() => {
      result1.current[1]('updated')
    })
    
    // Both instances should have the same value
    expect(result1.current[0]).toBe('updated')
    expect(result2.current[0]).toBe('updated')
  })
})