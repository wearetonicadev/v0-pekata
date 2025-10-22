"use client";

import { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { Campaign, CampaignsResponse } from "@/types/campaigns";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";

interface CampaignComboboxProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const CampaignCombobox = ({
  disabled = false,
}: CampaignComboboxProps) => {
  const { setCurrentCampaign, campaignCode, setCampaignCode } = useCampaign();

  const { data, isLoading, error, refetch } = useQuery<
    AxiosResponse<CampaignsResponse>,
    AxiosError,
    CampaignsResponse
  >({
    queryKey: ["campaigns"],
    queryFn: () =>
      api.get(`/admin/campaigns/`),
    select: ({ data }) => data,
  });

  const getCampaignName = (campaign: Campaign): string => {
    const spanishTranslation = campaign.translations.find(
      (translation) => translation.language === "es-ES"
    );
    const name =
      spanishTranslation?.name ||
      campaign.translations[0]?.name ||
      campaign.code;

    const stateTranslation =
      {
        pending: "Pendiente",
        active: "Activa",
        inactive: "Inactiva",
        completed: "Completada",
        cancelled: "Cancelada",
        processing: "Procesando",
        reviewing: "Revisando",
      }[campaign.state] || campaign.state;

    return `${name} (${stateTranslation})`;
  };

  const campaignOptions: ComboboxOption[] = (data?.results || []).map(
    (campaign) => {
      const campaignName = getCampaignName(campaign);
      return {
        value: campaign.code.toString(),
        label: (
          <div className="flex flex-col">
            <span>{campaignName}</span>
            <span className="text-[10px] text-gray-400 leading-tight">{campaign.code}</span>
          </div>
        ),
        searchLabel: `${campaignName} ${campaign.code}`,
      };
    }
  );

  const handleValueChange = (newValue: string) => {
    if (newValue) {
      const selectedCampaign = data?.results.find(
        (campaign) => campaign.code.toString() === newValue
      );
      if (selectedCampaign) {
        setCurrentCampaign(selectedCampaign);
        setCampaignCode(newValue);
      }
    } else {
      setCurrentCampaign(null);
      setCampaignCode(null);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">
            Error al cargar las campañas
          </p>

          <Button
            onClick={() => refetch()}
            className={cn(
              "text-xs text-blue-600 hover:text-blue-800 underline"
            )}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Combobox
      options={campaignOptions}
      value={campaignCode || ""}
      onValueChange={handleValueChange}
      placeholder={isLoading ? "Cargando campañas..." : "Seleccionar campaña"}
      searchPlaceholder="Buscar campaña..."
      emptyMessage="No se encontraron campañas."
      disabled={disabled || isLoading}
      triggerClassName="md:max-w-[220px] h-[48px] font-normal"
    />
  );
};
