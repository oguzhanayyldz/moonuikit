"use client"

// Basic Rich Text Editor - Free Version

import * as React from "react"
import { cn } from "../../../lib/utils"

export interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
  disabled = false
}: RichTextEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={cn("border border-input rounded-md", className)}>
      <div className="border-b border-border p-2 bg-muted/50">
        <div className="flex gap-1">
          <button
            type="button"
            className="px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50"
            disabled={disabled}
            title="Bold (Pro feature)"
          >
            B
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50"
            disabled={disabled}
            title="Italic (Pro feature)"
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm rounded hover:bg-background disabled:opacity-50"
            disabled={disabled}
            title="Underline (Pro feature)"
          >
            U
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full min-h-[200px] p-3 resize-none border-0 bg-transparent",
          "focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  )
}