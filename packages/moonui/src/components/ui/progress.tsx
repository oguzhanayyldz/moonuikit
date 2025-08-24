"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Progress Bileşeni
 *
 * İlerleme durumunu görsel olarak gösteren, tema sistemiyle tam entegre bir bileşen.
 * Yükleme işlemleri, form gönderimi ve diğer zaman alan işlemleri göstermek için kullanılır.
 */

const progressVariants = cva(
  "relative overflow-hidden bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20",
      },
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2",
        md: "h-2.5",
        lg: "h-3",
        xl: "h-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md", 
        lg: "rounded-lg",
        full: "rounded-full",
      },
      animation: {
        default: "[&>div]:transition-all [&>div]:duration-500",
        smooth: "[&>div]:transition-all [&>div]:duration-700",
        fast: "[&>div]:transition-all [&>div]:duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "full",
      animation: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
      },
      animation: {
        default: "transition-all duration-500",
        smooth: "transition-all duration-700",
        fast: "transition-all duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      animation: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /**
   * İlerleme çubuğu değeri (0-100)
   */
  value?: number;
  /**
   * İndikatör (dolgu) için renk varyantı
   */
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  /**
   * İlerleme durumunu gösteren metin görünürlüğü
   */
  showValueLabel?: boolean;
  /**
   * İlerleme değeri etiketi için format (ör: "30%" veya "3/10")
   */
  valueLabel?: string;
  /**
   * Etiket stili
   */
  labelClassName?: string;
  /**
   * Belirsiz ilerleme animasyonu (indeterminate)
   */
  indeterminate?: boolean;
  /**
   * İlerleme değeri maksimumu (default: 100)
   */
  max?: number;
}

const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({
  className,
  value = 0,
  variant,
  size,
  radius,
  animation,
  indicatorVariant,
  showValueLabel = false,
  valueLabel,
  labelClassName,
  indeterminate = false,
  max = 100,
  ...props
}, ref) => {
  // İlerleme değeri 0-100 arasında olmalı
  const normalizedValue = Math.max(0, Math.min(value, max));
  const percentage = max > 0 ? (normalizedValue / max) * 100 : 0;
  
  // Etiket içeriği
  const label = valueLabel || `${Math.round(percentage)}%`;
  
  return (
    <>
      {showValueLabel && (
        <div className="flex justify-between items-center mb-1">
          <span 
            className={cn(
              "text-sm font-medium text-muted-foreground",
              labelClassName
            )}
          >
            {label}
          </span>
        </div>
      )}
      <div
        ref={ref}
        className={cn("moonui-theme", progressVariants({ variant, size, radius, animation }), className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : normalizedValue}
        {...props}
      >
        <div
          className={cn(
            progressIndicatorVariants({ variant: indicatorVariant || "primary", animation }),
            indeterminate && "animate-indeterminate-progress"
          )}
          style={indeterminate ? {} : { transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    </>
  );
});
Progress.displayName = "Progress";

// Not: Belirsiz ilerleme animasyonu için CSS keyframe styles.css veya Tailwind config içinde tanımlanmalı
// @keyframes indeterminate-progress içeren bir tanımlama yapılmalıdır
// .animate-indeterminate-progress sınıfı da bu animasyonu kullanmalıdır

export { Progress, progressVariants };
