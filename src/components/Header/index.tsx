import { User, ChevronDown, LogOut, SearchIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CampaignLink } from "../ui/campaign-link";
import { useAuth } from "../../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {EmployeesSearchBar} from "../EmployeesSearchBar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, } from "react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

export const Header = () => {
  const navigate = useNavigate();
  const { logout, user, company } = useAuth();
  const [open, setOpen] = useState(false);
 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useLockBodyScroll(open)

  return (
    <header className="bg-white py-3 md:py-8">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="grow-[0.3]  w-[33%]">
          <CampaignLink to="/" className="w-[120px]" >
            <img src="/images/logo-black.png" alt="Pekata"  className="w-[120px]" />
          </CampaignLink>
        </div>
        <div className="relative w-full flex md:block justify-end md:max-w-[485px] grow-[0.3]  w-[33%]">
          <div className="flex mr-2 size-10 md:hidden border border-[#000] rounded-full flex items-center justify-center">
            <Popover 
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild>
                <div>
                  <SearchIcon className="w-5 h-5 text-[#1F503B]" />
                </div>
              </PopoverTrigger>
              {open  && (
                  <PopoverContent
                    side="bottom"
                    align="start"
                    sideOffset={19}
                    style={{ width: '100dvw' }}
                    className={"p-0 text-sm pt-[16px] rounded-none border-[0px]"}
                  >
                    <EmployeesSearchBar className="mobile pb-2" popOverSpacing={-2}/>
                  </PopoverContent>
                )
              }
            </Popover> 
          </div>
          <div className="hidden md:block">
            <EmployeesSearchBar className="desktop"/>
          </div>
        </div>

        <div className="ml-[0] grow-[0.3] md:w-[33%]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer border border-[#D9E2EE] p-1 rounded-full max-w-max ml-auto">
                <div className="bg-[#ECF1F6] rounded-full p-1.5">
                  <User className="w-5 h-5 text-[#4370A8]" />
                </div>
                
                <div className="hidden lg:flex flex-col pr-2">
                  <span className="text-sm font-medium text-gray-900 leading-tight">
                    {user ? `${user.first_name} ${user.last_name}` : "Usuario"}
                  </span>
                  <span className="text-xs text-gray-500 leading-tight">
                    {company ? company.name : "Cargando..."}
                  </span>
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
