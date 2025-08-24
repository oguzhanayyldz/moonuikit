"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

/**
 * Collapsible (Daraltılabilir) Bileşeni
 * 
 * İçeriği genişletilip daraltılabilen hafif bir bileşendir.
 * Tema sistemiyle tam entegre, erişilebilir ve özelleştirilebilir.
 */

const Collapsible = CollapsiblePrimitive.Root

const collapsibleTriggerVariants = cva(
  "flex w-full items-center justify-between transition-all",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        ghost: "text-foreground hover:bg-accent/10 rounded",
        outline: "text-foreground border border-border rounded-t-md hover:bg-accent/5",
      },
      size: {
        sm: "text-xs py-2 px-3",
        default: "text-sm py-3 px-4",
        md: "text-base py-4 px-4",
        lg: "text-lg py-5 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface CollapsibleTriggerProps 
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>,
    VariantProps<typeof collapsibleTriggerVariants> {}

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, children, variant, size, asChild, ...props }, ref) => {
  // asChild kullanıldığında otomatik ikon eklemeyi atla
  if (asChild) {
    return (
      <CollapsiblePrimitive.Trigger
        ref={ref}
        className={cn("moonui-theme", collapsibleTriggerVariants({ variant, size }), className)}
        asChild={asChild}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Trigger>
    )
  }

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn("moonui-theme", collapsibleTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 ml-auto transition-transform duration-200 [&[data-state=open]]:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  )
})
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

const collapsibleContentVariants = cva(
  "overflow-hidden transition-all data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        ghost: "text-muted-foreground rounded-b",
        outline: "text-muted-foreground border border-t-0 border-border rounded-b-md",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface CollapsibleContentProps 
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>,
    VariantProps<typeof collapsibleContentVariants> {}

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, children, variant, size, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn("moonui-theme", collapsibleContentVariants({ variant, size }), className)}
    {...props}
  >
    <div className="p-4">{children}</div>
  </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  collapsibleTriggerVariants,
  collapsibleContentVariants,
}

export type {
  CollapsibleTriggerProps,
  CollapsibleContentProps
}
