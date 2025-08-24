"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Loader2, X } from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * Premium Dialog Component
 *
 * Modern, accessible and customizable modal dialog component.
 * Enhances user experience with variants, sizes and rich features.
 * Provides a premium appearance with dark and light mode compatibility and fluid animations.
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const overlayVariants = cva(
    "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    {
        variants: {
            variant: {
                default: "bg-black/80",
                subtle: "bg-black/60",
                blur: "bg-black/40 backdrop-blur-md",
                minimal: "bg-black/20 backdrop-blur-sm",
            },
            animation: {
                default: "duration-200",
                slow: "duration-300",
                fast: "duration-100",
            },
        },
        defaultVariants: {
            variant: "default",
            animation: "default",
        },
    }
);

interface DialogOverlayProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
        VariantProps<typeof overlayVariants> {}

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    DialogOverlayProps
>(({ className, variant, animation, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn("moonui-theme", overlayVariants({ variant, animation }), className)}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
    "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg",
    {
        variants: {
            variant: {
                default: "border-gray-200 dark:border-gray-700",
                primary: "border-primary/20 dark:border-primary/30",
                secondary: "border-gray-300 dark:border-gray-600",
                ghost: "border-transparent shadow-xl",
                destructive: "border-error/20 dark:border-error/30",
            },
            size: {
                xs: "max-w-xs p-4",
                sm: "max-w-sm p-5",
                default: "max-w-lg p-6",
                md: "max-w-md p-6",
                lg: "max-w-2xl p-7",
                xl: "max-w-4xl p-8",
                full: "max-w-[95vw] max-h-[95vh] p-6",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-md",
                default: "rounded-lg",
                lg: "rounded-xl",
                xl: "rounded-2xl",
                full: "rounded-3xl",
            },
            animation: {
                default:
                    "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                fade: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                zoom: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                slide: "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                none: "",
            },
            position: {
                default: "top-[50%]",
                top: "top-[5%]",
                bottom: "bottom-[5%] top-auto translate-y-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            radius: "default",
            animation: "default",
            position: "default",
        },
    }
);

interface DialogContentProps
    extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'title'>,
        VariantProps<typeof dialogContentVariants> {
    /** X butonunu gizle */
    hideCloseButton?: boolean;
    /** Overlay varyantı */
    overlayVariant?: VariantProps<typeof overlayVariants>["variant"];
    /** Overlay animasyonu */
    overlayAnimation?: VariantProps<typeof overlayVariants>["animation"];
    /** İçerik başlığı (hızlı kullanım için) */
    title?: React.ReactNode;
    /** İçerik açıklaması (hızlı kullanım için) */
    description?: React.ReactNode;
    /** Başlık ikonu */
    icon?: React.ReactNode;
    /** Yükleniyor durumu */
    loading?: boolean;
    /** Success durumu */
    success?: boolean;
    /** Özel onClose handler */
    onClose?: () => void;
}

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
>(
    (
        {
            className,
            children,
            variant,
            size,
            radius,
            animation,
            position,
            overlayVariant = "default",
            overlayAnimation = "default",
            hideCloseButton = false,
            title,
            description,
            icon,
            loading = false,
            success = false,
            onClose,
            ...props
        },
        ref
    ) => {
        // Capturing the close function through the Radix Dialog API
        const handleClose = () => {
            if (onClose) {
                onClose();
            }
        };

        return (
            <DialogPortal>
                <DialogOverlay
                    variant={overlayVariant}
                    animation={overlayAnimation}
                    onClick={hideCloseButton ? undefined : handleClose}
                />
                <DialogPrimitive.Content
                    ref={ref}
                    onEscapeKeyDown={hideCloseButton ? undefined : handleClose}
                    onInteractOutside={
                        hideCloseButton ? undefined : handleClose
                    }
                    className={cn(
                        dialogContentVariants({
                            variant,
                            size,
                            radius,
                            animation,
                            position,
                        }),
                        "outline-none",
                        loading && "pointer-events-none",
                        success && "border-success/40",
                        className
                    )}
                    {...props}
                >
                    {/* Başlık ve açıklama varsa otomatik olarak DialogHeader oluştur */}
                    {(title || description || icon) && (
                        <DialogHeader className="flex gap-4">
                            {/* İkon veya loading/success durumları */}
                            {(icon || loading || success) && (
                                <div className="flex shrink-0 items-center justify-center">
                                    {loading && (
                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    )}
                                    {success && (
                                        <Check className="h-5 w-5 text-success" />
                                    )}
                                    {!loading && !success && icon && (
                                        <span className="text-primary">
                                            {icon}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="flex-1">
                                {title && <DialogTitle>{title}</DialogTitle>}
                                {description && (
                                    <DialogDescription>
                                        {description}
                                    </DialogDescription>
                                )}
                            </div>
                        </DialogHeader>
                    )}

                    {/* Main content */}
                    {children}

                    {/* Close button */}
                    {!hideCloseButton && (
                        <DialogPrimitive.Close
                            onClick={handleClose}
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:pointer-events-none dark:text-gray-300 dark:hover:text-white"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    )}
                </DialogPrimitive.Content>
            </DialogPortal>
        );
    }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 mt-6",
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-snug tracking-tight dark:text-white",
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn(
            "text-sm text-muted-foreground leading-normal dark:text-gray-400",
            className
        )}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Dialog-Form integration for use with form support
 * Used to integrate form submission processes into the modal
 */
const DialogForm = React.forwardRef<
    HTMLFormElement,
    React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
    <form
        ref={ref}
        className={cn("moonui-theme", "flex flex-col gap-4", className)}
        {...props}
    />
));
DialogForm.displayName = "DialogForm";

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogForm,
};
