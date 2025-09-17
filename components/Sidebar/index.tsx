"use client";
import { User, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { CampaignCombobox } from "@/components/CampaignSelector";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const buildClassName = (path: string) => {
    return cn(
      "border-b border-[#e6e6e6] rounded-none flex flex-row items-center gap-2 flex-1 justify-center md:justify-start py-2",
      {
        "text-[#2E9858] border-b-2 border-[#2E9858] md:border-b-1 md:border-[#e6e6e6]":
          pathname === path,
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <CampaignCombobox placeholder="Select campaign..." className="w-full" />

      <div className="flex flex-row md:flex-col">
        <Link href="/" className={buildClassName("/")}>
          <LayoutGrid className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>

        <Link href="/employees" className={buildClassName("/employees")}>
          <User className="h-4 w-4" />
          <span>Empleados</span>
        </Link>
      </div>
    </div>
  );
};
