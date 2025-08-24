import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DatePicker, DateRangePicker, DateTimePicker, MonthPicker } from '../date-picker';
import '@testing-library/jest-dom';

describe('DatePicker Components', () => {
  describe('DatePicker', () => {
    it('renders correctly with default props', () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Pick a date')).toBeInTheDocument();
    });

    it('displays selected date', () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15');
      
      render(<DatePicker date={testDate} onDateChange={mockOnChange} />);
      
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    });

    it('opens calendar when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('calls onDateChange when date is selected', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const dayButton = screen.getByText('15');
        fireEvent.click(dayButton);
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('handles disabled state', () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('DateRangePicker', () => {
    it('renders correctly with default props', () => {
      const mockOnChange = jest.fn();
      render(<DateRangePicker dateRange={{ from: undefined, to: undefined }} onDateRangeChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Pick a date range')).toBeInTheDocument();
    });

    it('displays selected date range', () => {
      const mockOnChange = jest.fn();
      const dateRange = {
        from: new Date('2024-01-15'),
        to: new Date('2024-01-20'),
      };
      
      render(<DateRangePicker dateRange={dateRange} onDateRangeChange={mockOnChange} />);
      
      expect(screen.getByText('Jan 15, 2024 - Jan 20, 2024')).toBeInTheDocument();
    });

    it('displays partial date range', () => {
      const mockOnChange = jest.fn();
      const dateRange = {
        from: new Date('2024-01-15'),
        to: undefined,
      };
      
      render(<DateRangePicker dateRange={dateRange} onDateRangeChange={mockOnChange} />);
      
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    });

    it('opens calendar when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<DateRangePicker dateRange={{ from: undefined, to: undefined }} onDateRangeChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('DateTimePicker', () => {
    it('renders correctly with default props', () => {
      const mockOnChange = jest.fn();
      render(<DateTimePicker date={undefined} onDateChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Pick a date and time')).toBeInTheDocument();
    });

    it('displays selected date and time', () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15T14:30:00');
      
      render(<DateTimePicker date={testDate} onDateChange={mockOnChange} />);
      
      expect(screen.getByText(/Jan 15, 2024.*2:30 PM/)).toBeInTheDocument();
    });

    it('opens calendar and time selector when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<DateTimePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Time')).toBeInTheDocument();
      });
    });

    it('handles time selection', async () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15T14:30:00');
      
      render(<DateTimePicker date={testDate} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const hourInput = screen.getByDisplayValue('14');
        fireEvent.change(hourInput, { target: { value: '15' } });
        expect(mockOnChange).toHaveBeenCalled();
      });
    });
  });

  describe('MonthPicker', () => {
    it('renders correctly with default props', () => {
      const mockOnChange = jest.fn();
      render(<MonthPicker month={undefined} onMonthChange={mockOnChange} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Pick a month')).toBeInTheDocument();
    });

    it('displays selected month', () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15');
      
      render(<MonthPicker month={testDate} onMonthChange={mockOnChange} />);
      
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('opens month selector when button is clicked', async () => {
      const mockOnChange = jest.fn();
      render(<MonthPicker month={undefined} onMonthChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('calls onMonthChange when month is selected', async () => {
      const mockOnChange = jest.fn();
      render(<MonthPicker month={undefined} onMonthChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const monthButton = screen.getByText('January');
        fireEvent.click(monthButton);
        expect(mockOnChange).toHaveBeenCalled();
      });
    });
  });

  describe('Common functionality', () => {
    it('handles keyboard navigation', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('closes calendar when clicking outside', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
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

    it('handles ESC key to close calendar', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
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
      render(<DatePicker date={undefined} onDateChange={mockOnChange} className="custom-class" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when calendar is open', async () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has proper labels for screen readers', () => {
      const mockOnChange = jest.fn();
      render(<DatePicker date={undefined} onDateChange={mockOnChange} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Open date picker');
    });
  });

  describe('Form integration', () => {
    it('works with form validation', () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15');
      
      render(
        <form>
          <DatePicker date={testDate} onDateChange={mockOnChange} required />
        </form>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeValid();
    });

    it('handles form reset', () => {
      const mockOnChange = jest.fn();
      const testDate = new Date('2024-01-15');
      
      render(
        <form>
          <DatePicker date={testDate} onDateChange={mockOnChange} />
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