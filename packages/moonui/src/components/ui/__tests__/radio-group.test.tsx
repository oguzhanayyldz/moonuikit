import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  RadioGroup,
  RadioGroupItem,
  RadioLabel,
  RadioItemWithLabel,
} from '../radio-group'

describe('RadioGroup Components', () => {
  describe('RadioGroup Component', () => {
    it('renders correctly with default props', () => {
      render(
        <RadioGroup data-testid="radio-group">
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toBeInTheDocument()
      expect(radioGroup).toHaveAttribute('role', 'radiogroup')
      expect(radioGroup).toHaveClass('grid', 'gap-2')
    })

    it('applies custom className', () => {
      render(
        <RadioGroup className="custom-class" data-testid="radio-group">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      )
      
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <RadioGroup ref={ref} data-testid="radio-group">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('handles controlled state', () => {
      const onValueChange = jest.fn()
      render(
        <RadioGroup value="option2" onValueChange={onValueChange} data-testid="radio-group">
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      
      const option1 = screen.getByDisplayValue('option1')
      const option2 = screen.getByDisplayValue('option2')
      
      expect(option1).not.toBeChecked()
      expect(option2).toBeChecked()
      
      fireEvent.click(option1)
      expect(onValueChange).toHaveBeenCalledWith('option1')
    })

    it('handles disabled state', () => {
      render(
        <RadioGroup disabled data-testid="radio-group">
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      
      const option1 = screen.getByDisplayValue('option1')
      const option2 = screen.getByDisplayValue('option2')
      
      expect(option1).toBeDisabled()
      expect(option2).toBeDisabled()
    })

    it('passes through HTML attributes', () => {
      render(
        <RadioGroup data-testid="radio-group" id="radio-group-1">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      )
      
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toHaveAttribute('id', 'radio-group-1')
    })

    it('maintains displayName', () => {
      expect(RadioGroup.displayName).toBe('RadioGroup')
    })
  })

  describe('RadioGroupItem Component', () => {
    it('renders correctly with default props', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" data-testid="radio-item" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      expect(radioItem).toBeInTheDocument()
      expect(radioItem).toHaveAttribute('type', 'radio')
      expect(radioItem).toHaveAttribute('value', 'test')
    })

    it('applies custom className to label', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" className="custom-radio" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('custom-radio')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(
        <RadioGroup>
          <RadioGroupItem ref={ref} value="test" />
        </RadioGroup>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('maintains displayName', () => {
      expect(RadioGroupItem.displayName).toBe('RadioGroupItem')
    })

    it('renders default variant correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('border-border', 'bg-background', 'text-primary')
    })

    it('renders outline variant correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" variant="outline" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('border-border', 'bg-transparent', 'text-primary')
    })

    it('renders filled variant correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" variant="filled" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('border-primary', 'bg-primary/10', 'text-primary')
    })

    it('renders sm size correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" size="sm" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('h-3.5', 'w-3.5')
    })

    it('renders default size correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('h-4', 'w-4')
    })

    it('renders md size correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" size="md" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('h-5', 'w-5')
    })

    it('renders lg size correctly', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" size="lg" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      expect(label).toHaveClass('h-6', 'w-6')
    })

    it('renders custom indicator when checked', () => {
      const CustomIndicator = () => <span data-testid="custom-indicator">✓</span>
      render(
        <RadioGroup value="test">
          <RadioGroupItem value="test" indicator={<CustomIndicator />} />
        </RadioGroup>
      )
      
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument()
    })

    it('renders default Circle indicator when checked', () => {
      render(
        <RadioGroup value="test">
          <RadioGroupItem value="test" />
        </RadioGroup>
      )
      
      const label = screen.getByDisplayValue('test').nextElementSibling
      const indicator = label?.querySelector('svg')
      expect(indicator).toBeInTheDocument()
    })

    it('handles disabled state', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" disabled />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      expect(radioItem).toBeDisabled()
      
      const label = radioItem.nextElementSibling
      expect(label).toHaveClass('cursor-not-allowed', 'opacity-50')
    })

    it('handles click events', () => {
      const onValueChange = jest.fn()
      render(
        <RadioGroup onValueChange={onValueChange}>
          <RadioGroupItem value="test" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      fireEvent.click(radioItem)
      expect(onValueChange).toHaveBeenCalledWith('test')
    })

    it('handles onChange callback integration', () => {
      const onValueChange = jest.fn()
      render(
        <RadioGroup onValueChange={onValueChange}>
          <RadioGroupItem value="test" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      
      // Click the radio item to trigger change
      fireEvent.click(radioItem)
      
      // onValueChange should be called with the value
      expect(onValueChange).toHaveBeenCalledWith('test')
    })

    it('passes through HTML attributes', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="test" id="radio-1" data-custom="value" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      expect(radioItem).toHaveAttribute('id', 'radio-1')
      expect(radioItem).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('RadioLabel Component', () => {
    it('renders correctly with default props', () => {
      render(<RadioLabel htmlFor="radio-1">Test Label</RadioLabel>)
      
      const label = screen.getByText('Test Label')
      expect(label).toBeInTheDocument()
      expect(label).toHaveAttribute('for', 'radio-1')
      expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none', 'ml-2', 'text-foreground')
    })

    it('applies custom className', () => {
      render(<RadioLabel className="custom-label">Test Label</RadioLabel>)
      
      const label = screen.getByText('Test Label')
      expect(label).toHaveClass('custom-label')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(<RadioLabel ref={ref}>Test Label</RadioLabel>)
      
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })

    it('handles disabled state', () => {
      render(<RadioLabel disabled>Test Label</RadioLabel>)
      
      const label = screen.getByText('Test Label')
      expect(label).toHaveClass('cursor-not-allowed', 'opacity-70')
    })

    it('passes through HTML attributes', () => {
      render(<RadioLabel id="label-1" data-custom="value">Test Label</RadioLabel>)
      
      const label = screen.getByText('Test Label')
      expect(label).toHaveAttribute('id', 'label-1')
      expect(label).toHaveAttribute('data-custom', 'value')
    })

    it('maintains displayName', () => {
      expect(RadioLabel.displayName).toBe('RadioLabel')
    })
  })

  describe('RadioItemWithLabel Component', () => {
    it('renders correctly with default props', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel value="test" label="Test Option" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      const label = screen.getByText('Test Option')
      
      expect(radioItem).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(label).toHaveAttribute('for', radioItem.id)
    })

    it('applies custom labelClassName', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel value="test" label="Test Option" labelClassName="custom-label" />
        </RadioGroup>
      )
      
      const label = screen.getByText('Test Option')
      expect(label).toHaveClass('custom-label')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(
        <RadioGroup>
          <RadioItemWithLabel ref={ref} value="test" label="Test Option" />
        </RadioGroup>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('handles disabled state', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel value="test" label="Test Option" disabled />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      const label = screen.getByText('Test Option')
      
      expect(radioItem).toBeDisabled()
      expect(label).toHaveClass('cursor-not-allowed', 'opacity-70')
    })

    it('uses custom id when provided', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel value="test" label="Test Option" id="custom-id" />
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      const label = screen.getByText('Test Option')
      
      expect(radioItem).toHaveAttribute('id', 'custom-id')
      expect(label).toHaveAttribute('for', 'custom-id')
    })

    it('generates unique id when not provided', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel value="test1" label="Test Option 1" />
          <RadioItemWithLabel value="test2" label="Test Option 2" />
        </RadioGroup>
      )
      
      const radioItem1 = screen.getByDisplayValue('test1')
      const radioItem2 = screen.getByDisplayValue('test2')
      const label1 = screen.getByText('Test Option 1')
      const label2 = screen.getByText('Test Option 2')
      
      expect(radioItem1.id).not.toBe(radioItem2.id)
      expect(label1.getAttribute('for')).toBe(radioItem1.id)
      expect(label2.getAttribute('for')).toBe(radioItem2.id)
    })

    it('maintains displayName', () => {
      expect(RadioItemWithLabel.displayName).toBe('RadioItemWithLabel')
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete radio group with all components', () => {
      const onValueChange = jest.fn()
      render(
        <RadioGroup value="option2" onValueChange={onValueChange} data-testid="radio-group">
          <RadioItemWithLabel value="option1" label="Option 1" />
          <RadioItemWithLabel value="option2" label="Option 2" />
          <div className="flex items-center">
            <RadioGroupItem value="option3" />
            <RadioLabel htmlFor="option3">Option 3</RadioLabel>
          </div>
        </RadioGroup>
      )
      
      const option1 = screen.getByDisplayValue('option1')
      const option2 = screen.getByDisplayValue('option2')
      const option3 = screen.getByDisplayValue('option3')
      
      expect(option1).not.toBeChecked()
      expect(option2).toBeChecked()
      expect(option3).not.toBeChecked()
      
      fireEvent.click(option3)
      expect(onValueChange).toHaveBeenCalledWith('option3')
    })

    it('handles all variants and sizes together', () => {
      render(
        <RadioGroup data-testid="radio-group">
          <RadioGroupItem value="default" variant="default" size="sm" />
          <RadioGroupItem value="outline" variant="outline" size="md" />
          <RadioGroupItem value="filled" variant="filled" size="lg" />
        </RadioGroup>
      )
      
      const defaultItem = screen.getByDisplayValue('default').nextElementSibling
      const outlineItem = screen.getByDisplayValue('outline').nextElementSibling
      const filledItem = screen.getByDisplayValue('filled').nextElementSibling
      
      expect(defaultItem).toHaveClass('h-3.5', 'w-3.5', 'border-border', 'bg-background')
      expect(outlineItem).toHaveClass('h-5', 'w-5', 'border-border', 'bg-transparent')
      expect(filledItem).toHaveClass('h-6', 'w-6', 'border-primary', 'bg-primary/10')
    })

    it('handles name attribute for form submission', () => {
      render(
        <RadioGroup name="test-group">
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      
      const option1 = screen.getByDisplayValue('option1')
      const option2 = screen.getByDisplayValue('option2')
      
      expect(option1).toHaveAttribute('name', 'test-group')
      expect(option2).toHaveAttribute('name', 'test-group')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty radio group', () => {
      render(<RadioGroup data-testid="radio-group" />)
      
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toBeInTheDocument()
      expect(radioGroup).toBeEmptyDOMElement()
    })

    it('handles radio item without context', () => {
      // RadioGroupItem outside of RadioGroup context
      render(<RadioGroupItem value="test" />)
      
      const radioItem = screen.getByDisplayValue('test')
      expect(radioItem).toBeInTheDocument()
      expect(radioItem).not.toBeChecked()
    })

    it('handles null and undefined children', () => {
      render(
        <RadioGroup>
          {null}
          <RadioGroupItem value="test" />
          {undefined}
        </RadioGroup>
      )
      
      const radioItem = screen.getByDisplayValue('test')
      expect(radioItem).toBeInTheDocument()
    })

    it('handles complex label content', () => {
      render(
        <RadioGroup>
          <RadioItemWithLabel 
            value="complex" 
            label={
              <div>
                <strong>Complex Label</strong>
                <p>With description</p>
              </div>
            } 
          />
        </RadioGroup>
      )
      
      expect(screen.getByText('Complex Label')).toBeInTheDocument()
      expect(screen.getByText('With description')).toBeInTheDocument()
    })

    it('handles disabled radio group with individual enabled items', () => {
      render(
        <RadioGroup disabled>
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" disabled={false} />
        </RadioGroup>
      )
      
      const option1 = screen.getByDisplayValue('option1')
      const option2 = screen.getByDisplayValue('option2')
      
      // Both should be disabled because group is disabled
      expect(option1).toBeDisabled()
      expect(option2).toBeDisabled()
    })
  })
})
