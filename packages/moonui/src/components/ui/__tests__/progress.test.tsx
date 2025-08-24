import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Progress } from '../progress'

describe('Progress Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Progress />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveClass('relative')
      expect(progress).toHaveClass('w-full')
      expect(progress).toHaveClass('overflow-hidden')
      expect(progress).toHaveClass('bg-muted')
    })

    it('renders with custom value', () => {
      render(<Progress value={50} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '50')
      expect(progress).toHaveAttribute('aria-valuemin', '0')
      expect(progress).toHaveAttribute('aria-valuemax', '100')
    })

    it('applies custom className', () => {
      render(<Progress className="custom-progress" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('custom-progress')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Progress ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Value Handling', () => {
    it('handles value normalization correctly', () => {
      render(<Progress value={150} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '100')
    })

    it('handles negative values correctly', () => {
      render(<Progress value={-10} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '0')
    })

    it('handles custom max value', () => {
      render(<Progress value={50} max={200} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '50')
      expect(progress).toHaveAttribute('aria-valuemax', '200')
    })

    it('calculates percentage correctly with custom max', () => {
      render(<Progress value={50} max={200} showValueLabel />)
      const label = screen.getByText('25%')
      expect(label).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Progress variant="default" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-muted')
    })

    it('renders primary variant correctly', () => {
      render(<Progress variant="primary" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-primary/20')
    })

    it('renders secondary variant correctly', () => {
      render(<Progress variant="secondary" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-secondary/20')
    })

    it('renders success variant correctly', () => {
      render(<Progress variant="success" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-success/20')
    })

    it('renders warning variant correctly', () => {
      render(<Progress variant="warning" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-warning/20')
    })

    it('renders error variant correctly', () => {
      render(<Progress variant="error" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-error/20')
    })
  })

  describe('Sizes', () => {
    it('renders xs size correctly', () => {
      render(<Progress size="xs" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-1')
    })

    it('renders sm size correctly', () => {
      render(<Progress size="sm" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-1.5')
    })

    it('renders default size correctly', () => {
      render(<Progress size="default" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-2')
    })

    it('renders md size correctly', () => {
      render(<Progress size="md" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-2.5')
    })

    it('renders lg size correctly', () => {
      render(<Progress size="lg" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-3')
    })

    it('renders xl size correctly', () => {
      render(<Progress size="xl" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('h-4')
    })
  })

  describe('Radius', () => {
    it('renders none radius correctly', () => {
      render(<Progress radius="none" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('rounded-none')
    })

    it('renders sm radius correctly', () => {
      render(<Progress radius="sm" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('rounded-sm')
    })

    it('renders default radius correctly', () => {
      render(<Progress radius="default" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('rounded-md')
    })

    it('renders lg radius correctly', () => {
      render(<Progress radius="lg" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('rounded-lg')
    })

    it('renders full radius correctly', () => {
      render(<Progress radius="full" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('rounded-full')
    })
  })

  describe('Animation', () => {
    it('renders default animation correctly', () => {
      render(<Progress animation="default" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('[&>div]:transition-all')
      expect(progress).toHaveClass('[&>div]:duration-500')
    })

    it('renders smooth animation correctly', () => {
      render(<Progress animation="smooth" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('[&>div]:transition-all')
      expect(progress).toHaveClass('[&>div]:duration-700')
    })

    it('renders fast animation correctly', () => {
      render(<Progress animation="fast" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('[&>div]:transition-all')
      expect(progress).toHaveClass('[&>div]:duration-300')
    })

    it('renders none animation correctly', () => {
      render(<Progress animation="none" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).not.toHaveClass('[&>div]:transition-all')
    })
  })

  describe('Indicator Variants', () => {
    it('renders default indicator variant correctly', () => {
      render(<Progress indicatorVariant="default" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-foreground')
    })

    it('renders primary indicator variant correctly', () => {
      render(<Progress indicatorVariant="primary" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-primary')
    })

    it('renders secondary indicator variant correctly', () => {
      render(<Progress indicatorVariant="secondary" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-secondary')
    })

    it('renders success indicator variant correctly', () => {
      render(<Progress indicatorVariant="success" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-success')
    })

    it('renders warning indicator variant correctly', () => {
      render(<Progress indicatorVariant="warning" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-warning')
    })

    it('renders error indicator variant correctly', () => {
      render(<Progress indicatorVariant="error" />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-error')
    })
  })

  describe('Value Label', () => {
    it('does not show value label by default', () => {
      render(<Progress value={50} />)
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })

    it('shows value label when enabled', () => {
      render(<Progress value={50} showValueLabel />)
      const label = screen.getByText('50%')
      expect(label).toBeInTheDocument()
    })

    it('shows custom value label', () => {
      render(<Progress value={50} showValueLabel valueLabel="50/100" />)
      const label = screen.getByText('50/100')
      expect(label).toBeInTheDocument()
    })

    it('applies custom label className', () => {
      render(<Progress value={50} showValueLabel labelClassName="custom-label" />)
      const label = screen.getByText('50%')
      expect(label).toHaveClass('custom-label')
    })

    it('shows correct percentage for custom max', () => {
      render(<Progress value={25} max={50} showValueLabel />)
      const label = screen.getByText('50%')
      expect(label).toBeInTheDocument()
    })
  })

  describe('Indeterminate State', () => {
    it('renders indeterminate progress correctly', () => {
      render(<Progress indeterminate />)
      const progress = screen.getByRole('progressbar')
      expect(progress).not.toHaveAttribute('aria-valuenow')
      
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('animate-indeterminate-progress')
    })

    it('does not show aria-valuenow when indeterminate', () => {
      render(<Progress value={50} indeterminate />)
      const progress = screen.getByRole('progressbar')
      expect(progress).not.toHaveAttribute('aria-valuenow')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Progress value={50} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('role', 'progressbar')
      expect(progress).toHaveAttribute('aria-valuemin', '0')
      expect(progress).toHaveAttribute('aria-valuemax', '100')
      expect(progress).toHaveAttribute('aria-valuenow', '50')
    })

    it('supports custom ARIA attributes', () => {
      render(<Progress value={50} aria-label="Loading progress" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Loading progress')
    })
  })

  describe('Complex Combinations', () => {
    it('renders with multiple props correctly', () => {
      render(
        <Progress
          value={75}
          variant="success"
          size="lg"
          radius="sm"
          animation="fast"
          indicatorVariant="primary"
          showValueLabel
          valueLabel="3/4 complete"
          labelClassName="font-bold"
          max={100}
        />
      )
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('bg-success/20')
      expect(progress).toHaveClass('h-3')
      expect(progress).toHaveClass('rounded-sm')
      expect(progress).toHaveClass('[&>div]:duration-300')
      
      const indicator = progress.querySelector('div')
      expect(indicator).toHaveClass('bg-primary')
      
      const label = screen.getByText('3/4 complete')
      expect(label).toHaveClass('font-bold')
    })

    it('maintains displayName', () => {
      expect(Progress.displayName).toBe('Progress')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero value correctly', () => {
      render(<Progress value={0} showValueLabel />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '0')
      
      const label = screen.getByText('0%')
      expect(label).toBeInTheDocument()
    })

    it('handles max value correctly', () => {
      render(<Progress value={100} showValueLabel />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '100')
      
      const label = screen.getByText('100%')
      expect(label).toBeInTheDocument()
    })

    it('handles zero max value', () => {
      render(<Progress value={50} max={0} showValueLabel />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuemax', '0')
      
      const label = screen.getByText('0%')
      expect(label).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(<Progress data-testid="progress-test" id="progress-1" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('data-testid', 'progress-test')
      expect(progress).toHaveAttribute('id', 'progress-1')
    })
  })
})
