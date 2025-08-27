"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Campaign, CampaignsResponse } from "@/types/campaigns";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface CampaignContextType {
  currentCampaign: Campaign | null;
  setCurrentCampaign: (campaign: Campaign | null) => void;
  campaignId: string | null;
  setCampaignId: (id: string | null) => void;
  isCampaignSelected: boolean;
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

  const isCampaignSelected = currentCampaign !== null;

  const { data } = useQuery<CampaignsResponse>({
    queryKey: ["campaigns"],
    queryFn: () =>
      api.get(`/admin/campaigns/`, {
        headers: {
          "X-Company-Slug": "tonica",
        },
      }),
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
        currentCampaign,
        setCurrentCampaign,
        campaignId,
        setCampaignId,
        isCampaignSelected,
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
