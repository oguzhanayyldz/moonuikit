"use client"

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a form input field or a component that looks like an input field.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-form">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email-form"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-form">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password-form"
            type="password"
            placeholder="••••••••"
            className="pl-10"
          />
        </div>
      </div>
      <Button className="w-full">Sign Up</Button>
    </div>
  ),
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label>Small</Label>
        <Input placeholder="Small input" className="h-8 text-sm" />
      </div>
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default input" />
      </div>
      <div className="space-y-2">
        <Label>Large</Label>
        <Input placeholder="Large input" className="h-12 text-lg" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default state" />
      </div>
      <div className="space-y-2">
        <Label>Focused</Label>
        <Input placeholder="Focused state" autoFocus />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled state" disabled />
      </div>
      <div className="space-y-2">
        <Label>Error</Label>
        <Input
          placeholder="Error state"
          className="border-red-500 focus:border-red-500 focus:ring-red-500"
        />
      </div>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const validateEmail = (value: string) => {
      if (!value) {
        setError('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };
    
    return (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="email-validation">Email</Label>
        <Input
          id="email-validation"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          className={error ? 'border-red-500' : ''}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
};