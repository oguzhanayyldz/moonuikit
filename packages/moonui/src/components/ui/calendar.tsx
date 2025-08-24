"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isSameMonth, 
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from "date-fns";

export interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | { from?: Date; to?: Date } | undefined;
  onSelect?: (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => void;
  disabled?: (date: Date) => boolean;
  showOutsideDays?: boolean;
  className?: string;
  classNames?: Record<string, string>;
  numberOfMonths?: number;
  defaultMonth?: Date;
  initialFocus?: boolean;
}

function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  showOutsideDays = false,
  className,
  classNames,
  numberOfMonths = 1,
  defaultMonth,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    defaultMonth || (selected && (selected as Date)) || new Date()
  );

  const weekDays = [
    { short: "S", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "T", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "T", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "S", full: "Saturday" }
  ];

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (disabled?.(date)) return;

    if (mode === "single") {
      onSelect?.(date);
    } else if (mode === "range") {
      const currentSelection = selected as { from?: Date; to?: Date } | undefined;
      if (!currentSelection?.from || (currentSelection.from && currentSelection.to)) {
        onSelect?.({ from: date, to: undefined });
      } else {
        if (date < currentSelection.from) {
          onSelect?.({ from: date, to: currentSelection.from });
        } else {
          onSelect?.({ from: currentSelection.from, to: date });
        }
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selected) return false;
    
    if (mode === "single") {
      return isSameDay(date, selected as Date);
    } else if (mode === "range") {
      const range = selected as { from?: Date; to?: Date };
      if (range.from && range.to) {
        return date >= range.from && date <= range.to;
      }
      return range.from ? isSameDay(date, range.from) : false;
    }
    return false;
  };

  const isRangeStart = (date: Date) => {
    if (mode !== "range" || !selected) return false;
    const range = selected as { from?: Date; to?: Date };
    return range.from ? isSameDay(date, range.from) : false;
  };

  const isRangeEnd = (date: Date) => {
    if (mode !== "range" || !selected) return false;
    const range = selected as { from?: Date; to?: Date };
    return range.to ? isSameDay(date, range.to) : false;
  };

  const isRangeMiddle = (date: Date) => {
    if (mode !== "range" || !selected) return false;
    const range = selected as { from?: Date; to?: Date };
    if (!range.from || !range.to) return false;
    return date > range.from && date < range.to;
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Get days from previous month to fill the first week
    const firstDayOfWeek = getDay(start);
    const previousMonthDays = [];
    if (firstDayOfWeek > 0 && showOutsideDays) {
      const previousMonthStart = startOfWeek(start);
      const previousMonthEnd = new Date(start);
      previousMonthEnd.setDate(previousMonthEnd.getDate() - 1);
      previousMonthDays.push(...eachDayOfInterval({ 
        start: previousMonthStart, 
        end: previousMonthEnd 
      }));
    }
    
    // Get days from next month to fill the last week
    const lastDayOfWeek = getDay(end);
    const nextMonthDays = [];
    if (lastDayOfWeek < 6 && showOutsideDays) {
      const nextMonthStart = new Date(end);
      nextMonthStart.setDate(nextMonthStart.getDate() + 1);
      const nextMonthEnd = endOfWeek(end);
      nextMonthDays.push(...eachDayOfInterval({ 
        start: nextMonthStart, 
        end: nextMonthEnd 
      }));
    }
    
    // Add empty cells for the first week if not showing outside days
    const emptyCells = [];
    if (!showOutsideDays && firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        emptyCells.push(null);
      }
    }
    
    return [...previousMonthDays, ...emptyCells, ...days, ...nextMonthDays];
  };

  const days = getDaysInMonth();

  return (
    <div className={cn("moonui-theme", "p-0", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 dark:border-gray-700/50">
        <button
          onClick={handlePreviousMonth}
          className={cn(
            "h-10 w-10 bg-transparent p-0 rounded-lg",
            "hover:bg-muted transition-colors",
            "inline-flex items-center justify-center"
          )}
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <h2 className="text-base font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        
        <button
          onClick={handleNextMonth}
          className={cn(
            "h-10 w-10 bg-transparent p-0 rounded-lg",
            "hover:bg-muted transition-colors",
            "inline-flex items-center justify-center"
          )}
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 pb-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day, index) => (
            <div
              key={`weekday-${index}`}
              className="text-muted-foreground text-xs font-medium h-10 flex items-center justify-center"
              title={day.full}
            >
              {day.short}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="h-10 w-10" />;
            }

            const isOutsideMonth = !isSameMonth(date, currentMonth);
            const isDisabled = disabled?.(date) || false;
            const isSelected = isDateSelected(date);
            const isTodayDate = isToday(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            const rangeMiddle = isRangeMiddle(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled}
                className={cn(
                  "h-10 w-10 p-0 font-normal",
                  "inline-flex items-center justify-center rounded-lg",
                  "hover:bg-muted transition-colors text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isOutsideMonth && "text-muted-foreground/50",
                  isDisabled && "text-muted-foreground/30 cursor-not-allowed hover:bg-transparent",
                  isSelected && !rangeMiddle && "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground",
                  isTodayDate && "font-semibold relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
                  rangeMiddle && "bg-accent/30 text-accent-foreground rounded-none",
                  rangeStart && "rounded-r-none",
                  rangeEnd && "rounded-l-none"
                )}
                type="button"
              >
                {format(date, "d")}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };