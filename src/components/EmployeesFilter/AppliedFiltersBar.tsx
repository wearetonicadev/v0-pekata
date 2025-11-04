import { X } from "lucide-react";
import { FILTER_INFO } from ".";
import { Button } from "../ui/button";

type AppliedFiltersBarProps = {
  appliedFilters: Record<string, string>;
  deleteUrlParam: (param: string) => void;
};

export function AppliedFiltersBar({ appliedFilters, deleteUrlParam }: AppliedFiltersBarProps){
  return(
    <div className="flex gap-2 items-center wrap">
          {(Object.keys(appliedFilters).length !== 0) && (
            <>
              Filtrando:
              {Object.keys(appliedFilters).map((paramKey) => {
                const filterEntry = Object.values(FILTER_INFO).find(
                  (info) => info.urlParam === paramKey
                );

                if (!filterEntry) return null;

                return (
                  <Button
                    key={paramKey}
                    variant="default"
                    onClick={() => {deleteUrlParam(paramKey)}}
                    className="has-[>svg]:px-1 py-1 text-[10px] border rounded-md  h-5 "
                  >
                    {filterEntry.label}
                    <X className="size-3"/>
                  </Button>
                );
              })}
            </>
          )}
           </div>
  )
}