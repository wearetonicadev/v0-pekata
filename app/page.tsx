"use client";

import { AxiosResponse, AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { StatsResponse } from "@/types/stats";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ChartCard } from "@/app/components/ChartCard";
import { StatsList } from "@/app/components/StatsList";
import { TopProductsList } from "@/app/components/TopProductsList";
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

export default function Dashboard() {
  const { currentCampaign, campaignTranslation } = useCampaign();

  const { data, isLoading } = useQuery<
    AxiosResponse<StatsResponse>,
    AxiosError,
    StatsResponse
  >({
    queryKey: ["stats", currentCampaign?.id],
    queryFn: () =>
      api.get(`/admin/campaigns/${currentCampaign?.id}/stats/`, {
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

  return (
    <div className="flex-1 p-4 md:p-6 min-h-screen flex flex-col gap-4">
      <h2 className="text-lg md:text-xl font-semibold text-[#191919]">
        {campaignTranslation?.name}
      </h2>

      <StatsList
        items={[
          {
            value: 1456,
            subtitle: "Total de likes",
            icon: <Package />,
          },
          {
            value: 1456,
            subtitle: "Lotes seleccionados",
            percent: 45,
            icon: <PackagePlus />,
          },
          {
            value: 1456,
            subtitle: "Lotes personalizados",
            percent: 45,
            icon: <Gift />,
          },
          {
            value: 213,
            subtitle: "Donaciones",
            icon: <HandHeart />,
          },
          {
            value: 1456,
            subtitle: "Tokens autoasignados",
            icon: <Coins />,
          },
          {
            value: Number("4567").toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            }),
            subtitle: "Compras extras",
            icon: <CreditCard />,
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Compras por categoría" />

        <TopProductsList
          items={[
            {
              id: 1,
              brand: { name: "Canals Nubiola" },
              name: "Vino Blanco Seco Canals Nubiola",
              subtitle: "75 cl",
              main_image: { thumbnail_image_cache: "/images/logo-black.png" },
              unitsLabel: "234 uds",
              metricValue: 12,
            },
            {
              id: 2,
              brand: { name: "El Pulpo" },
              name: "Vino Blanco El Pulpo (DO Rías Baixas)",
              subtitle: "75 cl",
              main_image: { thumbnail_image_cache: "/images/logo-black.png" },
              unitsLabel: "234 uds",
              metricValue: 115,
            },
            {
              id: 3,
              brand: { name: "Provetto" },
              name: "Espumoso Provetto Rosado Seco",
              subtitle: "75 cl",
              main_image: { thumbnail_image_cache: "/images/logo-black.png" },
              unitsLabel: "234 uds",
              metricValue: 35,
            },
            {
              id: 4,
              brand: { name: "Zubia" },
              name: "Paté de Campagne Ecológico",
              subtitle: "100 gr",
              main_image: { thumbnail_image_cache: "/images/logo-black.png" },
              unitsLabel: "1.549 uds",
              metricValue: 30,
            },
            {
              id: 5,
              brand: { name: "Ibéricos Benito" },
              name: "12 sobres 100gr Plato Redondo de Jamón",
              subtitle: "1,2 kg",
              main_image: { thumbnail_image_cache: "/images/logo-black.png" },
              unitsLabel: "234 uds",
              metricValue: 775,
            },
          ]}
        />
      </div>

      <PendingTasks
        tasks={[
          {
            title: "Cambios de producto",
            value: 10,
            label: "empleados",
          },
          {
            title: "Peticiones pendientes",
            value: 10,
            label: "empleados",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShipmentsList
          shipments={[
            {
              id: "1",
              destination: "Madrid",
              batches: 10,
              status: "Enviado",
              deliveryDate: "2021-01-01",
            },
            {
              id: "2",
              destination: "Barcelona",
              batches: 10,
              status: "Enviado",
              deliveryDate: "2021-01-01",
            },
            {
              id: "3",
              destination: "Valencia",
              batches: 10,
              status: "Enviado",
              deliveryDate: "2021-01-01",
            },
            {
              id: "4",
              destination: "Sevilla",
              batches: 10,
              status: "Enviado",
              deliveryDate: "2021-01-01",
            },
            {
              id: "5",
              destination: "Málaga",
              batches: 10,
              status: "Enviado",
              deliveryDate: "2021-01-01",
            },
          ]}
        />
      </div>
    </div>
  );
}
