import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')
    expect(screen.getByRole('button')).toHaveClass('text-secondary-foreground')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-background')
    expect(screen.getByRole('button')).toHaveClass('text-foreground')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-foreground')

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-primary')
    expect(screen.getByRole('button')).toHaveClass('underline-offset-4')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')
    expect(screen.getByRole('button')).toHaveClass('px-3')
    expect(screen.getByRole('button')).toHaveClass('text-sm')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
    expect(screen.getByRole('button')).toHaveClass('px-6')
    expect(screen.getByRole('button')).toHaveClass('text-lg')

    rerender(<Button size="icon">Icon</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')
    expect(button).toHaveClass('w-10')
  })

  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Button</Button>)
    expect(ref).toHaveBeenCalled()
  })
})
