"use client";

import { AxiosResponse, AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Stats } from "@/types/stats";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ChartCard } from "@/app/components/ChartCard";
import { StatsList } from "@/app/components/StatsList";
import { TopProductsList } from "@/app/components/TopProductsList";
import { RefreshCcw } from "lucide-react";
import {
  Package,
  PackagePlus,
  Gift,
  HandHeart,
  Coins,
  CreditCard,
} from "lucide-react";
import { PendingTasks } from "@/app/components/PendingTasks";
import { ShipmentsList } from "@/app/components/ShipmentsList";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { currentCampaign, campaignTranslation } = useCampaign();

  const { data, isLoading } = useQuery<AxiosResponse<Stats>, AxiosError, Stats>(
    {
      queryKey: ["stats", currentCampaign?.id],
      queryFn: () =>
        api.get(`/admin/campaigns/${currentCampaign?.id}/stats/`, {
          headers: {
            "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
          },
        }),
      select: ({ data }) => data,
      enabled: !!currentCampaign?.id,
    }
  );

  const { refetch, isRefetching } = useQuery<
    AxiosResponse<Stats>,
    AxiosError,
    Stats
  >({
    queryKey: ["stats", currentCampaign?.id],
    queryFn: () =>
      api.get(`/admin/campaigns/${currentCampaign?.id}/stats/refresh/`, {
        headers: {
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      }),
    select: ({ data }) => data,
    enabled: !!currentCampaign?.id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const dateTimeFormat = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const translateGoodIssueState = (state: string) => {
    return (
      {
        processing: "En proceso",
        "partially-delivered": "Parcialmente entregado",
        delivered: "Entregado",
        shipped: "Enviado",
        incidence: "Incidencia",
        "in-parcel-shop": "En tienda postal",
      }[state] || state
    );
  };

  const translateIncidenceType = (type: string) => {
    return (
      {
        "goods-issue-line-wrong": "Productos equivocados",
        "goods-issue-line-broken": "Productos rotos",
        "goods-issue-line-expired": "Productos expirados",
      }[type] || type
    );
  };

  return (
    <div className="p-4 md:px-0 md:py-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <Breadcrumb className="text-[#666666] font-normal">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>{campaignTranslation?.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {data?.last_update_at && (
          <div className="hidden md:flex flex-row items-center gap-2 text-[#4D4D4D] text-xs">
            <RefreshCcw
              className={cn("size-[18px] cursor-pointer", {
                "animate-spin": isRefetching,
              })}
              onClick={() => refetch()}
            />{" "}
            Última actualización{" "}
            {dateTimeFormat.format(new Date(data.last_update_at))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
        <Sidebar />

        <div className="flex-1  flex flex-col gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#191919]">
            {campaignTranslation?.name}
          </h2>

          <StatsList
            items={[
              {
                value: data?.total_employees || 0,
                subtitle: "Total empleados",
                icon: <Package />,
              },
              {
                value: data?.carts_with_selected_products || 0,
                subtitle: "Lotes seleccionados",
                percent:
                  data?.carts_with_selected_products && data?.total_employees
                    ? Math.round(
                        (data.carts_with_selected_products /
                          data.total_employees) *
                          100
                      )
                    : 0,
                icon: <PackagePlus />,
              },
              {
                value: data?.carts_with_personalised_lot || 0,
                subtitle: "Lotes personalizados",
                percent:
                  data?.carts_with_personalised_lot && data?.total_employees
                    ? Math.round(
                        (data.carts_with_personalised_lot /
                          data.total_employees) *
                          100
                      )
                    : 0,
                icon: <Gift />,
              },
              {
                value: data?.carts_with_donation || 0,
                subtitle: "Donaciones",
                icon: <HandHeart />,
              },
              {
                value: data?.tokens_automatically_assigned || 0,
                subtitle: "Tokens autoasignados",
                icon: <Coins />,
              },
              {
                value: data?.extra_purchase_amount
                  ? Number(data.extra_purchase_amount).toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : "0,00 €",
                subtitle: "Compras extras",
                icon: <CreditCard />,
              },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard
              title="Compras por categoría"
              data={data?.main_categories.map((category) => ({
                id: category.category.name,
                value: category.tokens,
              }))}
            />

            <TopProductsList
              items={
                data?.main_products?.slice(0, 5).map((item) => ({
                  id: item.product.id,
                  brand: { name: item.product.brand },
                  name: item.product.name,
                  subtitle: item.product.subtitle,
                  main_image: {
                    thumbnail_image_cache: item.product.main_image,
                  },
                  unitsLabel: `${item.units} uds`,
                  metricValue: item.tokens,
                })) || []
              }
            />
          </div>

          <PendingTasks
            tasks={[
              {
                title: "Cambios de producto",
                value: data?.pending_product_change_requests || 0,
                label: "empleados",
              },
              {
                title: "Faltan datos de dirección",
                value: data?.pending_shipping_address_update_requests || 0,
                label: "empleados",
              },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShipmentsList
              shipments={
                data?.pallets?.slice(0, 5).map((pallet) => ({
                  id: pallet.id.toString(),
                  destination: pallet?.workcenter?.name,
                  batches: pallet?.n_goods_issues,
                  status:
                    pallet.state === "closed"
                      ? "Entregado"
                      : pallet.shipped_at
                      ? "Enviado"
                      : "En preparación",
                  deliveryDate: pallet.delivered_at
                    ? new Date(pallet.delivered_at).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )
                    : pallet.shipped_at
                    ? new Date(pallet.shipped_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })
                    : "Pendiente",
                })) || []
              }
              deliveryRatio={
                data?.work_center_delivery_ratio
                  ? Math.round(
                      parseFloat(data.work_center_delivery_ratio) * 100
                    )
                  : 0
              }
            />

            <ChartCard
              title="Envíos a domicilio"
              data={data?.goods_issue_states.map((state) => ({
                id: translateGoodIssueState(state.goods_issue_state),
                value: state.n_goods_issues,
              }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard
              title="Incidencias"
              data={data?.incidences.map((incidence) => ({
                id: translateIncidenceType(incidence.incidence_type),
                value: incidence.n_goods_issues,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
