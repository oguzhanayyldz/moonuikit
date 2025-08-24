import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'

describe('Accordion Components', () => {
  describe('Accordion Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Accordion data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toBeInTheDocument()
      expect(screen.getByText('Test Trigger')).toBeInTheDocument()
    })

    it('supports single type accordion', () => {
      render(
        <Accordion type="single" collapsible data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('supports multiple type accordion', () => {
      render(
        <Accordion type="multiple" data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(
        <Accordion id="custom-accordion" data-custom="value" data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toHaveAttribute('id', 'custom-accordion')
      expect(accordion).toHaveAttribute('data-custom', 'value')
    })

    it('handles controlled state', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string>('')
        
        return (
          <Accordion type="single" value={value} onValueChange={setValue} data-testid="accordion">
            <AccordionItem value="item-1">
              <AccordionTrigger>Item 1</AccordionTrigger>
              <AccordionContent>Content 1</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
      
      render(<TestComponent />)
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toBeInTheDocument()
    })
  })

  describe('AccordionItem Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" data-testid="accordion-item">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const item = screen.getByTestId('accordion-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveAttribute('data-state', 'closed')
    })

    it('applies custom className', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" className="custom-item" data-testid="accordion-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const item = screen.getByTestId('accordion-item')
      expect(item).toHaveClass('custom-item')
    })

    it('has correct default styling', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" data-testid="accordion-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const item = screen.getByTestId('accordion-item')
      expect(item).toHaveClass('border-b')
      expect(item).toHaveClass('border-gray-200')
      expect(item).toHaveClass('dark:border-gray-800')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Accordion>
          <AccordionItem ref={ref} value="item-1" data-testid="accordion-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(AccordionItem.displayName).toBe('AccordionItem')
    })

    it('passes through HTML attributes', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" id="custom-item" data-custom="value" data-testid="accordion-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const item = screen.getByTestId('accordion-item')
      expect(item).toHaveAttribute('id', 'custom-item')
      expect(item).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('AccordionTrigger Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-trigger">Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveTextContent('Test Trigger')
      expect(trigger).toHaveAttribute('type', 'button')
    })

    it('applies custom className', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger className="custom-trigger" data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      expect(trigger).toHaveClass('custom-trigger')
    })

    it('has correct default styling', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      expect(trigger).toHaveClass('flex')
      expect(trigger).toHaveClass('flex-1')
      expect(trigger).toHaveClass('items-center')
      expect(trigger).toHaveClass('justify-between')
      expect(trigger).toHaveClass('py-4')
      expect(trigger).toHaveClass('font-medium')
    })

    it('renders chevron icon', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      const chevron = trigger.querySelector('svg')
      expect(chevron).toBeInTheDocument()
      expect(chevron).toHaveClass('h-4')
      expect(chevron).toHaveClass('w-4')
      expect(chevron).toHaveClass('shrink-0')
    })

    it('handles click events', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      fireEvent.click(trigger)
      
      // Check if the item is now open
      const item = trigger.closest('[data-state]')
      expect(item).toHaveAttribute('data-state', 'open')
    })

    it('toggles chevron rotation when opened', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      fireEvent.click(trigger)
      
      // Check if chevron has rotation class
      expect(trigger).toHaveClass('[&[data-state=open]>svg]:rotate-180')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger ref={ref} data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('passes through HTML attributes', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger id="custom-trigger" data-custom="value" data-testid="accordion-trigger">Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('accordion-trigger')
      expect(trigger).toHaveAttribute('id', 'custom-trigger')
      expect(trigger).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('AccordionContent Component', () => {
    it('renders correctly when accordion is open', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent data-testid="accordion-content">Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Test Content')
    })

    it('applies custom className', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent className="custom-content" data-testid="accordion-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      expect(content).toHaveClass('custom-content')
    })

    it('has correct default styling', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent data-testid="accordion-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      expect(content).toHaveClass('overflow-hidden')
      expect(content).toHaveClass('text-sm')
      expect(content).toHaveClass('text-gray-700')
      expect(content).toHaveClass('dark:text-gray-300')
    })

    it('has animation classes', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent data-testid="accordion-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      expect(content).toHaveClass('data-[state=closed]:animate-accordion-up')
      expect(content).toHaveClass('data-[state=open]:animate-accordion-down')
    })

    it('renders content wrapper with correct styling', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent data-testid="accordion-content">Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      const wrapper = content.querySelector('div')
      expect(wrapper).toBeInTheDocument()
      expect(wrapper).toHaveClass('pb-4')
      expect(wrapper).toHaveClass('pt-0')
      expect(wrapper).toHaveTextContent('Test Content')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent ref={ref} data-testid="accordion-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('passes through HTML attributes', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent id="custom-content" data-custom="value" data-testid="accordion-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const content = screen.getByTestId('accordion-content')
      expect(content).toHaveAttribute('id', 'custom-content')
      expect(content).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Complex Combinations', () => {
    it('renders multiple accordion items', () => {
      render(
        <Accordion type="single" collapsible data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Item 3</AccordionTrigger>
            <AccordionContent>Content 3</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('handles single type accordion interaction', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger-1">Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger data-testid="trigger-2">Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger1 = screen.getByTestId('trigger-1')
      const trigger2 = screen.getByTestId('trigger-2')
      
      // Open first item
      fireEvent.click(trigger1)
      expect(trigger1.closest('[data-state]')).toHaveAttribute('data-state', 'open')
      
      // Open second item (should close first)
      fireEvent.click(trigger2)
      expect(trigger1.closest('[data-state]')).toHaveAttribute('data-state', 'closed')
      expect(trigger2.closest('[data-state]')).toHaveAttribute('data-state', 'open')
    })

    it('handles multiple type accordion interaction', () => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger-1">Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger data-testid="trigger-2">Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger1 = screen.getByTestId('trigger-1')
      const trigger2 = screen.getByTestId('trigger-2')
      
      // Open both items
      fireEvent.click(trigger1)
      fireEvent.click(trigger2)
      
      expect(trigger1.closest('[data-state]')).toHaveAttribute('data-state', 'open')
      expect(trigger2.closest('[data-state]')).toHaveAttribute('data-state', 'open')
    })

    it('renders with all custom props', () => {
      render(
        <Accordion type="single" collapsible className="custom-accordion" data-testid="accordion">
          <AccordionItem value="item-1" className="custom-item">
            <AccordionTrigger className="custom-trigger">Custom Item</AccordionTrigger>
            <AccordionContent className="custom-content">Custom Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toHaveClass('custom-accordion')
      
      const item = accordion.querySelector('[data-state]')
      expect(item).toHaveClass('custom-item')
      
      const trigger = screen.getByText('Custom Item')
      expect(trigger).toHaveClass('custom-trigger')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty accordion', () => {
      render(<Accordion data-testid="accordion" />)
      const accordion = screen.getByTestId('accordion')
      expect(accordion).toBeInTheDocument()
    })

    it('handles accordion with no content', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Empty Item</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(screen.getByText('Empty Item')).toBeInTheDocument()
    })

    it('handles accordion with complex content', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Complex Item</AccordionTrigger>
            <AccordionContent>
              <div>
                <p>Paragraph 1</p>
                <p>Paragraph 2</p>
                <button>Action Button</button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
      expect(screen.getByText('Action Button')).toBeInTheDocument()
    })

    it('handles disabled accordion item', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger data-testid="disabled-trigger">Disabled Item</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      const trigger = screen.getByTestId('disabled-trigger')
      expect(trigger).toBeDisabled()
    })
  })
})
