import { EmployeesTable } from "../components/EmployeesTable";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { CampaignLink } from "../components/ui/campaign-link";
import { Sidebar } from "../components/Sidebar";
import { AxiosError, AxiosResponse } from "axios";
import { CampaignUsersResponse, CampaignExport, Campaign } from "../types/campaigns";
import { PaginationState } from "@tanstack/react-table";
import { useCampaign } from "../contexts/CampaignContext";
import { useSearch } from "../contexts/SearchContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { EmployeesFilter, FiltersData } from "@/components/EmployeesFilter";
import { AppliedFiltersBar } from "@/components/EmployeesFilter/AppliedFiltersBar";


export default function EmpleadosPage() {
  const { search } = useSearch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedFilters = Object.fromEntries(searchParams);

  // Handle employee selection
  const handleEmployeeSelect = (employeeId: string) => {
    navigate(`/employees/id/${employeeId}`);
  };

  const { campaignId } = useCampaign();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 16,
  });

  const handleDeleteUrlParam = (param: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(param);
    setSearchParams(newParams);
  }
  
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
        appliedFilters
      },
    ],
    queryFn: () => {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        campaign: campaignId?.toString() ?? "",
        ...appliedFilters,
      });

      return api.get(`/admin/campaign-users?${params.toString()}`);
    },
    select: ({ data }) => data,
    enabled: !!campaignId && !search,
  });

  const { data: filters, isLoading: isLoadingFilters } = useQuery<AxiosResponse<Campaign>, AxiosError, FiltersData>(
    {
      queryKey: [ campaignId],
      queryFn: () =>
        api.get(`/admin/campaigns/${campaignId}`),
      select: ({ data }) => ({
        work_centers: data.work_centers,
        products: data.predefined_lot_products,
        subsidiaries: data.subsidiaries,
      }),
      enabled: !!campaignId,
    }
  );

  const downloadMutation = useMutation<
    AxiosResponse<CampaignExport>,
    AxiosError,
    void
  >({
    mutationFn: () => {
      return api.get(`/admin/campaign-users/download-xlsx-summary/?campaign=${campaignId}`);
    },
    onSuccess: (response) => {
      const fileUrl = response.data.file_url;
      if (fileUrl) {
        // Crear un elemento <a> temporal para descargar
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.click();
      }
    },
  });

  const handleDownload = () => {
    downloadMutation.mutate();
  };

  return (
    <div className="py-4 md:px-0 md:py-6 mb-20">
      <div className="flex flex-row items-center justify-between mb-3 md:mb-20 h-[19px]">
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
          <div className="flex gap-4 flex-row items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#191919]">
                Empleados
              </h2>

              <h3 className="text-[#2E9858] text-[12px] md:text-[14px]">
                Mostrando {employeesData?.results?.length || 0} de{" "}
                {employeesData?.count} empleados
              </h3>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                disabled={downloadMutation.isPending || !campaignId || isLoadingEmployees}
                variant="outline"
                size="sm"
                className="font-normal px-2 flex items-center gap-1 border-black shadow-none text-xs"
                onClick={handleDownload}
              >
                <ArrowDown className="w-3 h-3" />
                {downloadMutation.isPending ? "Descargando..." : "Descargar"}
              </Button>
              <EmployeesFilter isDisabled={isLoadingFilters || !campaignId || isLoadingEmployees} filters={filters} />
            </div>
          </div>
          <AppliedFiltersBar appliedFilters={appliedFilters}  deleteUrlParam={handleDeleteUrlParam}/>
          <EmployeesTable
            setPagination={setPagination}
            pagination={pagination}
            employeesData={employeesData}
            isLoading={isLoadingEmployees}
            onEmployeeSelect={handleEmployeeSelect}
          />
        </div>
      </div>
    </div>
  );
}

