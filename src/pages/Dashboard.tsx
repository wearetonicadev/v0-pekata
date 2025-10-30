import { AxiosResponse, AxiosError } from "axios";
import { Spinner } from "../components/ui/spinner";
import { Stats } from "../types/stats";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useCampaign } from "../contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { ChartCard } from "../components/ChartCard";
import { StatsList } from "../components/StatsList";
import { TopProductsList } from "../components/TopProductsList";
import { RefreshCcw } from "lucide-react";
import {
  Package,
  Gift,
  HandHeart,
  Coins,
  CreditCard,
} from "lucide-react";
import { PackageLockedIcon } from "@/components/icons/EmptyStateIcons";
import { PendingTasks } from "../components/PendingTasks";
import { ShipmentsList } from "../components/ShipmentsList";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { cn, translateIncidenceType, translateGoodIssueState } from "../lib/utils";
import { useMemo } from "react";

export default function Dashboard() {
  const { currentCampaign, campaignTranslation } = useCampaign();

  const { data, isLoading } = useQuery<AxiosResponse<Stats>, AxiosError, Stats>(
    {
      queryKey: ["stats", currentCampaign?.id],
      queryFn: () =>
        api.get(`/admin/campaigns/${currentCampaign?.id}/stats/`),
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
        api.get(`/admin/campaigns/${currentCampaign?.id}/stats/refresh/`),
    select: ({ data }) => data,
    enabled: !!currentCampaign?.id,
  });

  const nps = {
    percentages: useMemo(() => {
      // Solo devolver datos si hay encuestas realizadas
      if (!data?.total_survey_requests || Number(data.total_survey_requests) === 0) {
        return [];
      }
      
      return [
        { id: "Promotores", value: data?.nps_promoters ?? 0 },
        { id: "Pasivos", value: data?.nps_passives ?? 0 },
        { id: "Detractores", value: data?.nps_detractors ?? 0 },
      ];
    }, [data]),
    total_survey_requests: useMemo(() => data?.total_survey_requests, [data]),
    nps_score: useMemo(() => data?.nps_score, [data]),
    average_platform_score: useMemo(() => data?.average_platform_score, [data]),
  };

  const dateTimeFormat = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const getTotalDeliveredProducts = (
    goodsIssueStates: {
      goods_issue_state: string;
      n_goods_issues: number;
    }[] = []
  ): number => {
    return goodsIssueStates.reduce((sum, item) => sum + item.n_goods_issues, 0);
  };

  const getTotalIncidences = (
    incidences: { n_goods_issues: number }[] = []
  ): number => {
    return incidences.reduce((sum, item) => sum + item.n_goods_issues, 0);
  };

  const incidencePercentage =
    Math.floor(
      (getTotalIncidences(data?.incidences) * 100) /
        (getTotalDeliveredProducts(data?.goods_issue_states) +
          getTotalIncidences(data?.incidences))
    ) || 0;

  const incidences = useMemo(() => {
    // Solo mostrar datos si hay envíos o incidencias reales
    const totalDelivered = getTotalDeliveredProducts(data?.goods_issue_states);
    const totalIncidences = getTotalIncidences(data?.incidences);
    
    if (totalDelivered === 0 && totalIncidences === 0) {
      return [];
    }
    
    return [
      {
        id: translateIncidenceType("no-incidences"),
        value: totalDelivered,
      },
      ...(data?.incidences?.map((incidence) => ({
        id: translateIncidenceType(incidence.incidence_type, true),
        value: incidence.n_goods_issues,
      })) ?? []),
    ];
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="py-4 md:px-0 md:py-6 mb-20">
      <div className="flex flex-row items-center justify-between mb-3 md:mb-20 h-[19px]">
        <Breadcrumb className="text-[#666666] font-normal text-xs tracking-normal">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Dashboard</Link>
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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_4.5fr] gap-4 md:gap-8 lg:gap-12.5">
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
                value: data?.carts_closed_by_employee || 0,
                subtitle: "Lotes cerrados",
                percent:
                   data?.total_employees
                    ? Math.round(
                        (data.carts_closed_by_employee /
                          data.total_employees) *
                          100
                      )
                    : 0,
                icon: <PackageLockedIcon />,
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
                  ? Number(data?.extra_purchase_amount).toLocaleString(
                      "de-DE",
                      {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }
                    )
                  : "0€",
                subtitle: "Compras extras",
                icon: <CreditCard />,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard
              className="sales_chart"
              title="Compras por categoría"
              iconType="category"
              data={data?.main_categories?.map((category) => ({
                id: category.category.name,
                value: category.tokens,
              })) || []}
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
                items: [
                  {
                    label: "Pendientes",
                    value: data?.pending_product_change_requests || 0,
                  },
                  {
                    label: "Procesados",
                    value: data?.processed_product_change_requests || 0,
                  },
                  {
                    label: "Expirados",
                    value: data?.expired_product_change_requests || 0,
                  },
                ],
              },
              {
                title: "Datos de dirección faltantes",
                items: [
                  {
                    label: "Pendientes",
                    value: data?.pending_shipping_address_update_requests || 0,
                  },
                  {
                    label: "Procesadas",
                    value:
                      data?.processed_shipping_address_update_requests || 0,
                  },
                  {
                    label: "Expiradas",
                    value: data?.expired_shipping_address_update_requests || 0,
                  },
                ],
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              className="delivery_chart"
              iconType="delivery"
              htmlDescription={`Total lotes: <div class="bg-[#EAF5EE] text-[#1F503B] px-3 py-0.5 rounded-sm text-sm font-medium">${getTotalDeliveredProducts(
                data?.goods_issue_states
              )}<div>`}
              data={data?.goods_issue_states?.map((state) => ({
                id: translateGoodIssueState(state.goods_issue_state),
                value: state.n_goods_issues,
              })) || []}
              colors={[
                "hsl(248, 66%, 83%)",
                "hsl(90, 70%, 50%)",
                "hsl(144, 54%, 39%)",
                "hsl(213, 43%, 46%)",
                "hsl(0, 100%, 37%)",
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard
              className="incidents_chart"
              title="Incidencias"
              iconType="incidents"
              htmlDescription={`Incidencias respecto envíos: <div class="bg-[#F9E6E6] text-[#BF0000] px-3 py-0.5 rounded-sm text-sm font-medium">${incidencePercentage}%<div>`}
              data={incidences}
              colors={[
                "hsl(144, 34%, 82%)",
                "hsl(0, 100%, 37%)",
                "hsl(0, 100%, 37%)",
                "hsl(0, 100%, 37%)",
                "hsl(0, 100%, 37%)",
              ]}
            />

            <ChartCard
              title="Resultados encuesta"
              className="survey_chart"
              iconType="survey"
              data={nps.percentages}
              htmlDescription={`Total de encuestados: <div class="bg-[#EAF5EE] text-[#1F503B] px-3 py-0.5 rounded-sm text-sm font-medium">${nps.total_survey_requests}<div>`}
              colors={[
                "hsla(144, 54%, 39%, 1)",
                "hsla(40, 84%, 65%, 1)",
                "hsl(0, 100%, 37%)",
              ]}
              customLegends={[
                ...(nps.nps_score != null ? [`NPS = ${nps.nps_score}`] : []),
                ...(nps.average_platform_score != null
                  ? [`Nota promedio = ${nps.average_platform_score}`]
                  : []),
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
