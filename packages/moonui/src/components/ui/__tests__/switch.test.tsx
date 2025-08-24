import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Switch } from '../switch'

describe('Switch Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeInTheDocument()
      expect(switchElement).toHaveClass('peer')
      expect(switchElement).toHaveClass('inline-flex')
      expect(switchElement).toHaveClass('cursor-pointer')
      expect(switchElement).toHaveClass('rounded-full')
    })

    it('applies custom className', () => {
      render(<Switch className="custom-switch" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('custom-switch')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Switch ref={ref} data-testid="switch" />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('has correct role', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('role', 'switch')
    })

    it('maintains displayName', () => {
      expect(Switch.displayName).toBe('Switch')
    })
  })

  describe('Sizes', () => {
    it('renders sm size correctly', () => {
      render(<Switch size="sm" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('h-4', 'w-8')
    })

    it('renders md size correctly (default)', () => {
      render(<Switch size="md" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('h-6', 'w-11')
    })

    it('renders lg size correctly', () => {
      render(<Switch size="lg" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('h-7', 'w-14')
    })

    it('uses md size as default', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('h-6', 'w-11')
    })
  })

  describe('Variants', () => {
    it('renders primary variant correctly (default)', () => {
      render(<Switch variant="primary" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-primary')
    })

    it('renders success variant correctly', () => {
      render(<Switch variant="success" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-success')
    })

    it('renders warning variant correctly', () => {
      render(<Switch variant="warning" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-warning')
    })

    it('renders danger variant correctly', () => {
      render(<Switch variant="danger" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-error')
    })

    it('renders secondary variant correctly', () => {
      render(<Switch variant="secondary" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-accent')
    })

    it('uses primary variant as default', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-primary')
    })
  })

  describe('States', () => {
    it('renders unchecked state correctly', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('data-state', 'unchecked')
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })

    it('renders checked state correctly', () => {
      render(<Switch checked data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('data-state', 'checked')
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
    })

    it('renders disabled state correctly', () => {
      render(<Switch disabled data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeDisabled()
      expect(switchElement).toHaveClass('disabled:cursor-not-allowed')
      expect(switchElement).toHaveClass('disabled:opacity-50')
    })

    it('handles controlled state', () => {
      const handleChange = jest.fn()
      render(<Switch checked={true} onCheckedChange={handleChange} data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Loading State', () => {
    it('renders loading state correctly', () => {
      render(<Switch loading data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeDisabled()
      expect(switchElement).toHaveClass('opacity-80')
      expect(switchElement).toHaveClass('cursor-wait')
    })

    it('shows loading spinner when loading', () => {
      render(<Switch loading data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      const spinner = switchElement.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('animate-spin')
      expect(spinner).toHaveClass('rounded-full')
      expect(spinner).toHaveClass('border-2')
    })

    it('disables switch when loading', () => {
      render(<Switch loading data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeDisabled()
    })

    it('combines loading with disabled prop', () => {
      render(<Switch loading disabled data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeDisabled()
    })
  })

  describe('Icons and Description', () => {
    it('renders left icon correctly', () => {
      render(<Switch leftIcon={<span>Left</span>} data-testid="switch" />)
      expect(screen.getByText('Left')).toBeInTheDocument()
      const iconWrapper = screen.getByText('Left').parentElement
      expect(iconWrapper).toHaveClass('text-muted-foreground')
    })

    it('renders right icon correctly', () => {
      render(<Switch rightIcon={<span>Right</span>} data-testid="switch" />)
      expect(screen.getByText('Right')).toBeInTheDocument()
      const iconWrapper = screen.getByText('Right').parentElement
      expect(iconWrapper).toHaveClass('text-muted-foreground')
    })

    it('renders description correctly', () => {
      render(<Switch description="Switch description" data-testid="switch" />)
      expect(screen.getByText('Switch description')).toBeInTheDocument()
      expect(screen.getByText('Switch description')).toHaveClass('text-sm')
      expect(screen.getByText('Switch description')).toHaveClass('text-muted-foreground')
    })

    it('renders both icons and description together', () => {
      render(
        <Switch
          leftIcon={<span>Left</span>}
          rightIcon={<span>Right</span>}
          description="Description"
          data-testid="switch"
        />
      )
      expect(screen.getByText('Left')).toBeInTheDocument()
      expect(screen.getByText('Right')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('does not render icons when not provided', () => {
      render(<Switch data-testid="switch" />)
      expect(screen.queryByText('Left')).not.toBeInTheDocument()
      expect(screen.queryByText('Right')).not.toBeInTheDocument()
    })
  })

  describe('Thumb Element', () => {
    it('renders thumb element', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      const thumb = switchElement.querySelector('span[data-state]')
      expect(thumb).toBeInTheDocument()
    })

    it('applies correct thumb size classes for sm', () => {
      render(<Switch size="sm" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      const thumb = switchElement.querySelector('span[data-state]')
      expect(thumb).toHaveClass('h-3', 'w-3')
    })

    it('applies correct thumb size classes for md', () => {
      render(<Switch size="md" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      const thumb = switchElement.querySelector('span[data-state]')
      expect(thumb).toHaveClass('h-5', 'w-5')
    })

    it('applies correct thumb size classes for lg', () => {
      render(<Switch size="lg" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      const thumb = switchElement.querySelector('span[data-state]')
      expect(thumb).toHaveClass('h-6', 'w-6')
    })
  })

  describe('Interactions', () => {
    it('handles click events', () => {
      const handleChange = jest.fn()
      render(<Switch onCheckedChange={handleChange} data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      
      fireEvent.click(switchElement)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('does not trigger events when disabled', () => {
      const handleChange = jest.fn()
      render(<Switch disabled onCheckedChange={handleChange} data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      
      fireEvent.click(switchElement)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not trigger events when loading', () => {
      const handleChange = jest.fn()
      render(<Switch loading onCheckedChange={handleChange} data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      
      fireEvent.click(switchElement)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('is focusable for keyboard navigation', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      
      switchElement.focus()
      expect(switchElement).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('role', 'switch')
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })

    it('supports custom ARIA attributes', () => {
      render(<Switch aria-label="Toggle setting" data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveAttribute('aria-label', 'Toggle setting')
    })

    it('has focus-visible styles', () => {
      render(<Switch data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('focus-visible:outline-none')
      expect(switchElement).toHaveClass('focus-visible:ring-2')
      expect(switchElement).toHaveClass('focus-visible:ring-ring')
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all props correctly', () => {
      const handleChange = jest.fn()
      render(
        <Switch
          size="lg"
          variant="success"
          checked={true}
          onCheckedChange={handleChange}
          leftIcon={<span>Left</span>}
          rightIcon={<span>Right</span>}
          description="Toggle description"
          className="custom-class"
          data-testid="switch"
        />
      )
      
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toHaveClass('h-7', 'w-14')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-success')
      expect(switchElement).toHaveClass('custom-class')
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
      
      expect(screen.getByText('Left')).toBeInTheDocument()
      expect(screen.getByText('Right')).toBeInTheDocument()
      expect(screen.getByText('Toggle description')).toBeInTheDocument()
    })

    it('handles loading with other props', () => {
      render(
        <Switch
          loading
          size="sm"
          variant="danger"
          leftIcon={<span>Left</span>}
          description="Loading switch"
          data-testid="switch"
        />
      )
      
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeDisabled()
      expect(switchElement).toHaveClass('h-4', 'w-8')
      expect(switchElement).toHaveClass('data-[state=checked]:bg-error')
      expect(switchElement).toHaveClass('opacity-80')
      
      expect(screen.getByText('Left')).toBeInTheDocument()
      expect(screen.getByText('Loading switch')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('passes through HTML attributes', () => {
      render(<Switch data-testid="switch-test" id="switch-1" />)
      const switchElement = screen.getByTestId('switch-test')
      expect(switchElement).toHaveAttribute('id', 'switch-1')
    })

    it('handles empty string description', () => {
      render(<Switch description="" data-testid="switch" />)
      const container = screen.getByTestId('switch').parentElement
      const description = container?.querySelector('.text-sm.text-muted-foreground')
      expect(description).not.toBeInTheDocument()
    })

    it('handles null icons gracefully', () => {
      render(<Switch leftIcon={null} rightIcon={null} data-testid="switch" />)
      const switchElement = screen.getByTestId('switch')
      expect(switchElement).toBeInTheDocument()
    })
  })
})
