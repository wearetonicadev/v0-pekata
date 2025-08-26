import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pagination: PaginationState;
  onPaginationChange: (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  loading = false,
  emptyMessage = "No hay datos disponibles",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: {
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  return (
    <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2e9858] mx-auto mb-2"></div>
            <p className="text-sm text-[#78829d]">Cargando...</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f8f8f8] border-b border-[#e6e6e6]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-6 py-3 text-sm font-medium text-[#78829d]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#f1f1f4] hover:bg-[#f8f8f8]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-[#78829d]"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e6e6e6]">
          <div className="text-sm text-[#78829d]">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              rowCount
            )}{" "}
            de {rowCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!table.getCanPreviousPage() || loading}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from(
              { length: Math.min(table.getPageCount(), 5) },
              (_, i) => {
                let pageNum = i + 1;
                if (table.getPageCount() > 5) {
                  if (table.getState().pagination.pageIndex <= 2) {
                    pageNum = i + 1;
                  } else if (
                    table.getState().pagination.pageIndex >=
                    table.getPageCount() - 3
                  ) {
                    pageNum = table.getPageCount() - 4 + i;
                  } else {
                    pageNum = table.getState().pagination.pageIndex - 1 + i;
                  }
                }

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="sm"
                    className={
                      table.getState().pagination.pageIndex === pageNum - 1
                        ? "bg-[#4370a8] text-white border-[#4370a8]"
                        : ""
                    }
                    onClick={() => table.setPageIndex(pageNum - 1)}
                    disabled={loading}
                  >
                    {pageNum}
                  </Button>
                );
              }
            )}

            {table.getPageCount() > 5 &&
              table.getState().pagination.pageIndex <
                table.getPageCount() - 3 && (
                <span className="text-sm text-[#78829d]">...</span>
              )}

            <Button
              variant="outline"
              size="sm"
              disabled={!table.getCanNextPage() || loading}
              onClick={() => table.nextPage()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
