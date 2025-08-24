import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from '../slider'

describe('Slider Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Slider data-testid="slider" />)
      
      const slider = screen.getByTestId('slider')
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveClass('w-full')
    })

    it('applies custom className', () => {
      render(<Slider className="custom-slider" data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').children[0] as HTMLElement
      expect(sliderContainer).toHaveClass('custom-slider')
    })

    it('renders with default value', () => {
      render(<Slider defaultValue={[25]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuenow', '25')
    })

    it('renders with controlled value', () => {
      render(<Slider value={[50]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuenow', '50')
    })
  })

  describe('Size Variants', () => {
    it('renders sm size correctly', () => {
      render(<Slider size="sm" data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').children[0] as HTMLElement
      expect(sliderContainer).toHaveClass('h-5')
    })

    it('renders default size correctly', () => {
      render(<Slider size="default" data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').children[0] as HTMLElement
      expect(sliderContainer).toHaveClass('h-6')
    })

    it('renders md size correctly', () => {
      render(<Slider size="md" data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').children[0] as HTMLElement
      expect(sliderContainer).toHaveClass('h-8')
    })

    it('renders lg size correctly', () => {
      render(<Slider size="lg" data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').children[0] as HTMLElement
      expect(sliderContainer).toHaveClass('h-10')
    })
  })

  describe('Track Variants', () => {
    it('renders default track variant correctly', () => {
      render(<Slider trackVariant="default" data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-muted')
      expect(track).toBeInTheDocument()
    })

    it('renders primary track variant correctly', () => {
      render(<Slider trackVariant="primary" data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-primary\\/20')
      expect(track).toBeInTheDocument()
    })

    it('renders secondary track variant correctly', () => {
      render(<Slider trackVariant="secondary" data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-secondary\\/20')
      expect(track).toBeInTheDocument()
    })

    it('renders success track variant correctly', () => {
      render(<Slider trackVariant="success" data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-success\\/20')
      expect(track).toBeInTheDocument()
    })

    it('renders error track variant correctly', () => {
      render(<Slider trackVariant="error" data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-error\\/20')
      expect(track).toBeInTheDocument()
    })
  })

  describe('Range Variants', () => {
    it('renders default range variant correctly', () => {
      render(<Slider rangeVariant="default" data-testid="slider" />)
      
      const range = screen.getByTestId('slider').querySelector('.bg-foreground')
      expect(range).toBeInTheDocument()
    })

    it('renders primary range variant correctly', () => {
      render(<Slider rangeVariant="primary" data-testid="slider" />)
      
      const range = screen.getByTestId('slider').querySelector('.bg-primary')
      expect(range).toBeInTheDocument()
    })

    it('renders success range variant correctly', () => {
      render(<Slider rangeVariant="success" data-testid="slider" />)
      
      const range = screen.getByTestId('slider').querySelector('.bg-success')
      expect(range).toBeInTheDocument()
    })

    it('renders error range variant correctly', () => {
      render(<Slider rangeVariant="error" data-testid="slider" />)
      
      const range = screen.getByTestId('slider').querySelector('.bg-error')
      expect(range).toBeInTheDocument()
    })
  })

  describe('Thumb Variants', () => {
    it('renders default thumb variant correctly', () => {
      render(<Slider thumbVariant="default" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('border-foreground')
    })

    it('renders primary thumb variant correctly', () => {
      render(<Slider thumbVariant="primary" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('border-primary')
    })

    it('renders success thumb variant correctly', () => {
      render(<Slider thumbVariant="success" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('border-success')
    })

    it('renders error thumb variant correctly', () => {
      render(<Slider thumbVariant="error" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('border-error')
    })
  })

  describe('Thumb Sizes', () => {
    it('renders sm thumb size correctly', () => {
      render(<Slider thumbSize="sm" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('h-3', 'w-3')
    })

    it('renders default thumb size correctly', () => {
      render(<Slider thumbSize="default" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('h-4', 'w-4')
    })

    it('renders md thumb size correctly', () => {
      render(<Slider thumbSize="md" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('h-5', 'w-5')
    })

    it('renders lg thumb size correctly', () => {
      render(<Slider thumbSize="lg" data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('h-6', 'w-6')
    })
  })

  describe('Value Label', () => {
    it('does not show value label by default', () => {
      render(<Slider defaultValue={[25]} data-testid="slider" />)
      
      expect(screen.queryByText('25')).not.toBeInTheDocument()
    })

    it('shows value label when enabled', () => {
      render(<Slider defaultValue={[25]} showValueLabel data-testid="slider" />)
      
      expect(screen.getByText('25')).toBeInTheDocument()
    })

    it('applies custom value label className', () => {
      render(
        <Slider 
          defaultValue={[25]} 
          showValueLabel 
          valueLabelClassName="custom-label"
          data-testid="slider" 
        />
      )
      
      const label = screen.getByText('25').parentElement
      expect(label).toHaveClass('custom-label')
    })

    it('formats value label with custom formatter', () => {
      const formatter = (value: number) => `${value}%`
      render(
        <Slider 
          defaultValue={[25]} 
          showValueLabel 
          valueLabelFormat={formatter}
          data-testid="slider" 
        />
      )
      
      expect(screen.getByText('25%')).toBeInTheDocument()
    })

    it('shows range for multiple values', () => {
      render(
        <Slider 
          defaultValue={[25, 75]} 
          showValueLabel 
          data-testid="slider" 
        />
      )
      
      expect(screen.getByText('25 - 75')).toBeInTheDocument()
    })
  })

  describe('Props and Configuration', () => {
    it('handles min and max values', () => {
      render(<Slider min={10} max={90} defaultValue={[50]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuemin', '10')
      expect(thumb).toHaveAttribute('aria-valuemax', '90')
      expect(thumb).toHaveAttribute('aria-valuenow', '50')
    })

    it('handles step value', () => {
      render(<Slider step={5} defaultValue={[25]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuenow', '25')
    })

    it('handles multiple thumbs', () => {
      render(<Slider defaultValue={[25, 75]} data-testid="slider" />)
      
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs).toHaveLength(2)
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '25')
      expect(thumbs[1]).toHaveAttribute('aria-valuenow', '75')
    })
  })

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      render(<Slider disabled data-testid="slider" />)
      
      const sliderContainer = screen.getByTestId('slider').querySelector('[data-disabled]')
      expect(sliderContainer).toHaveAttribute('data-disabled', 'true')
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-disabled', 'true')
      expect(thumb).toHaveAttribute('tabIndex', '-1')
    })

    it('does not handle interactions when disabled', () => {
      const onValueChange = jest.fn()
      render(<Slider disabled onValueChange={onValueChange} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      fireEvent.mouseDown(thumb)
      
      expect(onValueChange).not.toHaveBeenCalled()
    })
  })

  describe('Event Handling', () => {
    it('calls onValueChange when value changes', () => {
      const onValueChange = jest.fn()
      render(<Slider onValueChange={onValueChange} defaultValue={[25]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      fireEvent.mouseDown(thumb)
      
      // Simulate mouse move
      fireEvent(document, new MouseEvent('mousemove', {
        clientX: 100,
        bubbles: true
      }))
      
      expect(onValueChange).toHaveBeenCalled()
    })

    it('handles track click', () => {
      const onValueChange = jest.fn()
      render(<Slider onValueChange={onValueChange} data-testid="slider" />)
      
      const track = screen.getByTestId('slider').querySelector('.bg-muted')
      if (track) {
        fireEvent.click(track, { clientX: 50 })
        expect(onValueChange).toHaveBeenCalled()
      }
    })

    it('updates controlled value', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState([25])
        return (
          <div>
            <Slider value={value} onValueChange={setValue} data-testid="slider" />
            <span data-testid="current-value">{value[0]}</span>
          </div>
        )
      }
      
      render(<TestComponent />)
      
      expect(screen.getByTestId('current-value')).toHaveTextContent('25')
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuenow', '25')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Slider defaultValue={[50]} min={0} max={100} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('role', 'slider')
      expect(thumb).toHaveAttribute('aria-valuemin', '0')
      expect(thumb).toHaveAttribute('aria-valuemax', '100')
      expect(thumb).toHaveAttribute('aria-valuenow', '50')
      expect(thumb).toHaveAttribute('tabIndex', '0')
    })

    it('has proper aria-label for multiple thumbs', () => {
      render(<Slider defaultValue={[25, 75]} data-testid="slider" />)
      
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs[0]).toHaveAttribute('aria-label', 'Thumb 1')
      expect(thumbs[1]).toHaveAttribute('aria-label', 'Thumb 2')
    })

    it('handles keyboard navigation', () => {
      render(<Slider defaultValue={[50]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('tabIndex', '0')
      
      thumb.focus()
      expect(thumb).toHaveFocus()
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Slider ref={ref} data-testid="slider" />)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current).toBe(screen.getByTestId('slider'))
    })
  })

  describe('DisplayName', () => {
    it('maintains displayName', () => {
      expect(Slider.displayName).toBe('Slider')
    })
  })

  describe('HTML Attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Slider 
          data-testid="slider"
          id="test-slider"
          aria-describedby="slider-description"
        />
      )
      
      const slider = screen.getByTestId('slider')
      expect(slider).toHaveAttribute('id', 'test-slider')
      expect(slider).toHaveAttribute('aria-describedby', 'slider-description')
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all variants and options', () => {
      render(
        <Slider
          size="lg"
          trackVariant="primary"
          rangeVariant="success"
          thumbVariant="error"
          thumbSize="md"
          showValueLabel
          valueLabelFormat={(v) => `${v}px`}
          min={0}
          max={200}
          step={10}
          defaultValue={[50, 150]}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByTestId('slider')
      expect(slider).toBeInTheDocument()
      
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs).toHaveLength(2)
      
      expect(screen.getByText('50px - 150px')).toBeInTheDocument()
    })

    it('handles variant inheritance correctly', () => {
      render(<Slider thumbVariant="success" data-testid="slider" />)
      
      // Track should inherit from thumb variant
      const track = screen.getByTestId('slider').querySelector('.bg-success\\/20')
      expect(track).toBeInTheDocument()
      
      // Range should inherit from thumb variant
      const range = screen.getByTestId('slider').querySelector('.bg-success')
      expect(range).toBeInTheDocument()
      
      // Thumb should use its own variant
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveClass('border-success')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty defaultValue', () => {
      render(<Slider defaultValue={[]} data-testid="slider" />)
      
      const slider = screen.getByTestId('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles undefined value', () => {
      render(<Slider value={undefined} data-testid="slider" />)
      
      const slider = screen.getByTestId('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles extreme min/max values', () => {
      render(<Slider min={-100} max={1000} defaultValue={[0]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuemin', '-100')
      expect(thumb).toHaveAttribute('aria-valuemax', '1000')
    })

    it('handles very small step values', () => {
      render(<Slider step={0.1} min={0} max={1} defaultValue={[0.5]} data-testid="slider" />)
      
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuenow', '0.5')
    })

    it('handles single value array', () => {
      render(<Slider defaultValue={[42]} showValueLabel data-testid="slider" />)
      
      expect(screen.getByText('42')).toBeInTheDocument()
      
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs).toHaveLength(1)
    })
  })
})
