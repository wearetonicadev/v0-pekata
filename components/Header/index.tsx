"use client";

import { User, ChevronDown, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b border-[#e6e6e6] px-4 md:px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-bold text-[#191919]">
            Pekata
          </h1>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-[#78829d]" />
            <ChevronDown className="w-4 h-4 text-[#78829d]" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-[#78829d] hover:text-[#191919] transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:block text-sm">Logout</span>
          </button>
          <div className="md:hidden">
            <Menu className="w-5 h-5 text-[#78829d]" />
          </div>
        </div>
      </div>
    </header>
  );
};
