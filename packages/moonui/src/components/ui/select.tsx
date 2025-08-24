"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

/**
 * Premium Select Component
 * 
 * Advanced dropdown/select component with variants, sizes and accessibility features.
 * Compatible with dark and light mode, providing a modern user experience with smooth animations.
 */

// Directly re-exporting the Root component
const Select = SelectPrimitive.Root
Select.displayName = "Select"

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

type SelectTriggerVariant = "standard" | "outline" | "ghost" | "underline";
type SelectTriggerSize = "sm" | "md" | "lg";

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Visual variant */
  variant?: SelectTriggerVariant;
  /** Size */
  size?: SelectTriggerSize;
  /** Error state */
  error?: boolean | string;
  /** Success state */
  success?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon displayed on the left */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right (instead of default chevron) */
  rightIcon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant = "standard", size = "md", error, success, loading, leftIcon, rightIcon, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      /* Base styles */
      "flex w-full items-center justify-between gap-1 rounded-md transition-all duration-200",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      "focus-visible:outline-none",
      /* Error state */
      error && "border-error focus-visible:ring-error/30 focus-visible:border-error",
      /* Success state */
      success && "border-success focus-visible:ring-success/30 focus-visible:border-success",
      /* Size variants */
      size === "sm" && "h-8 text-xs px-2",
      size === "md" && "h-10 text-sm px-3",
      size === "lg" && "h-12 text-base px-4",
      /* Visual variants */
      variant === "standard" && "border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/50 focus-visible:border-primary dark:focus-visible:border-primary",
      variant === "outline" && "border border-gray-300 dark:border-gray-700 bg-transparent hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/50 focus-visible:border-primary dark:focus-visible:border-primary",
      variant === "ghost" && "border-none bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/50",
      variant === "underline" && "border-t-0 border-l-0 border-r-0 border-b border-gray-300 dark:border-gray-600 rounded-none px-0 hover:border-gray-400 dark:hover:border-gray-500 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary dark:focus-visible:border-primary",
      className
    )}
    {...props}
    disabled={props.disabled || loading}
    data-error={error ? true : undefined}
    data-success={success ? true : undefined}
    data-loading={loading ? true : undefined}
  >
    <div className="flex items-center flex-1 gap-2">
      {leftIcon && (
        <span className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          {leftIcon}
        </span>
      )}
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground dark:text-gray-400" />
          <span className="text-muted-foreground dark:text-gray-400">Loading...</span>
        </div>
      ) : children}
    </div>
    {!loading && (
      <SelectPrimitive.Icon asChild>
        {rightIcon ? (
          <span className="opacity-60">{rightIcon}</span>
        ) : (
          <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
        )}
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Scroll Up Button Component
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * Scroll Down Button Component
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", side = "bottom", sideOffset = 4, align = "start", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      align={align}
      avoidCollisions={false}
      className={cn(
        ["relative z-50 max-h-96 min-w-[8rem] overflow-hidden", 
        "rounded-md border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-900 text-foreground", 
        "shadow-lg dark:shadow-gray-900/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", 
        "data-[state=open]:duration-150"],
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("moonui-theme", "py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

type SelectItemVariant = "default" | "subtle" | "destructive" | "success" | "warning";
type SelectItemSize = "sm" | "md" | "lg";

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  /** Visual variant */
  variant?: SelectItemVariant;
  /** Size */
  size?: SelectItemSize;
  /** Icon displayed on the right */
  rightIcon?: React.ReactNode;
  /** Custom indicator icon (instead of default check) */
  customIndicator?: React.ReactNode;
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, variant = "default", size = "md", rightIcon, customIndicator, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      
      /* Size variants */
      size === "sm" && "py-1 pl-7 pr-2 text-xs",
      size === "md" && "py-1.5 pl-8 pr-2 text-sm",
      size === "lg" && "py-2 pl-9 pr-3 text-base",
      
      /* Color variants */
      variant === "default" && "focus:bg-accent focus:text-accent-foreground dark:focus:bg-gray-700 dark:focus:text-gray-100",
      variant === "subtle" && "focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-foreground dark:focus:text-gray-200",
      variant === "destructive" && "text-error dark:text-red-400 focus:bg-error/10 dark:focus:bg-red-900/20 focus:text-error dark:focus:text-red-300",
      variant === "success" && "text-success dark:text-green-400 focus:bg-success/10 dark:focus:bg-green-900/20 focus:text-success dark:focus:text-green-300",
      variant === "warning" && "text-warning dark:text-yellow-400 focus:bg-warning/10 dark:focus:bg-yellow-900/20 focus:text-warning dark:focus:text-yellow-300",
      
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        {customIndicator || <Check className="h-4 w-4" />}
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    
    {rightIcon && (
      <span className="ml-auto pl-2 opacity-70">
        {rightIcon}
      </span>
    )}
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("moonui-theme", "-mx-1 my-1 h-px bg-muted dark:bg-gray-700", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
