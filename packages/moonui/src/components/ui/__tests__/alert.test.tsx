import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Alert, AlertTitle, AlertDescription } from '../alert'

describe('Alert Components', () => {
  describe('Alert Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<Alert data-testid="alert">Test alert</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toBeInTheDocument()
        expect(alert).toHaveAttribute('role', 'alert')
        expect(alert).toHaveTextContent('Test alert')
      })

      it('applies custom className', () => {
        render(<Alert className="custom-alert" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('custom-alert')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(<Alert ref={ref} data-testid="alert">Test</Alert>)
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
      })

      it('maintains displayName', () => {
        expect(Alert.displayName).toBe('Alert')
      })
    })

    describe('Variants', () => {
      it('renders default variant correctly', () => {
        render(<Alert variant="default" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-background')
        expect(alert).toHaveClass('text-foreground')
        expect(alert).toHaveClass('border-border')
      })

      it('renders primary variant correctly', () => {
        render(<Alert variant="primary" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-primary/10')
        expect(alert).toHaveClass('text-primary')
        expect(alert).toHaveClass('border-primary/30')
      })

      it('renders success variant correctly', () => {
        render(<Alert variant="success" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-success/10')
        expect(alert).toHaveClass('text-success')
        expect(alert).toHaveClass('border-success/30')
      })

      it('renders warning variant correctly', () => {
        render(<Alert variant="warning" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-warning/10')
        expect(alert).toHaveClass('text-warning')
        expect(alert).toHaveClass('border-warning/30')
      })

      it('renders error variant correctly', () => {
        render(<Alert variant="error" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-destructive/10')
        expect(alert).toHaveClass('text-destructive')
        expect(alert).toHaveClass('border-destructive/30')
      })

      it('renders info variant correctly', () => {
        render(<Alert variant="info" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-blue-500/10')
        expect(alert).toHaveClass('text-blue-500')
        expect(alert).toHaveClass('border-blue-500/30')
      })

      it('uses default variant as default', () => {
        render(<Alert data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('bg-background')
        expect(alert).toHaveClass('text-foreground')
      })
    })

    describe('Sizes', () => {
      it('renders sm size correctly', () => {
        render(<Alert size="sm" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('py-2')
        expect(alert).toHaveClass('text-xs')
      })

      it('renders default size correctly', () => {
        render(<Alert size="default" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('py-3')
        expect(alert).toHaveClass('text-sm')
      })

      it('renders lg size correctly', () => {
        render(<Alert size="lg" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('py-4')
        expect(alert).toHaveClass('text-base')
      })

      it('uses default size as default', () => {
        render(<Alert data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('py-3')
        expect(alert).toHaveClass('text-sm')
      })
    })

    describe('Radius', () => {
      it('renders none radius correctly', () => {
        render(<Alert radius="none" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-none')
      })

      it('renders sm radius correctly', () => {
        render(<Alert radius="sm" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-sm')
      })

      it('renders default radius correctly', () => {
        render(<Alert radius="default" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-md')
      })

      it('renders lg radius correctly', () => {
        render(<Alert radius="lg" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-lg')
      })

      it('renders full radius correctly', () => {
        render(<Alert radius="full" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-full')
      })

      it('uses default radius as default', () => {
        render(<Alert data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('rounded-md')
      })
    })

    describe('Icons', () => {
      it('renders default icon for default variant', () => {
        render(<Alert variant="default" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass('h-5', 'w-5')
      })

      it('renders check icon for success variant', () => {
        render(<Alert variant="success" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })

      it('renders triangle icon for warning variant', () => {
        render(<Alert variant="warning" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })

      it('renders circle icon for error variant', () => {
        render(<Alert variant="error" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })

      it('renders info icon for info variant', () => {
        render(<Alert variant="info" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })

      it('hides icon when hideIcon is true', () => {
        render(<Alert hideIcon data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).not.toBeInTheDocument()
      })

      it('shows icon when hideIcon is false', () => {
        render(<Alert hideIcon={false} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const icon = alert.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })
    })

    describe('Closable Functionality', () => {
      it('does not render close button by default', () => {
        render(<Alert data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        expect(closeButton).not.toBeInTheDocument()
      })

      it('renders close button when closable is true', () => {
        const handleClose = jest.fn()
        render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        expect(closeButton).toBeInTheDocument()
        expect(closeButton).toHaveAttribute('aria-label', 'Kapat')
      })

      it('does not render close button when closable is true but onClose is not provided', () => {
        render(<Alert closable data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        expect(closeButton).not.toBeInTheDocument()
      })

      it('calls onClose when close button is clicked', () => {
        const handleClose = jest.fn()
        render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        
        fireEvent.click(closeButton!)
        expect(handleClose).toHaveBeenCalledTimes(1)
      })

      it('applies withClose styling when closable', () => {
        const handleClose = jest.fn()
        render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveClass('pr-10')
      })

      it('close button has correct styling', () => {
        const handleClose = jest.fn()
        render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        
        expect(closeButton).toHaveClass('absolute')
        expect(closeButton).toHaveClass('right-3')
        expect(closeButton).toHaveClass('top-3')
        expect(closeButton).toHaveClass('h-6')
        expect(closeButton).toHaveClass('w-6')
      })
    })

    describe('Accessibility', () => {
      it('has correct role attribute', () => {
        render(<Alert data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveAttribute('role', 'alert')
      })

      it('supports custom ARIA attributes', () => {
        render(<Alert aria-label="Custom alert" data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        expect(alert).toHaveAttribute('aria-label', 'Custom alert')
      })

      it('close button has accessible label', () => {
        const handleClose = jest.fn()
        render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
        const alert = screen.getByTestId('alert')
        const closeButton = alert.querySelector('button')
        expect(closeButton).toHaveAttribute('aria-label', 'Kapat')
      })
    })
  })

  describe('AlertTitle Component', () => {
    it('renders correctly with default props', () => {
      render(<AlertTitle data-testid="alert-title">Alert Title</AlertTitle>)
      const title = screen.getByTestId('alert-title')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('H5')
      expect(title).toHaveTextContent('Alert Title')
    })

    it('applies custom className', () => {
      render(<AlertTitle className="custom-title" data-testid="alert-title">Title</AlertTitle>)
      const title = screen.getByTestId('alert-title')
      expect(title).toHaveClass('custom-title')
    })

    it('has correct default styling', () => {
      render(<AlertTitle data-testid="alert-title">Title</AlertTitle>)
      const title = screen.getByTestId('alert-title')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('leading-tight')
      expect(title).toHaveClass('tracking-tight')
      expect(title).toHaveClass('mb-1')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>()
      render(<AlertTitle ref={ref} data-testid="alert-title">Title</AlertTitle>)
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    })

    it('maintains displayName', () => {
      expect(AlertTitle.displayName).toBe('AlertTitle')
    })

    it('passes through HTML attributes', () => {
      render(<AlertTitle id="alert-title-1" data-testid="alert-title">Title</AlertTitle>)
      const title = screen.getByTestId('alert-title')
      expect(title).toHaveAttribute('id', 'alert-title-1')
    })
  })

  describe('AlertDescription Component', () => {
    it('renders correctly with default props', () => {
      render(<AlertDescription data-testid="alert-description">Alert Description</AlertDescription>)
      const description = screen.getByTestId('alert-description')
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe('DIV')
      expect(description).toHaveTextContent('Alert Description')
    })

    it('applies custom className', () => {
      render(<AlertDescription className="custom-description" data-testid="alert-description">Description</AlertDescription>)
      const description = screen.getByTestId('alert-description')
      expect(description).toHaveClass('custom-description')
    })

    it('has correct default styling', () => {
      render(<AlertDescription data-testid="alert-description">Description</AlertDescription>)
      const description = screen.getByTestId('alert-description')
      expect(description).toHaveClass('text-sm')
      expect(description).toHaveClass('leading-5')
      expect(description).toHaveClass('text-muted-foreground')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>()
      render(<AlertDescription ref={ref} data-testid="alert-description">Description</AlertDescription>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(AlertDescription.displayName).toBe('AlertDescription')
    })

    it('passes through HTML attributes', () => {
      render(<AlertDescription id="alert-desc-1" data-testid="alert-description">Description</AlertDescription>)
      const description = screen.getByTestId('alert-description')
      expect(description).toHaveAttribute('id', 'alert-desc-1')
    })
  })

  describe('Complex Combinations', () => {
    it('renders alert with title and description', () => {
      render(
        <Alert variant="success" size="lg" data-testid="alert">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your action was completed successfully.</AlertDescription>
        </Alert>
      )
      
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('bg-success/10')
      expect(alert).toHaveClass('py-4')
      
      expect(screen.getByText('Success!')).toBeInTheDocument()
      expect(screen.getByText('Your action was completed successfully.')).toBeInTheDocument()
    })

    it('renders closable alert with all props', () => {
      const handleClose = jest.fn()
      render(
        <Alert 
          variant="error" 
          size="sm" 
          radius="lg" 
          closable 
          onClose={handleClose}
          className="custom-alert"
          data-testid="alert"
        >
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
      )
      
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('bg-destructive/10')
      expect(alert).toHaveClass('py-2')
      expect(alert).toHaveClass('rounded-lg')
      expect(alert).toHaveClass('pr-10')
      expect(alert).toHaveClass('custom-alert')
      
      const closeButton = alert.querySelector('button')
      expect(closeButton).toBeInTheDocument()
      
      fireEvent.click(closeButton!)
      expect(handleClose).toHaveBeenCalled()
    })

    it('renders alert without icon and with custom content', () => {
      render(
        <Alert variant="warning" hideIcon data-testid="alert">
          <div>
            <AlertTitle>Custom Warning</AlertTitle>
            <AlertDescription>This is a custom warning message.</AlertDescription>
            <button>Action Button</button>
          </div>
        </Alert>
      )
      
      const alert = screen.getByTestId('alert')
      expect(alert.querySelector('svg')).not.toBeInTheDocument()
      expect(screen.getByText('Custom Warning')).toBeInTheDocument()
      expect(screen.getByText('Action Button')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('passes through HTML attributes', () => {
      render(<Alert id="alert-1" data-custom="value" data-testid="alert">Test</Alert>)
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveAttribute('id', 'alert-1')
      expect(alert).toHaveAttribute('data-custom', 'value')
    })

    it('handles empty content gracefully', () => {
      render(<Alert data-testid="alert"></Alert>)
      const alert = screen.getByTestId('alert')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('handles null children gracefully', () => {
      render(<Alert data-testid="alert">{null}</Alert>)
      const alert = screen.getByTestId('alert')
      expect(alert).toBeInTheDocument()
    })

    it('handles multiple close button clicks', () => {
      const handleClose = jest.fn()
      render(<Alert closable onClose={handleClose} data-testid="alert">Test</Alert>)
      const alert = screen.getByTestId('alert')
      const closeButton = alert.querySelector('button')
      
      fireEvent.click(closeButton!)
      fireEvent.click(closeButton!)
      fireEvent.click(closeButton!)
      
      expect(handleClose).toHaveBeenCalledTimes(3)
    })

    it('renders with all variants and sizes combination', () => {
      const variants = ['default', 'primary', 'success', 'warning', 'error', 'info'] as const
      const sizes = ['sm', 'default', 'lg'] as const
      
      variants.forEach((variant, variantIndex) => {
        sizes.forEach((size, sizeIndex) => {
          const testId = `alert-${variant}-${size}`
          render(<Alert variant={variant} size={size} data-testid={testId}>Test {variant} {size}</Alert>)
          const alert = screen.getByTestId(testId)
          expect(alert).toBeInTheDocument()
        })
      })
    })
  })
})
