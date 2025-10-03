import { User, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CampaignLink } from "../ui/campaign-link";
import { useAuth } from "../../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white py-8">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
        <CampaignLink to="/">
          <img src="/images/logo-black.png" alt="Pekata" className="w-1/3" />
        </CampaignLink>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-1 cursor-pointer border border-[#D9E2EE] p-1 rounded-full">
                <div className="bg-[#ECF1F6] rounded-full p-1.5">
                  <User className="w-5 h-5 text-[#4370A8]" />
                </div>

                <ChevronDown className="w-5 h-4" />
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
