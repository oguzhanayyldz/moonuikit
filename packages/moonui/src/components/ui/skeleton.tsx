"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { skeletonAnimation } from "../../lib/micro-interactions";

/**
 * Skeleton Component
 *
 * A loading placeholder that mimics the structure of content.
 * Fully integrated with the theme system and provides various shapes, sizes, and animations.
 */

const skeletonVariants = cva(
  "animate-pulse rounded-md",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/10",
        secondary: "bg-secondary/10",
        accent: "bg-accent",
      },
      size: {
        default: "",
        sm: "scale-90",
        lg: "scale-110",
      },
      shape: {
        rect: "rounded-md",
        circle: "rounded-full",
        pill: "rounded-full",
      },
      animation: {
        pulse: "animate-pulse",
        wave: "overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent dark:after:via-white/5",
        none: "animate-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rect",
      animation: "pulse",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Whether the content is loaded
   */
  isLoaded?: boolean;
  /**
   * Content to show when loaded
   */
  children?: React.ReactNode;
  /**
   * Fade-in animation duration in ms
   */
  fadeInDuration?: number;
  /**
   * Use motion animation for loading state
   */
  motion?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className,
    variant,
    size,
    shape,
    animation,
    height,
    width,
    isLoaded = false,
    children,
    fadeInDuration = 400,
    motion: useMotion = false,
    style,
    ...props 
  }, ref) => {
    // Filter out HTML event handlers that conflict with Framer Motion
    const { 
      onDrag, 
      onDragEnd, 
      onDragStart,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...filteredProps 
    } = props;
    
    // Show content when loaded
    if (isLoaded && children) {
      if (useMotion) {
        return (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: fadeInDuration / 1000 }}
            className={cn("moonui-theme", className)}
            style={{
              height,
              width,
              ...style,
            }}
            {...filteredProps}
          >
            {children}
          </motion.div>
        );
      }
      
      return (
        <div
          ref={ref}
          className={cn("moonui-theme", "animate-fade-in", className)}
          style={{
            animationDuration: `${fadeInDuration}ms`,
            height,
            width,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    const SkeletonElement = useMotion ? motion.div : "div";
    
    return (
      <SkeletonElement
        ref={ref}
        className={cn(
          "moonui-theme",
          skeletonVariants({ variant, size, shape, animation }),
          "relative isolate",
          className
        )}
        style={{
          height,
          width,
          ...style,
        }}
        {...(useMotion ? skeletonAnimation : {})}
        {...filteredProps}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

/**
 * Text Skeleton Component
 * 
 * Creates skeleton loading states for text content
 */
export interface SkeletonTextProps extends Omit<SkeletonProps, "children" | "isLoaded"> {
  /**
   * Kaç satır gösterileceği
   */
  lines?: number;
  /**
   * Satır yüksekliği
   */
  lineHeight?: string | number;
  /**
   * Satırlar arası boşluk
   */
  spacing?: string | number;
  /**
   * Son satırın genişlik yüzdesi (0-100)
   */
  lastLineWidth?: number;
  /**
   * Rastgele satır genişlikleri
   */
  randomWidths?: boolean;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ 
    className,
    lines = 3,
    lineHeight = "0.85rem",
    spacing = "0.5rem",
    lastLineWidth = 80,
    randomWidths = false,
    variant = "default",
    animation = "pulse",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("moonui-theme", "flex flex-col", className)}
        style={{ gap: spacing }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => {
          const isLastLine = i === lines - 1;
          // Use deterministic widths based on line index for SSR compatibility
          const widthPercentage = isLastLine
            ? lastLineWidth
            : randomWidths
            ? 85 + (i % 3) * 5 // Creates a pattern: 85%, 90%, 95%, 85%, ...
            : 100;

          return (
            <Skeleton
              key={i}
              variant={variant}
              animation={animation}
              className="w-full"
              style={{
                height: lineHeight,
                width: `${widthPercentage}%`,
              }}
            />
          );
        })}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

/**
 * Avatar Skeleton Component
 */
export interface SkeletonAvatarProps extends Omit<SkeletonProps, "shape" | "size"> {
  /**
   * Avatar boyutu (piksel)
   */
  size?: string | number;
}

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ 
    className,
    size = "2.5rem",
    variant = "default",
    animation = "pulse",
    ...props 
  }, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant={variant}
        animation={animation}
        shape="circle"
        className={cn("moonui-theme", "shrink-0", className)}
        style={{
          height: size,
          width: size,
        }}
        {...props}
      />
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";

/**
 * Card Skeleton Component
 */
export interface SkeletonCardProps extends Omit<SkeletonProps, "children" | "isLoaded"> {
  /**
   * Kart başlığının gösterilip gösterilmeyeceği
   */
  showHeader?: boolean;
  /**
   * İçerik satır sayısı
   */
  contentLines?: number;
  /**
   * Alt bilgi gösterilip gösterilmeyeceği
   */
  showFooter?: boolean;
}

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ 
    className,
    showHeader = true,
    contentLines = 3,
    showFooter = true,
    variant = "default",
    animation = "pulse",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-md border border-border bg-background p-4",
          className
        )}
        {...props}
      >
        {showHeader && (
          <div className="mb-4 flex items-center gap-4">
            <SkeletonAvatar size="2.5rem" variant={variant} animation={animation} />
            <div className="flex-1">
              <Skeleton 
                variant={variant} 
                animation={animation} 
                className="mb-2 h-4 w-1/3" 
              />
              <Skeleton 
                variant={variant} 
                animation={animation} 
                className="h-3 w-1/4" 
              />
            </div>
          </div>
        )}
        
        <SkeletonText 
          lines={contentLines} 
          variant={variant} 
          animation={animation} 
          className="mb-4" 
        />
        
        {showFooter && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <Skeleton 
              variant={variant} 
              animation={animation} 
              className="h-4 w-1/4" 
            />
            <Skeleton 
              variant={variant} 
              animation={animation} 
              className="h-4 w-1/5" 
            />
          </div>
        )}
      </div>
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";

export { skeletonVariants };
