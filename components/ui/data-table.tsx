import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

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
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  loading = false,
  emptyMessage = "No hay datos disponibles",
  hasNext = false,
  hasPrevious = false,
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pagination.pageIndex]);

  return (
    <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden relative">
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
            {loading ? (
              Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr
                  key={`skeleton-row-${rowIndex}`}
                  className="border-b border-[#f1f1f4]"
                >
                  {columns.map((_, colIndex) => (
                    <td
                      key={`skeleton-cell-${rowIndex}-${colIndex}`}
                      className="py-4 md:px-6"
                    >
                      <Skeleton
                        className={`h-4 ${
                          colIndex % 3 === 0
                            ? "w-3/4"
                            : colIndex % 3 === 1
                            ? "w-1/2"
                            : "w-2/3"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#f1f1f4] hover:bg-[#f8f8f8]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 md:px-6">
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

      {!loading && table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#e6e6e6]">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPrevious || loading}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={!hasNext || loading}
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
