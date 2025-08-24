"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Slider Component
 *
 * Accessible, customizable slider component fully integrated with the theme system.
 * Used for value ranges like volume, brightness, price ranges.
 */

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-5",
        default: "h-6",
        md: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const sliderTrackVariants = cva(
  "relative h-1.5 w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const sliderThumbVariants = cva(
  "block rounded-full border-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-foreground bg-background",
        primary: "border-primary bg-background",
        secondary: "border-secondary bg-background",
        accent: "border-accent bg-background",
        success: "border-success bg-background",
        warning: "border-warning bg-background",
        error: "border-error bg-background",
      },
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

// Custom type definition for component properties
type SliderBaseProps = {
  /**
   * Track variant
   */
  trackVariant?: VariantProps<typeof sliderTrackVariants>["variant"];
  /**
   * Range variant
   */
  rangeVariant?: VariantProps<typeof sliderRangeVariants>["variant"];
  /**
   * Thumb variant
   */
  thumbVariant?: VariantProps<typeof sliderThumbVariants>["variant"];
  /**
   * Thumb size
   */
  thumbSize?: VariantProps<typeof sliderThumbVariants>["size"];
  /**
   * Show value label
   */
  showValueLabel?: boolean;
  /**
   * Value label format function
   */
  valueLabelFormat?: (value: number) => string;
  /**
   * Value label class name
   */
  valueLabelClassName?: string;
  /**
   * Slider value
   */
  value?: number[];
  /**
   * Default value
   */
  defaultValue?: number[];
  /**
   * Function called when value changes
   */
  onValueChange?: (value: number[]) => void;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step value
   */
  step?: number;
  /**
   * Slider size
   */
  size?: VariantProps<typeof sliderVariants>["size"];
  /**
   * Disabled state
   */
  disabled?: boolean;
}

// Merge HTML properties without defaultValue conflicts
type SliderProps = SliderBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>

const Slider = React.forwardRef<
  HTMLDivElement,
  SliderProps
>(({
  className,
  size,
  trackVariant,
  rangeVariant,
  thumbVariant,
  thumbSize,
  showValueLabel = false,
  valueLabelFormat,
  valueLabelClassName,
  value,
  defaultValue = [0],
  onValueChange,
  disabled,
  ...props
}, ref) => {
  // Value management
  const [sliderValue, setSliderValue] = React.useState<number[]>(
    value as number[] || defaultValue as number[] || [0]
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSliderValue(value as number[]);
    }
  }, [value]);

  // Format value label with proper precision handling
  const formatValue = (val: number) => {
    if (valueLabelFormat) {
      return valueLabelFormat(val);
    }
    // Round to avoid floating point precision issues
    const roundedValue = Math.round(val * 100) / 100;
    return `${roundedValue}`;
  };

  // Calculate percentage for thumb position
  const calculateThumbPercent = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Handle mouse/touch events
  const trackRef = React.useRef<HTMLDivElement>(null);
  
  const min = props.min || 0;
  const max = props.max || 100;
  const step = props.step || 1;

  // Handle value change with proper precision
  const handleValueChange = (newValues: number[]) => {
    // Round values to avoid floating point precision issues
    const roundedValues = newValues.map(val => {
      if (step < 1) {
        // For decimal steps, round to appropriate decimal places
        const decimals = step.toString().split('.')[1]?.length || 0;
        return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
      }
      return Math.round(val);
    });
    
    setSliderValue(roundedValues);
    if (onValueChange) {
      onValueChange(roundedValues);
    }
  };

  // Handle track click
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const boundedValue = Math.max(min, Math.min(max, steppedValue));
    
    const newValues = [...sliderValue];
    // Just update the first thumb for simplicity
    newValues[0] = boundedValue;
    handleValueChange(newValues);
  };

  const handleThumbMouseDown = (index: number) => (event: React.MouseEvent) => {
    if (disabled) return;
    event.preventDefault();
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const boundedValue = Math.max(min, Math.min(max, steppedValue));
      
      const newValues = [...sliderValue];
      newValues[index] = boundedValue;
      handleValueChange(newValues);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="w-full" ref={ref} {...props}>
      {showValueLabel && (
        <div className={cn(
          "flex justify-end mb-1 text-sm text-muted-foreground",
          valueLabelClassName
        )}>
          {sliderValue.length === 1 ? (
            <span>{formatValue(sliderValue[0])}</span>
          ) : (
            <span>{formatValue(sliderValue[0])} - {formatValue(sliderValue[sliderValue.length - 1])}</span>
          )}
        </div>
      )}
      
      <div
        className={cn("moonui-theme", sliderVariants({ size }), className)}
        data-disabled={disabled ? true : undefined}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ variant: trackVariant || thumbVariant || "default" }))}
          onClick={handleTrackClick}
        >
          {/* Range */}
          <div
            className={cn(sliderRangeVariants({ variant: rangeVariant || thumbVariant || "primary" }))}
            style={{
              left: '0%',
              width: `${calculateThumbPercent(sliderValue[0], min, max)}%`,
            }}
          />
        </div>

        {/* Thumbs */}
        {sliderValue.map((value, i) => (
          <div
            key={i}
            className={cn(sliderThumbVariants({
              variant: thumbVariant || "primary",
              size: thumbSize
            }))}
            style={{
              left: `${calculateThumbPercent(value, min, max)}%`,
              transform: 'translateX(-50%)',
              position: 'absolute',
              top: '50%',
              marginTop: thumbSize === "sm" ? '-6px' : thumbSize === "lg" ? '-12px' : '-8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onMouseDown={handleThumbMouseDown(i)}
            aria-label={`Thumb ${i + 1}`}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
})

Slider.displayName = "Slider"

export { Slider }
