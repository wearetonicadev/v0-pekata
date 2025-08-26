import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import api from "@/lib/axios";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  external_id: string | null;
  phone_number: string;
  subsidiary: string | null;
  work_center: string | null;
  language: string;
  is_admin: boolean;
  is_owner: boolean;
}

interface EmployeesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Employee[];
}

export const EmployeesTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: employeesData, isLoading } = useQuery<
    AxiosResponse<EmployeesResponse>,
    AxiosError,
    EmployeesResponse
  >({
    queryKey: ["employees", pagination.pageIndex + 1],
    queryFn: () => {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
      });

      return api.get(`/admin/employees?${params.toString()}`, {
        headers: {
          "X-Company-Slug": "tonica",
        },
      });
    },
    select: ({ data }) => data,
  });

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Empleado",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#4370a8]" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#191919]">
                {employee.first_name} {employee.last_name}
              </div>
              <div className="text-xs text-[#78829d]">ID: {employee.id}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <span className="text-sm text-[#191919]">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "phone_number",
      header: "Teléfono",
      cell: ({ getValue }) => (
        <span className="text-sm text-[#191919]">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "state",
      header: "Estado",
      cell: ({ getValue }) => {
        const state = getValue() as string;
        return (
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              state === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {state}
          </span>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <span className="text-sm text-[#191919]">
            {employee.is_admin
              ? "Admin"
              : employee.is_owner
              ? "Owner"
              : "Employee"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <Link href={`/employees/${employee.id}`}>
            <Button variant="link" size="sm" className="text-[#4370a8] p-0">
              Ver
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={employeesData?.results || []}
      rowCount={employeesData?.count || 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      loading={isLoading}
      emptyMessage="No hay empleados disponibles"
    />
  );
};
