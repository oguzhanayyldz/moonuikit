"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Aspect Ratio Component
 * 
 * A component that maintains a specific aspect ratio for content.
 * Particularly useful for images, videos, and media content in responsive designs.
 * Fully integrated with the theme system, accessible and customizable.
 */

const aspectRatioVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-md bg-muted/10",
        ghost: "bg-transparent",
        outline: "rounded-md border border-border",
        card: "rounded-md bg-card shadow-sm",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AspectRatioProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {
  /**
   * Aspect ratio (width/height). For example 16/9, 4/3, 1/1 etc.
   * @default 16/9
   */
  ratio?: number
}

const AspectRatio = React.forwardRef<
  HTMLDivElement,
  AspectRatioProps
>(({ className, variant, radius, ratio = 16 / 9, style, children, ...props }, ref) => (
  <div
    ref={ref} 
    className={cn("moonui-theme", aspectRatioVariants({ variant, radius }), className)}
    style={{
      position: "relative",
      paddingBottom: `${(1 / ratio) * 100}%`,
      ...style
    }}
    {...props}
  >
    <div className="absolute inset-0">
      {children}
    </div>
  </div>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio, aspectRatioVariants }
export type { AspectRatioProps }
