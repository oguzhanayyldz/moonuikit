import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly with default props', () => {
      render(<Card data-testid="card">Card content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg')
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('bg-card')
    })

    it('applies custom className', () => {
      render(<Card className="custom-card" data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toHaveClass('custom-card')
    })

    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<Card ref={ref}>Content</Card>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex')
      expect(header).toHaveClass('flex-col')
      expect(header).toHaveClass('space-y-1.5')
    })
  })

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-lg')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('leading-none')
      expect(title).toHaveClass('tracking-tight')
    })
  })

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(<CardDescription data-testid="description">Card description</CardDescription>)
      const description = screen.getByTestId('description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm')
      expect(description).toHaveClass('text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent data-testid="content">Card Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('pt-0')
    })
  })

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter data-testid="footer">Card Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex')
      expect(footer).toHaveClass('items-center')
      expect(footer).toHaveClass('pt-4')
    })
  })

  describe('Complete Card Structure', () => {
    it('renders full card structure correctly', () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByTestId('full-card')).toBeInTheDocument()
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })
})
