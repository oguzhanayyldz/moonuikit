"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
      variant: {
        default: "bg-border",
        dashed: "border-dashed border-border bg-transparent",
        dotted: "border-dotted border-border bg-transparent",
        gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        variant: "dashed",
        className: "border-t h-0",
      },
      {
        orientation: "vertical",
        variant: "dashed",
        className: "border-l w-0",
      },
      {
        orientation: "horizontal",
        variant: "dotted",
        className: "border-t h-0",
      },
      {
        orientation: "vertical",
        variant: "dotted",
        className: "border-l w-0",
      },
      {
        orientation: "horizontal",
        size: "sm",
        variant: ["dashed", "dotted"],
        className: "border-t-[0.5px]",
      },
      {
        orientation: "horizontal",
        size: "lg",
        variant: ["dashed", "dotted"],
        className: "border-t-2",
      },
      {
        orientation: "vertical",
        size: "sm",
        variant: ["dashed", "dotted"],
        className: "border-l-[0.5px]",
      },
      {
        orientation: "vertical",
        size: "lg",
        variant: ["dashed", "dotted"],
        className: "border-l-2",
      },
      {
        orientation: "horizontal",
        size: "sm",
        variant: ["default", "gradient"],
        className: "h-[0.5px]",
      },
      {
        orientation: "horizontal",
        size: "lg",
        variant: ["default", "gradient"],
        className: "h-[2px]",
      },
      {
        orientation: "vertical",
        size: "sm",
        variant: ["default", "gradient"],
        className: "w-[0.5px]",
      },
      {
        orientation: "vertical",
        size: "lg",
        variant: ["default", "gradient"],
        className: "w-[2px]",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "md",
    },
  }
)

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, keyof VariantProps<typeof separatorVariants>>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      variant = "default",
      size = "md",
      decorative = true, 
      ...props 
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation || undefined}
      className={cn(
        separatorVariants({ orientation, variant, size }),
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, separatorVariants }