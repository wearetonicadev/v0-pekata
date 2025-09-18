"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps, Suspense } from "react";

interface CampaignLinkProps extends ComponentProps<typeof Link> {
  href: string;
}

function CampaignLinkInner({ href, ...props }: CampaignLinkProps) {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaign");

  // Build the href with campaign parameter if it exists
  const hrefWithCampaign = campaignId
    ? `${href}${href.includes("?") ? "&" : "?"}campaign=${campaignId}`
    : href;

  return <Link href={hrefWithCampaign} {...props} />;
}

export function CampaignLink({ href, ...props }: CampaignLinkProps) {
  return (
    <Suspense fallback={<Link href={href} {...props} />}>
      <CampaignLinkInner href={href} {...props} />
    </Suspense>
  );
}
