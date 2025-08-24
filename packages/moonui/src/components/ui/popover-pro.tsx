"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const PopoverPro = PopoverPrimitive.Root
const PopoverTriggerPro = PopoverPrimitive.Trigger
const PopoverAnchorPro = PopoverPrimitive.Anchor
const PopoverPortalPro = PopoverPrimitive.Portal

// Animation variants
const popoverAnimations = {
  // Basic animations
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  slide: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  },
  // Advanced animations
  spring: {
    initial: { opacity: 0, scale: 0.8, y: -20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { opacity: 0, scale: 0.8, y: -20 }
  },
  elastic: {
    initial: { opacity: 0, scale: 0.5, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    exit: { opacity: 0, scale: 0.5, rotate: 10 }
  },
  bounce: {
    initial: { opacity: 0, y: -30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 1
      }
    },
    exit: { opacity: 0, y: -30 }
  },
  flip: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { 
      opacity: 1, 
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { opacity: 0, rotateX: 90 }
  },
  slideFromBottom: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, y: 20 }
  },
  zoom: {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { opacity: 0, scale: 0 }
  },
  morph: {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      borderRadius: "50%"
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      borderRadius: "12px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      borderRadius: "50%"
    }
  }
}

const popoverContentVariants = cva(
  "z-50 w-72 rounded-md p-4 shadow-md outline-none",
  {
    variants: {
      variant: {
        default: "border bg-popover text-popover-foreground",
        glass: [
          "border border-white/20 bg-white/80 backdrop-blur-xl",
          "dark:border-gray-800/50 dark:bg-gray-900/80",
          "shadow-xl"
        ],
        gradient: [
          "bg-gradient-to-br from-white to-gray-50",
          "dark:from-gray-900 dark:to-gray-950",
          "border border-gray-200 dark:border-gray-800",
          "shadow-xl"
        ],
        solid: [
          "bg-white dark:bg-gray-900",
          "border-2 border-gray-200 dark:border-gray-700",
          "shadow-2xl"
        ],
        floating: [
          "bg-white dark:bg-gray-900",
          "shadow-2xl shadow-black/20 dark:shadow-black/40",
          "border border-gray-100 dark:border-gray-800"
        ],
        neumorphic: [
          "bg-gray-100 dark:bg-gray-900",
          "shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]",
          "dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]",
          "border-0"
        ]
      },
      size: {
        sm: "w-56 p-3",
        default: "w-72 p-4",
        lg: "w-96 p-6",
        xl: "w-[32rem] p-8",
        auto: "w-auto p-4"
      },
      overlayBlur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      overlayBlur: "none"
    }
  }
)

export interface PopoverContentProProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContentVariants> {
  animation?: keyof typeof popoverAnimations
  enableSpringPhysics?: boolean
  showArrow?: boolean
  arrowSize?: number
  customBackdrop?: boolean
  dragToDismiss?: boolean
  pinnable?: boolean
  resizable?: boolean
  focusTrap?: boolean
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
  staggerChildren?: boolean
  glowEffect?: boolean
  magneticEdges?: boolean
}

const PopoverContentPro = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      variant,
      size,
      overlayBlur,
      animation = "spring",
      enableSpringPhysics = false,
      showArrow = false,
      arrowSize = 8,
      customBackdrop = false,
      dragToDismiss = false,
      pinnable = false,
      resizable = false,
      focusTrap = false,
      closeOnEscape = true,
      closeOnClickOutside = true,
      staggerChildren = false,
      glowEffect = false,
      magneticEdges = false,
      children,
      ...props
    },
    ref
  ) => {
    const [isPinned, setIsPinned] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)
    const animationVariant = popoverAnimations[animation] || popoverAnimations.spring

    // Spring physics for magnetic edges
    const x = useSpring(0, { stiffness: 300, damping: 30 })
    const y = useSpring(0, { stiffness: 300, damping: 30 })

    const contentElement = (
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape || isPinned) {
            e.preventDefault()
          }
        }}
        onPointerDownOutside={(e) => {
          if (!closeOnClickOutside || isPinned) {
            e.preventDefault()
          }
        }}
        className={cn(
          popoverContentVariants({ variant, size, overlayBlur }),
          glowEffect && "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
          resizable && "resize overflow-auto",
          isDragging && "cursor-grabbing",
          className
        )}
        {...props}
      >
        {pinnable && (
          <button
            onClick={() => setIsPinned(!isPinned)}
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isPinned ? "Unpin popover" : "Pin popover"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn(
                "transition-transform",
                isPinned && "rotate-45"
              )}
            >
              <path d="M12 17v5M9 10V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6M9 10l-2 2v3h10v-3l-2-2" />
            </svg>
          </button>
        )}
        
        {showArrow && (
          <PopoverPrimitive.Arrow
            width={arrowSize * 2}
            height={arrowSize}
            className={cn(
              "fill-current",
              variant === "glass" && "text-white/80 dark:text-gray-900/80",
              variant === "gradient" && "text-white dark:text-gray-900",
              variant === "default" && "text-popover"
            )}
          />
        )}
        
        <div
          className={cn(
            staggerChildren && "space-y-2",
            dragToDismiss && "select-none"
          )}
        >
          {children}
        </div>
      </PopoverPrimitive.Content>
    )

    if (enableSpringPhysics || magneticEdges) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            {...(animationVariant as any)}
            style={magneticEdges ? { x, y } : undefined}
            drag={dragToDismiss}
            dragElastic={0.2}
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {contentElement}
          </motion.div>
        </AnimatePresence>
      )
    }

    return contentElement
  }
)

PopoverContentPro.displayName = PopoverPrimitive.Content.displayName

// Additional Pro components
const PopoverHeaderPro = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 space-y-1", className)}
    {...props}
  />
))
PopoverHeaderPro.displayName = "PopoverHeaderPro"

const PopoverTitlePro = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-lg leading-none tracking-tight", className)}
    {...props}
  />
))
PopoverTitlePro.displayName = "PopoverTitlePro"

const PopoverDescriptionPro = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
PopoverDescriptionPro.displayName = "PopoverDescriptionPro"

const PopoverFooterPro = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 flex items-center justify-end space-x-2 pt-4 border-t",
      className
    )}
    {...props}
  />
))
PopoverFooterPro.displayName = "PopoverFooterPro"

const PopoverSeparatorPro = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-4 border-t", className)}
    {...props}
  />
))
PopoverSeparatorPro.displayName = "PopoverSeparatorPro"

export {
  PopoverPro,
  PopoverTriggerPro,
  PopoverContentPro,
  PopoverAnchorPro,
  PopoverPortalPro,
  PopoverHeaderPro,
  PopoverTitlePro,
  PopoverDescriptionPro,
  PopoverFooterPro,
  PopoverSeparatorPro,
  popoverContentVariants
}