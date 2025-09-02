"use client";

import { User, ChevronDown, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-[#e6e6e6] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <Link href="/">
            <img src="/images/logo-black.png" alt="Pekata" />
          </Link>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer border p-2 rounded-full">
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="text-red-500  w-5 h-5" />
                <span className="text-red-500  text-sm">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
