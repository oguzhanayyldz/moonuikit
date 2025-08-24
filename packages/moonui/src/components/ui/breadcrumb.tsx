"use client"

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const breadcrumbVariants = cva(
  "flex items-center gap-1.5 text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground transition-colors",
        muted: "text-muted-foreground transition-colors",
        ghost: "text-foreground/60 transition-colors",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
}

interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
  collapsed?: boolean;
  collapsedWidth?: number;
}

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
  href?: string;
  asChild?: boolean;
}

interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom separator icon or text */
  icon?: React.ReactNode;
}

interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom ellipsis icon */
  icon?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, variant, size, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("moonui-theme", breadcrumbVariants({ variant, size }), className)}
      aria-label="breadcrumb"
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, collapsed, collapsedWidth = 3, ...props }, ref) => {
    const childrenArray = React.Children.toArray(props.children).filter(Boolean);
    const childCount = childrenArray.length;

    if (collapsed && childCount > collapsedWidth) {
      const firstItem = childrenArray[0];
      // const middleItems = childrenArray.slice(1, -2); // Uncomment when needed
      const lastTwoItems = childrenArray.slice(-2);

      return (
        <ol
          ref={ref}
          className={cn(
            "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
            className
          )}
          {...props}
        >
          {firstItem}
          <BreadcrumbEllipsis />
          {lastTwoItems}
        </ol>
      );
    }

    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, isCurrent, href, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : href ? "a" : "span";
    const itemProps = asChild ? {} : href ? { href } : {};

    return (
      <li
        ref={ref}
        className={cn("moonui-theme", "inline-flex items-center gap-1.5", className)}
        aria-current={isCurrent ? "page" : undefined}
        {...props}
      >
        <Comp 
          className={cn(
            "transition-colors duration-200 hover:text-foreground",
            isCurrent 
              ? "font-medium text-foreground" 
              : "text-muted-foreground hover:text-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30"
          )}
          {...itemProps}
        >
          {props.children}
        </Comp>
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("moonui-theme", "text-muted-foreground opacity-70", className)}
    {...props}
  >
    {children || <ChevronRight className="h-3.5 w-3.5" />}
  </span>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("moonui-theme", "flex items-center text-muted-foreground hover:text-foreground/80 transition-colors duration-200", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, href, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        "transition-colors duration-200 hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-medium text-foreground dark:text-white dark:text-opacity-95",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
