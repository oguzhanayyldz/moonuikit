"use client"

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      variant: {
        default: "",
        ring: "ring-2 ring-border",
        ringOffset: "ring-2 ring-border ring-offset-2 ring-offset-background",
        border: "border-2 border-border"
      }
    },
    defaultVariants: {
      size: "default",
      radius: "default",
      variant: "default"
    },
  }
);

export interface AvatarProps 
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, radius, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("moonui-theme", avatarVariants({ size, radius, variant }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("moonui-theme", "aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Avatar Group Component for displaying multiple avatars
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number;
  avatars: React.ReactNode[];
  overlapOffset?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, limit, avatars, overlapOffset = -8, ...props }, ref) => {
    const visibleAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount = limit ? Math.max(0, avatars.length - limit) : 0;

    return (
      <div
        ref={ref}
        className={cn("moonui-theme", "flex items-center", className)}
        {...props}
      >
        <div className="flex">
          {visibleAvatars.map((avatar, index) => (
            <div 
              key={index} 
              className="relative"
              style={{ 
                marginLeft: index === 0 ? 0 : `${overlapOffset}px`,
                zIndex: visibleAvatars.length - index 
              }}
            >
              {avatar}
            </div>
          ))}
          {remainingCount > 0 && (
            <div 
              className="relative z-0"
              style={{ marginLeft: `${overlapOffset}px` }}
            >
              <Avatar variant="border">
                <AvatarFallback>
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
