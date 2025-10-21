import { useState, useRef, useLayoutEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { SearchIcon, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearch } from "../../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/lib/axios";
import { CampaignUsersResponse} from "@/types/campaigns";
import { useCampaign } from "@/contexts/CampaignContext";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

export function EmployeesSearchBar({
  disabled,
  contentClassName,
  className,
  popOverSpacing = 3,
}: {
  disabled?: boolean;
  contentClassName?: string;
  className?: string;
  popOverSpacing? : number
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const { search, setSearch } = useSearch();
  const { campaignId } = useCampaign();
  const navigate = useNavigate();

  useLockBodyScroll(open);

  function useFilteredEmployees(campaignId: string | null, search: string) {
    const { data, isLoading, error } = useQuery<
      AxiosResponse<CampaignUsersResponse>,
      AxiosError,
      CampaignUsersResponse
    >({
      queryKey: ["campaign-users-search", { campaignId, search }],
      queryFn: () => {
        const params = new URLSearchParams({
          campaign: campaignId?.toString() ?? "",
          q: search ?? "",
        });
  
        return api.get(`/admin/campaign-users/search?${params.toString()}`);
      },
      select: ({ data }) => data,
      enabled: !!campaignId && !!search,
    });
  
    return { data, isLoading, error };
  }
  const { data: filteredEmployees, isLoading: isLoadingData } = useFilteredEmployees(campaignId, search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setOpen(!!searchValue);
  };

  const handleEmployeeSelect = (employeeId: number) =>{
    navigate(`/employee/id/${employeeId}`);
    setOpen(false);
    setSearch('');
  }

  const handleClose= ()=>{
    setOpen(false);
    setSearch('');
  }

  // Measure trigger width
  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

 

  function EmptySearch(){
    if (search && !isLoadingData) {
      return (
        <div className="bg-[#F4F4F4] text-center gap-3 flex flex-col items-center justify-center py-[16px] md:py-[33px] px-5 w-full rounded-[10px] h-[174px]">
          <div className="size-12 bg-[#F9F9F9] border border-[#DBDFE9] rounded-full flex items-center justify-center">
              <User className="size-6 border color-[#808080] border-[#808080] rounded-full" />
          </div>
          <span>
            No hemos encontrado empleados con el nombre <strong>"{search}"</strong>
          </span>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <Skeleton className="w-full h-9">
        </Skeleton>
        <Skeleton className="w-full h-9">
        </Skeleton>
      </div>
    )
  }

  function SearchResults() {
    if (!filteredEmployees || filteredEmployees.results.length == 0 ) {
      return <EmptySearch />;
    }
  
    return (
      <div className="space-y-2 " style={{ width: triggerWidth - 40 }}>
        {filteredEmployees.results?.map((employee) => {
          const fullName = `${employee.user.first_name} ${employee.user.last_name}`;
          const searchTerm = search ?? "";

          const formattedFullName = (() => {
            if (!searchTerm) return fullName;

            const regex = new RegExp(`(${searchTerm})`, "gi");
            const parts = fullName.split(regex);

            return (
              <>
                {parts.map((part, index) =>
                  part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <strong key={index}>{part}</strong>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </>
            );
          })();

          return (
            <Button className="w-full h-9 has-[>svg]:px-1 flex justify-start items-center gap-2" 
            key={employee.id} 
            onClick={() => {
              handleEmployeeSelect(employee.id)
            }}
            variant={"ghost"}
            >
              <User className="size-5 border border-[#1F503B] rounded-full" />
              <span className="employee-name font-normal">{formattedFullName}</span>
            </Button>
          );
        })}
      </div>
    );
  }
  

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        if (val) setTimeout(() => inputRef.current?.focus(), 0);
      }}
      
    >
      <PopoverTrigger asChild>
        <div className={cn("relative w-full px-5", className)} ref={triggerRef}>
          <Input
            ref={inputRef}
            type="text"
            disabled={disabled}
            placeholder="Buscar empleados..."
            autoComplete="no"
            value={search}
            onChange={handleSearchChange}
            className={cn(
              "w-full rounded-full pr-10 p-4 placeholder:text-[#1F503B] border border-[#D9E2EE] h-[40px]",
              disabled && "bg-muted cursor-not-allowed"
            )}
          />
          {search ? (
            <X className="absolute right-9 top-[20px] -translate-y-1/2 w-5 h-5 text-[#1F503B] cursor-pointer" onClick={handleClose} />
            ):(
            <SearchIcon className="absolute right-9 top-[20px] -translate-y-1/2 w-5 h-5 text-[#1F503B]" />
            )
          }
          
        </div>
      </PopoverTrigger>
      {open && (filteredEmployees || isLoadingData) && (
        <>
          <div
            className={cn("fixed left-0 right-0 h-[100dvh] bottom-0 bg-black opacity-20 z-1 top-[112px]")}
            onClick={handleClose}
          />
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={popOverSpacing}
            style={{ width: triggerWidth }}
            className={cn("p-5 text-sm pt-[16px] rounded-t-none border-[0px]", contentClassName)}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <SearchResults />
          </PopoverContent>
        </>
        )
      }
    </Popover>
  );
}