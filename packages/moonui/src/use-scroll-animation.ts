'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useScroll, useTransform } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: options.threshold || 0.1,
    once: options.triggerOnce ?? true,
  } as any)

  return { ref, isInView }
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}

export function useScrollBasedAnimation() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  return { y, opacity, scale, scrollY }
}

export function useParallaxScroll(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])
  
  return { ref, y }
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollDirection = () => {
      const newScrollY = window.scrollY

      if (Math.abs(newScrollY - scrollY) < 5) {
        ticking = false
        return
      }

      setScrollDirection(newScrollY > scrollY ? 'down' : 'up')
      setScrollY(newScrollY)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  return { scrollDirection, scrollY }
}

export function useScrollToElement() {
  const scrollToElement = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return { scrollToElement }
}

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: options.threshold || 0.1,
  } as any)

  useEffect(() => {
    if (isInView) {
      callback()
    }
  }, [isInView, callback])

  return ref
}

export function useScrollBasedScale() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return { ref, scale, opacity }
}

export function useScrollBasedRotation() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  return { ref, rotate }
}

export function useScrollTriggeredCounter(
  endValue: number,
  duration: number = 2000
) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  const isInView = useInView(ref, {
    amount: 0.5,
    once: true
  })

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
      let startTime: number
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * endValue))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, endValue, duration, isVisible])

  return { ref, count }
}

export function useScrollBasedBlur() {
  const { scrollY } = useScroll()
  const blur = useTransform(scrollY, [0, 300], [0, 10])
  
  return blur
}

export function useScrollSnapPoints(snapPoints: number[]) {
  const [currentSnap, setCurrentSnap] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const closest = snapPoints.reduce((prev, curr, index) => {
        return Math.abs(curr - scrollPosition) < Math.abs(snapPoints[prev] - scrollPosition) 
          ? index 
          : prev
      }, 0)
      setCurrentSnap(closest)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [snapPoints])

  const scrollToSnap = (index: number) => {
    if (index >= 0 && index < snapPoints.length) {
      window.scrollTo({
        top: snapPoints[index],
        behavior: 'smooth'
      })
    }
  }

  return { currentSnap, scrollToSnap }
}