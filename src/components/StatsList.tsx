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
        "flex scrollbar-hidden gap-1.5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-4 overflow-x-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => (
        <Card key={index} className="border-[#F1F1F4]">
          <CardContent className="p-1">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full border border-[#D5EADE] bg-[#F7FAF8] text-[#1F503B] flex items-center justify-center">
                {item.icon}
              </div>

              <div className="flex items-end gap-2">
                <div className="text-2xl font-semibold text-[#1F503B]">
                  {item.value}
                </div>
                {item.percent && (
                  <div className="text-[#1a7f4a] text-xl font-semibold">
                    {typeof item.percent === "number"
                      ? `${item.percent}%`
                      : item.percent}
                  </div>
                )}
              </div>

              <div className="text-[#4B5675] text-xs px-6">{item.subtitle}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
