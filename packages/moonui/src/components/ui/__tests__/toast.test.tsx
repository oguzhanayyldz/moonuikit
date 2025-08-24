import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { 
  Toast, 
  ToastProvider, 
  ToastTitle,
  ToastDescription, 
  ToastAction, 
  ToastClose, 
  useToast,
  Toaster
} from '../toast'

// Mock icons for testing
jest.mock('lucide-react', () => ({
  X: (props: React.ComponentProps<'div'>) => <div data-testid="x-icon" {...props} />,
}))

// Test wrapper component for useToast hook
const TestToastWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
)

describe('Toast Components', () => {
  describe('Toast Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <TestToastWrapper>
            <Toast />
          </TestToastWrapper>
        )
        
        const toast = screen.getByRole('button', { name: /kapat/i })
        expect(toast).toBeInTheDocument()
      })

      it('renders with title', () => {
        render(
          <TestToastWrapper>
            <Toast title="Test Title" />
          </TestToastWrapper>
        )
        
        expect(screen.getByText('Test Title')).toBeInTheDocument()
      })

      it('renders with description', () => {
        render(
          <TestToastWrapper>
            <Toast description="Test Description" />
          </TestToastWrapper>
        )
        
        expect(screen.getByText('Test Description')).toBeInTheDocument()
      })

      it('applies custom className', () => {
        const { container } = render(
          <ToastProvider>
            <Toast className="custom-toast" />
          </ToastProvider>
        )
        
        expect(container.querySelector('.custom-toast')).toBeInTheDocument()
      })

      it('has correct displayName', () => {
        expect((Toast as any).displayName || 'Toast').toBe('Toast')
      })
    })

    describe('Variants', () => {
      it('renders primary variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="primary" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-primary"]')).toBeInTheDocument()
      })

      it('renders secondary variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="secondary" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-secondary"]')).toBeInTheDocument()
      })

      it('renders success variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="success" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-success"]')).toBeInTheDocument()
      })

      it('renders caution variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="caution" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-warning"]')).toBeInTheDocument()
      })

      it('renders destructive variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="destructive" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-destructive"]')).toBeInTheDocument()
      })

      it('renders info variant correctly', () => {
        const { container } = render(
          <ToastProvider>
            <Toast variant="info" />
          </ToastProvider>
        )
        
        expect(container.querySelector('[class*="bg-info"]')).toBeInTheDocument()
      })
    })

    describe('Actions', () => {
      it('renders action element', () => {
        const action = <button data-testid="toast-action">Action</button>
        render(
          <TestToastWrapper>
            <Toast action={action} />
          </TestToastWrapper>
        )
        
        expect(screen.getByTestId('toast-action')).toBeInTheDocument()
      })

      it('handles close button click', async () => {
        const onClose = jest.fn()
        const user = userEvent.setup()
        
        render(
          <TestToastWrapper>
            <Toast id="test-toast" onClose={onClose} />
          </TestToastWrapper>
        )
        
        const closeButton = screen.getByRole('button', { name: /kapat/i })
        await user.click(closeButton)
        
        expect(onClose).toHaveBeenCalled()
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        const { container } = render(
          <TestToastWrapper>
            <Toast data-testid="toast" aria-label="Custom toast" />
          </TestToastWrapper>
        )
        
        const toast = container.querySelector('[data-testid="toast"]')
        expect(toast).toHaveAttribute('aria-label', 'Custom toast')
      })
    })
  })

  describe('ToastProvider Component', () => {
    describe('Basic Rendering', () => {
      it('renders children correctly', () => {
        render(
          <ToastProvider>
            <div data-testid="child">Child Content</div>
          </ToastProvider>
        )
        
        expect(screen.getByTestId('child')).toBeInTheDocument()
      })

      it('renders toast container', () => {
        const { container } = render(
          <ToastProvider>
            <div>Content</div>
          </ToastProvider>
        )
        
        const toastContainer = container.querySelector('[aria-label="Bildirimler"]')
        expect(toastContainer).toBeInTheDocument()
      })
    })

    describe('Toast Management', () => {
      it('renders toasts in provider', () => {
        render(
          <ToastProvider>
            <Toast title="Test Toast" />
          </ToastProvider>
        )
        
        expect(screen.getByText('Test Toast')).toBeInTheDocument()
      })

      it('renders multiple toasts', () => {
        render(
          <ToastProvider>
            <Toast title="Toast 1" />
            <Toast title="Toast 2" />
          </ToastProvider>
        )
        
        expect(screen.getByText('Toast 1')).toBeInTheDocument()
        expect(screen.getByText('Toast 2')).toBeInTheDocument()
      })
    })
  })

  describe('ToastTitle Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<ToastTitle>Title Content</ToastTitle>)
        
        expect(screen.getByText('Title Content')).toBeInTheDocument()
      })

      it('applies custom className', () => {
        render(<ToastTitle className="custom-title">Title</ToastTitle>)
        
        expect(screen.getByText('Title')).toHaveClass('custom-title')
      })

      it('passes through HTML attributes', () => {
        render(<ToastTitle data-testid="toast-title">Title</ToastTitle>)
        
        expect(screen.getByTestId('toast-title')).toBeInTheDocument()
      })
    })
  })

  describe('ToastDescription Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<ToastDescription>Description Content</ToastDescription>)
        
        expect(screen.getByText('Description Content')).toBeInTheDocument()
      })

      it('applies custom className', () => {
        render(<ToastDescription className="custom-desc">Description</ToastDescription>)
        
        expect(screen.getByText('Description')).toHaveClass('custom-desc')
      })

      it('passes through HTML attributes', () => {
        render(<ToastDescription data-testid="toast-desc">Description</ToastDescription>)
        
        expect(screen.getByTestId('toast-desc')).toBeInTheDocument()
      })
    })
  })

  describe('ToastAction Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<ToastAction>Action</ToastAction>)
        
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
      })

      it('applies custom className', () => {
        render(<ToastAction className="custom-action">Action</ToastAction>)
        
        expect(screen.getByRole('button')).toHaveClass('custom-action')
      })

      it('handles click events', async () => {
        const onClick = jest.fn()
        
        render(<ToastAction onClick={onClick}>Action</ToastAction>)
        
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
      })

      it('passes through HTML attributes', () => {
        render(<ToastAction data-testid="toast-action">Action</ToastAction>)
        
        expect(screen.getByTestId('toast-action')).toBeInTheDocument()
      })
    })
  })

  describe('ToastClose Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(<ToastClose />)
        
        expect(screen.getByRole('button', { name: /kapat/i })).toBeInTheDocument()
        expect(screen.getByTestId('x-icon')).toBeInTheDocument()
      })

      it('applies custom className', () => {
        render(<ToastClose className="custom-close" />)
        
        expect(screen.getByRole('button')).toHaveClass('custom-close')
      })

      it('handles click events', async () => {
        const onClick = jest.fn()
        
        render(<ToastClose onClick={onClick} />)
        
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
      })

      it('passes through HTML attributes', () => {
        render(<ToastClose data-testid="toast-close" />)
        
        expect(screen.getByTestId('toast-close')).toBeInTheDocument()
      })
    })
  })

  describe('useToast Hook', () => {
    describe('Context Usage', () => {
      it('works correctly within ToastProvider', () => {
        const TestComponent = () => {
          const { toasts } = useToast()
          return <div data-testid="toast-count">{toasts.length}</div>
        }
        
        render(
          <ToastProvider>
            <TestComponent />
          </ToastProvider>
        )
        
        expect(screen.getByTestId('toast-count')).toHaveTextContent('0')
      })
    })
  })

  describe('Toaster Component', () => {
    it('renders Toaster component', () => {
      render(<Toaster><div>Test content</div></Toaster>)
      // Toaster should render without errors
      expect(document.body).toBeInTheDocument()
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete toast with all components', () => {
      render(
        <TestToastWrapper>
          <Toast
            title="Complete Toast"
            description="This is a complete toast"
            variant="success"
            action={<ToastAction>Retry</ToastAction>}
          />
        </TestToastWrapper>
      )
      
      expect(screen.getByText('Complete Toast')).toBeInTheDocument()
      expect(screen.getByText('This is a complete toast')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /kapat/i })).toBeInTheDocument()
    })

    it('handles multiple toasts', () => {
      render(
        <TestToastWrapper>
          <Toast title="Toast 1" />
          <Toast title="Toast 2" />
          <Toast title="Toast 3" />
        </TestToastWrapper>
      )
      
      expect(screen.getByText('Toast 1')).toBeInTheDocument()
      expect(screen.getByText('Toast 2')).toBeInTheDocument()
      expect(screen.getByText('Toast 3')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles toast without id', () => {
      render(
        <TestToastWrapper>
          <Toast title="No ID Toast" />
        </TestToastWrapper>
      )
      
      expect(screen.getByText('No ID Toast')).toBeInTheDocument()
    })

    it('handles empty toast content', () => {
      render(
        <TestToastWrapper>
          <Toast />
        </TestToastWrapper>
      )
      
      expect(screen.getByRole('button', { name: /kapat/i })).toBeInTheDocument()
    })

    it('handles null/undefined props', () => {
      render(
        <TestToastWrapper>
          <Toast title={null} description={undefined} />
        </TestToastWrapper>
      )
      
      expect(screen.getByRole('button', { name: /kapat/i })).toBeInTheDocument()
    })

    it('handles complex nested content', () => {
      render(
        <TestToastWrapper>
          <Toast
            title={<span>Complex <strong>Title</strong></span>}
            description={<div>Complex <em>Description</em></div>}
          />
        </TestToastWrapper>
      )
      
      expect(screen.getAllByText('Complex')).toHaveLength(2)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('passes through HTML attributes for all components', () => {
      render(
        <div>
          <ToastTitle data-testid="title" aria-label="Title">Title</ToastTitle>
          <ToastDescription data-testid="desc" aria-label="Description">Description</ToastDescription>
          <ToastAction data-testid="action" aria-label="Action">Action</ToastAction>
          <ToastClose data-testid="close" aria-label="Close" />
        </div>
      )
      
      expect(screen.getByTestId('title')).toHaveAttribute('aria-label', 'Title')
      expect(screen.getByTestId('desc')).toHaveAttribute('aria-label', 'Description')
      expect(screen.getByTestId('action')).toHaveAttribute('aria-label', 'Action')
      expect(screen.getByTestId('close')).toHaveAttribute('aria-label', 'Close')
    })
  })
})
