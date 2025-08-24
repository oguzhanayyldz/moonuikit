"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import { microInteractionVariants, hoverAnimations, tapAnimations } from "@/lib/micro-interactions";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm dark:shadow-gray-900/20 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-border shadow-none bg-transparent dark:border-gray-700 dark:bg-transparent dark:text-gray-200",
        filled: "border-none bg-secondary dark:bg-gray-800 dark:text-gray-100 dark:shadow-inner dark:shadow-gray-950/10",
        elevated: "border-none shadow-md dark:shadow-lg dark:shadow-gray-900/30 dark:bg-gray-850 dark:text-gray-100",
        gradient: "border-none bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-800/10",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  microInteraction?: "lift" | "glow" | "scale" | "none";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, interactive, microInteraction = "lift", ...props }, ref) => {
    // Interactive özelliği varsa motion.div, yoksa normal div kullan
    if (interactive && microInteraction !== "none") {
      const interactionProps = {
        whileHover: microInteraction === "scale" ? hoverAnimations.scale : 
                    microInteraction === "glow" ? hoverAnimations.glow : 
                    hoverAnimations.lift,
        whileTap: tapAnimations.scale,
      };
      
      return (
        <motion.div
          ref={ref}
          className={cn("moonui-theme", cardVariants({ variant, size, radius, interactive, className }))}
          {...interactionProps}
          {...(props as any)}
        />
      );
    }
    
    // Non-interactive version
    return (
      <div
        ref={ref}
        className={cn("moonui-theme", cardVariants({ variant, size, radius, interactive, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("moonui-theme", "flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("moonui-theme", "text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("moonui-theme", "text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("moonui-theme", "pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("moonui-theme", "flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
