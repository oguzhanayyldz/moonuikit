"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Popover Bileşeni
 * 
 * Tıklanabilir bir öğeden açılan, tema sistemiyle tam entegre bir içerik bileşeni.
 * Filtreler, ayarlar ve diğer içerikler için kullanışlı ve erişilebilir bir arayüz sağlar.
 */

const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border border-border bg-background p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive bg-destructive/5",
        outline: "border-border bg-transparent",
        subtle: "border-transparent bg-muted/50",
      },
      size: {
        sm: "w-48 p-3",
        default: "w-72 p-4",
        lg: "w-96 p-5",
      },
      side: {
        top: "data-[side=top]:slide-in-from-bottom-2",
        right: "data-[side=right]:slide-in-from-left-2",
        bottom: "data-[side=bottom]:slide-in-from-top-2",
        left: "data-[side=left]:slide-in-from-right-2",
      },
      position: {
        pointerEventsNone: "pointer-events-none",
        default: "",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        default: "shadow-md",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      shadow: "default",
    },
  }
);

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps 
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'side'>,
    VariantProps<typeof popoverContentVariants> {
  /**
   * Popover'ın arka plan bulanıklığı etkin mi
   */
  backdrop?: boolean;
  /**
   * Popover'a tıklandığında kapanıp kapanmayacağı
   */
  closeOnInteractOutside?: boolean;
  /**
   * Popover açıkken arka planın karartılması
   */
  overlayBackdrop?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({
  className,
  variant,
  size,
  side,
  position,
  radius,
  shadow,
  backdrop = false,
  closeOnInteractOutside = true,
  overlayBackdrop = false,
  sideOffset = 4,
  ...props
}, ref) => (
  <>
    {overlayBackdrop && (
      <div className="fixed inset-0 z-40 bg-overlay opacity-30" />
    )}
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={8}
      onInteractOutside={(e) => {
        if (!closeOnInteractOutside) {
          e.preventDefault();
        }
      }}
      className={cn(
        popoverContentVariants({ 
          variant, 
          size, 
          side, 
          position,
          radius,
          shadow
        }),
        backdrop && "backdrop-blur-md bg-opacity-80",
        className
      )}
      {...props}
    />
  </>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * PopoverClose bileşeni
 */
const PopoverClose = PopoverPrimitive.Close;

/**
 * Popover için bölüm ayırıcı
 */
const PopoverSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "my-2 h-px bg-border", className)}
    {...props}
  />
);
PopoverSeparator.displayName = "PopoverSeparator";

/**
 * Popover başlık bileşeni
 */
const PopoverHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "-mx-4 -mt-4 mb-3 px-4 pt-4 pb-3 border-b border-border", className)}
    {...props}
  />
);
PopoverHeader.displayName = "PopoverHeader";

/**
 * Popover footer bileşeni
 */
const PopoverFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "-mx-4 -mb-4 mt-3 px-4 pt-3 pb-4 border-t border-border", className)}
    {...props}
  />
);
PopoverFooter.displayName = "PopoverFooter";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverSeparator,
  PopoverHeader,
  PopoverFooter,
  popoverContentVariants,
};
