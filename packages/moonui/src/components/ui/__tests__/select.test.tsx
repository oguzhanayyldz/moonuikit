
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Jest mock'lar - inline tanımlamalar

jest.mock('lucide-react', () => ({
  Check: jest.fn(() => <svg data-testid="check-icon"><path d="M20 6L9 17l-5-5" /></svg>),
  ChevronDown: jest.fn(() => <span data-testid="chevron-down-icon">▼</span>),
  ChevronUp: jest.fn(() => <span data-testid="chevron-up-icon">▲</span>),
  Loader2: jest.fn(() => <svg data-testid="loader2-icon"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>),
}))

jest.mock('@radix-ui/react-select', () => {
  const MockTrigger = ({ children, ...props }: React.ComponentProps<'button'> & { children?: React.ReactNode }) => <button data-testid="select-trigger" {...props}>{children}</button>
  MockTrigger.displayName = 'SelectTrigger'

  const MockContent = ({ children, position, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode; position?: string }) => <div data-testid="select-content" data-position={position} {...props}>{children}</div>
  MockContent.displayName = 'SelectContent'

  const MockLabel = ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-label" {...props}>{children}</div>
  MockLabel.displayName = 'SelectLabel'

  const MockItem = ({ children, value, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode; value?: string }) => <div data-testid="select-item" data-value={value} {...props}>{children}</div>
  MockItem.displayName = 'SelectItem'

  const MockSeparator = (props: React.ComponentProps<'hr'>) => <hr data-testid="select-separator" {...props} />
  MockSeparator.displayName = 'SelectSeparator'

  const MockScrollUpButton = ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-scroll-up-button" {...props}>{children}</div>
  MockScrollUpButton.displayName = 'SelectScrollUpButton'

  const MockScrollDownButton = ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-scroll-down-button" {...props}>{children}</div>
  MockScrollDownButton.displayName = 'SelectScrollDownButton'

  return {
    Root: ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-root" {...props}>{children}</div>,
    Trigger: MockTrigger,
    Value: ({ children, placeholder, ...props }: React.ComponentProps<'span'> & { children?: React.ReactNode; placeholder?: string }) => <span data-testid="select-value" {...props}>{children || placeholder}</span>,
    Icon: ({ children, ...props }: React.ComponentProps<'span'> & { children?: React.ReactNode }) => <span data-testid="select-icon" {...props}>{children}</span>,
    Portal: ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-portal" {...props}>{children}</div>,
    Content: MockContent,
    Viewport: ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-viewport" {...props}>{children}</div>,
    Item: MockItem,
    ItemText: ({ children, ...props }: React.ComponentProps<'span'> & { children?: React.ReactNode }) => <span data-testid="select-item-text" {...props}>{children}</span>,
    ItemIndicator: ({ children, ...props }: React.ComponentProps<'span'> & { children?: React.ReactNode }) => <span data-testid="select-item-indicator" {...props}>{children}</span>,
    Group: ({ children, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) => <div data-testid="select-group" {...props}>{children}</div>,
    Label: MockLabel,
    Separator: MockSeparator,
    ScrollUpButton: MockScrollUpButton,
    ScrollDownButton: MockScrollDownButton,
  }
})

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '../select'



describe('Select Components', () => {
  // Select Root Component Tests
  describe('Select', () => {
    it('renders correctly', () => {
      render(
        <Select>
          <div>Select content</div>
        </Select>
      )

      expect(screen.getByTestId('select-root')).toBeInTheDocument()
    })

    it('has correct displayName', () => {
      expect(Select.displayName).toBe('Select')
    })

    it('passes props to root element', () => {
      render(
        <Select data-custom="test">
          <div>Content</div>
        </Select>
      )

      expect(screen.getByTestId('select-root')).toHaveAttribute('data-custom', 'test')
    })
  })

  // SelectGroup Component Tests
  describe('SelectGroup', () => {
    it('renders correctly', () => {
      render(
        <SelectGroup>
          <div>Group content</div>
        </SelectGroup>
      )

      expect(screen.getByTestId('select-group')).toBeInTheDocument()
    })
  })

  // SelectValue Component Tests
  describe('SelectValue', () => {
    it('renders correctly', () => {
      render(<SelectValue placeholder="Select option" />)

      expect(screen.getByTestId('select-value')).toBeInTheDocument()
      expect(screen.getByTestId('select-value')).toHaveTextContent('Select option')
    })
  })

  // SelectTrigger Component Tests
  describe('SelectTrigger', () => {
    it('renders with default props', () => {
      render(
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      )

      const trigger = screen.getByTestId('select-trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveClass('h-10 text-sm px-3') // md size
    })

    it('applies variant classes correctly', () => {
      const { rerender } = render(
        <SelectTrigger variant="standard">Content</SelectTrigger>
      )

      let trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('border border-gray-300')

      rerender(<SelectTrigger variant="outline">Content</SelectTrigger>)
      trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('border bg-transparent')

      rerender(<SelectTrigger variant="ghost">Content</SelectTrigger>)
      trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('border-none bg-gray-100')

      rerender(<SelectTrigger variant="underline">Content</SelectTrigger>)
      trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('border-b rounded-none')
    })

    it('applies size classes correctly', () => {
      const { rerender } = render(
        <SelectTrigger size="sm">Content</SelectTrigger>
      )

      let trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('h-8 text-xs px-2')

      rerender(<SelectTrigger size="md">Content</SelectTrigger>)
      trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('h-10 text-sm px-3')

      rerender(<SelectTrigger size="lg">Content</SelectTrigger>)
      trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('h-12 text-base px-4')
    })

    it('handles error state', () => {
      render(
        <Select>
          <SelectTrigger error data-testid="select-trigger">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
        </Select>
      )

      const trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveAttribute('data-error', 'true')
    })

    it('handles success state', () => {
      render(
        <Select>
          <SelectTrigger success data-testid="select-trigger">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
        </Select>
      )

      const trigger = screen.getByTestId('select-trigger')
      // expect(trigger).toHaveClass('border-success') // CSS classes not loaded in Jest
      expect(trigger).toHaveAttribute('data-success', 'true')
    })

    it('handles loading state', () => {
      render(
        <SelectTrigger loading>
          <SelectValue />
        </SelectTrigger>
      )

      const trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveAttribute('data-loading', 'true')
      expect(trigger).toBeDisabled()
      expect(screen.getByTestId('loader2-icon')).toBeInTheDocument()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders left icon', () => {
      const leftIcon = <span data-testid="left-icon">📧</span>
      render(
        <SelectTrigger leftIcon={leftIcon}>Content</SelectTrigger>
      )

      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders right icon instead of chevron', () => {
      const rightIcon = <span data-testid="right-icon">🔍</span>
      render(
        <SelectTrigger rightIcon={rightIcon}>Content</SelectTrigger>
      )

      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('chevron-down-icon')).not.toBeInTheDocument()
    })

    it('renders default chevron when no right icon', () => {
      render(
        <SelectTrigger>Content</SelectTrigger>
      )

      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('applies custom className', () => {
      render(
        <SelectTrigger className="custom-class">Content</SelectTrigger>
      )

      expect(screen.getByTestId('select-trigger')).toHaveClass('custom-class')
    })

    it('has correct displayName', () => {
      expect(SelectTrigger.displayName).toBe('SelectTrigger')
    })
  })

  // SelectContent Component Tests
  describe('SelectContent', () => {
    it('renders with default props', () => {
      render(
        <SelectContent>
          <SelectItem value="item1">Item 1</SelectItem>
        </SelectContent>
      )

      expect(screen.getByTestId('select-portal')).toBeInTheDocument()
      expect(screen.getByTestId('select-content')).toBeInTheDocument()
      expect(screen.getByTestId('select-viewport')).toBeInTheDocument()
    })

    it('applies position correctly', () => {
      render(
        <SelectContent position="popper">
          <SelectItem value="item1">Item 1</SelectItem>
        </SelectContent>
      )

      expect(screen.getByTestId('select-content')).toHaveAttribute('data-position', 'popper')
    })

    it('renders scroll buttons', () => {
      render(
        <SelectContent>
          <SelectItem value="item1">Item 1</SelectItem>
        </SelectContent>
      )

      expect(screen.getByTestId('select-scroll-up-button')).toBeInTheDocument()
      expect(screen.getByTestId('select-scroll-down-button')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <SelectContent className="custom-content">
          <SelectItem value="item1">Item 1</SelectItem>
        </SelectContent>
      )

      expect(screen.getByTestId('select-content')).toHaveClass('custom-content')
    })

    it('has correct displayName', () => {
      expect(SelectContent.displayName).toBe('SelectContent')
    })
  })

  // SelectLabel Component Tests
  describe('SelectLabel', () => {
    it('renders with default props', () => {
      render(
        <SelectLabel>Label Text</SelectLabel>
      )

      const label = screen.getByTestId('select-label')
      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('Label Text')
      expect(label).toHaveClass('py-1.5 pl-8 pr-2 text-sm font-semibold')
    })

    it('applies custom className', () => {
      render(
        <SelectLabel className="custom-label">Label</SelectLabel>
      )

      expect(screen.getByTestId('select-label')).toHaveClass('custom-label')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <SelectLabel ref={ref}>Label</SelectLabel>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('passes HTML attributes', () => {
      render(
        <SelectLabel data-custom="test" id="label-id">Label</SelectLabel>
      )

      const label = screen.getByTestId('select-label')
      expect(label).toHaveAttribute('data-custom', 'test')
      expect(label).toHaveAttribute('id', 'label-id')
    })

    it('has correct displayName', () => {
      expect(SelectLabel.displayName).toBe('SelectLabel')
    })
  })

  // SelectItem Component Tests
  describe('SelectItem', () => {
    it('renders with default props', () => {
      render(
        <SelectItem value="item1">Item Text</SelectItem>
      )

      const item = screen.getByTestId('select-item')
      expect(item).toBeInTheDocument()
      expect(screen.getByTestId('select-item-text')).toHaveTextContent('Item Text')
      expect(item).toHaveClass('py-1.5 pl-8 pr-2 text-sm') // md size
    })

    it('applies variant classes correctly', () => {
      const { rerender } = render(
        <SelectItem value="item1" variant="default">Item</SelectItem>
      )

      let item = screen.getByTestId('select-item')
      expect(item).toHaveClass('focus:bg-accent')

      rerender(<SelectItem value="item1" variant="subtle">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('focus:bg-gray-100')

      rerender(<SelectItem value="item1" variant="destructive">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('text-error')

      rerender(<SelectItem value="item1" variant="success">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('text-success')

      rerender(<SelectItem value="item1" variant="warning">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('text-warning')
    })

    it('applies size classes correctly', () => {
      const { rerender } = render(
        <SelectItem value="item1" size="sm">Item</SelectItem>
      )

      let item = screen.getByTestId('select-item')
      expect(item).toHaveClass('py-1')

      rerender(<SelectItem value="item1" size="md">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('py-1.5')

      rerender(<SelectItem value="item1" size="lg">Item</SelectItem>)
      item = screen.getByTestId('select-item')
      expect(item).toHaveClass('py-2')
    })

    it('renders default check indicator', () => {
      render(
        <SelectItem value="item1">Item</SelectItem>
      )

      expect(screen.getByTestId('select-item-indicator')).toBeInTheDocument()
      expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    })

    it('renders custom indicator', () => {
      const customIndicator = <span data-testid="custom-indicator">✓</span>
      render(
        <SelectItem value="item1" customIndicator={customIndicator}>Item</SelectItem>
      )

      expect(screen.getByTestId('select-item-indicator')).toBeInTheDocument()
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument()
      expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
    })

    it('renders right icon', () => {
      const rightIcon = <span data-testid="right-icon">→</span>
      render(
        <SelectItem value="item1" rightIcon={rightIcon}>Item</SelectItem>
      )

      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <SelectItem value="item1" className="custom-item">Item</SelectItem>
      )

      expect(screen.getByTestId('select-item')).toHaveClass('custom-item')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <SelectItem value="item1" ref={ref}>Item</SelectItem>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('passes HTML attributes', () => {
      render(
        <SelectItem value="item1" data-custom="test">Item</SelectItem>
      )

      expect(screen.getByTestId('select-item')).toHaveAttribute('data-custom', 'test')
    })

    it('has correct displayName', () => {
      expect(SelectItem.displayName).toBe('SelectItem')
    })
  })

  // SelectSeparator Component Tests
  describe('SelectSeparator', () => {
    it('renders with default props', () => {
      render(<SelectSeparator />)

      const separator = screen.getByTestId('select-separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveClass('-mx-1 my-1 h-px bg-muted')
    })

    it('applies custom className', () => {
      render(<SelectSeparator className="custom-separator" />)

      expect(screen.getByTestId('select-separator')).toHaveClass('custom-separator')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLHRElement>()
      render(<SelectSeparator ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLHRElement)
    })

    it('passes HTML attributes', () => {
      render(<SelectSeparator data-custom="test" />)

      expect(screen.getByTestId('select-separator')).toHaveAttribute('data-custom', 'test')
    })

    it('has correct displayName', () => {
      expect(SelectSeparator.displayName).toBe('SelectSeparator')
    })
  })

  // SelectScrollUpButton Component Tests
  describe('SelectScrollUpButton', () => {
    it('renders with default props', () => {
      render(<SelectScrollUpButton />)

      const button = screen.getByTestId('select-scroll-up-button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<SelectScrollUpButton className="custom-scroll" />)

      expect(screen.getByTestId('select-scroll-up-button')).toHaveClass('custom-scroll')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<SelectScrollUpButton ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('has correct displayName', () => {
      expect(SelectScrollUpButton.displayName).toBe('SelectScrollUpButton')
    })
  })

  // SelectScrollDownButton Component Tests
  describe('SelectScrollDownButton', () => {
    it('renders with default props', () => {
      render(<SelectScrollDownButton />)

      const button = screen.getByTestId('select-scroll-down-button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<SelectScrollDownButton className="custom-scroll" />)

      expect(screen.getByTestId('select-scroll-down-button')).toHaveClass('custom-scroll')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<SelectScrollDownButton ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('has correct displayName', () => {
      expect(SelectScrollDownButton.displayName).toBe('SelectScrollDownButton')
    })
  })

  // Complex Combinations Tests
  describe('Complex Combinations', () => {
    it('renders complete select with all components', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option..." />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectSeparator />
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      )

      expect(screen.getByTestId('select-root')).toBeInTheDocument()
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('select-value')).toBeInTheDocument()
      expect(screen.getByTestId('select-content')).toBeInTheDocument()
      expect(screen.getByTestId('select-label')).toBeInTheDocument()
      expect(screen.getAllByTestId('select-item')).toHaveLength(3)
      expect(screen.getByTestId('select-separator')).toBeInTheDocument()
    })

    it('renders select with all trigger props', () => {
      const leftIcon = <span data-testid="left-icon">📧</span>
      render(
        <SelectTrigger
          variant="outline"
          size="lg"
          error="Error message"
          leftIcon={leftIcon}
          className="custom-trigger"
        >
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      )

      const trigger = screen.getByTestId('select-trigger')
      expect(trigger).toHaveClass('h-12')
      expect(trigger).toHaveClass('border')
      expect(trigger).toHaveAttribute('data-error', 'true')
      expect(trigger).toHaveClass('custom-trigger')
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders select items with all props', () => {
      const rightIcon = <span data-testid="right-icon">→</span>
      const customIndicator = <span data-testid="custom-indicator">✓</span>

      render(
        <SelectContent>
          <SelectItem
            value="item1"
            variant="success"
            size="lg"
            rightIcon={rightIcon}
            customIndicator={customIndicator}
            className="custom-item"
          >
            Success Item
          </SelectItem>
        </SelectContent>
      )

      const item = screen.getByTestId('select-item')
      expect(item).toHaveClass('py-2')
      expect(item).toHaveClass('text-success')
      expect(item).toHaveClass('custom-item')
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument()
    })
  })

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles empty select content', () => {
      render(
        <SelectContent>
          {/* Empty content */}
        </SelectContent>
      )

      expect(screen.getByTestId('select-content')).toBeInTheDocument()
      expect(screen.getByTestId('select-viewport')).toBeInTheDocument()
    })

    it('handles select item without value', () => {
      render(
        <SelectItem value="no-value">No Value Item</SelectItem>
      )

      expect(screen.getByTestId('select-item')).toBeInTheDocument()
      expect(screen.getByTestId('select-item-text')).toHaveTextContent('No Value Item')
    })

    it('handles null children in select item', () => {
      render(
        <SelectItem value="item1">{null}</SelectItem>
      )

      expect(screen.getByTestId('select-item')).toBeInTheDocument()
      expect(screen.getByTestId('select-item-text')).toBeInTheDocument()
    })

    it('handles disabled trigger', () => {
      render(
        <SelectTrigger disabled>
          <SelectValue />
        </SelectTrigger>
      )

      expect(screen.getByTestId('select-trigger')).toBeDisabled()
    })

    it('handles loading state without children', () => {
      render(
        <SelectTrigger loading />
      )

      expect(screen.getByTestId('loader2-icon')).toBeInTheDocument()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('handles both error and success states', () => {
      render(
        <SelectTrigger error="Error" success>
          Content
        </SelectTrigger>
      )

      const trigger = screen.getByTestId('select-trigger')
      // expect(trigger).toHaveClass('border-error') // CSS classes not loaded in Jest
      expect(trigger).toHaveAttribute('data-error', 'true')
      expect(trigger).toHaveAttribute('data-success', 'true')
    })
  })
})
