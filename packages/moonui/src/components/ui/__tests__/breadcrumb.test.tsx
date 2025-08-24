import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbSeparator, 
  BreadcrumbEllipsis 
} from '../breadcrumb'

describe('Breadcrumb Components', () => {
  describe('Breadcrumb Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toBeInTheDocument()
      expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb')
      expect(breadcrumb.tagName).toBe('NAV')
    })

    it('applies custom className', () => {
      render(
        <Breadcrumb className="custom-breadcrumb" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('custom-breadcrumb')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>()
      render(
        <Breadcrumb ref={ref} data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })

    it('maintains displayName', () => {
      expect(Breadcrumb.displayName).toBe('Breadcrumb')
    })

    it('renders default variant correctly', () => {
      render(
        <Breadcrumb variant="default" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('dark:text-gray-100')
      expect(breadcrumb).toHaveClass('transition-colors')
    })

    it('renders muted variant correctly', () => {
      render(
        <Breadcrumb variant="muted" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-muted-foreground')
      expect(breadcrumb).toHaveClass('dark:text-gray-400')
    })

    it('renders ghost variant correctly', () => {
      render(
        <Breadcrumb variant="ghost" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-foreground/60')
      expect(breadcrumb).toHaveClass('dark:text-gray-300/60')
    })

    it('renders default size correctly', () => {
      render(
        <Breadcrumb size="default" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-sm')
    })

    it('renders sm size correctly', () => {
      render(
        <Breadcrumb size="sm" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-xs')
    })

    it('renders lg size correctly', () => {
      render(
        <Breadcrumb size="lg" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-base')
    })

    it('passes through HTML attributes', () => {
      render(
        <Breadcrumb id="custom-id" data-custom="value" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveAttribute('id', 'custom-id')
      expect(breadcrumb).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('BreadcrumbList Component', () => {
    it('renders correctly with default props', () => {
      render(
        <BreadcrumbList data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Products</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('OL')
      expect(list).toHaveClass('flex')
      expect(list).toHaveClass('flex-wrap')
      expect(list).toHaveClass('items-center')
    })

    it('applies custom className', () => {
      render(
        <BreadcrumbList className="custom-list" data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toHaveClass('custom-list')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLOListElement>()
      render(
        <BreadcrumbList ref={ref} data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLOListElement)
    })

    it('maintains displayName', () => {
      expect(BreadcrumbList.displayName).toBe('BreadcrumbList')
    })

    it('renders without collapse when items are few', () => {
      render(
        <BreadcrumbList collapsed={true} collapsedWidth={3} data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Products</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.queryByText('More pages')).not.toBeInTheDocument()
    })

    it('renders with collapse when items exceed collapsedWidth', () => {
      render(
        <BreadcrumbList collapsed={true} collapsedWidth={3} data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Category</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Subcategory</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Product</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Product')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toBeInTheDocument()
      expect(screen.queryByText('Category')).not.toBeInTheDocument()
    })

    it('uses default collapsedWidth when not specified', () => {
      render(
        <BreadcrumbList collapsed={true} data-testid="breadcrumb-list">
          <BreadcrumbItem>1</BreadcrumbItem>
          <BreadcrumbItem>2</BreadcrumbItem>
          <BreadcrumbItem>3</BreadcrumbItem>
          <BreadcrumbItem>4</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toBeInTheDocument()
    })

    it('passes through HTML attributes', () => {
      render(
        <BreadcrumbList id="custom-id" data-custom="value" data-testid="breadcrumb-list">
          <BreadcrumbItem>Home</BreadcrumbItem>
        </BreadcrumbList>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toHaveAttribute('id', 'custom-id')
      expect(list).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('BreadcrumbItem Component', () => {
    it('renders correctly with default props', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).toBeInTheDocument()
      expect(item.tagName).toBe('LI')
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <BreadcrumbItem className="custom-item" data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).toHaveClass('custom-item')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>()
      render(
        <BreadcrumbItem ref={ref} data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLLIElement)
    })

    it('maintains displayName', () => {
      expect(BreadcrumbItem.displayName).toBe('BreadcrumbItem')
    })

    it('renders as span by default', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      const content = item.querySelector('span')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Home')
    })

    it('renders as link when href is provided', () => {
      render(
        <BreadcrumbItem href="/home" data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      const link = item.querySelector('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/home')
      expect(link).toHaveTextContent('Home')
    })

    it('renders as fragment when asChild is true', () => {
      render(
        <BreadcrumbItem asChild data-testid="breadcrumb-item">
          <button>Custom Button</button>
        </BreadcrumbItem>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Custom Button')
    })

    it('sets aria-current when isCurrent is true', () => {
      render(
        <BreadcrumbItem isCurrent data-testid="breadcrumb-item">
          Current Page
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).toHaveAttribute('aria-current', 'page')
    })

    it('does not set aria-current when isCurrent is false', () => {
      render(
        <BreadcrumbItem isCurrent={false} data-testid="breadcrumb-item">
          Not Current
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).not.toHaveAttribute('aria-current')
    })

    it('applies current page styling when isCurrent is true', () => {
      render(
        <BreadcrumbItem isCurrent data-testid="breadcrumb-item">
          Current Page
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      const content = item.querySelector('span')
      expect(content).toHaveClass('font-medium')
      expect(content).toHaveClass('text-foreground')
    })

    it('applies non-current styling when isCurrent is false', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item">
          Regular Page
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      const content = item.querySelector('span')
      expect(content).toHaveClass('text-muted-foreground')
      expect(content).toHaveClass('hover:text-foreground')
    })

    it('passes through HTML attributes', () => {
      render(
        <BreadcrumbItem id="custom-id" data-custom="value" data-testid="breadcrumb-item">
          Home
        </BreadcrumbItem>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).toHaveAttribute('id', 'custom-id')
      expect(item).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('BreadcrumbSeparator Component', () => {
    it('renders correctly with default props', () => {
      render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />)
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toBeInTheDocument()
      expect(separator.tagName).toBe('LI')
      expect(separator).toHaveAttribute('role', 'presentation')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })

    it('applies custom className', () => {
      render(<BreadcrumbSeparator className="custom-separator" data-testid="breadcrumb-separator" />)
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toHaveClass('custom-separator')
    })

    it('maintains displayName', () => {
      expect(BreadcrumbSeparator.displayName).toBe('BreadcrumbSeparator')
    })

    it('renders default ChevronRight icon', () => {
      render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />)
      
      const separator = screen.getByTestId('breadcrumb-separator')
      const icon = separator.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('h-3.5')
      expect(icon).toHaveClass('w-3.5')
    })

    it('renders custom children instead of default icon', () => {
      render(
        <BreadcrumbSeparator data-testid="breadcrumb-separator">
          <span>/</span>
        </BreadcrumbSeparator>
      )
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(screen.getByText('/')).toBeInTheDocument()
      expect(separator.querySelector('svg')).not.toBeInTheDocument()
    })

    it('has correct default styling', () => {
      render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />)
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toHaveClass('text-muted-foreground')
      expect(separator).toHaveClass('dark:text-gray-500')
      expect(separator).toHaveClass('opacity-70')
    })

    it('passes through HTML attributes', () => {
      render(
        <BreadcrumbSeparator id="custom-id" data-custom="value" data-testid="breadcrumb-separator" />
      )
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toHaveAttribute('id', 'custom-id')
      expect(separator).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('BreadcrumbEllipsis Component', () => {
    it('renders correctly with default props', () => {
      render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />)
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      expect(ellipsis).toBeInTheDocument()
      expect(ellipsis.tagName).toBe('LI')
      expect(ellipsis).toHaveAttribute('role', 'presentation')
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
    })

    it('applies custom className', () => {
      render(<BreadcrumbEllipsis className="custom-ellipsis" data-testid="breadcrumb-ellipsis" />)
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      expect(ellipsis).toHaveClass('custom-ellipsis')
    })

    it('maintains displayName', () => {
      expect(BreadcrumbEllipsis.displayName).toBe('BreadcrumbEllipsis')
    })

    it('renders MoreHorizontal icon', () => {
      render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />)
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      const icon = ellipsis.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('h-4')
      expect(icon).toHaveClass('w-4')
    })

    it('renders screen reader text', () => {
      render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />)
      
      expect(screen.getByText('More pages')).toBeInTheDocument()
      const srText = screen.getByText('More pages')
      expect(srText).toHaveClass('sr-only')
    })

    it('has correct default styling', () => {
      render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />)
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      expect(ellipsis).toHaveClass('flex')
      expect(ellipsis).toHaveClass('items-center')
      expect(ellipsis).toHaveClass('text-muted-foreground')
      expect(ellipsis).toHaveClass('dark:text-gray-500')
    })

    it('passes through HTML attributes', () => {
      render(
        <BreadcrumbEllipsis id="custom-id" data-custom="value" data-testid="breadcrumb-ellipsis" />
      )
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      expect(ellipsis).toHaveAttribute('id', 'custom-id')
      expect(ellipsis).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete breadcrumb navigation', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem href="/products">Products</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrent>Current Product</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Current Product')).toBeInTheDocument()
      
      const homeLink = screen.getByText('Home').closest('a')
      const productsLink = screen.getByText('Products').closest('a')
      const currentItem = screen.getByText('Current Product').closest('li')
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(productsLink).toHaveAttribute('href', '/products')
      expect(currentItem).toHaveAttribute('aria-current', 'page')
    })

    it('renders with custom separators', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbSeparator>
              <span>→</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>Products</BreadcrumbItem>
            <BreadcrumbSeparator>
              <span>→</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const arrows = screen.getAllByText('→')
      expect(arrows).toHaveLength(2)
    })

    it('renders with collapsed list', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList collapsed={true} collapsedWidth={2}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Category</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Subcategory</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrent>Product</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Product')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toBeInTheDocument()
      expect(screen.queryByText('Category')).not.toBeInTheDocument()
      expect(screen.queryByText('Subcategory')).not.toBeInTheDocument()
    })

    it('renders with all props and variants', () => {
      render(
        <Breadcrumb 
          variant="muted" 
          size="lg" 
          className="custom-breadcrumb"
          data-testid="breadcrumb"
        >
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem href="/" className="custom-item">Home</BreadcrumbItem>
            <BreadcrumbSeparator className="custom-separator" />
            <BreadcrumbItem isCurrent className="custom-current">Current</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-muted-foreground')
      expect(breadcrumb).toHaveClass('text-base')
      expect(breadcrumb).toHaveClass('custom-breadcrumb')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty breadcrumb list', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList data-testid="breadcrumb-list" />
        </Breadcrumb>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toBeInTheDocument()
      expect(list).toBeEmptyDOMElement()
    })

    it('handles single breadcrumb item', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem isCurrent>Only Item</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByText('Only Item')).toBeInTheDocument()
      const item = screen.getByText('Only Item').closest('li')
      expect(item).toHaveAttribute('aria-current', 'page')
    })

    it('handles breadcrumb with only separators', () => {
      const { container } = render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbSeparator />
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const separators = container.querySelectorAll('[role="presentation"]')
      expect(separators).toHaveLength(3)
    })

    it('handles asChild with complex children', () => {
      render(
        <BreadcrumbItem asChild data-testid="breadcrumb-item">
          <div>
            <span>Complex</span>
            <strong>Child</strong>
          </div>
        </BreadcrumbItem>
      )
      
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('handles null and undefined children', () => {
      render(
        <BreadcrumbList data-testid="breadcrumb-list">
          <BreadcrumbItem>Valid Item</BreadcrumbItem>
          {null}
          {undefined}
          <BreadcrumbSeparator />
        </BreadcrumbList>
      )
      
      expect(screen.getByText('Valid Item')).toBeInTheDocument()
    })
  })
})
