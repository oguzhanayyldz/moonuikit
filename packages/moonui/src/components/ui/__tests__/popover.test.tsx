import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverSeparator,
  PopoverHeader,
  PopoverFooter,
  popoverContentVariants,
} from '../popover'

// Mock Radix UI Popover components
jest.mock('@radix-ui/react-popover', () => {
  const mockForwardRef = (component: any) => {
    const forwardedComponent = (props: any) => component(props, null)
    forwardedComponent.displayName = component.displayName || component.name
    return forwardedComponent
  }

  return {
    Root: ({ children, ...props }: any) => <div data-testid="popover-root" {...props}>{children}</div>,
    Trigger: mockForwardRef(({ children, ...props }: any, ref: any) => (
      <button ref={ref} data-testid="popover-trigger" {...props}>{children}</button>
    )),
    Content: mockForwardRef(({ children, className, onInteractOutside, ...props }: any, ref: any) => (
      <div 
        ref={ref} 
        data-testid="popover-content" 
        className={className}
        onClick={(e) => onInteractOutside?.(e)}
        {...props}
      >
        {children}
      </div>
    )),
    Anchor: mockForwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} data-testid="popover-anchor" {...props}>{children}</div>
    )),
    Close: mockForwardRef(({ children, ...props }: any, ref: any) => (
      <button ref={ref} data-testid="popover-close" {...props}>{children}</button>
    )),
  }
})

