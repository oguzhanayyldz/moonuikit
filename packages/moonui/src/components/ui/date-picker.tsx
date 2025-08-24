"use client";

import * as React from "react";
import { format, isValid } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
// Define pageTransitions locally since micro-interactions might not exist
const pageTransitions = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

/**
 * DatePicker Component
 * 
 * A comprehensive date picker with calendar interface
 */

const datePickerVariants = cva(
  "w-full justify-start text-left font-normal",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      state: {
        default: "",
        error: "border-destructive focus:ring-destructive",
        success: "border-success focus:ring-success",
        warning: "border-warning focus:ring-warning",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

export interface DatePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">,
    VariantProps<typeof datePickerVariants> {
  /**
   * Selected date value
   */
  value?: Date;
  /**
   * Callback when date changes
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Date format string
   */
  formatString?: string;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Disabled dates
   */
  disabledDates?: Date[];
  /**
   * Disabled days of week (0-6, Sunday is 0)
   */
  disabledDaysOfWeek?: number[];
  /**
   * Show week numbers
   */
  showWeekNumbers?: boolean;
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Allow clear
   */
  allowClear?: boolean;
  /**
   * Read only
   */
  readOnly?: boolean;
  /**
   * Show today button
   */
  showTodayButton?: boolean;
  /**
   * Calendar props
   */
  calendarProps?: React.ComponentProps<typeof Calendar>;
}

export function DatePicker({
  className,
  variant,
  size,
  state,
  value,
  onChange,
  placeholder = "Pick a date",
  formatString = "PPP",
  minDate,
  maxDate,
  disabledDates,
  disabledDaysOfWeek,
  showWeekNumbers,
  iconPosition = "left",
  icon,
  allowClear = true,
  readOnly = false,
  showTodayButton = true,
  calendarProps,
  disabled,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const handleSelect = (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => {
    // Handle single date selection for now
    const singleDate = Array.isArray(date) ? date[0] : 
                       (date && typeof date === 'object' && 'from' in date) ? date.from :
                       date as Date | undefined;
    setInternalDate(singleDate);
    onChange?.(singleDate);
    if (singleDate) {
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(undefined);
  };

  const handleToday = () => {
    const today = new Date();
    handleSelect(today);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDates?.some(d => d.toDateString() === date.toDateString())) return true;
    if (disabledDaysOfWeek?.includes(date.getDay())) return true;
    return false;
  };

  const displayValue = internalDate && isValid(internalDate)
    ? format(internalDate, formatString)
    : null;

  const iconElement = icon || <CalendarIcon className="h-4 w-4" />;

  return (
    <div className="moonui-theme">
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant === "ghost" ? "ghost" : "outline"}
          className={cn(
            datePickerVariants({ variant, size, state }),
            !displayValue && "text-muted-foreground",
            className
          )}
          disabled={disabled || readOnly}
          {...props}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={displayValue || "placeholder"}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 flex-1"
            >
              {iconPosition === "left" && iconElement}
              <span className="flex-1 truncate">
                {displayValue || placeholder}
              </span>
              {iconPosition === "right" && iconElement}
            </motion.div>
          </AnimatePresence>
          {allowClear && displayValue && !readOnly && !disabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleClear}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e as any);
                }
              }}
            >
              <span className="sr-only">Clear date</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[360px] p-0 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-background/95 backdrop-blur-sm !z-[9999]" 
        align="start"
        sideOffset={12}
      >
        <motion.div
          {...pageTransitions}
          className="rounded-2xl bg-background overflow-hidden"
        >
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            showOutsideDays={false}
            className={cn("rounded-2xl", calendarProps?.className)}
            {...calendarProps}
          />
          {showTodayButton && (
            <div className="border-t px-4 py-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToday}
                className="w-full justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                Today
              </Button>
            </div>
          )}
        </motion.div>
      </PopoverContent>
    </Popover>
    </div>
  );
}

/**
 * DateRangePicker Component
 * 
 * Select a date range with start and end dates
 */

export interface DateRangePickerProps
  extends Omit<DatePickerProps, "value" | "onChange"> {
  /**
   * Selected date range
   */
  value?: { from: Date | undefined; to: Date | undefined };
  /**
   * Callback when date range changes
   */
  onChange?: (range: { from: Date | undefined; to: Date | undefined } | undefined) => void;
  /**
   * Separator between dates
   */
  separator?: string;
}

