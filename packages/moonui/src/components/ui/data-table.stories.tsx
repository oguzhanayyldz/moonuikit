"use client"

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Button } from './button';
import { MoreHorizontal, ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

// Sample data types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'out_of_stock' | 'discontinued';
};

// Sample data
const userData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-15',
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2023-02-20',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: '2023-03-10',
    lastLogin: '2024-01-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'user',
    status: 'pending',
    createdAt: '2023-04-05',
    lastLogin: '2024-01-12',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2023-05-01',
    lastLogin: '2024-01-11',
  },
];

const productData: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    status: 'available',
  },
  {
    id: '2',
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 89.99,
    stock: 0,
    status: 'out_of_stock',
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 159.99,
    stock: 23,
    status: 'available',
  },
  {
    id: '4',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 19.99,
    stock: 100,
    status: 'available',
  },
  {
    id: '5',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 49.99,
    stock: 0,
    status: 'discontinued',
  },
];

// User columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant={role === 'admin' ? 'admin' : 'secondary'}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'active'
              ? 'success'
              : status === 'inactive'
              ? 'secondary'
              : 'outline'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

// Product columns
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return <Badge variant="outline">{category}</Badge>;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'available'
              ? 'default'
              : status === 'out_of_stock'
              ? 'secondary'
              : 'outline'
          }
        >
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful data table component with sorting, filtering, and pagination.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Column definitions for the table',
    },
    data: {
      description: 'Data to display in the table',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable column filtering',
    },
    exportable: {
      control: 'boolean',
      description: 'Enable data export',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: userColumns,
    data: userData,
  },
};

export const WithSearch: Story = {
  args: {
    columns: userColumns,
    data: userData,
    searchable: true,
  },
};

export const WithFilters: Story = {
  args: {
    columns: userColumns,
    data: userData,
    searchable: true,
    filterable: true,
  },
};

export const WithExport: Story = {
  args: {
    columns: userColumns,
    data: userData,
    searchable: true,
    filterable: true,
    exportable: true,
  },
};

export const ProductTable: Story = {
  args: {
    columns: productColumns,
    data: productData,
    searchable: true,
    filterable: true,
  },
};

export const LargeDataset: Story = {
  args: {
    columns: userColumns,
    data: Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['admin', 'user', 'moderator'][i % 3] as 'admin' | 'user' | 'moderator',
      status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
      createdAt: new Date(2023, Math.floor(i / 12), (i % 30) + 1).toISOString().split('T')[0],
      lastLogin: new Date(2024, 0, (i % 15) + 1).toISOString().split('T')[0],
    })),
    searchable: true,
    filterable: true,
    exportable: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns: userColumns,
    data: [],
    searchable: true,
    filterable: true,
  },
};

export const SingleRow: Story = {
  args: {
    columns: userColumns,
    data: [userData[0]],
    searchable: true,
  },
};

export const CustomPageSize: Story = {
  args: {
    columns: productColumns,
    data: productData,
    searchable: true,
    filterable: true,
    // Custom page size would be handled by the DataTable component
  },
};

export const CompactTable: Story = {
  args: {
    columns: productColumns.map(col => ({
      ...col,
      // Add compact styling
    })),
    data: productData,
    searchable: true,
    // Compact prop would be handled by the DataTable component
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role = row.getValue('role') as string;
          return (
            <Badge
              variant={role === 'admin' ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => alert(`Role: ${role}`)}
            >
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <Badge
              variant={
                status === 'active'
                  ? 'default'
                  : status === 'inactive'
                  ? 'secondary'
                  : 'outline'
              }
              className="cursor-pointer"
              onClick={() => alert(`Status: ${status}`)}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert(`Edit user: ${user.name}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert(`Delete user: ${user.name}`)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Click on badges or action buttons to see interactions
        </div>
        <DataTable
          columns={columns}
          data={userData}
          searchable={true}
          filterable={true}
          exportable={true}
        />
      </div>
    );
  },
};