describe('Popover Components', () => {
  describe('Popover Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )
      
      // Popover Root doesn't render a DOM element, just manages state
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(
        <Popover data-custom="test" aria-label="Custom popover">
          <PopoverTrigger>Open</PopoverTrigger>
        </Popover>
      )
      
      const popover = screen.getByTestId('popover-root')
      expect(popover).toHaveAttribute('data-custom', 'test')
      expect(popover).toHaveAttribute('aria-label', 'Custom popover')
    })
  })

  describe('PopoverTrigger Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Popover>
          <PopoverTrigger>Open Popover</PopoverTrigger>
        </Popover>
      )
      
      const trigger = screen.getByTestId('popover-trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveTextContent('Open Popover')
    })

    it('handles click events', () => {
      const onClick = jest.fn()
      render(
        <Popover>
          <PopoverTrigger onClick={onClick}>Open</PopoverTrigger>
        </Popover>
      )
      
      const trigger = screen.getByTestId('popover-trigger')
      fireEvent.click(trigger)
      
      expect(onClick).toHaveBeenCalled()
    })

    it('passes through HTML attributes', () => {
      render(
        <Popover>
          <PopoverTrigger data-custom="test" aria-label="Open popover">
            Open
          </PopoverTrigger>
        </Popover>
      )
      
      const trigger = screen.getByTestId('popover-trigger')
      expect(trigger).toHaveAttribute('data-custom', 'test')
      expect(trigger).toHaveAttribute('aria-label', 'Open popover')
    })
  })

  describe('PopoverContent Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Popover>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Popover content')
    })

    it('applies custom className', () => {
      render(
        <Popover>
          <PopoverContent className="custom-class">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toHaveClass('custom-class')
    })

    it('renders default variant correctly', () => {
      render(
        <Popover>
          <PopoverContent variant="default">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders destructive variant correctly', () => {
      render(
        <Popover>
          <PopoverContent variant="destructive">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders outline variant correctly', () => {
      render(
        <Popover>
          <PopoverContent variant="outline">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders subtle variant correctly', () => {
      render(
        <Popover>
          <PopoverContent variant="subtle">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders sm size correctly', () => {
      render(
        <Popover>
          <PopoverContent size="sm">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders default size correctly', () => {
      render(
        <Popover>
          <PopoverContent size="default">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders lg size correctly', () => {
      render(
        <Popover>
          <PopoverContent size="lg">Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('renders different radius options correctly', () => {
      const radiusOptions = ['none', 'sm', 'default', 'lg', 'full'] as const
      
      radiusOptions.forEach((radius) => {
        render(
          <Popover>
            <PopoverContent radius={radius} data-testid={`content-${radius}`}>
              Content
            </PopoverContent>
          </Popover>
        )
        
        expect(screen.getByTestId(`content-${radius}`)).toBeInTheDocument()
      })
    })

    it('renders different shadow options correctly', () => {
      const shadowOptions = ['none', 'sm', 'default', 'md', 'lg', 'xl'] as const
      
      shadowOptions.forEach((shadow) => {
        render(
          <Popover>
            <PopoverContent shadow={shadow} data-testid={`content-${shadow}`}>
              Content
            </PopoverContent>
          </Popover>
        )
        
        expect(screen.getByTestId(`content-${shadow}`)).toBeInTheDocument()
      })
    })

    it('handles backdrop prop', () => {
      render(
        <Popover>
          <PopoverContent backdrop={true}>Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    it('handles overlayBackdrop prop', () => {
      render(
        <Popover>
          <PopoverContent overlayBackdrop={true}>Content</PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
      // Overlay backdrop creates a div with fixed positioning
      expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument()
    })

    it('handles closeOnInteractOutside prop', () => {
      const onInteractOutside = jest.fn()
      render(
        <Popover>
          <PopoverContent closeOnInteractOutside={false}>
            Content
          </PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      fireEvent.click(content)
      
      // Should prevent default when closeOnInteractOutside is false
      expect(content).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Popover>
          <PopoverContent ref={ref}>Content</PopoverContent>
        </Popover>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(PopoverContent.displayName).toBeDefined()
    })

    it('passes through HTML attributes', () => {
      render(
        <Popover>
          <PopoverContent data-custom="test" aria-label="Popover content">
            Content
          </PopoverContent>
        </Popover>
      )
      
      const content = screen.getByTestId('popover-content')
      expect(content).toHaveAttribute('data-custom', 'test')
      expect(content).toHaveAttribute('aria-label', 'Popover content')
    })
  })

  describe('PopoverAnchor Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Popover>
          <PopoverAnchor>Anchor</PopoverAnchor>
        </Popover>
      )
      
      const anchor = screen.getByTestId('popover-anchor')
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveTextContent('Anchor')
    })

    it('passes through HTML attributes', () => {
      render(
        <Popover>
          <PopoverAnchor data-custom="test">Anchor</PopoverAnchor>
        </Popover>
      )
      
      const anchor = screen.getByTestId('popover-anchor')
      expect(anchor).toHaveAttribute('data-custom', 'test')
    })
  })

  describe('PopoverClose Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Popover>
          <PopoverClose>Close</PopoverClose>
        </Popover>
      )
      
      const close = screen.getByTestId('popover-close')
      expect(close).toBeInTheDocument()
      expect(close).toHaveTextContent('Close')
    })

    it('handles click events', () => {
      const onClick = jest.fn()
      render(
        <Popover>
          <PopoverClose onClick={onClick}>Close</PopoverClose>
        </Popover>
      )
      
      const close = screen.getByTestId('popover-close')
      fireEvent.click(close)
      
      expect(onClick).toHaveBeenCalled()
    })

    it('passes through HTML attributes', () => {
      render(
        <Popover>
          <PopoverClose data-custom="test" aria-label="Close popover">
            Close
          </PopoverClose>
        </Popover>
      )
      
      const close = screen.getByTestId('popover-close')
      expect(close).toHaveAttribute('data-custom', 'test')
      expect(close).toHaveAttribute('aria-label', 'Close popover')
    })
  })

  describe('PopoverSeparator Component', () => {
    it('renders correctly with default props', () => {
      render(<PopoverSeparator data-testid="popover-separator" />)
      
      const separator = screen.getByTestId('popover-separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveClass('my-2', 'h-px', 'bg-border')
    })

    it('applies custom className', () => {
      render(<PopoverSeparator className="custom-separator" data-testid="separator" />)
      
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveClass('custom-separator')
      expect(separator).toHaveClass('my-2', 'h-px', 'bg-border')
    })

    it('maintains displayName', () => {
      expect(PopoverSeparator.displayName).toBe('PopoverSeparator')
    })

    it('passes through HTML attributes', () => {
      render(<PopoverSeparator data-custom="test" data-testid="separator" />)
      
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('data-custom', 'test')
    })
  })

  describe('PopoverHeader Component', () => {
    it('renders correctly with default props', () => {
      render(<PopoverHeader data-testid="popover-header">Header</PopoverHeader>)
      
      const header = screen.getByTestId('popover-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent('Header')
      expect(header).toHaveClass('-mx-4', '-mt-4', 'mb-3', 'px-4', 'pt-4', 'pb-3', 'border-b', 'border-border')
    })

    it('applies custom className', () => {
      render(<PopoverHeader className="custom-header" data-testid="header">Header</PopoverHeader>)
      
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('custom-header')
      expect(header).toHaveClass('-mx-4', '-mt-4', 'mb-3')
    })

    it('maintains displayName', () => {
      expect(PopoverHeader.displayName).toBe('PopoverHeader')
    })

    it('passes through HTML attributes', () => {
      render(<PopoverHeader data-custom="test" data-testid="header">Header</PopoverHeader>)
      
      const header = screen.getByTestId('header')
      expect(header).toHaveAttribute('data-custom', 'test')
    })
  })

  describe('PopoverFooter Component', () => {
    it('renders correctly with default props', () => {
      render(<PopoverFooter data-testid="popover-footer">Footer</PopoverFooter>)
      
      const footer = screen.getByTestId('popover-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveTextContent('Footer')
      expect(footer).toHaveClass('-mx-4', '-mb-4', 'mt-3', 'px-4', 'pt-3', 'pb-4', 'border-t', 'border-border')
    })

    it('applies custom className', () => {
      render(<PopoverFooter className="custom-footer" data-testid="footer">Footer</PopoverFooter>)
      
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('custom-footer')
      expect(footer).toHaveClass('-mx-4', '-mb-4', 'mt-3')
    })

    it('maintains displayName', () => {
      expect(PopoverFooter.displayName).toBe('PopoverFooter')
    })

    it('passes through HTML attributes', () => {
      render(<PopoverFooter data-custom="test" data-testid="footer">Footer</PopoverFooter>)
      
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveAttribute('data-custom', 'test')
    })
  })

  describe('Variant Functions', () => {
    it('popoverContentVariants function works correctly', () => {
      const variants = popoverContentVariants({
        variant: 'destructive',
        size: 'lg',
        radius: 'full',
        shadow: 'xl'
      })
      
      expect(typeof variants).toBe('string')
      expect(variants.length).toBeGreaterThan(0)
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete popover with all components', () => {
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverAnchor>Anchor</PopoverAnchor>
          <PopoverContent>
            <PopoverHeader>Header</PopoverHeader>
            <div>Content</div>
            <PopoverSeparator />
            <PopoverFooter>
              Footer
              <PopoverClose>Close</PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )
      
      expect(screen.getByTestId('popover-root')).toBeInTheDocument()
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('popover-anchor')).toBeInTheDocument()
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
      expect(screen.getByTestId('popover-close')).toBeInTheDocument()
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('handles all content variants and sizes together', () => {
      render(
        <div>
          <Popover>
            <PopoverContent variant="destructive" size="sm" radius="none" shadow="xl">
              Destructive Small
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverContent variant="outline" size="lg" radius="full" shadow="none">
              Outline Large
            </PopoverContent>
          </Popover>
        </div>
      )
      
      expect(screen.getByText('Destructive Small')).toBeInTheDocument()
      expect(screen.getByText('Outline Large')).toBeInTheDocument()
    })

    it('handles backdrop and overlay combinations', () => {
      render(
        <Popover>
          <PopoverContent backdrop={true} overlayBackdrop={true} closeOnInteractOutside={false}>
            Complex Content
          </PopoverContent>
        </Popover>
      )
      
      expect(screen.getByText('Complex Content')).toBeInTheDocument()
      expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty popover', () => {
      render(<Popover />)
      
      expect(screen.getByTestId('popover-root')).toBeInTheDocument()
    })

    it('handles popover without content', () => {
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
        </Popover>
      )
      
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument()
    })

    it('handles null and undefined children', () => {
      render(
        <Popover>
          <PopoverContent>
            {null}
            {undefined}
            <div>Valid content</div>
          </PopoverContent>
        </Popover>
      )
      
      expect(screen.getByText('Valid content')).toBeInTheDocument()
    })

    it('handles complex nested content', () => {
      render(
        <Popover>
          <PopoverContent>
            <PopoverHeader>
              <h3>Complex Header</h3>
              <p>With multiple elements</p>
            </PopoverHeader>
            <div>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
            <PopoverSeparator />
            <PopoverFooter>
              <button>Action 1</button>
              <PopoverClose>Cancel</PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )
      
      expect(screen.getByText('Complex Header')).toBeInTheDocument()
      expect(screen.getByText('With multiple elements')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Action 1')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('handles multiple popovers on same page', () => {
      render(
        <div>
          <Popover>
            <PopoverTrigger>First Trigger</PopoverTrigger>
            <PopoverContent>First Content</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Second Trigger</PopoverTrigger>
            <PopoverContent>Second Content</PopoverContent>
          </Popover>
        </div>
      )
      
      expect(screen.getByText('First Trigger')).toBeInTheDocument()
      expect(screen.getByText('First Content')).toBeInTheDocument()
      expect(screen.getByText('Second Trigger')).toBeInTheDocument()
      expect(screen.getByText('Second Content')).toBeInTheDocument()
    })
  })
})