export function DateRangePicker({
  className,
  value,
  onChange,
  placeholder = "Pick a date range",
  formatString = "LLL dd, y",
  separator = " - ",
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalRange, setInternalRange] = React.useState(value);

  React.useEffect(() => {
    setInternalRange(value);
  }, [value]);

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    setInternalRange(range);
    onChange?.(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  const displayValue = React.useMemo(() => {
    if (!internalRange?.from) return null;
    if (!internalRange?.to) {
      return format(internalRange.from, formatString);
    }
    return `${format(internalRange.from, formatString)}${separator}${format(
      internalRange.to,
      formatString
    )}`;
  }, [internalRange, formatString, separator]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={props.variant === "ghost" ? "ghost" : "outline"}
          className={cn(
            datePickerVariants({ 
              variant: props.variant, 
              size: props.size, 
              state: props.state 
            }),
            !displayValue && "text-muted-foreground",
            className
          )}
          disabled={props.disabled || props.readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="flex-1 truncate text-left">
            {displayValue || placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-background/95 backdrop-blur-sm !z-[9999]" align="start" sideOffset={12}>
        <Calendar
          mode="range"
          defaultMonth={internalRange?.from}
          selected={internalRange}
          onSelect={handleSelect as any}
          showOutsideDays={false}
          {...props.calendarProps}
          className="rounded-2xl"
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * DateTimePicker Component
 * 
 * Combined date and time picker
 */

export interface DateTimePickerProps extends DatePickerProps {
  /**
   * Show time picker
   */
  showTimePicker?: boolean;
  /**
   * Time format (12 or 24 hour)
   */
  timeFormat?: "12" | "24";
  /**
   * Time interval in minutes
   */
  timeInterval?: number;
}

export function DateTimePicker({
  value,
  onChange,
  formatString = "PPP p",
  showTimePicker = true,
  timeFormat = "24",
  timeInterval = 15,
  ...props
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState<string>(
    value ? format(value, timeFormat === "24" ? "HH:mm" : "hh:mm a") : "00:00"
  );

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      setDate(undefined);
      onChange?.(undefined);
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    newDate.setHours(hours, minutes);
    setDate(newDate);
    onChange?.(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (date) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      setDate(newDate);
      onChange?.(newDate);
    }
  };

  // Generate time options
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += timeInterval) {
        const hour24 = h.toString().padStart(2, "0");
        const minute = m.toString().padStart(2, "0");
        const time24 = `${hour24}:${minute}`;
        
        if (timeFormat === "12") {
          const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
          const ampm = h < 12 ? "AM" : "PM";
          const time12 = `${hour12}:${minute} ${ampm}`;
          options.push({ value: time24, label: time12 });
        } else {
          options.push({ value: time24, label: time24 });
        }
      }
    }
    return options;
  }, [timeFormat, timeInterval]);

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        {...props}
        value={date}
        onChange={handleDateChange}
        formatString="PPP"
        showTodayButton={false}
      />
      {showTimePicker && date && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2"
        >
          <Clock className="h-4 w-4 text-muted-foreground" />
          <select
            value={time}
            onChange={handleTimeChange}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>
      )}
    </div>
  );
}

/**
 * MonthPicker Component
 * 
 * Select month and year
 */

export interface MonthPickerProps extends Omit<DatePickerProps, "formatString"> {
  /**
   * Format for displaying the month
   */
  formatString?: string;
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "Pick a month",
  formatString = "MMMM yyyy",
  ...props
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value || new Date());

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(monthIndex);
    onChange?.(newDate);
    setOpen(false);
  };

  const handleYearChange = (increment: number) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setViewDate(newDate);
  };

  const displayValue = value ? format(value, formatString) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={props.variant === "default" ? "outline" : (props.variant || "outline")}
          className={cn(
            datePickerVariants({ 
              variant: props.variant, 
              size: props.size, 
              state: props.state 
            }),
            !displayValue && "text-muted-foreground",
            props.className
          )}
          disabled={props.disabled || props.readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 shadow-2xl border border-gray-200 dark:border-gray-700 bg-background !z-[9999]" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleYearChange(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">
              {viewDate.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleYearChange(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={value && value.getMonth() === index ? "primary" : "outline"}
                size="sm"
                onClick={() => handleMonthSelect(index)}
                className="h-8 text-xs"
              >
                {month.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Re-export utilities
export { format } from "date-fns";

// Import ChevronLeft and ChevronRight for MonthPicker
import { ChevronLeft, ChevronRight } from "lucide-react";