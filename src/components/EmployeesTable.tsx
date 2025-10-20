import { Button } from "./ui/button";
import { CampaignUser, CampaignUsersResponse } from "../types/campaigns";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { useIsMobile } from "../hooks/use-mobile";
import { User, Coins, } from "lucide-react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";


type EmployeesTable = {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  employeesData?: CampaignUsersResponse;
  isLoading: boolean;
  onEmployeeSelect?: (employeeId: string) => void;
  onSelectionChange?: (selectedCount: number) => void;
};

export const EmployeesTable = ({
  setPagination,
  pagination,
  employeesData,
  isLoading,
  onEmployeeSelect,
  onSelectionChange,
}: EmployeesTable) => {
  const isMobile = useIsMobile();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Notify parent component when selection changes
  useEffect(() => {
    onSelectionChange?.(selectedRows.size);
  }, [selectedRows, onSelectionChange]);

  // Clear selection when data changes (pagination, search, etc.)
  useEffect(() => {
    setSelectedRows(new Set());
  }, [employeesData?.results, pagination.pageIndex, pagination.pageSize]);

  let columns: ColumnDef<CampaignUser>[] = [
    {
      accessorKey: "employee",
      header: "Empleado",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <Button
            variant="link"
            className="flex items-center justify-items-start text-left space-x-3"
            onClick={() => onEmployeeSelect?.(row.original.id.toString())}
          >
              <div className="size-9 bg-[#F7FAF8] border border-[#D5EADE] rounded-full flex items-center justify-center">
              <User className="size-5 border border-[#1F503B] rounded-full" />
            </div>
            <div>
              <div className="text-normal font-medium text-[#000000]">
                {employee.user.first_name} {employee.user.last_name}
              </div>
              <div className="text-xs text-[#4D4D4D]">
                {employee.user.email}
              </div>
              <div className="text-xs text-[#4D4D4D]">
                {employee.user.external_id}
              </div>
            </div>
          </Button>
        );
      },
    },
  ];


  if (!isMobile) {
    columns = [
      columns[0],
      {
        accessorKey: "Tokens",
        header: "Tokens",
        cell: ({ row }) => {
          const employee = row.original; 
          return (
            <div className="flex items-end gap-1">
              <Coins width={15} />
              <div className="text-[10px]">{employee.consumed_tokens}/{employee.tokens}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "cart_status",
        header: "Estado carrito",
        cell: ({ row }) =>
          ({
            open: "Abierto",
            closed: "Cerrado",
            processed: "Procesado",
          }[row.original.cart_state]),
      },
      {
        accessorKey: "logistic_status",
        header: "Estado logístico",
        cell: ({ row }) =>
          ({
            shipped: "Enviado",
          }[row.original.logistic_state]),
      },
      {
        accessorKey: "incident",
        header: "Incidencia",
        cell: ({ row }) => (row.original.has_incidence ? "Si" : "No"),
      },
      {
        accessorKey: "request",
        header: "Petición",
        cell: ({ row }) => {
          return row.original.pending_requests.length > 0 ? "Si" : "No";
        },
      },
    ];
  }

  return (
    <DataTable
      columns={columns}
      data={employeesData?.results || []}
      emptyMessage="No hay empleados disponibles"
      loading={isLoading}
      onPaginationChange={setPagination}
      pagination={pagination}
      rowCount={employeesData?.count || 0}
      hasNext={!!employeesData?.next}
      hasPrevious={!!employeesData?.previous}
    />
  );
};
