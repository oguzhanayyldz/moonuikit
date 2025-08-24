/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  commandVariants,
  commandInputVariants,
  commandListVariants,
  commandGroupVariants,
  commandItemVariants,
} from '../command'

// Mock Dialog component
jest.mock('./dialog', () => ({
  Dialog: ({ children, open, ...props }: any) => (
    <div data-testid="dialog" data-open={open ? 'true' : 'false'} {...props}>{children}</div>
  ),
  DialogContent: ({ children, className, ...props }: React.ComponentProps<'div'>) => (
    <div data-testid="dialog-content" className={className} {...props}>{children}</div>
  ),
}))

describe('Command Components', () => {
  describe('Command Component', () => {
    it('renders correctly with default props', () => {
      render(<Command data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toBeInTheDocument()
      expect(command).toHaveClass('flex h-full w-full flex-col')
    })

    it('applies custom className', () => {
      render(<Command className="custom-class" data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Command ref={ref} data-testid="command">Content</Command>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(Command.displayName).toBe('Command')
    })

    it('renders default variant correctly', () => {
      render(<Command data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('bg-popover text-popover-foreground')
    })

    it('renders glass variant correctly', () => {
      render(<Command variant="glass" data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('bg-background/80 backdrop-blur-sm')
    })

    it('renders bordered variant correctly', () => {
      render(<Command variant="bordered" data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('border border-border')
    })

    it('renders sm size correctly', () => {
      render(<Command size="sm" data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('p-2')
    })

    it('renders default size correctly', () => {
      render(<Command data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('p-4')
    })

    it('renders lg size correctly', () => {
      render(<Command size="lg" data-testid="command">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('p-6')
    })

    it('passes through HTML attributes', () => {
      render(<Command data-testid="command" id="command-1">Content</Command>)

      const command = screen.getByTestId('command')
      expect(command).toHaveAttribute('id', 'command-1')
    })
  })

  describe('CommandDialog Component', () => {
    it('renders correctly with default props', () => {
      render(
        <CommandDialog open={true}>
          <div>Dialog Content</div>
        </CommandDialog>
      )

      const dialog = screen.getByTestId('dialog')
      const dialogContent = screen.getByTestId('dialog-content')
      expect(dialog).toBeInTheDocument()
      expect(dialogContent).toBeInTheDocument()
    })

    it('applies custom commandClassName', () => {
      render(
        <CommandDialog open={true} commandClassName="custom-command">
          <div>Dialog Content</div>
        </CommandDialog>
      )

      const dialogContent = screen.getByTestId('dialog-content')
      expect(dialogContent.querySelector('[class*="custom-command"]')).toBeInTheDocument()
    })

    it('passes through dialog props', () => {
      const onOpenChange = jest.fn()
      render(
        <CommandDialog open={true} onOpenChange={onOpenChange}>
          <div>Dialog Content</div>
        </CommandDialog>
      )

      const dialog = screen.getByTestId('dialog')
      expect(dialog).toHaveAttribute('data-open', 'true')
    })
  })

  describe('CommandInput Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandInput data-testid="command-input" />)

      const input = screen.getByTestId('command-input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('flex')
      expect(input).toHaveClass('h-11')
      expect(input).toHaveClass('w-full')
    })

    it('renders search icon', () => {
      render(<CommandInput />)

      const searchIcon = document.querySelector('svg')
      expect(searchIcon).toBeInTheDocument()
      expect(searchIcon).toHaveClass('h-4 w-4 shrink-0 opacity-50')
    })

    it('applies custom className', () => {
      render(<CommandInput className="custom-input" data-testid="command-input" />)

      const input = screen.getByTestId('command-input')
      expect(input).toHaveClass('custom-input')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<CommandInput ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('maintains displayName', () => {
      expect(CommandInput.displayName).toBe('CommandInput')
    })

    it('renders minimal variant correctly', () => {
      render(<CommandInput variant="minimal" data-testid="command-input" />)

      const input = screen.getByTestId('command-input')
      expect(input).toHaveClass('h-9')
    })

    it('renders bordered variant correctly', () => {
      render(<CommandInput variant="bordered" data-testid="command-input" />)

      const input = screen.getByTestId('command-input')
      expect(input).toHaveClass('border-b border-border')
    })

    it('handles input events', () => {
      const onChange = jest.fn()
      render(<CommandInput onChange={onChange} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test' } })
      expect(onChange).toHaveBeenCalled()
    })

    it('passes through HTML attributes', () => {
      render(<CommandInput placeholder="Search..." id="search-input" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Search...')
      expect(input).toHaveAttribute('id', 'search-input')
    })
  })

  describe('CommandList Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandList data-testid="command-list">List Content</CommandList>)

      const list = screen.getByTestId('command-list')
      expect(list).toBeInTheDocument()
      expect(list).toHaveClass('max-h-[300px] overflow-y-auto')
      expect(list).toHaveAttribute('role', 'listbox')
    })

    it('applies custom className', () => {
      render(<CommandList className="custom-list" data-testid="command-list">Content</CommandList>)

      const list = screen.getByTestId('command-list')
      expect(list).toHaveClass('custom-list')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CommandList ref={ref}>Content</CommandList>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CommandList.displayName).toBe('CommandList')
    })

    it('renders scrollable variant correctly', () => {
      render(<CommandList variant="scrollable" data-testid="command-list">Content</CommandList>)

      const list = screen.getByTestId('command-list')
      expect(list).toHaveClass('max-h-[400px]')
    })

    it('renders compact variant correctly', () => {
      render(<CommandList variant="compact" data-testid="command-list">Content</CommandList>)

      const list = screen.getByTestId('command-list')
      expect(list).toHaveClass('max-h-[200px]')
    })

    it('passes through HTML attributes', () => {
      render(<CommandList data-testid="command-list" id="list-1">Content</CommandList>)

      const list = screen.getByTestId('command-list')
      expect(list).toHaveAttribute('id', 'list-1')
    })
  })

  describe('CommandEmpty Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandEmpty data-testid="command-empty">No results</CommandEmpty>)

      const empty = screen.getByTestId('command-empty')
      expect(empty).toBeInTheDocument()
      expect(empty).toHaveClass('py-6 text-center text-sm text-muted-foreground')
    })

    it('applies custom className', () => {
      render(<CommandEmpty className="custom-empty" data-testid="command-empty">No results</CommandEmpty>)

      const empty = screen.getByTestId('command-empty')
      expect(empty).toHaveClass('custom-empty')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CommandEmpty ref={ref}>No results</CommandEmpty>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CommandEmpty.displayName).toBe('CommandEmpty')
    })

    it('passes through HTML attributes', () => {
      render(<CommandEmpty data-testid="command-empty" id="empty-1">No results</CommandEmpty>)

      const empty = screen.getByTestId('command-empty')
      expect(empty).toHaveAttribute('id', 'empty-1')
    })
  })

  describe('CommandGroup Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandGroup data-testid="command-group">Group Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group).toBeInTheDocument()
      expect(group).toHaveClass('overflow-hidden p-1 text-foreground')
    })

    it('applies custom className', () => {
      render(<CommandGroup className="custom-group" data-testid="command-group">Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group).toHaveClass('custom-group')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CommandGroup ref={ref}>Content</CommandGroup>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CommandGroup.displayName).toBe('CommandGroup')
    })

    it('renders heading when provided', () => {
      render(
        <CommandGroup heading="Group Title" data-testid="command-group">
          Group Content
        </CommandGroup>
      )

      expect(screen.getByText('Group Title')).toBeInTheDocument()
      const heading = screen.getByText('Group Title')
      expect(heading).toHaveClass('px-2 py-1.5 text-xs font-medium text-muted-foreground')
    })

    it('renders without heading', () => {
      render(<CommandGroup data-testid="command-group">Group Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group.querySelector('.px-2.py-1\\.5')).not.toBeInTheDocument()
    })

    it('renders separated variant correctly', () => {
      render(<CommandGroup variant="separated" data-testid="command-group">Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group).toHaveClass('mt-2 border-t border-border pt-2')
    })

    it('renders indented variant correctly', () => {
      render(<CommandGroup variant="indented" data-testid="command-group">Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group).toHaveClass('pl-4')
    })

    it('passes through HTML attributes', () => {
      render(<CommandGroup data-testid="command-group" id="group-1">Content</CommandGroup>)

      const group = screen.getByTestId('command-group')
      expect(group).toHaveAttribute('id', 'group-1')
    })
  })

  describe('CommandItem Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandItem data-testid="command-item">Item Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveClass('relative flex cursor-default select-none')
      expect(item).toHaveAttribute('role', 'option')
    })

    it('applies custom className', () => {
      render(<CommandItem className="custom-item" data-testid="command-item">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveClass('custom-item')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CommandItem ref={ref}>Content</CommandItem>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CommandItem.displayName).toBe('CommandItem')
    })

    it('handles selected state', () => {
      render(<CommandItem selected={true} data-testid="command-item">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveAttribute('aria-selected', 'true')
    })

    it('handles disabled state', () => {
      render(<CommandItem disabled={true} data-testid="command-item">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveAttribute('data-disabled', '')
    })

    it('handles click events with onSelect', () => {
      const onSelect = jest.fn()
      render(
        <CommandItem onSelect={onSelect} value="test-value" data-testid="command-item">
          Content
        </CommandItem>
      )

      const item = screen.getByTestId('command-item')
      fireEvent.click(item)
      expect(onSelect).toHaveBeenCalledWith('test-value')
    })

    it('does not call onSelect when disabled', () => {
      const onSelect = jest.fn()
      render(
        <CommandItem onSelect={onSelect} disabled={true} value="test-value" data-testid="command-item">
          Content
        </CommandItem>
      )

      const item = screen.getByTestId('command-item')
      fireEvent.click(item)
      expect(onSelect).not.toHaveBeenCalled()
    })

    it('renders subtle variant correctly', () => {
      render(<CommandItem variant="subtle" data-testid="command-item">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveClass('aria-selected:bg-accent/10')
    })

    it('renders ghost variant correctly', () => {
      render(<CommandItem variant="ghost" data-testid="command-item">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveClass('hover:bg-muted/10')
    })

    it('passes through HTML attributes', () => {
      render(<CommandItem data-testid="command-item" id="item-1">Content</CommandItem>)

      const item = screen.getByTestId('command-item')
      expect(item).toHaveAttribute('id', 'item-1')
    })
  })

  describe('CommandShortcut Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandShortcut data-testid="command-shortcut">⌘K</CommandShortcut>)

      const shortcut = screen.getByTestId('command-shortcut')
      expect(shortcut).toBeInTheDocument()
      expect(shortcut).toHaveClass('ml-auto text-xs tracking-widest text-muted-foreground')
    })

    it('applies custom className', () => {
      render(<CommandShortcut className="custom-shortcut" data-testid="command-shortcut">⌘K</CommandShortcut>)

      const shortcut = screen.getByTestId('command-shortcut')
      expect(shortcut).toHaveClass('custom-shortcut')
    })

    it('maintains displayName', () => {
      expect(CommandShortcut.displayName).toBe('CommandShortcut')
    })

    it('passes through HTML attributes', () => {
      render(<CommandShortcut data-testid="command-shortcut" id="shortcut-1">⌘K</CommandShortcut>)

      const shortcut = screen.getByTestId('command-shortcut')
      expect(shortcut).toHaveAttribute('id', 'shortcut-1')
    })
  })

  describe('CommandSeparator Component', () => {
    it('renders correctly with default props', () => {
      render(<CommandSeparator data-testid="command-separator" />)

      const separator = screen.getByTestId('command-separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveClass('-mx-1 h-px bg-border')
    })

    it('applies custom className', () => {
      render(<CommandSeparator className="custom-separator" data-testid="command-separator" />)

      const separator = screen.getByTestId('command-separator')
      expect(separator).toHaveClass('custom-separator')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CommandSeparator ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CommandSeparator.displayName).toBe('CommandSeparator')
    })

    it('passes through HTML attributes', () => {
      render(<CommandSeparator data-testid="command-separator" id="separator-1" />)

      const separator = screen.getByTestId('command-separator')
      expect(separator).toHaveAttribute('id', 'separator-1')
    })
  })

  describe('Variant Functions', () => {
    it('commandVariants generates correct classes', () => {
      expect(commandVariants()).toContain('flex h-full w-full flex-col')
      expect(commandVariants({ variant: 'glass' })).toContain('bg-background/80')
      expect(commandVariants({ size: 'lg' })).toContain('p-6')
    })

    it('commandInputVariants generates correct classes', () => {
      expect(commandInputVariants()).toContain('flex h-11 w-full')
      expect(commandInputVariants({ variant: 'minimal' })).toContain('h-9')
      expect(commandInputVariants({ variant: 'bordered' })).toContain('border-b')
    })

    it('commandListVariants generates correct classes', () => {
      expect(commandListVariants()).toContain('max-h-[300px]')
      expect(commandListVariants({ variant: 'scrollable' })).toContain('max-h-[400px]')
      expect(commandListVariants({ variant: 'compact' })).toContain('max-h-[200px]')
    })

    it('commandGroupVariants generates correct classes', () => {
      expect(commandGroupVariants()).toContain('overflow-hidden p-1')
      expect(commandGroupVariants({ variant: 'separated' })).toContain('border-t')
      expect(commandGroupVariants({ variant: 'indented' })).toContain('pl-4')
    })

    it('commandItemVariants generates correct classes', () => {
      expect(commandItemVariants()).toContain('relative flex cursor-default')
      expect(commandItemVariants({ variant: 'subtle' })).toContain('aria-selected:bg-accent/10')
      expect(commandItemVariants({ variant: 'ghost' })).toContain('hover:bg-muted/10')
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete command palette', () => {
      render(
        <Command data-testid="command">
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                Calendar
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem value="search">
                Search
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">Profile</CommandItem>
              <CommandItem value="billing">Billing</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )

      expect(screen.getByTestId('command')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
      expect(screen.getByText('Suggestions')).toBeInTheDocument()
      expect(screen.getByText('Calendar')).toBeInTheDocument()
      expect(screen.getByText('⌘C')).toBeInTheDocument()
    })

    it('renders command dialog with all components', () => {
      render(
        <CommandDialog open={true}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>Action 1</CommandItem>
              <CommandItem>Action 2</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )

      expect(screen.getByTestId('dialog')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
      expect(screen.getByText('Actions')).toBeInTheDocument()
    })

    it('handles all props and variants together', () => {
      render(
        <Command variant="bordered" size="lg" className="custom-command" data-testid="command">
          <CommandInput variant="bordered" className="custom-input" />
          <CommandList variant="scrollable" className="custom-list">
            <CommandGroup variant="separated" heading="Test Group">
              <CommandItem variant="subtle" selected={true} value="test">
                Test Item
                <CommandShortcut className="custom-shortcut">⌘T</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="custom-separator" />
          </CommandList>
        </Command>
      )

      const command = screen.getByTestId('command')
      expect(command).toHaveClass('custom-command border p-6')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty command', () => {
      render(<Command data-testid="command"></Command>)

      const command = screen.getByTestId('command')
      expect(command).toBeInTheDocument()
    })

    it('handles command item without value', () => {
      const onSelect = jest.fn()
      render(<CommandItem onSelect={onSelect} data-testid="command-item">Item</CommandItem>)

      const item = screen.getByTestId('command-item')
      fireEvent.click(item)
      expect(onSelect).not.toHaveBeenCalled()
    })

    it('handles command group with complex heading', () => {
      render(
        <CommandGroup heading={<span className="custom-heading">Complex Heading</span>}>
          Content
        </CommandGroup>
      )

      expect(screen.getByText('Complex Heading')).toBeInTheDocument()
      expect(document.querySelector('.custom-heading')).toBeInTheDocument()
    })

    it('handles null and undefined children', () => {
      render(
        <Command>
          {null}
          {undefined}
          <CommandInput />
          {null}
        </Command>
      )

      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('handles disabled input', () => {
      render(<CommandInput disabled placeholder="Disabled input" />)

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed disabled:opacity-50')
    })
  })
})
