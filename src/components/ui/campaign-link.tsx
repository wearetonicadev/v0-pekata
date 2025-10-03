import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ComponentProps } from "react";

interface CampaignLinkProps extends ComponentProps<typeof Link> {
  to: string;
}

export function CampaignLink({ to, ...props }: CampaignLinkProps) {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaign");

  // Build the href with campaign parameter if it exists
  const toWithCampaign = campaignId
    ? `${to}${to.includes("?") ? "&" : "?"}campaign=${campaignId}`
    : to;

  return <Link to={toWithCampaign} {...props} />;
}
