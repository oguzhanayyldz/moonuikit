"use client"

import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker, DateTimePicker, MonthPicker } from './date-picker';
import { Label } from './label';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collection of date picker components for various date selection needs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      description: 'The selected date',
    },
    onDateChange: {
      description: 'Callback function when date changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Select Date</Label>
          <DatePicker 
            date={date} 
            onDateChange={setDate}
          />
        </div>
        {date && (
          <div className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString()}
          </div>
        )}
      </div>
    );
  },
};

export const WithoutDefaultDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Select Date</Label>
          <DatePicker 
            date={date} 
            onDateChange={setDate}
          />
        </div>
        {date && (
          <div className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString()}
          </div>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Disabled Date Picker</Label>
          <DatePicker 
            date={date} 
            onDateChange={setDate}
            disabled={true}
          />
        </div>
      </div>
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({ from: undefined, to: undefined });
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Select Date Range</Label>
          <DateRangePicker 
            dateRange={dateRange} 
            onDateRangeChange={setDateRange}
          />
        </div>
        {(dateRange.from || dateRange.to) && (
          <div className="text-sm text-muted-foreground">
            From: {dateRange.from?.toLocaleDateString() || 'Not selected'}<br />
            To: {dateRange.to?.toLocaleDateString() || 'Not selected'}
          </div>
        )}
      </div>
    );
  },
};

export const DateTime: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Select Date and Time</Label>
          <DateTimePicker 
            date={dateTime} 
            onDateChange={setDateTime}
          />
        </div>
        {dateTime && (
          <div className="text-sm text-muted-foreground">
            Selected: {dateTime.toLocaleString()}
          </div>
        )}
      </div>
    );
  },
};

export const MonthOnly: Story = {
  render: () => {
    const [month, setMonth] = useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Select Month</Label>
          <MonthPicker 
            month={month} 
            onMonthChange={setMonth}
          />
        </div>
        {month && (
          <div className="text-sm text-muted-foreground">
            Selected: {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        )}
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      birthDate: undefined as Date | undefined,
      eventDateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
      appointmentDateTime: undefined as Date | undefined,
      reportingMonth: undefined as Date | undefined,
    });
    
    return (
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2">
          <Label>Birth Date</Label>
          <DatePicker 
            date={formData.birthDate} 
            onDateChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Event Date Range</Label>
          <DateRangePicker 
            dateRange={formData.eventDateRange} 
            onDateRangeChange={(range) => setFormData(prev => ({ ...prev, eventDateRange: range }))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Appointment Date & Time</Label>
          <DateTimePicker 
            date={formData.appointmentDateTime} 
            onDateChange={(date) => setFormData(prev => ({ ...prev, appointmentDateTime: date }))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Reporting Month</Label>
          <MonthPicker 
            month={formData.reportingMonth} 
            onMonthChange={(month) => setFormData(prev => ({ ...prev, reportingMonth: month }))}
          />
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Form Data:</h3>
          <pre className="text-xs bg-muted p-2 rounded">
            {JSON.stringify(
              {
                birthDate: formData.birthDate?.toISOString(),
                eventDateRange: {
                  from: formData.eventDateRange.from?.toISOString(),
                  to: formData.eventDateRange.to?.toISOString(),
                },
                appointmentDateTime: formData.appointmentDateTime?.toISOString(),
                reportingMonth: formData.reportingMonth?.toISOString(),
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
};

export const CustomFormats: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Date with Custom Format</Label>
          <DatePicker 
            date={date} 
            onDateChange={setDate}
          />
        </div>
        {date && (
          <div className="space-y-2">
            <div className="text-sm">
              <strong>Different Formats:</strong>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>ISO: {date.toISOString().split('T')[0]}</div>
              <div>US: {date.toLocaleDateString('en-US')}</div>
              <div>UK: {date.toLocaleDateString('en-GB')}</div>
              <div>Long: {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
    const [dateRange, setDateRange] = useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({ from: new Date(), to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(new Date());
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Single Date</Label>
          <DatePicker 
            date={singleDate} 
            onDateChange={setSingleDate}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DateRangePicker 
            dateRange={dateRange} 
            onDateRangeChange={setDateRange}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Date & Time</Label>
          <DateTimePicker 
            date={dateTime} 
            onDateChange={setDateTime}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Month Only</Label>
          <MonthPicker 
            month={month} 
            onMonthChange={setMonth}
          />
        </div>
      </div>
    );
  },
};