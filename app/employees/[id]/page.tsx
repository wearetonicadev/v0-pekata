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
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import Link from "next/link";

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
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      });
    },
    select: ({ data }) => data,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return "Error";
  }

  if (!data) {
    return "No details";
  }

  const employee = data;
  const employeeName = `${employee.user.first_name} ${employee.user.last_name}`;

  return (
    <div className="flex-1 p-6">
      <Breadcrumb className="text-[#4b5675] mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/employees">Empleados</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>{employeeName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <EmployeeProfile user={data.user} />

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs
            defaultValue="selection"
            className="border border-neutral-100 rounded-md p-4"
          >
            <TabsList className="w-full">
              <TabsTrigger value="selection">Selección</TabsTrigger>
              <TabsTrigger value="shipment">Envío</TabsTrigger>
            </TabsList>

            <TabsContent value="selection">
              <>
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold ">Carrito</h3>
                    <span className="text-sm text-gray-700">
                      {employee.cart?.lines?.length || 0} Items
                    </span>
                  </div>
                </div>

                <List items={employee.cart.lines} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Address {...data.cart.wallet_shipping_address} />
                  <Payment {...data.cart} />
                </div>
              </>
            </TabsContent>
            <TabsContent value="shipment">
              <Shipment />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
