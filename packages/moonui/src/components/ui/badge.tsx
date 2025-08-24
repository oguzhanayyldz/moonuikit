"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Premium Badge Component
 * 
 * Durum, kategori ve etiketleme için yüksek kaliteli badge bileşeni.
 * Dark ve light modda uyumlu, erişilebilir ve çeşitli varyantlar sunar.
 */

const badgeVariants = cva(
  ["inline-flex items-center justify-center gap-1.5", 
  "font-medium transition-colors duration-200", 
  "border focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-offset-1"],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent bg-gray-900 text-white",
          "hover:bg-gray-800 dark:hover:bg-gray-700",
          "focus-visible:ring-gray-500/30 dark:focus-visible:ring-gray-400/40",
          "dark:bg-gray-700 dark:text-gray-50 dark:shadow-inner dark:shadow-gray-950/10",
        ],
        secondary: [
          "border-transparent bg-secondary text-secondary-foreground",
          "hover:bg-gray-200 dark:hover:bg-gray-600",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:bg-gray-700/50 dark:text-gray-50 dark:shadow-inner dark:shadow-gray-950/10",
        ],
        outline: [
          "border-gray-200 dark:border-gray-600",
          "bg-transparent text-foreground",
          "hover:border-gray-300 dark:hover:border-gray-500",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:text-gray-100 dark:bg-transparent dark:backdrop-blur-sm",
        ],
        destructive: [
          "border-transparent bg-error text-white",
          "hover:bg-error/90 dark:hover:bg-error/80",
          "focus-visible:ring-error/30 dark:focus-visible:ring-error/25",
          "dark:bg-error/90 dark:text-white dark:shadow-inner dark:shadow-error/10",
        ],
        success: [
          "border-transparent bg-success text-white",
          "hover:bg-success/90 dark:hover:bg-success/80",
          "focus-visible:ring-success/30 dark:focus-visible:ring-success/25",
          "dark:bg-success/90 dark:text-white dark:shadow-inner dark:shadow-success/10",
        ],
        warning: [
          "border-transparent bg-warning text-white",
          "hover:bg-warning/90 dark:hover:bg-warning/80",
          "focus-visible:ring-warning/30 dark:focus-visible:ring-warning/25",
          "dark:bg-warning/90 dark:text-gray-900 dark:shadow-inner dark:shadow-warning/10",
        ],
        ghost: [
          "border border-gray-200 bg-gray-50/50 text-gray-700",
          "hover:bg-gray-100 dark:hover:bg-gray-800/60",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
          "transition-all duration-200",
        ],
        pro: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700",
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10",
        ],
        admin: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700", 
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10",
        ],
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm",
        lg: "h-8 px-4 text-base",
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        none: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof badgeVariants>, 'variant'> {
  withDot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'ghost' | 'pro' | 'admin';
}

/**
 * Premium Badge Component
 * 
 * @param props - Badge bileşeni özellikleri
 * @param props.variant - Badgenin görsel varyantı
 * @param props.size - Badge boyutu
 * @param props.radius - Köşe yuvarlama stili
 * @param props.withDot - Başında nokta gösterimi
 * @param props.dotColor - Noktanın rengi (özel)
 * @param props.removable - Kaldırılabilir badge (X simgesi ile)
 * @param props.onRemove - Kaldırma işlevi
 * @param props.leftIcon - Badge'in solunda görüntülenecek ikon
 * @param props.rightIcon - Badge'in sağında görüntülenecek ikon
 */
function Badge({
  className,
  variant,
  size,
  radius,
  withDot,
  dotColor,
  removable,
  onRemove,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  // Auto-assign icons and content for special variants
  let autoLeftIcon = leftIcon;
  let autoChildren = children;
  
  if (variant === 'pro') {
    // Auto Sparkles icon for pro
    autoLeftIcon = leftIcon || (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
        <path d="M12 0L13.09 8.26L22 9L13.09 9.74L12 18L10.91 9.74L2 9L10.91 8.26L12 0Z" fill="currentColor"/>
        <path d="M19 5L19.5 7L21 7.5L19.5 8L19 10L18.5 8L17 7.5L18.5 7L19 5Z" fill="currentColor"/>
        <path d="M19 15L19.5 17L21 17.5L19.5 18L19 20L18.5 18L17 17.5L18.5 17L19 15Z" fill="currentColor"/>
      </svg>
    );
    autoChildren = children || 'Pro';
  }
  
  if (variant === 'admin') {
    // Auto CheckCircle icon for admin
    autoLeftIcon = leftIcon || (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
      </svg>
    );
    autoChildren = children || 'Admin Pro';
  }

  return (
    <div 
      className={cn("moonui-theme", badgeVariants({ variant, size, radius }), className)} 
      data-removable={removable ? "" : undefined}
      {...props}
    >
      {withDot && (
        <span 
          className={cn(
            "h-2 w-2 rounded-full", 
            dotColor || 
              (variant === "destructive" ? "bg-white" :
               variant === "success" ? "bg-white" :
               variant === "warning" ? "bg-white" :
               variant === "secondary" ? "bg-secondary-foreground" :
               variant === "outline" ? "bg-foreground" :
               variant === "ghost" ? "bg-foreground" :
               variant === "pro" ? "bg-white" :
               variant === "admin" ? "bg-white" :
               "bg-primary-foreground")
          )} 
          aria-hidden="true"
        />
      )}
      {autoLeftIcon && (
        <span className="inline-flex shrink-0 items-center">
          {autoLeftIcon}
        </span>
      )}
      <span className="inline-flex items-center">{autoChildren}</span>
      {rightIcon && (
        <span className="inline-flex shrink-0 items-center">
          {rightIcon}
        </span>
      )}
      {removable && onRemove && (
        <button 
          type="button"
          className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove badge"
        >
          <svg 
            width="8" 
            height="8" 
            viewBox="0 0 8 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
            aria-hidden="true"
          >
            <path d="M0.799988 7.19999L7.19999 0.799988M0.799988 0.799988L7.19999 7.19999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
