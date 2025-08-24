"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";

export interface TagsInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  variant?: "primary" | "secondary" | "destructive" | "outline";
  allowDuplicates?: boolean;
  delimiter?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value = [],
      onChange,
      maxTags,
      variant = "primary",
      allowDuplicates = false,
      delimiter = ",",
      placeholder = "Add tag and press Enter",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [error, setError] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === delimiter) {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        removeTag(value.length - 1);
      }
    };

    const addTag = () => {
      const tag = inputValue.trim();
      
      if (!tag) return;
      
      if (!allowDuplicates && value.includes(tag)) {
        setError("This tag already exists");
        setTimeout(() => setError(""), 2000);
        return;
      }
      
      if (maxTags && value.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`);
        setTimeout(() => setError(""), 2000);
        return;
      }
      
      onChange([...value, tag]);
      setInputValue("");
      setError("");
    };

    const removeTag = (index: number) => {
      if (disabled) return;
      onChange(value.filter((_, i) => i !== index));
    };

    return (
      <div className="relative">
        <div
          className={cn(
            "flex min-h-[2.5rem] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "dark:bg-zinc-950/50 dark:border-zinc-800",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          {value.map((tag, index) => (
            <Badge
              key={index}
              variant={variant}
              className="gap-1 pr-1.5"
            >
              <span className="text-xs">{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </Badge>
          ))}
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : ""}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
              "dark:placeholder:text-zinc-500",
              "min-w-[120px]",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TagsInput.displayName = "TagsInput";

export { TagsInput };