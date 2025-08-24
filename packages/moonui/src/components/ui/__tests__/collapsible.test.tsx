import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  collapsibleTriggerVariants,
  collapsibleContentVariants,
} from '../collapsible'

describe('Collapsible Components', () => {
  describe('Collapsible Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Collapsible data-testid="collapsible">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const collapsible = screen.getByTestId('collapsible')
      expect(collapsible).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <Collapsible className="custom-class" data-testid="collapsible">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const collapsible = screen.getByTestId('collapsible')
      expect(collapsible).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Collapsible ref={ref} data-testid="collapsible">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('handles controlled state', () => {
      const onOpenChange = jest.fn()
      render(
        <Collapsible open={true} onOpenChange={onOpenChange} data-testid="collapsible">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('passes through HTML attributes', () => {
      render(
        <Collapsible data-testid="collapsible" id="collapsible-1">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const collapsible = screen.getByTestId('collapsible')
      expect(collapsible).toHaveAttribute('id', 'collapsible-1')
    })
  })

  describe('CollapsibleTrigger Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveClass('flex')
    })

    it('applies custom className', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger className="custom-trigger" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('custom-trigger')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(
        <Collapsible>
          <CollapsibleTrigger ref={ref} data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('maintains displayName', () => {
      expect(CollapsibleTrigger.displayName).toBe('CollapsibleTrigger')
    })

    it('renders default variant correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('text-foreground')
    })

    it('renders ghost variant correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger variant="ghost" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('rounded')
    })

    it('renders outline variant correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger variant="outline" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('border')
    })

    it('renders sm size correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger size="sm" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('text-xs')
    })

    it('renders default size correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('text-sm')
    })

    it('renders md size correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger size="md" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('text-base')
    })

    it('renders lg size correctly', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger size="lg" data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('text-lg')
    })

    it('renders chevron icon', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      const chevron = trigger.querySelector('svg')
      expect(chevron).toBeInTheDocument()
      expect(chevron).toHaveClass('h-4')
    })

    it('handles click events', () => {
      const onClick = jest.fn()
      render(
        <Collapsible>
          <CollapsibleTrigger onClick={onClick} data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      fireEvent.click(trigger)
      expect(onClick).toHaveBeenCalled()
    })

    it('passes through HTML attributes', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger data-testid="trigger" id="trigger-1">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveAttribute('id', 'trigger-1')
    })
  })

  describe('CollapsibleContent Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">Content</CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('overflow-hidden')
    })

    it('applies custom className', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent className="custom-content" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('custom-content')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent ref={ref} data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(CollapsibleContent.displayName).toBe('CollapsibleContent')
    })

    it('renders default variant correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">Content</CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('text-muted-foreground')
    })

    it('renders ghost variant correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent variant="ghost" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('rounded-b')
    })

    it('renders outline variant correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent variant="outline" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('border')
    })

    it('renders sm size correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent size="sm" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('text-xs')
    })

    it('renders default size correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">Content</CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('text-sm')
    })

    it('renders md size correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent size="md" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('text-base')
    })

    it('renders lg size correctly', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent size="lg" data-testid="content">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveClass('text-lg')
    })

    it('renders content wrapper with padding', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">Content</CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      const wrapper = content.querySelector('.p-4')
      expect(wrapper).toBeInTheDocument()
      expect(wrapper).toHaveTextContent('Content')
    })

    it('passes through HTML attributes', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content" id="content-1">
            Content
          </CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toHaveAttribute('id', 'content-1')
    })
  })

  describe('Variant Functions', () => {
    it('collapsibleTriggerVariants generates correct classes', () => {
      expect(collapsibleTriggerVariants()).toContain('flex w-full items-center justify-between')
      expect(collapsibleTriggerVariants({ variant: 'ghost' })).toContain('rounded')
      expect(collapsibleTriggerVariants({ size: 'sm' })).toContain('text-xs py-2 px-3')
    })

    it('collapsibleContentVariants generates correct classes', () => {
      expect(collapsibleContentVariants()).toContain('overflow-hidden transition-all')
      expect(collapsibleContentVariants({ variant: 'outline' })).toContain('border')
      expect(collapsibleContentVariants({ size: 'lg' })).toContain('text-lg')
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all props and variants', () => {
      render(
        <Collapsible defaultOpen className="custom-collapsible" data-testid="collapsible">
          <CollapsibleTrigger
            variant="outline"
            size="lg"
            className="custom-trigger"
            data-testid="trigger"
          >
            Toggle Content
          </CollapsibleTrigger>
          <CollapsibleContent
            variant="outline"
            size="lg"
            className="custom-content"
            data-testid="content"
          >
            This is the collapsible content
          </CollapsibleContent>
        </Collapsible>
      )

      const collapsible = screen.getByTestId('collapsible')
      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')

      expect(collapsible).toHaveClass('custom-collapsible')
      expect(trigger).toHaveClass('custom-trigger')
      expect(content).toHaveClass('custom-content')
    })

    it('handles toggle functionality', () => {
      render(
        <Collapsible data-testid="collapsible">
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')

      // Initially closed
      expect(screen.queryByText('Content')).not.toBeInTheDocument()

      // Click to open
      fireEvent.click(trigger)
      expect(screen.getByText('Content')).toBeInTheDocument()

      // Click to close
      fireEvent.click(trigger)
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('renders multiple collapsibles independently', () => {
      render(
        <div>
          <Collapsible data-testid="collapsible-1">
            <CollapsibleTrigger data-testid="trigger-1">Toggle 1</CollapsibleTrigger>
            <CollapsibleContent>Content 1</CollapsibleContent>
          </Collapsible>
          <Collapsible data-testid="collapsible-2">
            <CollapsibleTrigger data-testid="trigger-2">Toggle 2</CollapsibleTrigger>
            <CollapsibleContent>Content 2</CollapsibleContent>
          </Collapsible>
        </div>
      )

      const trigger1 = screen.getByTestId('trigger-1')
      const trigger2 = screen.getByTestId('trigger-2')

      // Open first collapsible
      fireEvent.click(trigger1)
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

      // Open second collapsible
      fireEvent.click(trigger2)
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content"></CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
    })

    it('handles complex nested content', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">
            <div>
              <h3>Nested Title</h3>
              <p>Nested paragraph</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )

      expect(screen.getByText('Nested Title')).toBeInTheDocument()
      expect(screen.getByText('Nested paragraph')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })

    it('handles disabled state', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger disabled data-testid="trigger">
            Toggle
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toBeDisabled()
    })

    it('handles null and undefined children', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid="content">
            {null}
            {undefined}
            Valid content
          </CollapsibleContent>
        </Collapsible>
      )

      expect(screen.getByText('Valid content')).toBeInTheDocument()
    })
  })
})
