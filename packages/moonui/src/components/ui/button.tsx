"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

/**
 * Premium Button Component
 * 
 * A world-class, accessible, and versatile button component.
 * Pixel-perfect design with extensive variants and states.
 */
const buttonVariants = cva(
  ["inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "font-medium relative",
  "transition-all duration-200 ease-out",
  "transform active:scale-[0.98]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none"],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "dark:bg-primary dark:text-primary-foreground",
          "hover:bg-primary/90 dark:hover:bg-primary/90",
          "active:bg-primary/80 dark:active:bg-primary/80",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        secondary: [
          "bg-gray-100 text-gray-900",
          "dark:bg-gray-800 dark:text-gray-100",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "active:bg-gray-300 dark:active:bg-gray-600",
          "border border-gray-200 dark:border-gray-700",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "shadow-sm hover:shadow-md",
        ],
        outline: [
          "bg-background text-foreground",
          "dark:bg-background dark:text-foreground",
          "border border-input dark:border-input",
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
          "active:bg-accent/80 dark:active:bg-accent/80",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        ghost: [
          "text-gray-700",
          "dark:text-gray-300",
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          "active:bg-gray-200 dark:active:bg-gray-700",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "dark:bg-destructive dark:text-destructive-foreground",
          "hover:bg-destructive/90 dark:hover:bg-destructive/90",
          "active:bg-destructive/80 dark:active:bg-destructive/80",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        success: [
          "bg-success text-success-foreground",
          "dark:bg-success dark:text-success-foreground",
          "hover:bg-success/90 dark:hover:bg-success/90",
          "active:bg-success/80 dark:active:bg-success/80",
          "shadow-sm hover:shadow-md", 
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        link: [
          "text-primary bg-transparent",
          "underline-offset-4 hover:underline",
          "hover:text-primary/80 active:text-primary/70",
          "p-0 h-auto",
          "transition-colors duration-200",
        ],
        gradient: [
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          "hover:from-purple-600 hover:to-pink-600",
          "active:from-purple-700 active:to-pink-700",
          "shadow-xl shadow-purple-500/40",
          "hover:shadow-2xl hover:shadow-purple-500/50",
          "focus-visible:ring-purple-500/50",
          "transition-all duration-300",
        ],
        glow: [
          "bg-blue-500 text-white",
          "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
          "hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]",
          "active:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
          "hover:bg-blue-600",
          "focus-visible:ring-blue-500/50",
          "transition-all duration-300",
        ],
        soft: [
          "bg-primary/10 text-primary",
          "hover:bg-primary/20",
          "active:bg-primary/30",
          "focus-visible:ring-primary/50",
          "dark:bg-primary/20 dark:text-primary-foreground",
          "dark:hover:bg-primary/30 dark:active:bg-primary/40",
          "transition-colors duration-200",
        ],
        glass: [
          "bg-white/10 backdrop-blur-md text-foreground",
          "border border-white/20",
          "hover:bg-white/20 hover:border-white/30",
          "active:bg-white/30",
          "shadow-lg",
          "focus-visible:ring-white/50",
          "dark:bg-gray-800/10 dark:border-gray-700/20",
          "dark:hover:bg-gray-800/20 dark:hover:border-gray-700/30",
          "transition-all duration-200",
        ],
        neon: [
          "bg-transparent text-green-400",
          "border-2 border-green-400",
          "hover:bg-green-400 hover:text-gray-900",
          "hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]",
          "active:shadow-[0_0_15px_rgba(74,222,128,0.4)]",
          "focus-visible:ring-green-400/50",
          "transition-all duration-300",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
        "icon-lg": "h-12 w-12 p-3",
      },
      rounded: {
        default: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
        sm: "rounded-lg",
        lg: "rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "default",
      fullWidth: false,
    },
  }
);

// Button component props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Premium Button Component
 * 
 * @param props - Button component properties
 * @param props.variant - Visual variant (primary, secondary, ghost, etc.)
 * @param props.size - Button size (xs, sm, md, lg, xl)
 * @param props.loading - Loading state display
 * @param props.leftIcon - Icon on the left side
 * @param props.rightIcon - Icon on the right side
 * @param props.fullWidth - Full width display
 * @param props.rounded - Corner rounding style (default, full, none)
 * @param props.asChild - For Radix UI polymorphic component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded, 
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    // Radix UI'ın asChild pattern'i için - "as" prop yerine
    const Comp = asChild ? "button" : "button";
    
    return (
      <Comp
        className={cn("moonui-theme", buttonVariants({ variant, size, rounded, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        data-loading={loading ? "" : undefined}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
