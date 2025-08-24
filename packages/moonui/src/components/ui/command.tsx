"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Dialog, DialogContent, DialogTitle } from "./dialog"

/**
 * Command (Komut Paleti) Bileşeni
 * 
 * Gerçek command palette işlevselliği ile klavye navigasyonu, arama ve filtreleme.
 * cmdk kütüphanesi üzerine inşa edilmiş, tam özellikli command interface.
 */

const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-sm",
        bordered: "bg-popover text-popover-foreground border border-border",
      },
      size: {
        sm: "min-h-[200px]",
        default: "min-h-[300px]",
        lg: "min-h-[400px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Command bileşeni - cmdk primitive wrapper
interface CommandProps 
  extends React.ComponentProps<typeof CommandPrimitive>,
    VariantProps<typeof commandVariants> {}

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, variant, size, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("moonui-theme", commandVariants({ variant, size }), className)}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

// CommandDialog bileşeni
interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  commandClassName?: string
  children?: React.ReactNode
}

const CommandDialog = ({ 
  children, 
  commandClassName,
  ...props 
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg" hideCloseButton>
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <Command className={cn(
          "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
          commandClassName
        )}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// CommandInput bileşeni
interface CommandInputProps 
  extends React.ComponentProps<typeof CommandPrimitive.Input> {}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

// CommandList bileşeni
interface CommandListProps 
  extends React.ComponentProps<typeof CommandPrimitive.List> {}

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("moonui-theme", "max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

// CommandEmpty bileşeni
interface CommandEmptyProps 
  extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("moonui-theme", "py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

// CommandGroup bileşeni
interface CommandGroupProps 
  extends React.ComponentProps<typeof CommandPrimitive.Group> {}

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

// CommandSeparator bileşeni
interface CommandSeparatorProps 
  extends React.ComponentProps<typeof CommandPrimitive.Separator> {}

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("moonui-theme", "-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

// CommandItem bileşeni
interface CommandItemProps 
  extends React.ComponentProps<typeof CommandPrimitive.Item> {}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

// CommandShortcut bileşeni - utility component
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}