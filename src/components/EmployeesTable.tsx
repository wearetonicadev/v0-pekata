import { Button } from "./ui/button";
import { CampaignUser, CampaignUsersResponse } from "../types/campaigns";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { useIsMobile } from "../hooks/use-mobile";
import { User, Coins, } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { translateGoodIssueState } from "@/lib/utils";

type EmployeesTable = {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  employeesData?: CampaignUsersResponse;
  isLoading: boolean;
  onEmployeeSelect?: (employeeId: string) => void;
};

export const EmployeesTable = ({
  setPagination,
  pagination,
  employeesData,
  isLoading,
  onEmployeeSelect,
}: EmployeesTable) => {
  const isMobile = useIsMobile();

  let columns: ColumnDef<CampaignUser>[] = [
    {
      accessorKey: "employee",
      header: "Empleado",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <Button
            variant="link"
            className="flex items-center justify-items-start text-left space-x-3 hover:no-underline"
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
        accessorKey: "preparation_state",
        header: "Estado de preparación",
        cell: ({ row }) =>
          ({
            "shipped": "Enviado",
            "manually-cancelled": "Cancelado manualmente",
            "n.a.": "-",
          }[row.original.preparation_state]),
      },
      {
        accessorKey: "logistic_status",
        header: "Estado logístico",
        cell: ({ row }) =>
          translateGoodIssueState(row.original.logistic_state),
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
