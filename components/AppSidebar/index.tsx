"use client";
import { User, BarChart3 } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { CampaignCombobox } from "@/components/CampaignSelector";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-[#e6e6e6]">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[#191919]">Campaign</h3>
          <CampaignCombobox
            placeholder="Select campaign..."
            className="w-full"
            allowClear={true}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employees">
                    <User className="h-4 w-4" />
                    <span>Empleados</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
