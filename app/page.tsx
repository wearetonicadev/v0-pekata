"use client";

import { AxiosResponse, AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { StatsResponse } from "@/types/stats";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ChartCard } from "@/app/components/ChartCard";
import { StatsList } from "@/app/components/StatsList";
import {
  Package,
  PackagePlus,
  Gift,
  HandHeart,
  Coins,
  CreditCard,
} from "lucide-react";

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
        <ChartCard title="Compras por categoría" />
      </div>
    </div>
  );
}
