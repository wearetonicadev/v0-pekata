"use client";

import { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { Campaign, CampaignsResponse } from "@/types/campaigns";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface CampaignComboboxProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const CampaignCombobox = ({
  disabled = false,
  className,
}: CampaignComboboxProps) => {
  const { setCurrentCampaign, campaignId, setCampaignId } = useCampaign();

  const { data, isLoading, error, refetch } = useQuery<
    AxiosResponse<CampaignsResponse>,
    AxiosError,
    CampaignsResponse
  >({
    queryKey: ["campaigns"],
    queryFn: () =>
      api.get(`/admin/campaigns/`, {
        headers: {
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      }),
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
    (campaign) => ({
      value: campaign.id.toString(),
      label: getCampaignName(campaign),
    })
  );

  const handleValueChange = (newValue: string) => {
    if (newValue) {
      const selectedCampaign = data?.results.find(
        (campaign) => campaign.id.toString() === newValue
      );
      if (selectedCampaign) {
        setCurrentCampaign(selectedCampaign);
        setCampaignId(newValue);
      }
    } else {
      setCurrentCampaign(null);
      setCampaignId(null);
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
            className="text-xs text-blue-600 hover:text-blue-800 underline"
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
      value={campaignId || ""}
      onValueChange={handleValueChange}
      placeholder={isLoading ? "Cargando campañas..." : "Seleccionar campaña"}
      searchPlaceholder="Buscar campaña..."
      emptyMessage="No se encontraron campañas."
      disabled={disabled || isLoading}
      triggerClassName="md:max-w-[250px] h-[48px] font-normal"
    />
  );
};
