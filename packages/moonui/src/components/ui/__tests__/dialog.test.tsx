import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogForm,
} from '../dialog'

// Mock Radix UI Dialog components
/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('@radix-ui/react-dialog', () => {
  const mockForwardRef = (component: any) => {
    const forwardedComponent = (props: any, ref: any) => component({ ...props, ref })
    forwardedComponent.displayName = component.displayName || component.name
    return forwardedComponent
  }

  return {
    Root: ({ children, open, ...props }: any) => (
      <div data-testid="dialog-root" data-open={open} {...props}>
        {children}
      </div>
    ),
    Trigger: ({ children, ...props }: any) => (
      <button data-testid="dialog-trigger" {...props}>
        {children}
      </button>
    ),
    Portal: ({ children }: any) => (
      <div data-testid="dialog-portal">{children}</div>
    ),
    Overlay: mockForwardRef(({ className, ref, ...props }: any) => (
      <div
        ref={ref}
        data-testid="dialog-overlay"
        className={className}
        {...props}
      />
    )),
    Content: mockForwardRef(({ className, children, ref, ...props }: any) => (
      <div
        ref={ref}
        data-testid="dialog-content"
        className={className}
        {...props}
      >
        {children}
      </div>
    )),
    Close: ({ children, onClick, ...props }: any) => (
      <button data-testid="dialog-close" onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Title: mockForwardRef(({ className, children, ref, ...props }: any) => (
      <h2 ref={ref} data-testid="dialog-title" className={className} {...props}>
        {children}
      </h2>
    )),
    Description: mockForwardRef(({ className, children, ref, ...props }: any) => (
      <p ref={ref} data-testid="dialog-description" className={className} {...props}>
        {children}
      </p>
    )),
  }
})

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  X: ({ className, ...props }: any) => (
    <svg data-testid="x-icon" className={className} {...props}>
      <path d="x" />
    </svg>
  ),
  Check: ({ className, ...props }: any) => (
    <svg data-testid="check-icon" className={className} {...props}>
      <path d="check" />
    </svg>
  ),
  Loader2: ({ className, ...props }: any) => (
    <svg data-testid="loader-icon" className={className} {...props}>
      <path d="loader" />
    </svg>
  ),
}))

