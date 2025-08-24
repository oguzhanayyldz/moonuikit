"use client"

import React, { useCallback, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { Separator } from './separator'
import { Toggle } from './toggle'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { cn } from '../../lib/utils'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Code,
  Type,
  Palette,
  Undo,
  Redo,
  Eye,
  Edit
} from 'lucide-react'

export interface SimpleEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minHeight?: number
  maxHeight?: number
  showToolbar?: boolean
  showPreview?: boolean
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  tooltip: string
  active?: boolean
  onClick: () => void
  disabled?: boolean
}

const ToolbarButton = ({ icon, tooltip, active, onClick, disabled }: ToolbarButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Toggle
        pressed={active}
        onPressedChange={() => onClick()}
        disabled={disabled}
        className="h-8 w-8 p-0"
      >
        {icon}
      </Toggle>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
)

const ColorPicker = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const colors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    '#EF4444', '#F59E0B', '#EAB308', '#22C55E',
    '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'
  ]

  return (
    <div className="grid grid-cols-4 gap-1 p-2">
      {colors.map(color => (
        <button
          key={color}
          className="w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  )
}

export const SimpleEditor = React.forwardRef<HTMLDivElement, SimpleEditorProps>(
  ({
    value = '',
    onChange,
    placeholder = 'Start writing...',
    disabled = false,
    className,
    minHeight = 200,
    maxHeight = 500,
    showToolbar = true,
    showPreview = true,
    ...props
  }, ref) => {
    const [content, setContent] = useState(value)
    const [isPreview, setIsPreview] = useState(false)
    const [sourceContent, setSourceContent] = useState(value)
    const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)
    const editorRef = React.useRef<HTMLDivElement>(null)
    const sourceRef = React.useRef<HTMLTextAreaElement>(null)

    // Format state tracking
    const [formatState, setFormatState] = useState({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      alignLeft: true,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      orderedList: false,
      unorderedList: false,
      quote: false,
      code: false
    })

    const updateContent = useCallback((newContent: string) => {
      setContent(newContent)
      onChange?.(newContent)
    }, [onChange])

    const saveSelection = useCallback(() => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0)
      }
      return null
    }, [])

    const restoreSelection = useCallback((range: Range | null) => {
      if (!range) return
      
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }, [])

    const executeCommand = useCallback((command: string, value?: string) => {
      if (disabled) return
      
      // Focus the editor first
      if (editorRef.current) {
        editorRef.current.focus()
      }
      
      // Save current selection before executing command
      const savedRange = saveSelection()
      
      // Execute the command
      const result = document.execCommand(command, false, value)
      
      if (!result) {
        console.warn(`Command '${command}' failed to execute`)
      }
      
      // Update content state to trigger re-render
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML
        updateContent(newContent)
      }
      
      // Update format state
      setFormatState({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikeThrough'),
        alignLeft: document.queryCommandState('justifyLeft'),
        alignCenter: document.queryCommandState('justifyCenter'),
        alignRight: document.queryCommandState('justifyRight'),
        alignJustify: document.queryCommandState('justifyFull'),
        orderedList: document.queryCommandState('insertOrderedList'),
        unorderedList: document.queryCommandState('insertUnorderedList'),
        quote: document.queryCommandState('formatBlock'),
        code: document.queryCommandState('formatBlock')
      })
      
      // Keep focus on editor
      if (editorRef.current) {
        editorRef.current.focus()
      }
    }, [disabled, saveSelection, updateContent])

    const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML
      updateContent(newContent)
    }, [updateContent])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault()
            executeCommand('bold')
            break
          case 'i':
            e.preventDefault()
            executeCommand('italic')
            break
          case 'u':
            e.preventDefault()
            executeCommand('underline')
            break
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              executeCommand('redo')
            } else {
              executeCommand('undo')
            }
            break
        }
      }

      // Handle Tab for indentation
      if (e.key === 'Tab') {
        e.preventDefault()
        executeCommand('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;')
      }
    }, [executeCommand])

    const insertLink = useCallback(() => {
      const url = prompt('Enter URL:')
      if (url) {
        executeCommand('createLink', url)
      }
    }, [executeCommand])

    const insertImage = useCallback(() => {
      const url = prompt('Enter image URL:')
      if (url) {
        executeCommand('insertImage', url)
      }
    }, [executeCommand])

    const formatHeading = useCallback((level: string) => {
      executeCommand('formatBlock', `<h${level}>`)
    }, [executeCommand])

    const setTextColor = useCallback((color: string) => {
      // First try the modern way
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const span = document.createElement('span')
        span.style.color = color
        
        try {
          range.surroundContents(span)
        } catch (e) {
          // If surroundContents fails, use execCommand
          executeCommand('foreColor', color)
        }
        
        // Update content
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML
          updateContent(newContent)
        }
      }
    }, [executeCommand, updateContent])

    // Convert HTML to plain text for preview
    const getPlainText = (html: string) => {
      if (typeof window === 'undefined') {
        // Server-side: simple regex-based HTML stripping
        return html
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
          .replace(/&amp;/g, '&')  // Replace &amp; with &
          .replace(/&lt;/g, '<')   // Replace &lt; with <
          .replace(/&gt;/g, '>')   // Replace &gt; with >
          .replace(/&quot;/g, '"') // Replace &quot; with "
          .replace(/&#39;/g, "'")  // Replace &#39; with '
      }
      // Client-side: use DOM for accurate conversion
      const div = document.createElement('div')
      div.innerHTML = html
      return div.textContent || div.innerText || ''
    }

    React.useEffect(() => {
      if (editorRef.current && content && content !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = content
      }
    }, [content])

    // Sync source content when value prop changes
    React.useEffect(() => {
      if (value !== undefined && value !== content) {
        setContent(value)
        setSourceContent(value)
      }
    }, [value, content])

    const toolbar = showToolbar && (
      <TooltipProvider>
        <motion.div
          className="flex items-center gap-1 p-2 border-b bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
        {/* Text Formatting */}
        {!isPreview && (
          <>
            <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Bold className="h-3 w-3" />}
            tooltip="Bold (Ctrl+B)"
            active={formatState.bold}
            onClick={() => executeCommand('bold')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Italic className="h-3 w-3" />}
            tooltip="Italic (Ctrl+I)"
            active={formatState.italic}
            onClick={() => executeCommand('italic')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Underline className="h-3 w-3" />}
            tooltip="Underline (Ctrl+U)"
            active={formatState.underline}
            onClick={() => executeCommand('underline')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Strikethrough className="h-3 w-3" />}
            tooltip="Strikethrough"
            active={formatState.strikethrough}
            onClick={() => executeCommand('strikeThrough')}
            disabled={disabled}
          />
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Font Size / Heading */}
        <Select 
          onValueChange={(value) => {
            if (value.startsWith('h')) {
              formatHeading(value.substring(1))
            } else if (value === 'normal') {
              executeCommand('formatBlock', 'p')
            } else {
              executeCommand('fontSize', value)
            }
          }} 
          disabled={disabled}
        >
          <SelectTrigger className="w-24 h-8">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Small</SelectItem>
            <SelectItem value="3">Normal</SelectItem>
            <SelectItem value="5">Large</SelectItem>
            <SelectItem value="7">X-Large</SelectItem>
            <Separator className="my-1" />
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
            <SelectItem value="h4">Heading 4</SelectItem>
            <SelectItem value="h5">Heading 5</SelectItem>
            <SelectItem value="h6">Heading 6</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<AlignLeft className="h-3 w-3" />}
            tooltip="Align Left"
            active={formatState.alignLeft}
            onClick={() => executeCommand('justifyLeft')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<AlignCenter className="h-3 w-3" />}
            tooltip="Align Center"
            active={formatState.alignCenter}
            onClick={() => executeCommand('justifyCenter')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<AlignRight className="h-3 w-3" />}
            tooltip="Align Right"
            active={formatState.alignRight}
            onClick={() => executeCommand('justifyRight')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<AlignJustify className="h-3 w-3" />}
            tooltip="Justify"
            active={formatState.alignJustify}
            onClick={() => executeCommand('justifyFull')}
            disabled={disabled}
          />
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<List className="h-3 w-3" />}
            tooltip="Bullet List"
            active={formatState.unorderedList}
            onClick={() => executeCommand('insertUnorderedList')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<ListOrdered className="h-3 w-3" />}
            tooltip="Numbered List"
            active={formatState.orderedList}
            onClick={() => executeCommand('insertOrderedList')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Quote className="h-3 w-3" />}
            tooltip="Quote"
            active={formatState.quote}
            onClick={() => executeCommand('formatBlock', 'blockquote')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Code className="h-3 w-3" />}
            tooltip="Code Block"
            active={formatState.code}
            onClick={() => executeCommand('formatBlock', 'pre')}
            disabled={disabled}
          />
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Indentation */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<span className="text-xs font-mono">←</span>}
            tooltip="Decrease Indent"
            onClick={() => executeCommand('outdent')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<span className="text-xs font-mono">→</span>}
            tooltip="Increase Indent"
            onClick={() => executeCommand('indent')}
            disabled={disabled}
          />
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Insert */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Link className="h-3 w-3" />}
            tooltip="Insert Link"
            onClick={insertLink}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<ImageIcon className="h-3 w-3" />}
            tooltip="Insert Image"
            onClick={insertImage}
            disabled={disabled}
          />
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              disabled={disabled}
              title="Text Color"
            >
              <Palette className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <ColorPicker onColorSelect={setTextColor} />
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Undo className="h-3 w-3" />}
            tooltip="Undo (Ctrl+Z)"
            onClick={() => executeCommand('undo')}
            disabled={disabled}
          />
          <ToolbarButton
            icon={<Redo className="h-3 w-3" />}
            tooltip="Redo (Ctrl+Shift+Z)"
            onClick={() => executeCommand('redo')}
            disabled={disabled}
          />
        </div>

          </>
        )}

        {/* Preview Toggle */}
        {showPreview && (
          <>
            {!isPreview && <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-zinc-600" />}
            <ToolbarButton
              icon={isPreview ? <Edit className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              tooltip={isPreview ? "Edit Mode" : "View Source Code"}
              active={isPreview}
              onClick={() => {
                if (isPreview) {
                  // Apply source changes to content when switching back to edit mode
                  updateContent(sourceContent)
                } else {
                  // Update source content when switching to preview mode
                  setSourceContent(content)
                }
                setIsPreview(!isPreview)
              }}
              disabled={disabled}
            />
          </>
        )}
        </motion.div>
      </TooltipProvider>
    )

    return (
      <div
        ref={ref}
        className={cn(
          "border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {toolbar}

        <div className="relative">
          {isPreview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-50 dark:bg-zinc-900/95"
              style={{ minHeight, maxHeight, overflow: 'auto' }}
            >
              <textarea
                ref={sourceRef}
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                className="w-full h-full bg-transparent p-4 font-mono text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
                style={{ minHeight: minHeight - 32 }}
                disabled={disabled}
                placeholder="HTML source code..."
              />
            </motion.div>
          ) : (
            <motion.div
              ref={editorRef}
              contentEditable={!disabled}
              suppressContentEditableWarning
              className={cn(
                "p-4 outline-none prose prose-sm dark:prose-invert max-w-none overflow-y-auto",
                "bg-slate-50 dark:bg-zinc-900/95",
                "text-gray-900 dark:text-gray-100",
                "focus:ring-0",
                "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
                "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3",
                "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2",
                "[&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2",
                "[&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-1",
                "[&_h6]:text-sm [&_h6]:font-bold [&_h6]:mb-1",
                "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
                "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
                "[&_li]:mb-1",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic",
                "[&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto"
              )}
              style={{ minHeight, maxHeight }}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              data-placeholder={placeholder}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          {/* Placeholder */}
          {!content && !isPreview && (
            <div
              className="absolute top-4 left-4 text-muted-foreground pointer-events-none"
              style={{ fontSize: '16px' }}
            >
              {placeholder}
            </div>
          )}
        </div>

        {/* Character Count */}
        <div className="px-4 py-2 border-t bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-sm text-xs text-gray-600 dark:text-gray-400">
          <CharacterCount content={content} />
        </div>
      </div>
    )
  }
)

SimpleEditor.displayName = "SimpleEditor"

// Character count component to avoid hydration issues
const CharacterCount = ({ content }: { content: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const getPlainText = (html: string) => {
      const div = document.createElement('div')
      div.innerHTML = html
      return div.textContent || div.innerText || ''
    }
    setCount(getPlainText(content).length)
  }, [content])
  
  return <>{count} characters</>
}