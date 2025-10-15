import { User, ChevronDown, LogOut, SearchIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CampaignLink } from "../ui/campaign-link";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { search, setSearch } = useSearch();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    
    // Si estamos en la página home y hay texto de búsqueda, redirigir a empleados
    if (location.pathname === "/" && searchValue.trim() !== "") {
      navigate("/employees");
    }
  };

  return (
    <header className="bg-white py-8">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
        <CampaignLink to="/">
          <img src="./images/logo-black.png" alt="Pekata" className="w-[120px]" />
        </CampaignLink>

        <div className="relative w-full md:w-1/3 px-3">
          <SearchIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#1F503B] w-5 h-5" />
          <Input
            className="w-full rounded-full pr-10 p-4 placeholder:text-[#1F503B] border border-[#D9E2EE]"
            placeholder="Buscar empleados..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="ml-[0] md:ml-[60px]">
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
