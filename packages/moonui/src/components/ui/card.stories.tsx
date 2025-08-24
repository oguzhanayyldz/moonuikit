"use client"

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Bell, Check, X } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a card with header, content, and footer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithNotification: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Notifications</CardTitle>
        </div>
        <CardDescription>
          You have 3 unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">New comment on your post</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Your order has been shipped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Payment reminder</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Feature Request</CardTitle>
          <Badge variant="secondary">Open</Badge>
        </div>
        <CardDescription>
          Add dark mode support to the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Users have been requesting a dark mode option for better accessibility and reduced eye strain during night usage.
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-background"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-background"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-background"></div>
          </div>
          <span className="text-sm text-muted-foreground">+12 others</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
        <Button>
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="pb-3">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Product Image</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">Wireless Headphones</CardTitle>
        <CardDescription className="mt-2">
          High-quality wireless headphones with noise cancellation
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">$299</span>
          <Badge>In Stock</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold">$15,231.89</p>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>
          This card responds to hover and click events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Hover over this card to see the elevation effect, or click to interact with it.
        </p>
      </CardContent>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="w-[250px]">
          <CardHeader>
            <CardTitle>Card {index + 1}</CardTitle>
            <CardDescription>
              This is card number {index + 1}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Some content for card {index + 1}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards arranged in a responsive grid layout.',
      },
    },
  },
};