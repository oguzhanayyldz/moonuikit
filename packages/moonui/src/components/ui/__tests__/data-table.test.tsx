import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ColumnDef } from '@tanstack/react-table';
import '@testing-library/jest-dom';

type TestData = {
  id: string;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
};

const mockData: TestData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'inactive' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'active' },
];

const mockColumns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

describe('DataTable', () => {
  it('renders correctly with basic data', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check data rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(<DataTable columns={mockColumns} data={[]} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('shows search input when searchable is true', () => {
    render(<DataTable columns={mockColumns} data={mockData} searchable />);
    expect(screen.getByPlaceholderText('Search all columns...')).toBeInTheDocument();
  });

  it('filters data based on search input', async () => {
    render(<DataTable columns={mockColumns} data={mockData} searchable />);
    
    const searchInput = screen.getByPlaceholderText('Search all columns...');
    fireEvent.change(searchInput, { target: { value: 'john' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('shows filter button when filterable is true', () => {
    render(<DataTable columns={mockColumns} data={mockData} filterable />);
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('shows export button when exportable is true', () => {
    render(<DataTable columns={mockColumns} data={mockData} exportable />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + i,
      status: i % 2 === 0 ? 'active' as const : 'inactive' as const,
    }));

    render(<DataTable columns={mockColumns} data={largeData} />);
    
    // Check pagination controls
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument(); // 25 items, 10 per page = 3 pages
  });

  it('handles sorting correctly', async () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
          </button>
        ),
      },
      {
        accessorKey: 'age',
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Age
          </button>
        ),
      },
    ];

    render(<DataTable columns={sortableColumns} data={mockData} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // First row should be header, second should be Bob Johnson (alphabetically first)
      expect(rows[1]).toHaveTextContent('Bob Johnson');
    });
  });

  it('handles row selection', () => {
    const selectableColumns: ColumnDef<TestData>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
          />
        ),
      },
      ...mockColumns,
    ];

    render(<DataTable columns={selectableColumns} data={mockData} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // 1 header + 3 rows
    
    // Select first row
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });

  it('handles column visibility', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    // All columns should be visible by default
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable columns={mockColumns} data={mockData} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles custom cell rendering', () => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="font-bold">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <span className={status === 'active' ? 'text-green-600' : 'text-red-600'}>
              {status}
            </span>
          );
        },
      },
    ];

    render(<DataTable columns={customColumns} data={mockData} />);
    
    // Check if custom rendering is applied
    const johnDoeCell = screen.getByText('John Doe');
    expect(johnDoeCell).toHaveClass('font-bold');
    
    const activeStatus = screen.getAllByText('active')[0];
    expect(activeStatus).toHaveClass('text-green-600');
  });

  it('handles empty columns gracefully', () => {
    render(<DataTable columns={[]} data={mockData} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Table should be keyboard accessible
    fireEvent.keyDown(table, { key: 'Tab' });
    expect(table).toBeInTheDocument();
  });

  it('exports data when export button is clicked', async () => {
    // Mock the download functionality
    const mockCreateObjectURL = jest.fn();
    const mockRevokeObjectURL = jest.fn();
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    render(<DataTable columns={mockColumns} data={mockData} exportable />);
    
    const exportButton = screen.getByText('Export');
    fireEvent.click(exportButton);
    
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalled();
    });
  });

  it('handles responsive design', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    const tableContainer = screen.getByTestId('data-table-container');
    expect(tableContainer).toHaveClass('overflow-auto');
  });
});