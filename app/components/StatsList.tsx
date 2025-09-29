"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatItem = {
  icon: ReactNode;
  value: string | number;
  subtitle: string;
  percent?: string | number;
};

type StatsListProps = {
  items: StatItem[];
  className?: string;
};

export const StatsList = ({ items, className }: StatsListProps) => {
  return (
    <div
      className={[
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => (
        <Card key={index} className="border-[#e6e6e6]">
          <CardContent className="p-1">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full border border-[#D5EADE] bg-[#F7FAF8] text-[#1F503B] flex items-center justify-center">
                {item.icon}
              </div>

              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-[#1F503B]">
                  {item.value}
                </div>
                {item.percent && (
                  <div className="text-[#1a7f4a] text-sm font-semibold">
                    {typeof item.percent === "number"
                      ? `${item.percent}%`
                      : item.percent}
                  </div>
                )}
              </div>

              <div className="text-[#516079] text-xs px-6">{item.subtitle}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
