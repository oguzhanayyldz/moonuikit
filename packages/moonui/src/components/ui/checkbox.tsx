"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Checkbox Bileşeni
 *
 * Erişilebilir, özelleştirilebilir ve tema sistemiyle tam entegre checkbox bileşeni.
 * Form elemanları ve seçim listeleri için kullanılır.
 */

const checkboxVariants = cva(
  "peer shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        outline: "border-border bg-transparent data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        muted: "border-border bg-accent data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        ghost: "border-transparent bg-transparent hover:bg-accent data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      },
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-sm",
        md: "rounded-md",
        full: "rounded-full",
      },
      animation: {
        none: "",
        subtle: "transition-all duration-200",
        default: "transition-all duration-200",
        bounce: "transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      animation: "default",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  /**
   * İndeterminate durumu - grup seçimlerinde bazı öğeler seçilmişse kullanılır
   */
  indeterminate?: boolean;
  /**
   * Özel ikon komponenti
   */
  icon?: React.ReactNode;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ 
  className, 
  variant, 
  size, 
  radius, 
  animation,
  indeterminate = false,
  icon,
  checked,
  ...props 
}, ref) => {
  // Indeterminate state yönetimi
  const [isIndeterminate, setIsIndeterminate] = React.useState(indeterminate);
  
  React.useEffect(() => {
    setIsIndeterminate(indeterminate);
  }, [indeterminate]);

  // Checked state override, indeterminate olduğunda
  const effectiveChecked = isIndeterminate ? false : checked;
  
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={effectiveChecked}
      className={cn("moonui-theme", checkboxVariants({ variant, size, radius, animation }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current",
          animation === "bounce" && "data-[state=checked]:animate-bounce"
        )}
      >
        {isIndeterminate ? (
          <Minus className="h-[65%] w-[65%]" />
        ) : icon ? (
          icon
        ) : (
          <Check className="h-[65%] w-[65%]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// CheckboxGroup bileşeni
interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grup içi yerleşim - dikey veya yatay
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Öğeler arasındaki boşluk (piksel)
   */
  spacing?: number | string;
  /**
   * Alt bileşenler
   */
  children: React.ReactNode;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, orientation = "vertical", spacing = "1rem", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        style={{ gap: spacing }}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

// CheckboxLabel bileşeni
interface CheckboxLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  /**
   * Checkbox bileşeni için HTML id
   */
  htmlFor?: string;
  /**
   * Label içeriği
   */
  children: React.ReactNode;
  /**
   * Checkbox öncesi veya sonrası
   */
  position?: "start" | "end";
  /**
   * Devre dışı durum stili
   */
  disabled?: boolean;
}

const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ className, htmlFor, children, position = "end", disabled = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          position === "start" ? "mr-2" : "ml-2",
          disabled && "cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
CheckboxLabel.displayName = "CheckboxLabel";

// Checkbox ve Label içeren bileşen
interface CheckboxWithLabelProps extends CheckboxProps {
  /**
   * Label içeriği
   */
  label: React.ReactNode;
  /**
   * Label pozisyonu
   */
  labelPosition?: "start" | "end";
  /**
   * Label için HTML sınıfları
   */
  labelClassName?: string;
}

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ 
  id, 
  label, 
  labelPosition = "end", 
  labelClassName, 
  ...checkboxProps 
}, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;
  
  return (
    <div className="flex items-center">
      {labelPosition === "start" && (
        <CheckboxLabel 
          htmlFor={checkboxId}
          position="start"
          disabled={checkboxProps.disabled}
          className={labelClassName}
        >
          {label}
        </CheckboxLabel>
      )}
      
      <Checkbox ref={ref} id={checkboxId} {...checkboxProps} />
      
      {labelPosition === "end" && (
        <CheckboxLabel 
          htmlFor={checkboxId}
          position="end"
          disabled={checkboxProps.disabled}
          className={labelClassName}
        >
          {label}
        </CheckboxLabel>
      )}
    </div>
  );
});
CheckboxWithLabel.displayName = "CheckboxWithLabel";

export { Checkbox, CheckboxGroup, CheckboxLabel, CheckboxWithLabel };
