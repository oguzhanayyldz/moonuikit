import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AspectRatio } from '../aspect-ratio'

describe('AspectRatio Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Test Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <AspectRatio className="custom-aspect-ratio" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('custom-aspect-ratio')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <AspectRatio ref={ref} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(AspectRatio.displayName).toBe('AspectRatio')
    })
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(
        <AspectRatio variant="default" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-md')
      expect(aspectRatio).toHaveClass('bg-muted/10')
    })

    it('renders ghost variant correctly', () => {
      render(
        <AspectRatio variant="ghost" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('bg-transparent')
    })

    it('renders outline variant correctly', () => {
      render(
        <AspectRatio variant="outline" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-md')
      expect(aspectRatio).toHaveClass('border')
      expect(aspectRatio).toHaveClass('border-border')
    })

    it('renders card variant correctly', () => {
      render(
        <AspectRatio variant="card" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-md')
      expect(aspectRatio).toHaveClass('bg-card')
      expect(aspectRatio).toHaveClass('shadow-sm')
    })

    it('uses default variant as default', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-md')
      expect(aspectRatio).toHaveClass('bg-muted/10')
    })
  })

  describe('Radius', () => {
    it('renders none radius correctly', () => {
      render(
        <AspectRatio radius="none" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-none')
    })

    it('renders sm radius correctly', () => {
      render(
        <AspectRatio radius="sm" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-sm')
    })

    it('renders md radius correctly', () => {
      render(
        <AspectRatio radius="md" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-md')
    })

    it('renders lg radius correctly', () => {
      render(
        <AspectRatio radius="lg" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-lg')
    })

    it('renders full radius correctly', () => {
      render(
        <AspectRatio radius="full" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-full')
    })

    it('radius overrides variant radius', () => {
      render(
        <AspectRatio variant="default" radius="lg" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('rounded-lg')
      expect(aspectRatio).not.toHaveClass('rounded-md')
    })
  })

  describe('Ratio Calculations', () => {
    it('applies default ratio (16/9)', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      const expectedPadding = `${(1 / (16 / 9)) * 100}%`
      expect(aspectRatio).toHaveStyle(`padding-bottom: ${expectedPadding}`)
    })

    it('applies custom ratio (4/3)', () => {
      render(
        <AspectRatio ratio={4 / 3} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      const expectedPadding = `${(1 / (4 / 3)) * 100}%`
      expect(aspectRatio).toHaveStyle(`padding-bottom: ${expectedPadding}`)
    })

    it('applies square ratio (1/1)', () => {
      render(
        <AspectRatio ratio={1} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('padding-bottom: 100%')
    })

    it('applies wide ratio (21/9)', () => {
      render(
        <AspectRatio ratio={21 / 9} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      const expectedPadding = `${(1 / (21 / 9)) * 100}%`
      expect(aspectRatio).toHaveStyle(`padding-bottom: ${expectedPadding}`)
    })

    it('applies portrait ratio (9/16)', () => {
      render(
        <AspectRatio ratio={9 / 16} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      const expectedPadding = `${(1 / (9 / 16)) * 100}%`
      expect(aspectRatio).toHaveStyle(`padding-bottom: ${expectedPadding}`)
    })
  })

  describe('Styling and Layout', () => {
    it('has correct base styling', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('relative')
      expect(aspectRatio).toHaveClass('overflow-hidden')
      expect(aspectRatio).toHaveStyle('position: relative')
    })

    it('renders content wrapper with correct positioning', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div data-testid="content">Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      const contentWrapper = aspectRatio.querySelector('div')
      expect(contentWrapper).toHaveClass('absolute')
      expect(contentWrapper).toHaveClass('inset-0')
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('applies custom style prop', () => {
      render(
        <AspectRatio style={{ backgroundColor: 'red' }} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('merges custom style with ratio style', () => {
      render(
        <AspectRatio 
          ratio={2} 
          style={{ backgroundColor: 'blue', border: '1px solid red' }} 
          data-testid="aspect-ratio"
        >
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('background-color: rgb(0, 0, 255)')
      expect(aspectRatio).toHaveStyle('border: 1px solid red')
      expect(aspectRatio).toHaveStyle('padding-bottom: 50%')
    })
  })

  describe('Content Rendering', () => {
    it('renders single child correctly', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <img src="test.jpg" alt="Test" />
        </AspectRatio>
      )
      
      const image = screen.getByAltText('Test')
      expect(image).toBeInTheDocument()
    })

    it('renders multiple children correctly', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Child 1</div>
          <div>Child 2</div>
          <span>Child 3</span>
        </AspectRatio>
      )
      
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
      expect(screen.getByText('Child 3')).toBeInTheDocument()
    })

    it('renders complex nested content', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>
            <h2>Title</h2>
            <p>Description</p>
            <button>Action</button>
          </div>
        </AspectRatio>
      )
      
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('handles empty content gracefully', () => {
      render(<AspectRatio data-testid="aspect-ratio" />)
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toBeInTheDocument()
      
      const contentWrapper = aspectRatio.querySelector('div')
      expect(contentWrapper).toBeInTheDocument()
      expect(contentWrapper).toBeEmptyDOMElement()
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all props correctly', () => {
      render(
        <AspectRatio 
          variant="card" 
          radius="lg" 
          ratio={4 / 3} 
          className="custom-class"
          style={{ border: '2px solid blue' }}
          data-testid="aspect-ratio"
        >
          <div>Complex Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('bg-card')
      expect(aspectRatio).toHaveClass('shadow-sm')
      expect(aspectRatio).toHaveClass('rounded-lg')
      expect(aspectRatio).toHaveClass('custom-class')
      expect(aspectRatio).toHaveStyle('border: 2px solid blue')
      expect(aspectRatio).toHaveStyle('padding-bottom: 75%')
      expect(screen.getByText('Complex Content')).toBeInTheDocument()
    })

    it('works with image content', () => {
      render(
        <AspectRatio variant="outline" ratio={16 / 9} data-testid="aspect-ratio">
          <img 
            src="https://example.com/image.jpg" 
            alt="Test Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('border')
      expect(aspectRatio).toHaveStyle('padding-bottom: 56.25%')
      
      const image = screen.getByAltText('Test Image')
      expect(image).toHaveStyle('width: 100%')
      expect(image).toHaveStyle('height: 100%')
    })

    it('works with video content', () => {
      render(
        <AspectRatio variant="card" ratio={16 / 9} data-testid="aspect-ratio">
          <video controls style={{ width: '100%', height: '100%' }}>
            <source src="video.mp4" type="video/mp4" />
          </video>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveClass('bg-card')
      
      const video = aspectRatio.querySelector('video')
      expect(video).toBeInTheDocument()
      expect(video).toHaveAttribute('controls')
    })
  })

  describe('Edge Cases', () => {
    it('passes through HTML attributes', () => {
      render(
        <AspectRatio id="custom-id" data-custom="value" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveAttribute('id', 'custom-id')
      expect(aspectRatio).toHaveAttribute('data-custom', 'value')
    })

    it('handles zero ratio gracefully', () => {
      render(
        <AspectRatio ratio={0} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('padding-bottom: Infinity%')
    })

    it('handles very small ratio', () => {
      render(
        <AspectRatio ratio={0.1} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('padding-bottom: 1000%')
    })

    it('handles very large ratio', () => {
      render(
        <AspectRatio ratio={100} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('padding-bottom: 1%')
    })

    it('handles negative ratio', () => {
      render(
        <AspectRatio ratio={-1} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      
      const aspectRatio = screen.getByTestId('aspect-ratio')
      expect(aspectRatio).toHaveStyle('padding-bottom: -100%')
    })

    it('handles common aspect ratios', () => {
      const commonRatios = [
        { ratio: 16 / 9, expected: '56.25%' },
        { ratio: 4 / 3, expected: '75%' },
        { ratio: 3 / 2, expected: '66.66666666666666%' },
        { ratio: 1 / 1, expected: '100%' },
        { ratio: 2 / 1, expected: '50%' },
      ]
      
      commonRatios.forEach(({ ratio, expected }, index) => {
        render(
          <AspectRatio ratio={ratio} data-testid={`aspect-ratio-${index}`}>
            <div>Content {index}</div>
          </AspectRatio>
        )
        
        const aspectRatio = screen.getByTestId(`aspect-ratio-${index}`)
        expect(aspectRatio).toHaveStyle(`padding-bottom: ${expected}`)
      })
    })
  })
})
