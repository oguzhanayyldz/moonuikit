"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export type SortDirection = "asc" | "desc" | null;

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "dark:text-gray-200",
        bordered: "border border-border dark:border-gray-700",
        striped: "dark:text-gray-200",
        card: "border border-border dark:border-gray-700 rounded-md shadow-sm dark:shadow-gray-900/20",
        minimal: "border-none dark:text-gray-200",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ColumnDefinition<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T>
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Veri yükleniyor durumunu gösterir */
  loading?: boolean;
  /** Sıralama için kullanılan sütun */
  sortColumn?: string;
  /** Sıralama yönü */
  sortDirection?: SortDirection;
  /** Sıralama değiştiğinde çağrılacak fonksiyon */
  onSortChange?: (column: string, direction: SortDirection) => void;
  /** Boş durum için özel içerik */
  emptyContent?: React.ReactNode;
  /** Seçili satır id'leri */
  selectedRowIds?: string[];
  /** Satır seçim değiştiğinde çağrılacak fonksiyon */
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
  /** Satır seçim devre dışı */
  disableRowSelection?: boolean;
  /** Her satır için benzersiz id çıkarma fonksiyonu */
  getRowId?: (row: T) => string;
}

// Tip parametresiz Table bileşeni için varsayılan tip, herhangi bir veri tipini kabul edebilmesi için
const Table = React.forwardRef<
  HTMLTableElement,
  TableProps<unknown>
>(({ 
  className, 
  variant, 
  size, 
  loading, 
  emptyContent,
  // Kullanılmayan özellikleri yoruma alarak lint uyarılarını önlüyoruz
  // sortColumn,
  // sortDirection,
  // onSortChange,
  // selectedRowIds,
  // onRowSelectionChange,
  // disableRowSelection,
  // getRowId,
  ...props 
}, ref) => {
  // Apply striped styles to the tbody via a class name
  const striped = variant === "striped";
  
  // Çocukları güvenli bir şekilde işle ve tip kontrollerini doğru yap
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === "tbody") {
        // Tip güvenliği için props'ları düzgün şekilde ele alıyoruz
        const tbodyProps = child.props as Record<string, unknown>;
        return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLTableSectionElement>>, {
          className: cn(tbodyProps.className as string | undefined, striped && "even:[&>tr]:bg-muted/50")
        });
      }
    }
    return child;
  });
  
  return (
    <div className="relative w-full overflow-auto">
      {/* Yükleniyor durumu için overlay */}
      {loading && (
        <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, size }),
          loading && "opacity-70",
          className
        )}
        {...props}
      >
        {childrenWithProps}
      </table>
      
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("moonui-theme", "[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Veri yoksa gösterilecek boş durum içeriği */
  emptyContent?: React.ReactNode;
  /** Varsayılan boş durum mesajı */
  emptyMessage?: string;
}

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, emptyContent, emptyMessage = "No data available", children, ...props }, ref) => {
  // Çocuk elementlerin varlığını kontrol et
  const hasChildren = React.Children.count(children) > 0;
  
  return (
    <tbody
      ref={ref}
      className={cn("moonui-theme", "[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {hasChildren ? (
        children
      ) : (
        <tr>
          <td colSpan={100} className="h-24 text-center">
            {emptyContent || (
              <div className="py-6 text-muted-foreground">
                <div className="text-sm">
                  {emptyMessage}
                </div>
              </div>
            )}
          </td>
        </tr>
      )}
    </tbody>
  )
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("moonui-theme", "bg-primary text-primary-foreground font-medium", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Bu sütun için sıralama durumu */
  sortable?: boolean;
  /** Bu sütunun sıralanma durumu */
  sorted?: SortDirection;
  /** Sıralama değiştiğinde çağrılacak fonksiyon */
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sorted, onSort, children, ...props }, ref) => {
    // Sıralama için simgeler
    const renderSortIcon = () => {
      if (!sortable) return null;
      
      if (sorted === "asc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      
      if (sorted === "desc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1 h-4 w-4 inline-block opacity-30"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    };
    
    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          sortable && "cursor-pointer hover:text-foreground select-none",
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center">
          {children}
          {sortable && renderSortIcon()}
        </div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("moonui-theme", "p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("moonui-theme", "mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

export type { TableBodyProps };
