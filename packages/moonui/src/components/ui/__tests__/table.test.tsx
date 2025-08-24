import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../table'

describe('Table Components', () => {
  describe('Table Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Table data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toBeInTheDocument()
        expect(table).toHaveClass('w-full', 'caption-bottom', 'text-sm')
      })

      it('applies custom className', () => {
        render(
          <Table className="custom-table" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('custom-table')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLTableElement>()
        render(
          <Table ref={ref} data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        expect(ref.current).toBeInstanceOf(HTMLTableElement)
      })

      it('maintains displayName', () => {
        expect(Table.displayName).toBe('Table')
      })
    })

    describe('Variants', () => {
      it('renders default variant correctly', () => {
        render(
          <Table variant="default" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('dark:text-gray-200')
      })

      it('renders bordered variant correctly', () => {
        render(
          <Table variant="bordered" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('border', 'border-border', 'dark:border-gray-700')
      })

      it('renders striped variant correctly', () => {
        render(
          <Table variant="striped" data-testid="table">
            <TableBody data-testid="tbody">
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('dark:text-gray-200')
        
        // TableBody should have the striped class applied
        const tbody = screen.getByTestId('tbody')
        expect(tbody).toHaveClass('[&_tr:last-child]:border-0')
      })

      it('renders card variant correctly', () => {
        render(
          <Table variant="card" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('border', 'border-border', 'dark:border-gray-700', 'rounded-md', 'shadow-sm')
      })

      it('renders minimal variant correctly', () => {
        render(
          <Table variant="minimal" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('border-none', 'dark:text-gray-200')
      })
    })

    describe('Sizes', () => {
      it('renders sm size correctly', () => {
        render(
          <Table size="sm" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('text-xs')
      })

      it('renders default size correctly', () => {
        render(
          <Table size="default" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('text-sm')
      })

      it('renders lg size correctly', () => {
        render(
          <Table size="lg" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('text-base')
      })
    })

    describe('Loading State', () => {
      it('shows loading spinner when loading', () => {
        render(
          <Table loading data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const spinner = document.querySelector('.animate-spin')
        expect(spinner).toBeInTheDocument()
        
        const table = screen.getByTestId('table')
        expect(table).toHaveClass('opacity-70')
      })

      it('does not show loading spinner when not loading', () => {
        render(
          <Table data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const spinner = document.querySelector('.animate-spin')
        expect(spinner).not.toBeInTheDocument()
      })
    })

    describe('Empty Content', () => {
      it('shows empty content when no children', () => {
        render(<Table emptyContent="No data available" />)
        
        expect(screen.getByText('No data available')).toBeInTheDocument()
      })

      it('does not show empty content when has children', () => {
        render(
          <Table emptyContent="No data available">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        expect(screen.queryByText('No data available')).not.toBeInTheDocument()
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        render(
          <Table id="test-table" role="table" data-testid="table">
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
        
        const table = screen.getByTestId('table')
        expect(table).toHaveAttribute('id', 'test-table')
        expect(table).toHaveAttribute('role', 'table')
      })
    })
  })

  describe('TableHeader Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <TableHeader data-testid="header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </table>
      )
      
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
      expect(header.tagName).toBe('THEAD')
    })

    it('applies custom className', () => {
      render(
        <table>
          <TableHeader className="custom-header" data-testid="header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </table>
      )
      
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('custom-header')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableSectionElement>()
      render(
        <table>
          <TableHeader ref={ref} data-testid="header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement)
    })

    it('maintains displayName', () => {
      expect(TableHeader.displayName).toBe('TableHeader')
    })
  })

  describe('TableBody Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <TableBody data-testid="body">
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </table>
      )
      
      const body = screen.getByTestId('body')
      expect(body).toBeInTheDocument()
      expect(body.tagName).toBe('TBODY')
    })

    it('applies custom className', () => {
      render(
        <table>
          <TableBody className="custom-body" data-testid="body">
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </table>
      )
      
      const body = screen.getByTestId('body')
      expect(body).toHaveClass('custom-body')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableSectionElement>()
      render(
        <table>
          <TableBody ref={ref} data-testid="body">
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement)
    })

    it('maintains displayName', () => {
      expect(TableBody.displayName).toBe('TableBody')
    })
  })

  describe('TableFooter Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <TableFooter data-testid="footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </table>
      )
      
      const footer = screen.getByTestId('footer')
      expect(footer).toBeInTheDocument()
      expect(footer.tagName).toBe('TFOOT')
      expect(footer).toHaveClass('bg-primary', 'text-primary-foreground', 'font-medium')
    })

    it('applies custom className', () => {
      render(
        <table>
          <TableFooter className="custom-footer" data-testid="footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </table>
      )
      
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('custom-footer')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableSectionElement>()
      render(
        <table>
          <TableFooter ref={ref} data-testid="footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement)
    })

    it('maintains displayName', () => {
      expect(TableFooter.displayName).toBe('TableFooter')
    })
  })

  describe('TableRow Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <tbody>
            <TableRow data-testid="row">
              <TableCell>Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      )
      
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.tagName).toBe('TR')
      expect(row).toHaveClass('border-b', 'transition-colors', 'hover:bg-muted/50')
    })

    it('applies custom className', () => {
      render(
        <table>
          <tbody>
            <TableRow className="custom-row" data-testid="row">
              <TableCell>Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      )
      
      const row = screen.getByTestId('row')
      expect(row).toHaveClass('custom-row')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableRowElement>()
      render(
        <table>
          <tbody>
            <TableRow ref={ref} data-testid="row">
              <TableCell>Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableRowElement)
    })

    it('maintains displayName', () => {
      expect(TableRow.displayName).toBe('TableRow')
    })
  })

  describe('TableHead Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead data-testid="head">Header</TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      expect(head).toBeInTheDocument()
      expect(head.tagName).toBe('TH')
      expect(head).toHaveClass('h-10', 'px-4', 'text-left', 'align-middle', 'font-medium', 'text-muted-foreground')
    })

    it('renders sortable head correctly', () => {
      const onSort = jest.fn()
      render(
        <table>
          <thead>
            <tr>
              <TableHead sortable onSort={onSort} data-testid="head">
                Sortable Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      expect(head).toHaveClass('cursor-pointer', 'hover:text-foreground', 'select-none')
      
      // Check for sort icon
      const sortIcon = head.querySelector('svg')
      expect(sortIcon).toBeInTheDocument()
      expect(sortIcon).toHaveClass('opacity-30')
    })

    it('handles sort click', () => {
      const onSort = jest.fn()
      render(
        <table>
          <thead>
            <tr>
              <TableHead sortable onSort={onSort} data-testid="head">
                Sortable Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      fireEvent.click(head)
      expect(onSort).toHaveBeenCalledTimes(1)
    })

    it('shows ascending sort icon', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead sortable sorted="asc" data-testid="head">
                Sorted Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      const sortIcon = head.querySelector('svg')
      expect(sortIcon).toBeInTheDocument()
      expect(sortIcon).not.toHaveClass('opacity-30')
    })

    it('shows descending sort icon', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead sortable sorted="desc" data-testid="head">
                Sorted Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      const sortIcon = head.querySelector('svg')
      expect(sortIcon).toBeInTheDocument()
      expect(sortIcon).not.toHaveClass('opacity-30')
    })

    it('applies custom className', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead className="custom-head" data-testid="head">
                Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      const head = screen.getByTestId('head')
      expect(head).toHaveClass('custom-head')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableCellElement>()
      render(
        <table>
          <thead>
            <tr>
              <TableHead ref={ref} data-testid="head">
                Header
              </TableHead>
            </tr>
          </thead>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement)
    })

    it('maintains displayName', () => {
      expect(TableHead.displayName).toBe('TableHead')
    })
  })

  describe('TableCell Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell data-testid="cell">Cell</TableCell>
            </tr>
          </tbody>
        </table>
      )
      
      const cell = screen.getByTestId('cell')
      expect(cell).toBeInTheDocument()
      expect(cell.tagName).toBe('TD')
      expect(cell).toHaveClass('p-4', 'align-middle')
    })

    it('applies custom className', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell className="custom-cell" data-testid="cell">
                Cell
              </TableCell>
            </tr>
          </tbody>
        </table>
      )
      
      const cell = screen.getByTestId('cell')
      expect(cell).toHaveClass('custom-cell')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableCellElement>()
      render(
        <table>
          <tbody>
            <tr>
              <TableCell ref={ref} data-testid="cell">
                Cell
              </TableCell>
            </tr>
          </tbody>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement)
    })

    it('maintains displayName', () => {
      expect(TableCell.displayName).toBe('TableCell')
    })
  })

  describe('TableCaption Component', () => {
    it('renders correctly with default props', () => {
      render(
        <table>
          <TableCaption data-testid="caption">Table Caption</TableCaption>
        </table>
      )
      
      const caption = screen.getByTestId('caption')
      expect(caption).toBeInTheDocument()
      expect(caption.tagName).toBe('CAPTION')
      expect(caption).toHaveClass('mt-4', 'text-sm', 'text-muted-foreground')
    })

    it('applies custom className', () => {
      render(
        <table>
          <TableCaption className="custom-caption" data-testid="caption">
            Caption
          </TableCaption>
        </table>
      )
      
      const caption = screen.getByTestId('caption')
      expect(caption).toHaveClass('custom-caption')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableCaptionElement>()
      render(
        <table>
          <TableCaption ref={ref} data-testid="caption">
            Caption
          </TableCaption>
        </table>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement)
    })

    it('maintains displayName', () => {
      expect(TableCaption.displayName).toBe('TableCaption')
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete table with all components', () => {
      render(
        <Table variant="bordered" size="lg" data-testid="table">
          <TableCaption>Complete table example</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead sortable sorted="asc">Name</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>25</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )
      
      expect(screen.getByText('Complete table example')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.getByText('Total')).toBeInTheDocument()
    })

    it('handles striped variant with tbody', () => {
      render(
        <Table variant="striped" data-testid="table">
          <TableBody data-testid="tbody">
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
      
      const table = screen.getByTestId('table')
      expect(table).toHaveClass('dark:text-gray-200')
      
      const tbody = screen.getByTestId('tbody')
      expect(tbody).toHaveClass('[&_tr:last-child]:border-0')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty table', () => {
      render(<Table data-testid="table" />)
      
      const table = screen.getByTestId('table')
      expect(table).toBeInTheDocument()
    })

    it('handles table without tbody', () => {
      render(
        <Table data-testid="table">
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      )
      
      const table = screen.getByTestId('table')
      expect(table).toBeInTheDocument()
    })

    it('passes through HTML attributes for all components', () => {
      render(
        <Table id="table" data-testid="table">
          <TableHeader id="header" data-testid="header">
            <TableRow id="header-row" data-testid="header-row">
              <TableHead id="head" data-testid="head">Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody id="body" data-testid="body">
            <TableRow id="body-row" data-testid="body-row">
              <TableCell id="cell" data-testid="cell">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
      
      expect(screen.getByTestId('table')).toHaveAttribute('id', 'table')
      expect(screen.getByTestId('header')).toHaveAttribute('id', 'header')
      expect(screen.getByTestId('header-row')).toHaveAttribute('id', 'header-row')
      expect(screen.getByTestId('head')).toHaveAttribute('id', 'head')
      expect(screen.getByTestId('body')).toHaveAttribute('id', 'body')
      expect(screen.getByTestId('body-row')).toHaveAttribute('id', 'body-row')
      expect(screen.getByTestId('cell')).toHaveAttribute('id', 'cell')
    })
  })
})
