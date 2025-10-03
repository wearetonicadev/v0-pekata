import { ReactNode } from "react";
import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        <CardTitle className="text-xl text-black font-family-apercu font-semibold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white py-1 border-b last-of-type:border-b-0"
          >
            <div className="h-12 w-12 overflow-hidden rounded-md flex-shrink-0 mr-3">
              <img
                src={item.main_image.thumbnail_image_cache}
                alt={item.name}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[#4D4D4D] text-xs leading-4 truncate">
                {item.brand.name}
              </div>
              <div className="text-[#071437] text-sm font-medium leading-5 truncate">
                {item.name}
              </div>
              <div className="text-[#4D4D4D] text-xs leading-4">
                {item.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm whitespace-nowrap text-[#1F503B]">
                {item.unitsLabel}
              </div>

              <div className="flex items-center gap-1 rounded-full bg-[#e6f3ea] px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
                <span className="inline-flex items-center justify-center">
                  {item.metricIcon ?? <Coins className="h-3 w-3" />}
                </span>
                <span className="flex items-center text-[13px] leading-[1.3] font-normal">
                  {item.metricValue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
