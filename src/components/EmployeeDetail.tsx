import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Address } from "./Address";
import { AxiosResponse, AxiosError } from "axios";
import { CampaignUserDetail } from "../types/campaigns";
import { EmployeeProfile } from "./EmployeeProfile";
import { List } from "./List";
import { Payment } from "./Payment";
import { Shipment } from "./Shipment";
import { Spinner } from "./ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { getCompanySlugFromHost } from "../lib/utils";
import { CampaignLink } from "./ui/campaign-link";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface EmployeeDetailProps {
  employeeId: string;
}

export function EmployeeDetail({ employeeId }: EmployeeDetailProps) {
  const { data, isLoading, error } = useQuery<
    AxiosResponse<CampaignUserDetail>,
    AxiosError,
    CampaignUserDetail
  >({
    queryKey: ["campaign-user", { id: employeeId }],
    queryFn: () => {
      return api.get(`/admin/campaign-users/${employeeId}/`, {
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
    <div className="flex-1 p-6">
      <Breadcrumb className="text-[#4b5675] mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink to="/">Dashboard</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink to="/employees">Empleados</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>{employeeName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button variant="link" asChild className="mb-6 pl-0! text-[#4B5675]">
        <CampaignLink to="/employees">
          <ArrowLeft className="text-black" /> Volver
        </CampaignLink>
      </Button>

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
                      {items.length || 0} Items
                    </span>
                  </div>
                </div>

                <List items={items} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
