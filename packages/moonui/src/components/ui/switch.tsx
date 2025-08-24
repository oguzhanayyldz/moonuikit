"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../lib/utils"

type SwitchSize = "sm" | "md" | "lg";
type SwitchVariant = "primary" | "success" | "warning" | "danger" | "secondary";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /** Switch boyutu */
  size?: SwitchSize;
  /** Switch renk varyantı */
  variant?: SwitchVariant;
  /** Yükleniyor durumunu gösterir */
  loading?: boolean;
  /** Sol tarafta gösterilecek ikon */
  leftIcon?: React.ReactNode;
  /** Sağ tarafta gösterilecek ikon */
  rightIcon?: React.ReactNode;
  /** Switch açıklaması */
  description?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "md", variant = "primary", loading, leftIcon, rightIcon, description, ...props }, ref) => (
  <div className="moonui-theme inline-flex items-center gap-2">
    {leftIcon && <span className="text-muted-foreground">{leftIcon}</span>}
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:data-[state=unchecked]:bg-gray-700/70 dark:focus-visible:ring-primary/40 dark:focus-visible:ring-offset-gray-950",
        
        // Boyutlar
        size === "sm" && "h-4 w-8",
        size === "md" && "h-6 w-11", 
        size === "lg" && "h-7 w-14",
        
        // Varyantlar (checked durumunda)
        variant === "primary" && "data-[state=checked]:bg-primary",
        variant === "success" && "data-[state=checked]:bg-success",
        variant === "warning" && "data-[state=checked]:bg-warning",
        variant === "danger" && "data-[state=checked]:bg-error",
        variant === "secondary" && "data-[state=checked]:bg-accent",
        
        // Unchecked durumu
        "data-[state=unchecked]:bg-input",
        
        // Loading durumu
        loading && "opacity-80 cursor-wait",
        
        className
      )}
      disabled={loading || props.disabled}
      {...props}
      ref={ref}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
        </div>
      ) : null}
      
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
          // Boyuta göre thumb boyutları
          size === "sm" && "h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          size === "md" && "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          size === "lg" && "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
    {rightIcon && <span className="text-muted-foreground">{rightIcon}</span>}
    {description && <span className="text-sm text-muted-foreground">{description}</span>}
  </div>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
export type { SwitchSize, SwitchVariant }
