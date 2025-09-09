"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TopProductItem = {
  id: number;
  brand: { name: string };
  name: string;
  subtitle: string;
  main_image: { thumbnail_image_cache: string };
  unitsLabel: string; // e.g. "234 uds"
  metricValue: number | string; // e.g. views / clicks
  metricIcon?: ReactNode; // defaults to Eye icon
};

type TopProductsListProps = {
  title?: string;
  items: TopProductItem[];
};

export const TopProductsList = ({
  title = "Top 5 productos",
  items,
}: TopProductsListProps) => {
  return (
    <Card className="border-[#e6e6e6]">
      <CardHeader>
        <CardTitle className="text-xl text-black font-family-apercu font-normal">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white py-1 border-b last-of-type:border-b-0"
          >
            <div className="h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
              <Image
                src={item.main_image.thumbnail_image_cache}
                alt={item.name}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[#8a94a6] text-xs leading-4 truncate">
                {item.brand.name}
              </div>
              <div className="text-[#071437] text-sm font-medium leading-5 truncate">
                {item.name}
              </div>
              <div className="text-[#8a94a6] text-xs leading-4">
                {item.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm whitespace-nowrap text-[#1F503B]">
                {item.unitsLabel}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#e6f3ea] px-3 py-1 text-sm font-semibold whitespace-nowrap">
                <span className="inline-flex items-center justify-center">
                  {item.metricIcon ?? <Coins className="h-4 w-4" />}
                </span>
                <span>{item.metricValue}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
