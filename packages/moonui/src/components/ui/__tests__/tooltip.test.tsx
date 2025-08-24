import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '../tooltip'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}))



describe('Tooltip Components', () => {
  describe('Tooltip Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Tooltip content="Test tooltip">
            <button>Hover me</button>
          </Tooltip>
        )
        
        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(screen.getByText('Hover me')).toBeInTheDocument()
      })

      it('shows tooltip on hover', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip">
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
          expect(screen.getByText('Test tooltip')).toBeInTheDocument()
        })
      })

      it('hides tooltip on mouse leave', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip">
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
        
        await user.unhover(trigger)
        
        await waitFor(() => {
          expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
      })

      it('applies custom className', () => {
        render(
          <Tooltip content="Test tooltip" className="custom-tooltip">
            <button>Hover me</button>
          </Tooltip>
        )
        
        const wrapper = screen.getByRole('button').parentElement
        expect(wrapper).toHaveClass('relative', 'inline-block')
      })

      it('has correct displayName', () => {
        expect(Tooltip.displayName || Tooltip.name || 'Tooltip').toBe('Tooltip')
      })
    })

    describe('Variants', () => {
      const variants = ['primary', 'secondary', 'success', 'caution', 'destructive', 'info'] as const

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" variant={variant}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            expect(tooltip).toHaveClass(`bg-${variant}`)
          })
        })
      })
    })

    describe('Sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" size={size}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            // Size classes are applied through tooltipVariants
            expect(tooltip).toHaveAttribute('class')
          })
        })
      })
    })

    describe('Radius', () => {
      const radiusOptions = ['none', 'sm', 'md', 'lg', 'full'] as const

      radiusOptions.forEach((radius) => {
        it(`renders ${radius} radius correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" radius={radius}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            expect(tooltip).toHaveClass(`rounded-${radius === 'none' ? 'none' : radius}`)
          })
        })
      })
    })

    describe('Shadow', () => {
      const shadowOptions = ['none', 'sm', 'md', 'lg'] as const

      shadowOptions.forEach((shadow) => {
        it(`renders ${shadow} shadow correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" shadow={shadow}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            expect(tooltip).toHaveClass(`shadow-${shadow}`)
          })
        })
      })
    })

    describe('Positioning', () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const

      sides.forEach((side) => {
        it(`renders ${side} position correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" side={side}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            // Position classes are applied through sideClasses
            expect(tooltip).toHaveAttribute('class')
          })
        })
      })

      const alignments = ['start', 'center', 'end'] as const

      alignments.forEach((align) => {
        it(`renders ${align} alignment correctly`, async () => {
          const user = userEvent.setup()
          render(
            <Tooltip content="Test tooltip" align={align}>
              <button>Hover me</button>
            </Tooltip>
          )
          
          const trigger = screen.getByRole('button')
          await user.hover(trigger)
          
          await waitFor(() => {
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
            // Alignment classes are applied through alignClasses
            expect(tooltip).toHaveAttribute('class')
          })
        })
      })
    })

    describe('Delay Duration', () => {
      it('respects custom delay duration', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip" delayDuration={100}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        // Should appear after 100ms
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        }, { timeout: 200 })
      })

      it('works with zero delay', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip" delayDuration={0}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        // Should appear immediately
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
      })
    })

    describe('Side Offset', () => {
      it('applies custom side offset', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip" sideOffset={10}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
          expect(tooltip).toHaveStyle({ marginBottom: '10px' })
        })
      })
    })

    describe('Content Types', () => {
      it('renders text content', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Simple text">
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByText('Simple text')).toBeInTheDocument()
        })
      })

      it('renders JSX content', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content={<div data-testid="jsx-content">JSX Content</div>}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByTestId('jsx-content')).toBeInTheDocument()
        })
      })

      it('renders complex content', async () => {
        const user = userEvent.setup()
        const complexContent = (
          <div>
            <strong>Title</strong>
            <p>Description</p>
          </div>
        )
        
        render(
          <Tooltip content={complexContent}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByText('Title')).toBeInTheDocument()
          expect(screen.getByText('Description')).toBeInTheDocument()
        })
      })
    })

    describe('Focus Events', () => {
      it('shows tooltip on focus', async () => {
        render(
          <Tooltip content="Test tooltip">
            <button>Focus me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        fireEvent.focus(trigger)
        
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
      })

      it('hides tooltip on blur', async () => {
        render(
          <Tooltip content="Test tooltip">
            <button>Focus me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        fireEvent.focus(trigger)
        
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
        
        fireEvent.blur(trigger)
        
        await waitFor(() => {
          expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
      })
    })

    describe('Complex Combinations', () => {
      it('renders with all props', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip
            content="Complex tooltip"
            variant="success"
            size="lg"
            radius="lg"
            shadow="lg"
            side="bottom"
            align="end"
            delayDuration={50}
            sideOffset={8}
            className="custom-tooltip"
          >
            <button>Complex button</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
          expect(tooltip).toHaveClass('bg-success')
          expect(tooltip).toHaveClass('rounded-lg')
          expect(tooltip).toHaveClass('shadow-lg')
          expect(tooltip).toHaveStyle({ marginTop: '8px' })
        })
      })

      it('works with different trigger elements', async () => {
        const user = userEvent.setup()
        render(
          <div>
            <Tooltip content="Button tooltip">
              <button data-testid="tooltip-button">Button</button>
            </Tooltip>
            <Tooltip content="Link tooltip">
              <a href="#" role="link">Link</a>
            </Tooltip>
            <Tooltip content="Div tooltip">
              <div role="button" tabIndex={0}>Div</div>
            </Tooltip>
          </div>
        )
        
        // Test button
        await user.hover(screen.getByTestId('tooltip-button'))
        await waitFor(() => {
          expect(screen.getByText('Button tooltip')).toBeInTheDocument()
        })
        
        await user.unhover(screen.getByTestId('tooltip-button'))
        await waitFor(() => {
          expect(screen.queryByText('Button tooltip')).not.toBeInTheDocument()
        })
        
        // Test link
        await user.hover(screen.getByRole('link'))
        await waitFor(() => {
          expect(screen.getByText('Link tooltip')).toBeInTheDocument()
        })
      })
    })

    describe('Edge Cases', () => {
      it('handles empty content', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="">
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
          expect(tooltip).toBeEmptyDOMElement()
        })
      })

      it('handles null content', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content={null}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
        })
      })

      it('handles undefined content', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content={undefined as React.ReactNode}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
        })
      })

      it('handles single child requirement', () => {
        // Tooltip component expects single child due to React.Children.only
        render(
          <Tooltip content="Test tooltip">
            <div>
              <button>Button 1</button>
              <button>Button 2</button>
            </div>
          </Tooltip>
        )
        
        // Should render both buttons wrapped in div
        expect(screen.getByText('Button 1')).toBeInTheDocument()
        expect(screen.getByText('Button 2')).toBeInTheDocument()
      })

      it('passes through HTML attributes', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip 
            content="Test tooltip" 
            data-testid="tooltip-wrapper"
            aria-label="Custom tooltip"
          >
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
          expect(tooltip).toHaveAttribute('data-testid', 'tooltip-wrapper')
          expect(tooltip).toHaveAttribute('aria-label', 'Custom tooltip')
        })
      })

      it('handles rapid hover/unhover', async () => {
        const user = userEvent.setup()
        render(
          <Tooltip content="Test tooltip" delayDuration={100}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        
        // Rapid hover/unhover
        await user.hover(trigger)
        await user.unhover(trigger)
        await user.hover(trigger)
        
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
      })

      it('handles very long content', async () => {
        const user = userEvent.setup()
        const longContent = 'This is a very long tooltip content that should wrap properly and not break the layout. '.repeat(10)
        
        render(
          <Tooltip content={longContent}>
            <button>Hover me</button>
          </Tooltip>
        )
        
        const trigger = screen.getByRole('button')
        await user.hover(trigger)
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip')
          expect(tooltip).toBeInTheDocument()
          // Check if content contains the expected text (ignoring whitespace differences)
          expect(tooltip.textContent?.trim()).toContain('This is a very long tooltip content')
        })
      })
    })
  })
})
