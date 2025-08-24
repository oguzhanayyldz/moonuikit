import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../input'
import { Search, Eye, EyeOff } from 'lucide-react'

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10')
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('text-sm')
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('test value')
  })

  it('handles different input types', () => {
    const { rerender } = render(<Input type="password" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')

    rerender(<Input type="email" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')

    rerender(<Input type="number" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number')
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('supports controlled component pattern', () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState('')
      return (
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          data-testid="controlled-input"
        />
      )
    }
    
    render(<TestComponent />)
    const input = screen.getByTestId('controlled-input') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'controlled' } })
    expect(input.value).toBe('controlled')
  })

  describe('Variants', () => {
    it('renders standard variant correctly', () => {
      render(<Input variant="standard" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border')
      expect(input).toHaveClass('border-gray-300')
      expect(input).toHaveClass('rounded-md')
    })

    it('renders filled variant correctly', () => {
      render(<Input variant="filled" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('bg-gray-100')
      expect(input).toHaveClass('border-transparent')
    })

    it('renders ghost variant correctly', () => {
      render(<Input variant="ghost" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-none')
      expect(input).toHaveClass('bg-transparent')
    })

    it('renders underline variant correctly', () => {
      render(<Input variant="underline" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-b')
      expect(input).toHaveClass('rounded-none')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Input size="sm" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-8')
      expect(input).toHaveClass('text-xs')
    })

    it('renders medium size correctly (default)', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-10')
      expect(input).toHaveClass('text-sm')
    })

    it('renders large size correctly', () => {
      render(<Input size="lg" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-12')
      expect(input).toHaveClass('text-base')
    })
  })

  describe('Icons and Buttons', () => {
    it('renders with left icon', () => {
      render(<Input leftIcon={<Search data-testid="search-icon" />} />)
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveClass('pl-10')
    })

    it('renders with right icon', () => {
      render(<Input rightIcon={<Search data-testid="search-icon" />} />)
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveClass('pr-10')
    })

    it('renders with right button', () => {
      const button = <button data-testid="toggle-btn">Toggle</button>
      render(<Input rightButton={button} />)
      expect(screen.getByTestId('toggle-btn')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveClass('pr-10')
    })

    it('handles password toggle functionality', () => {
      const PasswordInput = () => {
        const [showPassword, setShowPassword] = React.useState(false)
        return (
          <Input
            type={showPassword ? 'text' : 'password'}
            rightButton={
              <button
                onClick={() => setShowPassword(!showPassword)}
                data-testid="password-toggle"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />
        )
      }
      
      render(<PasswordInput />)
      const input = screen.getByDisplayValue('') // Get input by display value
      const toggleBtn = screen.getByTestId('password-toggle')
      
      // Initially should be password type
      expect(input).toHaveAttribute('type', 'password')
      fireEvent.click(toggleBtn)
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      render(<Input loading />)
      expect(screen.getByRole('textbox')).toBeDisabled()
      expect(screen.getByRole('textbox')).toHaveAttribute('data-loading', '')
    })

    it('shows loading spinner with left icon', () => {
      render(<Input loading leftIcon={<Search />} />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('pl-10')
    })

    it('shows loading spinner without left icon', () => {
      render(<Input loading />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('pl-10')
    })

    it('hides right icon when loading', () => {
      render(<Input loading rightIcon={<Search data-testid="search-icon" />} />)
      expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument()
    })
  })

  describe('Error and Success States', () => {
    it('displays error message', () => {
      render(<Input error="This field is required" id="test-input" />)
      const input = screen.getByRole('textbox')
      const errorMessage = screen.getByText('This field is required')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
      expect(input).toHaveAttribute('data-error', '')
      expect(input).toHaveClass('border-error')
      expect(errorMessage).toHaveClass('text-error')
      expect(errorMessage).toHaveAttribute('id', 'test-input-error')
    })

    it('displays success message', () => {
      render(<Input success="Valid input" id="test-input" />)
      const input = screen.getByRole('textbox')
      const successMessage = screen.getByText('Valid input')
      
      expect(input).toHaveAttribute('aria-describedby', 'test-input-success')
      expect(input).toHaveAttribute('data-success', '')
      expect(input).toHaveClass('border-success')
      expect(successMessage).toHaveClass('text-success')
      expect(successMessage).toHaveAttribute('id', 'test-input-success')
    })

    it('prioritizes error over success', () => {
      render(<Input error="Error message" success="Success message" />)
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Success message')).not.toBeInTheDocument()
    })

    it('shows message when alwaysShowMessage is true', () => {
      render(<Input alwaysShowMessage success="Test message" />)
      // Should show message container with success message
      const messageContainer = screen.getByText('Test message')
      expect(messageContainer).toBeInTheDocument()
      expect(messageContainer).toHaveClass('text-success')
    })

    it('applies custom message className', () => {
      render(<Input error="Error" messageClassName="custom-message" />)
      const message = screen.getByText('Error')
      expect(message).toHaveClass('custom-message')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom wrapper className', () => {
      render(
        <Input 
          wrapperClassName="custom-wrapper" 
          data-testid="input"
        />
      )
      const wrapper = screen.getByTestId('input').parentElement
      expect(wrapper).toHaveClass('custom-wrapper')
    })

    it('combines multiple class names correctly', () => {
      render(
        <Input 
          className="custom-input"
          variant="filled"
          size="lg"
          error="Error message"
          data-testid="input"
        />
      )
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-input')
      expect(input).toHaveClass('bg-gray-100')
      expect(input).toHaveClass('h-12')
      expect(input).toHaveClass('border-error')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for error state', () => {
      render(<Input error="Required field" id="accessible-input" />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(input).toHaveAttribute('aria-describedby', 'accessible-input-error')
    })

    it('has proper ARIA attributes for success state', () => {
      render(<Input success="Valid input" id="accessible-input" />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveAttribute('aria-describedby', 'accessible-input-success')
    })

    it('has proper loading indicators', () => {
      render(<Input loading />)
      const spinner = screen.getByRole('textbox').parentElement?.querySelector('[aria-hidden="true"]')
      expect(spinner).toBeInTheDocument()
    })
  })
})
