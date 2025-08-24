// MoonUI Micro-interactions System
// Provides consistent hover, focus, and active states across all components

import { cva, type VariantProps } from "class-variance-authority";

/**
 * Micro-interaction variants for consistent component behavior
 */
export const microInteractionVariants = cva("", {
  variants: {
    hover: {
      lift: [
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5",
        "hover:shadow-md",
      ],
      glow: [
        "transition-all duration-300 ease-out",
        "hover:shadow-lg",
        "hover:shadow-primary/20",
      ],
      scale: [
        "transition-transform duration-200 ease-out",
        "hover:scale-105",
        "active:scale-95",
      ],
      brightness: [
        "transition-all duration-200 ease-out",
        "hover:brightness-110",
        "active:brightness-95",
      ],
      border: [
        "transition-all duration-200 ease-out",
        "hover:border-primary/50",
      ],
    },
    focus: {
      ring: [
        "focus:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary/50",
        "focus-visible:ring-offset-2",
      ],
      glow: [
        "focus:outline-none",
        "focus-visible:shadow-lg",
        "focus-visible:shadow-primary/30",
      ],
      border: [
        "focus:outline-none",
        "focus-visible:border-primary",
        "focus-visible:border-2",
      ],
    },
    active: {
      scale: [
        "active:scale-95",
        "transition-transform duration-100",
      ],
      darken: [
        "active:brightness-90",
        "transition-all duration-100",
      ],
      depress: [
        "active:translate-y-0.5",
        "active:shadow-sm",
        "transition-all duration-100",
      ],
    },
    cursor: {
      pointer: "cursor-pointer",
      grab: "cursor-grab active:cursor-grabbing",
      text: "cursor-text",
      wait: "cursor-wait",
      help: "cursor-help",
      notAllowed: "cursor-not-allowed",
    },
  },
  defaultVariants: {
    hover: "lift",
    focus: "ring",
    active: "scale",
    cursor: "pointer",
  },
});

/**
 * Spring animation configurations
 */
export const springAnimations = {
  // Smooth spring for general use
  smooth: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  // Bouncy spring for playful interactions
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 15,
  },
  // Stiff spring for quick responses
  stiff: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
  // Gentle spring for subtle movements
  gentle: {
    type: "spring",
    stiffness: 150,
    damping: 15,
  },
};

/**
 * Hover animation presets
 */
export const hoverAnimations = {
  lift: {
    y: -2,
    transition: springAnimations.smooth,
  },
  scale: {
    scale: 1.05,
    transition: springAnimations.smooth,
  },
  glow: {
    boxShadow: "0 0 20px rgba(var(--primary), 0.3)",
    transition: springAnimations.smooth,
  },
  rotate: {
    rotate: 2,
    transition: springAnimations.bouncy,
  },
};

/**
 * Tap/Click animation presets
 */
export const tapAnimations = {
  scale: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  depress: {
    y: 1,
    transition: { duration: 0.1 },
  },
};

/**
 * Focus animation presets
 */
export const focusAnimations = {
  ring: {
    boxShadow: "0 0 0 2px var(--background), 0 0 0 4px var(--primary)",
    transition: springAnimations.smooth,
  },
  glow: {
    boxShadow: "0 0 0 3px rgba(var(--primary), 0.3)",
    transition: springAnimations.smooth,
  },
};

/**
 * Stagger animation for lists
 */
export const staggerAnimation = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: springAnimations.smooth,
    },
  },
};

/**
 * Page transition animations
 */
export const pageTransitions = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: springAnimations.smooth,
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: springAnimations.smooth,
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: springAnimations.smooth,
  },
};

/**
 * Skeleton loading animation
 */
export const skeletonAnimation = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

/**
 * Tooltip animation
 */
export const tooltipAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15 },
};

/**
 * Notification animation
 */
export const notificationAnimation = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  transition: springAnimations.bouncy,
};

export type MicroInteractionProps = VariantProps<typeof microInteractionVariants>;

