"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

interface CampaignLinkProps extends ComponentProps<typeof Link> {
  href: string;
}

export function CampaignLink({ href, ...props }: CampaignLinkProps) {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaign");

  // Build the href with campaign parameter if it exists
  const hrefWithCampaign = campaignId
    ? `${href}${href.includes("?") ? "&" : "?"}campaign=${campaignId}`
    : href;

  return <Link href={hrefWithCampaign} {...props} />;
}
