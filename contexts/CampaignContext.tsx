"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Suspense,
} from "react";
import {
  Campaign,
  CampaignsResponse,
  CampaignTranslation,
} from "@/types/campaigns";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { getCompanySlugFromHost } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

interface CampaignContextType {
  campaignId: string | null;
  currentCampaign: Campaign | null;
  isCampaignSelected: boolean;
  setCampaignId: (id: string | null) => void;
  setCurrentCampaign: (campaign: Campaign | null) => void;
  campaignTranslation: CampaignTranslation | null;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

interface CampaignProviderProps {
  children: ReactNode;
}

function CampaignProviderInner({ children }: CampaignProviderProps) {
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isCampaignSelected = currentCampaign !== null;

  const { data } = useQuery<
    AxiosResponse<CampaignsResponse>,
    AxiosError,
    CampaignsResponse
  >({
    queryKey: ["campaigns"],
    queryFn: () =>
      api.get(`/admin/campaigns/`, {
        headers: {
          "X-Company-Slug": getCompanySlugFromHost(),
        },
      }),
    select: ({ data }) => data,
    enabled: isAuthenticated,
  });

  // Initialize campaign from URL parameter or default to first campaign
  useEffect(() => {
    if (data) {
      const urlCampaignId = searchParams.get("campaign");

      if (urlCampaignId) {
        // Find campaign by ID from URL
        const campaign = data.results.find(
          (c) => c.id.toString() === urlCampaignId
        );
        if (campaign) {
          setCurrentCampaign(campaign);
          setCampaignId(campaign.id.toString());
        } else {
          // If campaign not found, use first campaign and update URL
          setCurrentCampaign(data.results[0]);
          setCampaignId(data.results[0].id.toString());
          updateUrlWithCampaign(data.results[0].id.toString());
        }
      } else {
        // No campaign in URL, use first campaign and update URL
        setCurrentCampaign(data.results[0]);
        setCampaignId(data.results[0].id.toString());
        updateUrlWithCampaign(data.results[0].id.toString());
      }
    }
  }, [data, searchParams]);

  // Update URL when campaign changes
  const updateUrlWithCampaign = (newCampaignId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("campaign", newCampaignId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Enhanced setCampaignId that also updates URL
  const handleSetCampaignId = (id: string | null) => {
    setCampaignId(id);
    if (id) {
      updateUrlWithCampaign(id);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        currentCampaign,
        isCampaignSelected,
        setCampaignId: handleSetCampaignId,
        setCurrentCampaign,
        campaignTranslation:
          currentCampaign?.translations.find(
            (translation) => translation.language === "es-ES"
          ) ?? null,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function CampaignProvider({ children }: CampaignProviderProps) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <CampaignProviderInner>{children}</CampaignProviderInner>
    </Suspense>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
