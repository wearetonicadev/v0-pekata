"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Address } from "@/app/employees/components/Address";
import { AxiosResponse, AxiosError } from "axios";
import { CampaignUserDetail } from "@/types/campaigns";
import { EmployeeProfile } from "@/app/employees/components/EmployeeProfile";
import { List } from "@/app/employees/components/List";
import { Payment } from "@/app/employees/components/Payment";
import { Shipment } from "@/app/employees/components/Shipment";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { getCompanySlugFromHost } from "@/lib/utils";
import { CampaignLink } from "@/components/ui/campaign-link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading, error } = useQuery<
    AxiosResponse<CampaignUserDetail>,
    AxiosError,
    CampaignUserDetail
  >({
    queryKey: ["campaign-user", { id }],
    queryFn: () => {
      return api.get(`/admin/campaign-users/${id}/`, {
        headers: {
          "X-Company-Slug": getCompanySlugFromHost(),
        },
      });
    },
    select: ({ data }) => data,
  });

  const employeeName = `${data?.user.first_name} ${data?.user.last_name}`;

  const items = useMemo(() => {
    return data?.cart.lines ?? data?.sale_order?.lines;
  }, [data?.cart.lines, data?.sale_order?.lines]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return (
      <div className="flex-1 p-6">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Hubo un error al cargar los datos</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex-1 p-0 md:p-6">
      <Breadcrumb className="text-[#4b5675] mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink href="/">Dashboard</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink href="/employees">Empleados</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>{employeeName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button variant="link" asChild className="mb-6 pl-0! text-[#4B5675]">
        <CampaignLink href="/employees">
          <ArrowLeft className="text-black" /> Volver
        </CampaignLink>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <EmployeeProfile user={data.user} />

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs
            defaultValue="selection"
            className="rounded-md gap-0"
          >
            <TabsList className="bg-white rounded-b-[0] w-full pt-5 gap-[10px] h-10 border border-[#F1F1F4]">
              <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[2px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none" value="selection">Selección</TabsTrigger>
              <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[2px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none" value="shipment">Envío</TabsTrigger>
            </TabsList>

            <TabsContent value="selection">
              <>
                <div className="p-5 px-5 md:pl-8 bg-white border border-[#F1F1F4] border-y-[0]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold ">Carrito</h3>
                    <span className="text-sm text-gray-700">
                      {items.length || 0} Items
                    </span>
                  </div>
                </div>

                <List items={items} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#FCFCFC] mt-5">
                  <Address {...data.cart.wallet_shipping_address} />
                  <Payment {...data.cart} />
                </div>
              </>
            </TabsContent>
            <TabsContent value="shipment">
              <Shipment shipments={data.goods_issues} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
