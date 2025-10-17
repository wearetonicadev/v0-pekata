import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeDetail } from "../components/EmployeeDetail";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { CampaignLink } from "../components/ui/campaign-link";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { AxiosError, AxiosResponse } from "axios";
import { CampaignUsersResponse } from "../types/campaigns";
import { PaginationState } from "@tanstack/react-table";
import { useCampaign } from "../contexts/CampaignContext";
import { useSearch } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useSearchParams } from "react-router-dom";

export default function EmpleadosPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [selectedEmployeesCount, setSelectedEmployeesCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useSearch();

  // Check URL for employee ID on mount
  useEffect(() => {
    const employeeId = searchParams.get("id");
    if (employeeId) {
      setSelectedEmployeeId(employeeId);
    }
  }, [searchParams]);

  // Handle employee selection
  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setSearchParams({ id: employeeId });
  };

  const handleRemoveEmployeeSelect = () => {
    setSelectedEmployeeId(null);
    setSearchParams("");
  };

  const { campaignId } = useCampaign();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // const { data: employeesData, isLoading } = useQuery<
  //   AxiosResponse<CampaignUsersResponse>,
  //   AxiosError,
  //   CampaignUsersResponse
  // >({
  //   queryKey: [
  //     "campaign-users",
  //     {
  //       page: pagination.pageIndex + 1,
  //       campaignId,
  //       search,
  //     },
  //   ],
  //   queryFn: () => {
  //     if (search) {
  //       const params = new URLSearchParams({
  //         campaign: campaignId?.toString() ?? "",
  //         q: search,
  //       });

  //       return api.get(`/admin/campaign-users/search?${params.toString()}`, {
  //       });
  //     } else {
  //       const params = new URLSearchParams({
  //         page: (pagination.pageIndex + 1).toString(),
  //         campaign: campaignId?.toString() ?? "",
  //       });

  //       return api.get(`/admin/campaign-users?${params.toString()}`);
  //     }
  //   },
  //   select: ({ data }) => data,
  //   enabled: !!campaignId,
  // });


  // --- Non-search data ---
const {
  data: employeesData,
  isLoading: isLoadingEmployees,
} = useQuery<
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

    return api.get(`/admin/campaign-users?${params.toString()}`);
  },
  select: ({ data }) => data,
  enabled: !!campaignId && !search, // only runs when not searching
});


// const {
//   data: filteredEmployeesData,
//   isLoading: isLoadingFiltered,
// } = useQuery<
//   AxiosResponse<CampaignUsersResponse>,
//   AxiosError,
//   CampaignUsersResponse
// >({
//   queryKey: [
//     "campaign-users-search",
//     {
//       campaignId,
//       search,
//     },
//   ],
//   queryFn: () => {
//     const params = new URLSearchParams({
//       campaign: campaignId?.toString() ?? "",
//       q: search ?? "",
//     });

//     return api.get(`/admin/campaign-users/search?${params.toString()}`);
//   },
//   select: ({ data }) => data,
//   enabled: !!campaignId && !!search, // only runs when searching
// });




  // If an employee is selected, show the detail view
  if (selectedEmployeeId) {
    return <EmployeeDetail employeeId={selectedEmployeeId} onEmployeeDeSelect={handleRemoveEmployeeSelect} />;
  }

  return (
    <div className="py-4 md:px-0 md:py-6 mb-20">
      <div className="flex flex-row items-center justify-between mb-20 h-[19px]">
        <Breadcrumb className="text-[#4b5675]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <CampaignLink to="/">Dashboard</CampaignLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>Empleados</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_4.5fr] gap-4 md:gap-8 lg:gap-12.5">
        <Sidebar />

        <div className="flex-1  flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#191919]">
                Empleados
              </h2>

              <h3 className="text-[#2E9858] text-[14px]">
                Seleccionados {selectedEmployeesCount} de{" "}
                {employeesData?.count} empleados
              </h3>
            </div>
          </div>

          <EmployeesTable
            setPagination={setPagination}
            pagination={pagination}
            employeesData={employeesData}
            isLoading={isLoadingEmployees}
            onEmployeeSelect={handleEmployeeSelect}
            onSelectionChange={setSelectedEmployeesCount}
          />
        </div>
      </div>
    </div>
  );
}