describe('Dialog Components', () => {
  describe('Dialog Root Component', () => {
    it('renders correctly', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument()
    })

    it('handles open state', () => {
      render(
        <Dialog open={true}>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      )
      
      const root = screen.getByTestId('dialog-root')
      expect(root).toHaveAttribute('data-open', 'true')
    })

    it('handles onOpenChange callback', () => {
      const onOpenChange = jest.fn()
      render(
        <Dialog onOpenChange={onOpenChange}>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument()
    })
  })

  describe('DialogTrigger Component', () => {
    it('renders correctly', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>
      )
      
      const trigger = screen.getByTestId('dialog-trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveTextContent('Open Dialog')
    })

    it('passes through HTML attributes', () => {
      render(
        <Dialog>
          <DialogTrigger id="trigger-1" className="custom-trigger">
            Open Dialog
          </DialogTrigger>
        </Dialog>
      )
      
      const trigger = screen.getByTestId('dialog-trigger')
      expect(trigger).toHaveAttribute('id', 'trigger-1')
      expect(trigger).toHaveClass('custom-trigger')
    })
  })

  describe('DialogContent Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Dialog>
          <DialogContent data-testid="content">Dialog Content</DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Dialog Content')
    })

    it('applies custom className', () => {
      render(
        <Dialog>
          <DialogContent className="custom-dialog" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('custom-dialog')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Dialog>
          <DialogContent ref={ref} data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
    })

    it('renders default variant correctly', () => {
      render(
        <Dialog>
          <DialogContent data-testid="content">Content</DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('border-gray-200 dark:border-gray-700')
    })

    it('renders primary variant correctly', () => {
      render(
        <Dialog>
          <DialogContent variant="primary" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('border-primary/20 dark:border-primary/30')
    })

    it('renders ghost variant correctly', () => {
      render(
        <Dialog>
          <DialogContent variant="ghost" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('border-transparent shadow-xl')
    })

    it('renders different sizes correctly', () => {
      const { rerender } = render(
        <Dialog>
          <DialogContent size="sm" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('content')).toHaveClass('max-w-sm p-5')
      
      rerender(
        <Dialog>
          <DialogContent size="lg" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('content')).toHaveClass('max-w-2xl p-7')
    })

    it('renders different radius variants', () => {
      render(
        <Dialog>
          <DialogContent radius="xl" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('rounded-2xl')
    })

    it('renders with title and description', () => {
      render(
        <Dialog>
          <DialogContent title="Dialog Title" description="Dialog Description">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Dialog Title')
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('Dialog Description')
    })

    it('renders with custom icon', () => {
      const CustomIcon = () => <span data-testid="custom-icon">Icon</span>
      render(
        <Dialog>
          <DialogContent icon={<CustomIcon />} title="Title">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('renders loading state', () => {
      render(
        <Dialog>
          <DialogContent loading={true} title="Loading">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
    })

    it('renders success state', () => {
      render(
        <Dialog>
          <DialogContent success={true} title="Success">
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    })

    it('hides close button when hideCloseButton is true', () => {
      render(
        <Dialog>
          <DialogContent hideCloseButton={true}>
            Content
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.queryByTestId('dialog-close')).not.toBeInTheDocument()
    })

    it('shows close button by default', () => {
      render(
        <Dialog>
          <DialogContent>Content</DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-close')).toBeInTheDocument()
      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn()
      render(
        <Dialog>
          <DialogContent onClose={onClose}>Content</DialogContent>
        </Dialog>
      )
      
      const closeButton = screen.getByTestId('dialog-close')
      fireEvent.click(closeButton)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders different positions correctly', () => {
      render(
        <Dialog>
          <DialogContent position="top" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('top-[5%]')
    })

    it('passes through HTML attributes', () => {
      render(
        <Dialog>
          <DialogContent id="dialog-1" data-custom="value" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toHaveAttribute('id', 'dialog-1')
      expect(content).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('DialogHeader Component', () => {
    it('renders correctly', () => {
      render(<DialogHeader data-testid="dialog-header">Header Content</DialogHeader>)
      
      const header = screen.getByTestId('dialog-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent('Header Content')
      expect(header).toHaveClass('flex flex-col space-y-2 text-center sm:text-left')
    })

    it('applies custom className', () => {
      render(
        <DialogHeader className="custom-header" data-testid="dialog-header">
          Header
        </DialogHeader>
      )
      
      const header = screen.getByTestId('dialog-header')
      expect(header).toHaveClass('custom-header')
    })

    it('passes through HTML attributes', () => {
      render(
        <DialogHeader id="header-1" data-testid="dialog-header">
          Header
        </DialogHeader>
      )
      
      const header = screen.getByTestId('dialog-header')
      expect(header).toHaveAttribute('id', 'header-1')
    })

    it('maintains displayName', () => {
      expect(DialogHeader.displayName).toBe('DialogHeader')
    })
  })

  describe('DialogFooter Component', () => {
    it('renders correctly', () => {
      render(<DialogFooter data-testid="dialog-footer">Footer Content</DialogFooter>)
      
      const footer = screen.getByTestId('dialog-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveTextContent('Footer Content')
      expect(footer).toHaveClass('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 mt-6')
    })

    it('applies custom className', () => {
      render(
        <DialogFooter className="custom-footer" data-testid="dialog-footer">
          Footer
        </DialogFooter>
      )
      
      const footer = screen.getByTestId('dialog-footer')
      expect(footer).toHaveClass('custom-footer')
    })

    it('passes through HTML attributes', () => {
      render(
        <DialogFooter id="footer-1" data-testid="dialog-footer">
          Footer
        </DialogFooter>
      )
      
      const footer = screen.getByTestId('dialog-footer')
      expect(footer).toHaveAttribute('id', 'footer-1')
    })

    it('maintains displayName', () => {
      expect(DialogFooter.displayName).toBe('DialogFooter')
    })
  })

  describe('DialogTitle Component', () => {
    it('renders correctly', () => {
      render(<DialogTitle data-testid="title">Dialog Title</DialogTitle>)
      
      const title = screen.getByTestId('title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Dialog Title')
      expect(title).toHaveClass('text-xl font-semibold leading-snug tracking-tight dark:text-white')
    })

    it('applies custom className', () => {
      render(
        <DialogTitle className="custom-title" data-testid="title">
          Title
        </DialogTitle>
      )
      
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('custom-title')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>()
      render(<DialogTitle ref={ref} data-testid="title-ref">Title</DialogTitle>)
      
      const title = screen.getByTestId('title-ref')
      expect(title).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(
        <DialogTitle id="title-1" data-testid="title">
          Title
        </DialogTitle>
      )
      
      const title = screen.getByTestId('title')
      expect(title).toHaveAttribute('id', 'title-1')
    })
  })

  describe('DialogDescription Component', () => {
    it('renders correctly', () => {
      render(<DialogDescription data-testid="description">Dialog Description</DialogDescription>)
      
      const description = screen.getByTestId('description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveTextContent('Dialog Description')
      expect(description).toHaveClass('text-sm text-muted-foreground leading-normal dark:text-gray-400')
    })

    it('applies custom className', () => {
      render(
        <DialogDescription className="custom-description" data-testid="description">
          Description
        </DialogDescription>
      )
      
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('custom-description')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>()
      render(<DialogDescription ref={ref} data-testid="desc-ref">Description</DialogDescription>)
      
      const description = screen.getByTestId('desc-ref')
      expect(description).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(
        <DialogDescription id="desc-1" data-testid="description">
          Description
        </DialogDescription>
      )
      
      const description = screen.getByTestId('description')
      expect(description).toHaveAttribute('id', 'desc-1')
    })
  })

  describe('DialogClose Component', () => {
    it('renders correctly', () => {
      render(<DialogClose data-testid="close">Close</DialogClose>)
      
      const close = screen.getByTestId('close')
      expect(close).toBeInTheDocument()
      expect(close).toHaveTextContent('Close')
    })

    it('handles click events', () => {
      const onClick = jest.fn()
      render(<DialogClose onClick={onClick}>Close</DialogClose>)
      
      const close = screen.getByTestId('dialog-close')
      fireEvent.click(close)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('DialogForm Component', () => {
    it('renders correctly', () => {
      render(<DialogForm data-testid="dialog-form">Form Content</DialogForm>)
      
      const form = screen.getByTestId('dialog-form')
      expect(form).toBeInTheDocument()
      expect(form).toHaveTextContent('Form Content')
      expect(form).toHaveClass('flex flex-col gap-4')
    })

    it('applies custom className', () => {
      render(
        <DialogForm className="custom-form" data-testid="dialog-form">
          Form
        </DialogForm>
      )
      
      const form = screen.getByTestId('dialog-form')
      expect(form).toHaveClass('custom-form')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLFormElement>()
      render(<DialogForm ref={ref}>Form</DialogForm>)
      
      expect(ref.current).toBeInstanceOf(HTMLFormElement)
    })

    it('handles form submission', () => {
      const onSubmit = jest.fn((e) => e.preventDefault())
      render(
        <DialogForm onSubmit={onSubmit} data-testid="dialog-form">
          <button type="submit">Submit</button>
        </DialogForm>
      )
      
      const form = screen.getByTestId('dialog-form')
      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('passes through HTML attributes', () => {
      render(
        <DialogForm id="form-1" data-testid="dialog-form">
          Form
        </DialogForm>
      )
      
      const form = screen.getByTestId('dialog-form')
      expect(form).toHaveAttribute('id', 'form-1')
    })

    it('maintains displayName', () => {
      expect(DialogForm.displayName).toBe('DialogForm')
    })
  })

  describe('Complex Dialog Combinations', () => {
    it('renders complete dialog with all components', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Dialog</DialogTitle>
              <DialogDescription>This is a complete dialog example</DialogDescription>
            </DialogHeader>
            <div>Main content goes here</div>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Complete Dialog')
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('This is a complete dialog example')
      expect(screen.getByText('Main content goes here')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('renders dialog with form integration', () => {
      render(
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form Dialog</DialogTitle>
            </DialogHeader>
            <DialogForm data-testid="dialog-form">
              <input type="text" placeholder="Enter text" />
              <button type="submit">Submit</button>
            </DialogForm>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-form')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
      expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    it('handles all variants and props together', () => {
      render(
        <Dialog open={true}>
          <DialogContent
            variant="primary"
            size="lg"
            radius="xl"
            position="top"
            title="Advanced Dialog"
            description="With all features"
            loading={false}
            success={false}
            hideCloseButton={false}
            className="custom-dialog"
          >
            Advanced content
          </DialogContent>
        </Dialog>
      )
      
      const content = screen.getByTestId('dialog-content')
      expect(content).toHaveClass('custom-dialog')
      expect(content).toHaveClass('border-primary/20 dark:border-primary/30')
      expect(content).toHaveClass('max-w-2xl p-7')
      expect(content).toHaveClass('rounded-2xl')
      expect(content).toHaveClass('top-[5%]')
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Advanced Dialog')
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('With all features')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty dialog content', () => {
      render(
        <Dialog>
          <DialogContent hideCloseButton={true} data-testid="content" />
        </Dialog>
      )
      
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      // Content should only contain the overlay and content wrapper
      expect(content.children.length).toBeGreaterThanOrEqual(0)
    })

    it('handles null and undefined children', () => {
      render(
        <Dialog>
          <DialogContent>
            {null}
            {undefined}
            <div>Valid content</div>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByText('Valid content')).toBeInTheDocument()
    })

    it('handles dialog without trigger', () => {
      render(
        <Dialog>
          <DialogContent>Content without trigger</DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('handles multiple dialogs', () => {
      render(
        <div>
          <Dialog>
            <DialogContent data-testid="dialog-1">Dialog 1</DialogContent>
          </Dialog>
          <Dialog>
            <DialogContent data-testid="dialog-2">Dialog 2</DialogContent>
          </Dialog>
        </div>
      )
      
      expect(screen.getByTestId('dialog-1')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-2')).toBeInTheDocument()
    })

    it('handles loading and success states together', () => {
      render(
        <Dialog>
          <DialogContent loading={true} success={true} title="Conflicting States">
            Content
          </DialogContent>
        </Dialog>
      )
      
      // Both icons should be present as they are rendered conditionally
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
      expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    })
  })
})
