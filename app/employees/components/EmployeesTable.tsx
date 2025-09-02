import { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { CampaignUser, CampaignUsersResponse } from "@/types/campaigns";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useCampaign } from "@/contexts/CampaignContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { User, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export const EmployeesTable = () => {
  const { campaignId } = useCampaign();
  const isMobile = useIsMobile();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: employeesData, isLoading } = useQuery<
    AxiosResponse<CampaignUsersResponse>,
    AxiosError,
    CampaignUsersResponse
  >({
    queryKey: [
      "campaign-users",
      {
        page: pagination.pageIndex + 1,
        campaignId,
      },
    ],
    queryFn: () => {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        campaign: campaignId?.toString() ?? "",
      });

      return api.get(`/admin/campaign-users?${params.toString()}`, {
        headers: {
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      });
    },
    select: ({ data }) => data,
    enabled: !!campaignId,
  });

  let columns: ColumnDef<CampaignUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
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
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#191919]">
                {employee.user.first_name} {employee.user.last_name}
              </div>
              <div className="text-xs text-[#78829d]">
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
          <Button variant="link" size="sm">
            <Link href={`/employees/${row.original.id}`}>Ver</Link>
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
          row.original.cart_state === "open" ? "Abierto" : "Cerrado",
      },
      {
        accessorKey: "logistic_status",
        header: "Estado logístico",
        cell: ({ row }) => row.original.logistic_state || "",
      },
      {
        accessorKey: "incident",
        header: "Incidencia",
        cell: ({ row }) => {
          return row.original.has_incidence ? "Si" : "No";
        },
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
    />
  );
};
