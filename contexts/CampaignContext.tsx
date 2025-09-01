"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  Campaign,
  CampaignsResponse,
  CampaignTranslation,
} from "@/types/campaigns";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

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

export function CampaignProvider({ children }: CampaignProviderProps) {
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

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
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      }),
    select: ({ data }) => data,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (data) {
      setCurrentCampaign(data.results[0]);
      setCampaignId(data.results[0].id.toString());
    }
  }, [data]);

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        currentCampaign,
        isCampaignSelected,
        setCampaignId,
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

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
