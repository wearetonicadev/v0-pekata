import { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { CampaignUser, CampaignUsersResponse } from "@/types/campaigns";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useCampaign } from "@/contexts/CampaignContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import { CampaignLink } from "@/components/ui/campaign-link";

export const EmployeesTable = ({ search }: { search: string }) => {
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
        search,
      },
    ],
    queryFn: () => {
      if (search) {
        const params = new URLSearchParams({
          campaign: campaignId?.toString() ?? "",
          q: search,
        });

        return api.get(`/admin/campaign-users/search?${params.toString()}`, {
          headers: {
            "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
          },
        });
      } else {
        const params = new URLSearchParams({
          page: (pagination.pageIndex + 1).toString(),
          campaign: campaignId?.toString() ?? "",
        });

        return api.get(`/admin/campaign-users?${params.toString()}`, {
          headers: {
            "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
          },
        });
      }
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
            <div className="size-8 bg-green-100 border border-[#D5EADE] rounded-full flex items-center justify-center">
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
          <Button variant="link" size="sm" asChild>
            <CampaignLink href={`/employees/${row.original.id}`}>
              Ver
            </CampaignLink>
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
