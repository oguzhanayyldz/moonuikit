"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, Info, Check, X } from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * Alert Component
 *
 * Yüksek kaliteli, özelleştirilebilir ve erişilebilir alert bileşeni.
 * Bildirim, uyarı ve dikkat çekmek gereken içerikler için kullanılır.
 */

const alertVariants = cva(
    "relative w-full flex items-center gap-3 p-4 border text-foreground [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground border-border",
                primary: "bg-primary/10 text-primary border-primary/30",
                success: "bg-success/10 text-success border-success/30",
                warning: "bg-warning/10 text-warning border-warning/30",
                error: "bg-destructive/10 text-destructive border-destructive/30",
                info: "bg-blue-500/10 text-blue-500 border-blue-500/30",
            },
            size: {
                sm: "py-2 text-xs",
                default: "py-3 text-sm",
                lg: "py-4 text-base",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                default: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
            withClose: {
                true: "pr-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            radius: "default",
            withClose: false,
        },
    }
);

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    /** Alert ikonunu gizler */
    hideIcon?: boolean;
    /** Kapatma butonu ekler */
    closable?: boolean;
    /** Kapatma butonu tıklandığında çalışacak fonksiyon */
    onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            variant = "default",
            size,
            radius,
            hideIcon = false,
            closable = false,
            onClose,
            children,
            ...props
        },
        ref
    ) => {
        // Alert türüne göre ikon belirleme
        const Icon = React.useMemo(() => {
            switch (variant) {
                case "success":
                    return Check;
                case "warning":
                    return AlertTriangle;
                case "error":
                    return AlertCircle;
                case "info":
                    return Info;
                default:
                    return Info;
            }
        }, [variant]);

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(
                    "moonui-theme",
                    alertVariants({
                        variant,
                        size,
                        radius,
                        withClose: closable,
                    }),
                    className
                )}
                {...props}
            >
                {!hideIcon && <Icon className="h-5 w-5" />}
                <div className="flex-1">{children}</div>
                {closable && onClose && (
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
                        aria-label="Kapat"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            "moonui-theme",
            "font-semibold leading-tight tracking-tight mb-1",
            className
        )}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "moonui-theme",
            "text-sm leading-5 text-muted-foreground",
            className
        )}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
