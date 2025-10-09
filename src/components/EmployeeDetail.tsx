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
import { CampaignLink } from "./ui/campaign-link";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface EmployeeDetailProps {
  employeeId: string;
  onEmployeeDeSelect?: () => void;
}

export function EmployeeDetail({ employeeId, onEmployeeDeSelect }: EmployeeDetailProps) {
  const { data, isLoading, error } = useQuery<
    AxiosResponse<CampaignUserDetail>,
    AxiosError,
    CampaignUserDetail
  >({
    queryKey: ["campaign-user", { id: employeeId }],
    queryFn: () => {
      return api.get(`/admin/campaign-users/${employeeId}/`);
    },
    select: ({ data }) => data,
  });

  const employeeName = `${data?.user.first_name} ${data?.user.last_name}`;

  const items = useMemo(() => {
    return data?.cart.lines ?? data?.sale_order?.lines ?? [];
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
    <div className="flex-1 p-0 md:py-6">
      <Breadcrumb className="text-[#4b5675] mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink to="/">Dashboard</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
            <Button
              variant="link"
              className={cn("max-h-max inline-block m-0 p-0 border-0 bg-transparent text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs font-normal leading-normal shadow-none outline-none hover:no-underline focus:outline-none focus:ring-0 focus:border-none disabled:pointer-events-auto disabled:opacity-100 whitespace-normal normal-case rounded-none")}
              onClick={()=> onEmployeeDeSelect?.()}
            >
              Empleados
            </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>{employeeName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button
        variant="link"
        className={cn("mb-4 text-[#4B5675] leading-none gap-1 bg-white hover:no-underline")}
        onClick={()=> onEmployeeDeSelect?.()}
      >
        <ArrowLeft className="text-[#4B5675]" /> Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <EmployeeProfile user={data.user} />

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs
            defaultValue="selection"
            className="rounded-md gap-0"
          >
            <TabsList className="bg-white rounded-b-[0] w-full pt-5 gap-[10px] h-[57px] border border-[#F1F1F4] pb-0">
              <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[3px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none" value="selection">Selección</TabsTrigger>
              <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[3px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none" value="shipment">Envío</TabsTrigger>
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
