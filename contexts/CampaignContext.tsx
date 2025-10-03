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
import { useCompanySlug } from "@/lib/hydration";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
  const companySlug = useCompanySlug();

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
          "X-Company-Slug": companySlug,
        },
      }),
    select: ({ data }) => data,
    enabled: isAuthenticated,
  });

  // Initialize campaign from URL parameter or default to first campaign
  useEffect(() => {
    if (data) {
      // Para exportación estática, siempre usar la primera campaña
      // No podemos usar searchParams en exportación estática
      setCurrentCampaign(data.results[0]);
      setCampaignId(data.results[0].id.toString());
    }
  }, [data]);

  // Update URL when campaign changes (simplified for static export)
  const updateUrlWithCampaign = (newCampaignId: string) => {
    // Para exportación estática, solo actualizar el estado
    // No podemos modificar la URL en exportación estática
    console.log(`Campaign changed to: ${newCampaignId}`);
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
