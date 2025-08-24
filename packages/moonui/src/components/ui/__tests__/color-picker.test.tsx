import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ColorPicker Components', () => {
  describe('ColorPicker', () => {
    it('renders correctly with default props', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('#ffffff')).toBeInTheDocument();
    });

    it('displays selected color', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ff0000" onColorChange={mockOnChange} />);
      
      expect(screen.getByText('#ff0000')).toBeInTheDocument();
      const colorDisplay = screen.getByTestId('color-display');
      expect(colorDisplay).toHaveStyle('background-color: #ff0000');
    });

    it('opens color picker when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('calls onColorChange when color is selected', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const colorArea = screen.getByTestId('color-area');
        fireEvent.click(colorArea);
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('handles HSL color format', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="hsl(120, 100%, 50%)" onColorChange={mockOnChange} />);
      
      expect(screen.getByText('hsl(120, 100%, 50%)')).toBeInTheDocument();
    });

    it('handles RGB color format', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="rgb(255, 0, 0)" onColorChange={mockOnChange} />);
      
      expect(screen.getByText('rgb(255, 0, 0)')).toBeInTheDocument();
    });

    it('handles alpha channel', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="rgba(255, 0, 0, 0.5)" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Opacity')).toBeInTheDocument();
        const opacitySlider = screen.getByTestId('opacity-slider');
        expect(opacitySlider).toBeInTheDocument();
      });
    });

    it('shows eyedropper tool when available', async () => {
      // Mock the EyeDropper API
      Object.defineProperty(window, 'EyeDropper', {
        value: class MockEyeDropper {
          async open() {
            return { sRGBHex: '#ff0000' };
          }
        }
      });

      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Eyedropper')).toBeInTheDocument();
      });
    });

    it('handles disabled state', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('SimpleColorPicker', () => {
    it('renders correctly with preset colors', () => {
      const mockOnChange = jest.fn();
      render(<SimpleColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      // Check for preset color buttons
      const colorButtons = screen.getAllByRole('button');
      expect(colorButtons.length).toBeGreaterThan(1);
    });

    it('displays selected color', () => {
      const mockOnChange = jest.fn();
      render(<SimpleColorPicker color="#ff0000" onColorChange={mockOnChange} />);
      
      const selectedButton = screen.getByRole('button', { pressed: true });
      expect(selectedButton).toHaveStyle('background-color: #ff0000');
    });

    it('calls onColorChange when preset color is clicked', () => {
      const mockOnChange = jest.fn();
      render(<SimpleColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const colorButtons = screen.getAllByRole('button');
      fireEvent.click(colorButtons[1]); // Click second color button
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('shows custom color input', () => {
      const mockOnChange = jest.fn();
      render(<SimpleColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      expect(screen.getByPlaceholderText('Enter color...')).toBeInTheDocument();
    });

    it('handles custom color input', () => {
      const mockOnChange = jest.fn();
      render(<SimpleColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Enter color...');
      fireEvent.change(input, { target: { value: '#ff0000' } });
      fireEvent.blur(input);
      
      expect(mockOnChange).toHaveBeenCalledWith('#ff0000');
    });
  });

  describe('GradientPicker', () => {
    it('renders correctly with default gradient', () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('linear-gradient(to right, #ff0000, #0000ff)')).toBeInTheDocument();
    });

    it('opens gradient picker when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('shows gradient type selector', async () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Linear')).toBeInTheDocument();
        expect(screen.getByText('Radial')).toBeInTheDocument();
      });
    });

    it('shows color stops', async () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Color Stops')).toBeInTheDocument();
      });
    });

    it('allows adding color stops', async () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const addButton = screen.getByText('Add Stop');
        fireEvent.click(addButton);
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('handles gradient direction change', async () => {
      const mockOnChange = jest.fn();
      render(<GradientPicker gradient="linear-gradient(to right, #ff0000, #0000ff)" onGradientChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const directionSelect = screen.getByText('to right');
        fireEvent.click(directionSelect);
        
        const toBottomOption = screen.getByText('to bottom');
        fireEvent.click(toBottomOption);
        
        expect(mockOnChange).toHaveBeenCalled();
      });
    });
  });

  describe('Common functionality', () => {
    it('handles keyboard navigation', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('closes picker when clicking outside', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      fireEvent.click(document.body);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('handles ESC key to close picker', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} className="custom-class" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when picker is open', async () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has proper labels for screen readers', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ffffff" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Open color picker');
    });

    it('provides color value to screen readers', () => {
      const mockOnChange = jest.fn();
      render(<ColorPicker color="#ff0000" onColorChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby');
      expect(screen.getByText('#ff0000')).toBeInTheDocument();
    });
  });

  describe('Form integration', () => {
    it('works with form validation', () => {
      const mockOnChange = jest.fn();
      
      render(
        <form>
          <ColorPicker color="#ffffff" onColorChange={mockOnChange} required />
        </form>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeValid();
    });

    it('handles form reset', () => {
      const mockOnChange = jest.fn();
      
      render(
        <form>
          <ColorPicker color="#ff0000" onColorChange={mockOnChange} />
          <button type="reset">Reset</button>
        </form>
      );
      
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      
      // Form reset should trigger appropriate behavior
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });
});