import { Button } from "./ui/button";
import { CampaignUser, CampaignUsersResponse } from "../types/campaigns";
import { Checkbox } from "./ui/checkbox";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { useIsMobile } from "../hooks/use-mobile";
import { User } from "lucide-react";
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
      id: "select",
      header: () => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              (employeesData?.results?.length || 0) > 0 && 
              selectedRows.size === (employeesData?.results?.length || 0)
            }
            onCheckedChange={(value) => {
              if (value) {
                const allIds = new Set(employeesData?.results?.map(emp => emp.id.toString()) || []);
                setSelectedRows(allIds);
              } else {
                setSelectedRows(new Set());
              }
            }}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={selectedRows.has(row.original.id.toString())}
            onCheckedChange={(value) => {
              const employeeId = row.original.id.toString();
              const newSelectedRows = new Set(selectedRows);
              if (value) {
                newSelectedRows.add(employeeId);
              } else {
                newSelectedRows.delete(employeeId);
              }
              setSelectedRows(newSelectedRows);
            }}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "employee",
      header: "Empleado",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <div className="flex items-center space-x-3">
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
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <Button
            variant="link"
            size="sm"
            onClick={() => onEmployeeSelect?.(row.original.id.toString())}
          >
            Ver
          </Button>
        );
      },
    },
  ];

  if (!isMobile) {
    columns = [
      columns[0],
      columns[1],
      {
        accessorKey: "login_id",
        header: "ID Login",
        cell: ({ row }) => row.original.user.external_id || row.original.id,
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
      columns[2],
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
