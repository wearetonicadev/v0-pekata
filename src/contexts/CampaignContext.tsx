import {
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
} from "../types/campaigns";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuth } from "./AuthContext";

interface CampaignContextType {
  campaignCode: string | null;
  campaignId: string | null;
  currentCampaign: Campaign | null;
  isCampaignSelected: boolean;
  setCampaignCode: (code: string | null) => void;
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
  const [campaignCode, setCampaignCode] = useState<string | null>(null);
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
      api.get(`/admin/campaigns/`),
    select: ({ data }) => data,
    enabled: isAuthenticated,
  });

  const updateCampaignInStorage = (newCampaignCode: string) => {
    try {
      localStorage.setItem("campaign", newCampaignCode);
    } catch (e) {
      console.error("Failed to save campaign code:", e);
    }
  };
  
  useEffect(() => {
    if (data) {
      const urlCampaignCode = localStorage.getItem("campaign");

      if (urlCampaignCode) {
        const campaign = data.results.find(
          (c) => c.code.toString() === urlCampaignCode
        );
        if (campaign) {
          setCurrentCampaign(campaign);
          setCampaignCode(campaign.code.toString());
          setCampaignId(campaign.id.toString());
          updateCampaignInStorage(campaign.code.toString());
        } else {
          // If campaign not found, use first campaign and update LocalStorage
          setCurrentCampaign(data.results[0]);
          setCampaignCode(data.results[0]?.code.toString());
          setCampaignId(data.results[0]?.id.toString());
          updateCampaignInStorage(data.results[0]?.code.toString());
        }
      } else {
        // No campaign in URL, use first campaign and update LocalStorage
        setCurrentCampaign(data.results[0]);
        setCampaignCode(data.results[0]?.code.toString());
        setCampaignId(data.results[0]?.id.toString());
        updateCampaignInStorage(data.results[0]?.code.toString());
        
      }
    }
  }, [data]);

  const handleSetCampaignCode = (code: string | null) => {
    setCampaignCode(code);
    if (code) {
      updateCampaignInStorage(code);

      // keep ID in sync
      const campaign = data?.results.find((c) => c.code.toString() === code);
      if (campaign) {
        setCampaignId(campaign.id.toString());
      }
    } else {
      setCampaignId(null);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaignCode,
        campaignId,
        currentCampaign,
        isCampaignSelected,
        setCampaignCode: handleSetCampaignCode,
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
