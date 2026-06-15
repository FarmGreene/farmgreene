"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { EmptyIllustration } from "./ui/illustrations";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onRowClick?: (row: TData, event: React.MouseEvent) => void;
  emptyMessage?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  loading?: boolean;
  loadingRows?: number;
}

// Skeleton component for loading state
const TableSkeleton = ({
  columns,
  rows = 5,
  enableRowSelection = false,
}: {
  columns: ColumnDef<any>[];
  rows?: number;
  enableRowSelection?: boolean;
}) => {
  const skeletonColumns = enableRowSelection
    ? [createSelectionColumn(), ...columns]
    : columns;

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-${rowIndex}`} className="border-b">
          {skeletonColumns.map((column, colIndex) => (
            <TableCell
              key={`skeleton-cell-${rowIndex}-${colIndex}`}
              className="py-4"
            >
              <div className="flex items-center space-x-2">
                {enableRowSelection && colIndex === 0 ? (
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  />
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

// Helper function to create a selection column (only use when enableRowSelection is true)
export const createSelectionColumn = <TData,>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
});

const DataTable = <TData,>({
  data,
  columns,
  className,
  enableRowSelection = false,
  rowSelection = {},
  onRowSelectionChange,
  onRowClick,
  emptyMessage = "No results.",
  cellClassName,
  loading = false,
  loadingRows = 5,
}: DataTableProps<TData>) => {
  const tableColumns = React.useMemo(() => {
    if (enableRowSelection) {
      const hasSelectionColumn = columns.some(
        (col) => "id" in col && col.id === "select",
      );
      if (!hasSelectionColumn) {
        return [createSelectionColumn<TData>(), ...columns];
      }
    }
    return columns;
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection,
    state: {
      rowSelection,
    },
    onRowSelectionChange,
  });

  return (
    <Table className={cn("bg-gray rounded-lg", className)}>
      <TableHeader className={cn("border-none", className)}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-none bg-[#F5F5F580]">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="p-4">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableSkeleton
            columns={columns}
            rows={loadingRows}
            enableRowSelection={enableRowSelection}
          />
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                "border-none hover:bg-[#f5f5f5d9] last:border-b-0",
                index % 2 !== 0 && "bg-[#F5F5F580]",
                onRowClick && "cursor-pointer",
              )}
              onClick={
                onRowClick ? (e) => onRowClick(row.original, e) : () => {}
              }
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id} className={cn("p-4", cellClassName)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length}
              className="h-72 text-center p-8"
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <EmptyIllustration className="w-48 h-48 animate-in fade-in zoom-in duration-700" />
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-foreground">
                    {emptyMessage}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Try adjusting your search or filters to find what
                    you&apos;re looking for.
                  </p>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
