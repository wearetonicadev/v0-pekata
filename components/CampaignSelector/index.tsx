"use client";

import { AxiosError, AxiosResponse } from "axios";
import { Campaign, CampaignsResponse } from "@/types/campaigns";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useCampaign } from "@/contexts/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface CampaignComboboxProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  allowClear?: boolean;
}

export function CampaignCombobox({
  placeholder = "Select campaign...",
  disabled = false,
  className,
  multiple = false,
  selectedValues = [],
  onSelectedValuesChange,
  allowClear = false,
}: CampaignComboboxProps) {
  const { setCurrentCampaign, campaignId, setCampaignId } = useCampaign();

  const { data, isLoading, error, refetch } = useQuery<
    CampaignsResponse,
    AxiosError
  >({
    queryKey: ["campaigns"],
    queryFn: () =>
      api.get(`/admin/campaigns/`, {
        headers: {
          "X-Company-Slug": "tonica",
        },
      }),
  });

  const getCampaignName = (campaign: Campaign): string => {
    const spanishTranslation = campaign.translations.find(
      (translation) => translation.language === "es-ES"
    );

    return (
      spanishTranslation?.name ||
      campaign.translations[0]?.name ||
      campaign.code
    );
  };

  // Transform campaigns to combobox options
  const campaignOptions: ComboboxOption[] = (data?.results || []).map(
    (campaign) => ({
      value: campaign.id.toString(),
      label: getCampaignName(campaign),
      disabled: campaign.state !== "active", // Disable non-active campaigns
    })
  );

  // Handle value change
  const handleValueChange = (newValue: string) => {
    if (multiple) {
      // Handle multiple selection if needed
      return;
    }

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

  // Handle multiple values change
  const handleSelectedValuesChange = (newValues: string[]) => {
    if (onSelectedValuesChange) {
      onSelectedValuesChange(newValues);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">Error loading campaigns</p>
          <button
            onClick={() => refetch()}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Combobox
      options={campaignOptions}
      value={campaignId || ""}
      onValueChange={handleValueChange}
      placeholder={isLoading ? "Loading campaigns..." : placeholder}
      searchPlaceholder="Search campaigns..."
      emptyMessage="No campaigns found."
      disabled={disabled || isLoading}
      className={className}
      multiple={multiple}
      selectedValues={selectedValues}
      onSelectedValuesChange={handleSelectedValuesChange}
      allowClear={allowClear}
    />
  );
}
