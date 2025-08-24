import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge').parentElement!
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('items-center')
    expect(badge).toHaveClass('h-6') // md size
    expect(badge).toHaveClass('rounded-full') // default radius
  })

  it('renders with custom text content', () => {
    render(<Badge>Custom Text</Badge>)
    expect(screen.getByText('Custom Text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Test</Badge>)
    const badge = screen.getByText('Test').parentElement!
    expect(badge).toHaveClass('custom-badge')
  })

  describe('Variants', () => {
    it('renders primary variant correctly (default)', () => {
      render(<Badge variant="primary">Primary</Badge>)
      const badge = screen.getByText('Primary').parentElement!
      expect(badge).toHaveClass('bg-primary')
      expect(badge).toHaveClass('text-primary-foreground')
      expect(badge).toHaveClass('border-transparent')
    })

    it('renders secondary variant correctly', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      const badge = screen.getByText('Secondary').parentElement!
      expect(badge).toHaveClass('bg-secondary')
      expect(badge).toHaveClass('text-secondary-foreground')
    })

    it('renders destructive variant correctly', () => {
      render(<Badge variant="destructive">Destructive</Badge>)
      const badge = screen.getByText('Destructive').parentElement!
      expect(badge).toHaveClass('bg-error')
      expect(badge).toHaveClass('text-white')
    })

    it('renders outline variant correctly', () => {
      render(<Badge variant="outline">Outline</Badge>)
      const badge = screen.getByText('Outline').parentElement!
      expect(badge).toHaveClass('border-gray-200')
      expect(badge).toHaveClass('bg-transparent')
    })

    it('renders success variant correctly', () => {
      render(<Badge variant="success">Success</Badge>)
      const badge = screen.getByText('Success').parentElement!
      expect(badge).toHaveClass('bg-success')
      expect(badge).toHaveClass('text-white')
    })

    it('renders warning variant correctly', () => {
      render(<Badge variant="warning">Warning</Badge>)
      const badge = screen.getByText('Warning').parentElement!
      expect(badge).toHaveClass('bg-warning')
      expect(badge).toHaveClass('text-white')
    })

    it('renders ghost variant correctly', () => {
      render(<Badge variant="ghost">Ghost</Badge>)
      const badge = screen.getByText('Ghost').parentElement!
      expect(badge).toHaveClass('bg-transparent')
      expect(badge).toHaveClass('text-foreground')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Badge size="sm">Small</Badge>)
      const badge = screen.getByText('Small').parentElement!
      expect(badge).toHaveClass('h-5')
      expect(badge).toHaveClass('px-2')
      expect(badge).toHaveClass('text-xs')
    })

    it('renders medium size correctly (default)', () => {
      render(<Badge size="md">Medium</Badge>)
      const badge = screen.getByText('Medium').parentElement!
      expect(badge).toHaveClass('h-6')
      expect(badge).toHaveClass('px-2.5')
      expect(badge).toHaveClass('text-xs')
    })

    it('renders large size correctly', () => {
      render(<Badge size="lg">Large</Badge>)
      const badge = screen.getByText('Large').parentElement!
      expect(badge).toHaveClass('h-7')
      expect(badge).toHaveClass('px-3')
      expect(badge).toHaveClass('text-sm')
    })
  })

  describe('Radius', () => {
    it('renders default radius correctly', () => {
      render(<Badge radius="default">Default Radius</Badge>)
      const badge = screen.getByText('Default Radius').parentElement!
      expect(badge).toHaveClass('rounded-full')
    })

    it('renders small radius correctly', () => {
      render(<Badge radius="sm">Small Radius</Badge>)
      const badge = screen.getByText('Small Radius').parentElement!
      expect(badge).toHaveClass('rounded-md')
    })

    it('renders large radius correctly', () => {
      render(<Badge radius="lg">Large Radius</Badge>)
      const badge = screen.getByText('Large Radius').parentElement!
      expect(badge).toHaveClass('rounded-xl')
    })

    it('renders no radius correctly', () => {
      render(<Badge radius="none">No Radius</Badge>)
      const badge = screen.getByText('No Radius').parentElement!
      expect(badge).toHaveClass('rounded-none')
    })
  })

  describe('Dot Feature', () => {
    it('renders with dot when withDot is true', () => {
      render(<Badge withDot>With Dot</Badge>)
      const badge = screen.getByText('With Dot').parentElement!
      const dot = badge.querySelector('span[aria-hidden="true"]')
      expect(dot).toBeInTheDocument()
      expect(dot).toHaveClass('h-2')
      expect(dot).toHaveClass('w-2')
      expect(dot).toHaveClass('rounded-full')
    })

    it('does not render dot when withDot is false', () => {
      render(<Badge withDot={false}>Without Dot</Badge>)
      const badge = screen.getByText('Without Dot').parentElement!
      const dot = badge.querySelector('span[aria-hidden="true"]')
      expect(dot).not.toBeInTheDocument()
    })

    it('renders dot with custom color', () => {
      render(<Badge withDot dotColor="bg-red-500">Custom Dot</Badge>)
      const badge = screen.getByText('Custom Dot').parentElement!
      const dot = badge.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-red-500')
    })

    it('renders dot with variant-specific default colors', () => {
      const { rerender } = render(<Badge withDot variant="destructive">Destructive</Badge>)
      let dot = screen.getByText('Destructive').parentElement!.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-white')

      rerender(<Badge withDot variant="success">Success</Badge>)
      dot = screen.getByText('Success').parentElement!.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-white')

      rerender(<Badge withDot variant="primary">Primary</Badge>)
      dot = screen.getByText('Primary').parentElement!.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-primary-foreground')
    })
  })

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>

    it('renders with left icon', () => {
      render(<Badge leftIcon={<TestIcon />}>With Left Icon</Badge>)
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('With Left Icon')).toBeInTheDocument()
    })

    it('renders with right icon', () => {
      render(<Badge rightIcon={<TestIcon />}>With Right Icon</Badge>)
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('With Right Icon')).toBeInTheDocument()
    })

    it('renders with both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">Left</span>
      const RightIcon = () => <span data-testid="right-icon">Right</span>
      
      render(
        <Badge leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Both Icons
        </Badge>
      )
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      expect(screen.getByText('Both Icons')).toBeInTheDocument()
    })
  })

  describe('Removable Feature', () => {
    it('renders remove button when removable is true and onRemove is provided', () => {
      const onRemove = jest.fn()
      render(<Badge removable onRemove={onRemove}>Removable</Badge>)
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' })
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveAttribute('aria-label', 'Remove badge')
    })

    it('does not render remove button when removable is false', () => {
      const onRemove = jest.fn()
      render(<Badge removable={false} onRemove={onRemove}>Not Removable</Badge>)
      
      const removeButton = screen.queryByRole('button', { name: 'Remove badge' })
      expect(removeButton).not.toBeInTheDocument()
    })

    it('does not render remove button when onRemove is not provided', () => {
      render(<Badge removable>No Remove Handler</Badge>)
      
      const removeButton = screen.queryByRole('button', { name: 'Remove badge' })
      expect(removeButton).not.toBeInTheDocument()
    })

    it('calls onRemove when remove button is clicked', () => {
      const onRemove = jest.fn()
      render(<Badge removable onRemove={onRemove}>Removable</Badge>)
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' })
      fireEvent.click(removeButton)
      
      expect(onRemove).toHaveBeenCalledTimes(1)
    })

    it('stops propagation when remove button is clicked', () => {
      const onRemove = jest.fn()
      const onBadgeClick = jest.fn()
      
      render(
        <Badge removable onRemove={onRemove} onClick={onBadgeClick}>
          Removable
        </Badge>
      )
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' })
      fireEvent.click(removeButton)
      
      expect(onRemove).toHaveBeenCalledTimes(1)
      expect(onBadgeClick).not.toHaveBeenCalled()
    })

    it('sets data-removable attribute when removable is true', () => {
      const onRemove = jest.fn()
      render(<Badge removable onRemove={onRemove}>Removable</Badge>)
      
      const badge = screen.getByText('Removable').parentElement!
      expect(badge).toHaveAttribute('data-removable', '')
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all features combined', () => {
      const onRemove = jest.fn()
      const LeftIcon = () => <span data-testid="left-icon">L</span>
      const RightIcon = () => <span data-testid="right-icon">R</span>
      
      render(
        <Badge
          variant="success"
          size="lg"
          radius="sm"
          withDot
          dotColor="bg-yellow-400"
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
          removable
          onRemove={onRemove}
          className="custom-badge"
        >
          Complex Badge
        </Badge>
      )
      
      const badge = screen.getByText('Complex Badge').parentElement!
      
      // Check variant, size, radius
      expect(badge).toHaveClass('bg-success')
      expect(badge).toHaveClass('h-7')
      expect(badge).toHaveClass('rounded-md')
      expect(badge).toHaveClass('custom-badge')
      
      // Check dot
      const dot = badge.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-yellow-400')
      
      // Check icons
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      
      // Check remove button
      const removeButton = screen.getByRole('button', { name: 'Remove badge' })
      expect(removeButton).toBeInTheDocument()
      
      // Test remove functionality
      fireEvent.click(removeButton)
      expect(onRemove).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for remove button', () => {
      const onRemove = jest.fn()
      render(<Badge removable onRemove={onRemove}>Accessible</Badge>)
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' })
      expect(removeButton).toHaveAttribute('aria-label', 'Remove badge')
      expect(removeButton).toHaveAttribute('type', 'button')
    })

    it('has aria-hidden on dot element', () => {
      render(<Badge withDot>With Dot</Badge>)
      const dot = screen.getByText('With Dot').parentElement!.querySelector('span[aria-hidden="true"]')
      expect(dot).toHaveAttribute('aria-hidden', 'true')
    })

    it('has aria-hidden on remove icon', () => {
      const onRemove = jest.fn()
      render(<Badge removable onRemove={onRemove}>Removable</Badge>)
      
      const removeIcon = screen.getByRole('button').querySelector('svg')
      expect(removeIcon).toHaveAttribute('aria-hidden', 'true')
    })

    it('truncates long text content', () => {
      render(<Badge>Very long badge text that should be truncated</Badge>)
      const textSpan = screen.getByText('Very long badge text that should be truncated')
      expect(textSpan).toHaveClass('truncate')
    })
  })

  describe('Event Handling', () => {
    it('handles click events on badge', () => {
      const onClick = jest.fn()
      render(<Badge onClick={onClick}>Clickable</Badge>)
      
      const badge = screen.getByText('Clickable').parentElement!
      fireEvent.click(badge)
      
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('handles focus events', () => {
      const onFocus = jest.fn()
      render(<Badge onFocus={onFocus}>Focusable</Badge>)
      
      const badge = screen.getByText('Focusable').parentElement!
      fireEvent.focus(badge)
      
      expect(onFocus).toHaveBeenCalledTimes(1)
    })
  })
})
