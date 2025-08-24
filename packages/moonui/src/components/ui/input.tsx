"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

/**
 * Premium Input Component
 * 
 * Erişilebilir, estetik ve işlevsel input bileşeni.
 * İkon desteği, hata gösterimi ve çeşitli varyantlar sunar.
 */

const inputWrapperVariants = cva(
  "group relative flex items-center w-full transition-colors",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const inputVariants = cva(
  [
    "w-full bg-background transition-all duration-200",
    "text-foreground placeholder:text-muted-foreground dark:placeholder:text-gray-500", 
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:font-medium",
    "focus-visible:outline-none dark:text-gray-200"
  ],
  {
    variants: {
      variant: {
        standard: "border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 hover:border-gray-400 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:bg-gray-900/60 dark:shadow-inner dark:shadow-gray-950/10",
        filled: "border border-transparent bg-gray-100 dark:bg-gray-800/90 rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700/90 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 dark:shadow-inner dark:shadow-gray-950/10",
        ghost: "border-none bg-transparent shadow-none px-1 dark:text-gray-300 dark:placeholder:text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 focus-visible:bg-transparent",
        underline: "border-t-0 border-l-0 border-r-0 border-b border-gray-300 dark:border-gray-600 rounded-none px-0 py-2 hover:border-gray-400 dark:hover:border-gray-500 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:text-gray-300",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      hasLeftIcon: {
        true: "pl-10",
        false: "",
      },
      hasRightIcon: {
        true: "pr-10",
        false: "",
      },
      hasRightButton: {
        true: "pr-10",
        false: "",
      },
      isError: {
        true: "border-error focus-visible:ring-error/30 focus-visible:border-error hover:border-error/80 dark:hover:border-error/80",
        false: "",
      },
      isSuccess: {
        true: "border-success focus-visible:ring-success/30 focus-visible:border-success hover:border-success/80 dark:hover:border-success/80",
        false: "",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50 pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "standard",
      size: "md",
      isError: false,
      isSuccess: false,
      isDisabled: false,
      hasLeftIcon: false,
      hasRightIcon: false,
      hasRightButton: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "isDisabled" | "hasLeftIcon" | "hasRightIcon" | "hasRightButton"> {
  /** Hata mesajı */
  error?: string;
  /** Başarı mesajı */
  success?: string;
  /** Yükleniyor durumu */
  loading?: boolean;
  /** Sol tarafta gösterilecek ikon */
  leftIcon?: React.ReactNode;
  /** Sağ tarafta gösterilecek ikon */
  rightIcon?: React.ReactNode;
  /** Sağ tarafta gösterilecek buton (password show/hide vb. için) */
  rightButton?: React.ReactNode;
  /** Mesajın görünürlüğü (true: her zaman görünür, false: sadece hata/başarı durumunda) */
  alwaysShowMessage?: boolean;
  /** Input wrapper için ek sınıflar */
  wrapperClassName?: string;
  /** Mesaj için ek sınıflar */
  messageClassName?: string;
}

/**
 * Premium Input Component
 * 
 * @param props - Input bileşeni özellikleri
 * @param props.variant - Görsel varyant (standard, filled, ghost, underline)
 * @param props.size - Boyut (sm, md, lg)
 * @param props.error - Hata mesajı
 * @param props.success - Başarı mesajı
 * @param props.loading - Yükleniyor durumu
 * @param props.leftIcon - Sol tarafta gösterilecek ikon
 * @param props.rightIcon - Sağ tarafta gösterilecek ikon
 * @param props.rightButton - Sağ tarafta gösterilecek buton
 * @param props.alwaysShowMessage - Mesajın her zaman görünür olması
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    wrapperClassName,
    messageClassName,
    variant, 
    size, 
    isError,
    disabled, 
    error,
    success,
    loading,
    leftIcon,
    rightIcon,
    rightButton,
    alwaysShowMessage = false,
    ...props 
  }, ref) => {
    // Mesajı göster/gizle
    const showMessage = alwaysShowMessage || error || success;
    const messageType = error ? "error" : success ? "success" : "normal";

    return (
      <div className="space-y-1.5 w-full">
        <div className={cn("moonui-theme", inputWrapperVariants({ size }), wrapperClassName)}>
          {leftIcon && (
            <div className="absolute left-3 text-gray-500 flex items-center justify-center pointer-events-none">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
            </div>
          )}
          
          <input
            className={cn(
              inputVariants({ 
                variant, 
                size, 
                isError: !!error || isError, 
                isSuccess: !!success,
                isDisabled: disabled || loading,
                hasLeftIcon: !!leftIcon || loading,
                hasRightIcon: !!rightIcon,
                hasRightButton: !!rightButton,
              }),
              className
            )}
            ref={ref}
            disabled={disabled || loading}
            data-loading={loading ? "" : undefined}
            data-error={!!error ? "" : undefined}
            data-success={!!success ? "" : undefined}
            aria-invalid={!!error || !!isError || undefined}
            aria-describedby={error ? `${props.id || ''}-error` : success ? `${props.id || ''}-success` : undefined}
            {...props}
          />
          
          {rightIcon && !loading && (
            <div className="absolute right-3 text-gray-500 flex items-center justify-center pointer-events-none">
              {rightIcon}
            </div>
          )}
          
          {rightButton && (
            <div className="absolute right-3">
              {rightButton}
            </div>
          )}
          
          {loading && !leftIcon && (
            <div className="absolute left-3 text-gray-500 flex items-center justify-center pointer-events-none">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            </div>
          )}
        </div>
        
        {showMessage && (
          <p 
            className={cn(
              "text-xs transition-all",
              messageType === "error" && "text-error",
              messageType === "success" && "text-success",
              messageType === "normal" && "text-muted-foreground",
              messageClassName
            )}
            id={error ? `${props.id || ''}-error` : success ? `${props.id || ''}-success` : undefined}
          >
            {error || success || ""}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
