"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-500 text-white border-green-600",
        warning: "bg-yellow-500 text-white border-yellow-600",
        destructive: "bg-destructive text-destructive-foreground",
        info: "bg-blue-500 text-white border-blue-600",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("moonui-theme", "fill-current", className)}
    {...props}
  />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, size, showArrow = false, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn("moonui-theme", tooltipVariants({ variant, size }), className)}
    {...props}
  >
    {props.children}
    {showArrow && <TooltipArrow />}
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simplified Tooltip component for easy usage
export interface SimpleTooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  variant?: TooltipContentProps["variant"]
  size?: TooltipContentProps["size"]
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  sideOffset?: number
  showArrow?: boolean
  className?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const SimpleTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  SimpleTooltipProps
>(
  (
    {
      children,
      content,
      variant = "default",
      size = "md",
      side = "top",
      align = "center",
      delayDuration = 400,
      sideOffset = 4,
      showArrow = false,
      className,
      open,
      defaultOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    return (
      <Tooltip
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          ref={ref}
          side={side}
          align={align}
          variant={variant}
          size={size}
          sideOffset={sideOffset}
          showArrow={showArrow}
          className={className}
          {...props}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    )
  }
)
SimpleTooltip.displayName = "SimpleTooltip"

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  SimpleTooltip,
  tooltipVariants,
}