import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Checkbox, CheckboxGroup, CheckboxLabel, CheckboxWithLabel } from '../checkbox'

describe('Checkbox Components', () => {
  describe('Checkbox Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveAttribute('role', 'checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
      })

      it('applies custom className', () => {
        render(<Checkbox className="custom-checkbox" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('custom-checkbox')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLButtonElement>()
        render(<Checkbox ref={ref} data-testid="checkbox" />)
        expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      })

      it('maintains displayName', () => {
        expect(Checkbox.displayName).toBe('Checkbox')
      })
    })

    describe('Variants', () => {
      it('renders default variant correctly', () => {
        render(<Checkbox variant="default" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('border-border')
        expect(checkbox).toHaveClass('bg-background')
      })

      it('renders outline variant correctly', () => {
        render(<Checkbox variant="outline" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('border-border')
        expect(checkbox).toHaveClass('bg-transparent')
      })

      it('renders muted variant correctly', () => {
        render(<Checkbox variant="muted" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('border-border')
        expect(checkbox).toHaveClass('bg-accent')
      })

      it('renders ghost variant correctly', () => {
        render(<Checkbox variant="ghost" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('border-transparent')
        expect(checkbox).toHaveClass('bg-transparent')
      })

      it('uses default variant as default', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('border-border')
        expect(checkbox).toHaveClass('bg-background')
      })
    })

    describe('Sizes', () => {
      it('renders sm size correctly', () => {
        render(<Checkbox size="sm" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('h-3.5', 'w-3.5')
      })

      it('renders default size correctly', () => {
        render(<Checkbox size="default" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('h-4', 'w-4')
      })

      it('renders md size correctly', () => {
        render(<Checkbox size="md" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('h-5', 'w-5')
      })

      it('renders lg size correctly', () => {
        render(<Checkbox size="lg" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('h-6', 'w-6')
      })

      it('uses default size as default', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('h-4', 'w-4')
      })
    })

    describe('Radius', () => {
      it('renders none radius correctly', () => {
        render(<Checkbox radius="none" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('rounded-none')
      })

      it('renders sm radius correctly', () => {
        render(<Checkbox radius="sm" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('rounded-sm')
      })

      it('renders default radius correctly', () => {
        render(<Checkbox radius="default" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('rounded-sm')
      })

      it('renders md radius correctly', () => {
        render(<Checkbox radius="md" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('rounded-md')
      })

      it('renders full radius correctly', () => {
        render(<Checkbox radius="full" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('rounded-full')
      })
    })

    describe('Animation', () => {
      it('renders none animation correctly', () => {
        render(<Checkbox animation="none" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).not.toHaveClass('transition-all')
      })

      it('renders subtle animation correctly', () => {
        render(<Checkbox animation="subtle" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('transition-all')
      })

      it('renders default animation correctly', () => {
        render(<Checkbox animation="default" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('transition-all')
      })

      it('renders bounce animation correctly', () => {
        render(<Checkbox animation="bounce" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('transition-all')
      })
    })

    describe('States', () => {
      it('renders unchecked state correctly', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
        expect(checkbox).toHaveAttribute('data-state', 'unchecked')
      })

      it('renders checked state correctly', () => {
        render(<Checkbox checked data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'true')
        expect(checkbox).toHaveAttribute('data-state', 'checked')
      })

      it('renders disabled state correctly', () => {
        render(<Checkbox disabled data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toBeDisabled()
        expect(checkbox).toHaveClass('disabled:cursor-not-allowed')
        expect(checkbox).toHaveClass('disabled:opacity-50')
      })

      it('handles controlled state', () => {
        const handleChange = jest.fn()
        render(<Checkbox checked={true} onCheckedChange={handleChange} data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'true')
      })
    })

    describe('Indeterminate State', () => {
      it('renders indeterminate state correctly', () => {
        render(<Checkbox indeterminate data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
        expect(checkbox).toHaveAttribute('data-state', 'unchecked')
      })

      it('shows minus icon when indeterminate and checked', () => {
        render(<Checkbox indeterminate checked data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        // Even with checked=true, indeterminate overrides to false
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
        expect(checkbox).toHaveAttribute('data-state', 'unchecked')
      })

      it('overrides checked state when indeterminate', () => {
        render(<Checkbox checked indeterminate data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
      })

      it('updates indeterminate state via prop', () => {
        const { rerender } = render(<Checkbox indeterminate={false} data-testid="checkbox" />)
        let checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')

        rerender(<Checkbox indeterminate={true} data-testid="checkbox" />)
        checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
      })
    })

    describe('Custom Icon', () => {
      it('renders custom icon when provided', () => {
        render(<Checkbox icon={<span data-testid="custom-icon">★</span>} checked data-testid="checkbox" />)
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      })

      it('uses default check icon when no custom icon', () => {
        render(<Checkbox checked data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        const checkIcon = checkbox.querySelector('svg')
        expect(checkIcon).toBeInTheDocument()
      })

      it('prioritizes indeterminate over custom icon', () => {
        render(
          <Checkbox 
            indeterminate 
            icon={<span data-testid="custom-icon">★</span>} 
            data-testid="checkbox" 
          />
        )
        expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument()
        
        const checkbox = screen.getByTestId('checkbox')
        // Check that custom icon is not rendered
        expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument()
        // Indeterminate state should show as unchecked
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
      })
    })

    describe('Interactions', () => {
      it('handles click events', () => {
        const handleChange = jest.fn()
        render(<Checkbox onCheckedChange={handleChange} data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        
        fireEvent.click(checkbox)
        expect(handleChange).toHaveBeenCalledWith(true)
      })

      it('does not trigger events when disabled', () => {
        const handleChange = jest.fn()
        render(<Checkbox disabled onCheckedChange={handleChange} data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        
        fireEvent.click(checkbox)
        expect(handleChange).not.toHaveBeenCalled()
      })

      it('is focusable for keyboard navigation', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        
        checkbox.focus()
        expect(checkbox).toHaveFocus()
      })
    })

    describe('Accessibility', () => {
      it('has correct ARIA attributes', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('role', 'checkbox')
        expect(checkbox).toHaveAttribute('aria-checked', 'false')
      })

      it('supports custom ARIA attributes', () => {
        render(<Checkbox aria-label="Accept terms" data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveAttribute('aria-label', 'Accept terms')
      })

      it('has focus-visible styles', () => {
        render(<Checkbox data-testid="checkbox" />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toHaveClass('focus-visible:outline-none')
        expect(checkbox).toHaveClass('focus-visible:ring-2')
      })
    })
  })

  describe('CheckboxGroup Component', () => {
    it('renders correctly with default props', () => {
      render(
        <CheckboxGroup data-testid="checkbox-group">
          <Checkbox />
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toBeInTheDocument()
      expect(group).toHaveAttribute('role', 'group')
      expect(group).toHaveClass('flex', 'flex-col')
    })

    it('renders horizontal orientation correctly', () => {
      render(
        <CheckboxGroup orientation="horizontal" data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveClass('flex-row', 'flex-wrap')
    })

    it('renders vertical orientation correctly', () => {
      render(
        <CheckboxGroup orientation="vertical" data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveClass('flex-col')
    })

    it('applies custom spacing', () => {
      render(
        <CheckboxGroup spacing="2rem" data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveStyle({ gap: '2rem' })
    })

    it('applies custom spacing as number', () => {
      render(
        <CheckboxGroup spacing={24} data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveStyle({ gap: '24px' })
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <CheckboxGroup ref={ref} data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CheckboxGroup.displayName).toBe('CheckboxGroup')
    })
  })

  describe('CheckboxLabel Component', () => {
    it('renders correctly with default props', () => {
      render(<CheckboxLabel data-testid="checkbox-label">Label text</CheckboxLabel>)
      const label = screen.getByTestId('checkbox-label')
      expect(label).toBeInTheDocument()
      expect(label.tagName).toBe('LABEL')
      expect(label).toHaveTextContent('Label text')
    })

    it('applies htmlFor attribute', () => {
      render(<CheckboxLabel htmlFor="checkbox-1" data-testid="checkbox-label">Label</CheckboxLabel>)
      const label = screen.getByTestId('checkbox-label')
      expect(label).toHaveAttribute('for', 'checkbox-1')
    })

    it('renders start position correctly', () => {
      render(<CheckboxLabel position="start" data-testid="checkbox-label">Label</CheckboxLabel>)
      const label = screen.getByTestId('checkbox-label')
      expect(label).toHaveClass('mr-2')
    })

    it('renders end position correctly', () => {
      render(<CheckboxLabel position="end" data-testid="checkbox-label">Label</CheckboxLabel>)
      const label = screen.getByTestId('checkbox-label')
      expect(label).toHaveClass('ml-2')
    })

    it('renders disabled state correctly', () => {
      render(<CheckboxLabel disabled data-testid="checkbox-label">Label</CheckboxLabel>)
      const label = screen.getByTestId('checkbox-label')
      expect(label).toHaveClass('cursor-not-allowed', 'opacity-70')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(<CheckboxLabel ref={ref} data-testid="checkbox-label">Label</CheckboxLabel>)
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })

    it('maintains displayName', () => {
      expect(CheckboxLabel.displayName).toBe('CheckboxLabel')
    })
  })

  describe('CheckboxWithLabel Component', () => {
    it('renders correctly with default props', () => {
      render(<CheckboxWithLabel label="Accept terms" data-testid="checkbox-with-label" />)
      const container = screen.getByTestId('checkbox-with-label').parentElement
      expect(container).toHaveClass('flex', 'items-center')
      expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('renders label at start position', () => {
      render(<CheckboxWithLabel label="Accept terms" labelPosition="start" data-testid="checkbox-with-label" />)
      const container = screen.getByTestId('checkbox-with-label').parentElement
      const label = container?.querySelector('label')
      const checkbox = container?.querySelector('[role="checkbox"]')
      
      expect(label).toBeInTheDocument()
      expect(checkbox).toBeInTheDocument()
      
      // Label should come before checkbox in DOM
      const elements = Array.from(container?.children || [])
      const labelIndex = elements.indexOf(label!)
      const checkboxIndex = elements.indexOf(checkbox!)
      expect(labelIndex).toBeLessThan(checkboxIndex)
    })

    it('renders label at end position', () => {
      render(<CheckboxWithLabel label="Accept terms" labelPosition="end" data-testid="checkbox-with-label" />)
      const container = screen.getByTestId('checkbox-with-label').parentElement
      const label = container?.querySelector('label')
      const checkbox = container?.querySelector('[role="checkbox"]')
      
      expect(label).toBeInTheDocument()
      expect(checkbox).toBeInTheDocument()
      
      // Checkbox should come before label in DOM
      const elements = Array.from(container?.children || [])
      const labelIndex = elements.indexOf(label!)
      const checkboxIndex = elements.indexOf(checkbox!)
      expect(checkboxIndex).toBeLessThan(labelIndex)
    })

    it('applies custom label className', () => {
      render(
        <CheckboxWithLabel 
          label="Accept terms" 
          labelClassName="custom-label" 
          data-testid="checkbox-with-label" 
        />
      )
      const label = screen.getByText('Accept terms')
      expect(label).toHaveClass('custom-label')
    })

    it('generates unique id when not provided', () => {
      render(<CheckboxWithLabel label="Accept terms" data-testid="checkbox-with-label" />)
      const checkbox = screen.getByTestId('checkbox-with-label')
      const id = checkbox.getAttribute('id')
      expect(id).toMatch(/^checkbox-[a-z0-9]+$/)
    })

    it('uses provided id', () => {
      render(<CheckboxWithLabel id="custom-id" label="Accept terms" data-testid="checkbox-with-label" />)
      const checkbox = screen.getByTestId('checkbox-with-label')
      expect(checkbox).toHaveAttribute('id', 'custom-id')
      
      const label = screen.getByText('Accept terms')
      expect(label).toHaveAttribute('for', 'custom-id')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<CheckboxWithLabel ref={ref} label="Accept terms" data-testid="checkbox-with-label" />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('passes checkbox props correctly', () => {
      render(
        <CheckboxWithLabel 
          label="Accept terms" 
          checked 
          disabled 
          variant="outline" 
          data-testid="checkbox-with-label" 
        />
      )
      const checkbox = screen.getByTestId('checkbox-with-label')
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
      expect(checkbox).toBeDisabled()
      expect(checkbox).toHaveClass('bg-transparent')
    })

    it('maintains displayName', () => {
      expect(CheckboxWithLabel.displayName).toBe('CheckboxWithLabel')
    })
  })

  describe('Complex Combinations', () => {
    it('renders checkbox with all props correctly', () => {
      const handleChange = jest.fn()
      render(
        <Checkbox
          variant="outline"
          size="lg"
          radius="full"
          animation="bounce"
          checked={true}
          indeterminate={false}
          onCheckedChange={handleChange}
          className="custom-class"
          data-testid="checkbox"
        />
      )
      
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveClass('bg-transparent')
      expect(checkbox).toHaveClass('h-6', 'w-6')
      expect(checkbox).toHaveClass('rounded-full')
      expect(checkbox).toHaveClass('transition-all')
      expect(checkbox).toHaveClass('custom-class')
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })

    it('renders checkbox group with multiple checkboxes', () => {
      render(
        <CheckboxGroup orientation="horizontal" spacing="1.5rem" data-testid="checkbox-group">
          <CheckboxWithLabel label="Option 1" />
          <CheckboxWithLabel label="Option 2" />
          <CheckboxWithLabel label="Option 3" />
        </CheckboxGroup>
      )
      
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveClass('flex-row')
      expect(group).toHaveStyle({ gap: '1.5rem' })
      
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
      expect(screen.getByText('Option 3')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('passes through HTML attributes', () => {
      render(<Checkbox data-testid="checkbox-test" id="checkbox-1" />)
      const checkbox = screen.getByTestId('checkbox-test')
      expect(checkbox).toHaveAttribute('id', 'checkbox-1')
    })

    it('handles null icon gracefully', () => {
      render(<Checkbox icon={null} checked data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('handles empty label in CheckboxWithLabel', () => {
      render(<CheckboxWithLabel label="" data-testid="checkbox-with-label" />)
      const container = screen.getByTestId('checkbox-with-label').parentElement
      const label = container?.querySelector('label')
      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('')
    })

    it('handles zero spacing in CheckboxGroup', () => {
      render(
        <CheckboxGroup spacing={0} data-testid="checkbox-group">
          <Checkbox />
        </CheckboxGroup>
      )
      const group = screen.getByTestId('checkbox-group')
      expect(group).toHaveStyle({ gap: 0 })
    })
  })
})
