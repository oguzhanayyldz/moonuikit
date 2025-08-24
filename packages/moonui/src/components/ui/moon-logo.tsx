"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface MoonLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "default" | "monochrome" | "gradient"
  showText?: boolean
}

export function MoonLogo({ 
  className, 
  variant = "default",
  showText = true,
  ...props 
}: MoonLogoProps) {
  const logoId = React.useId()
  const gradientId = `moon-gradient-${logoId}`
  
  return (
    <div className={cn("moonui-theme", "flex items-center gap-2", className)}>
      {/* Moon Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        {...props}
      >
        {variant === "gradient" && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        )}
        
        {/* Moon Circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill={variant === "gradient" ? `url(#${gradientId})` : "currentColor"}
          className={variant === "default" ? "fill-primary" : ""}
        />
        
        {/* Crescent cutout */}
        <circle
          cx="22"
          cy="10"
          r="10"
          fill="white"
          className="dark:fill-background"
        />
      </svg>
      
      {/* Text */}
      {showText && (
        <span className="text-xl font-bold">
          <span className="text-foreground">Moon</span>
          <span className="text-primary">UI</span>
        </span>
      )}
    </div>
  )
}

export function MoonLogoIcon({ 
  className, 
  variant = "default",
  ...props 
}: Omit<MoonLogoProps, "showText">) {
  return <MoonLogo showText={false} className={className} variant={variant} {...props} />
}

export function MoonLogoAnimated({ 
  className, 
  variant = "default",
  showText = true,
  ...props 
}: MoonLogoProps) {
  return (
    <MoonLogo 
      className={cn(
        "transition-all duration-300 hover:scale-105",
        className
      )} 
      variant={variant}
      showText={showText}
      {...props}
    />
  )
}