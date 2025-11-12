import { X } from "lucide-react";
import { FILTER_INFO } from "@/types/filters";
import { Button } from "../ui/button";

type AppliedFiltersBarProps = {
  appliedFilters: Record<string, string>;
  deleteUrlParam: (param: string | string[]) => void;
};

export function AppliedFiltersBar({ appliedFilters, deleteUrlParam }: AppliedFiltersBarProps){

  const filteredAppliedFilters = Object.keys(appliedFilters).reduce<string[]>((filters, paramKey) => {
    const filterInfo = Object.values(FILTER_INFO).find(
      (info) => {
        return info.urlParam === paramKey || paramKey.includes(info.urlParam);
      }
    );

    if (!filterInfo) return filters;

    if (filterInfo.type === "date" && paramKey.startsWith(`${filterInfo.urlParam}`)) {
      if (!filters.includes(filterInfo.urlParam)) {
        filters.push(filterInfo.urlParam);
      }
      return filters;
    }

    if (!filters.includes(paramKey)) {
      filters.push(paramKey);
    }

    return filters;
  }, []);

  const handleDeleteFilter = (paramKey: string, filterEntry: { type: string }) => {
    const paramsToDelete = filterEntry.type === 'date' 
      ? ['close_date_from', 'close_date_to']
      : paramKey;
      
    deleteUrlParam(paramsToDelete);
  }



  return(
    <div className="flex gap-2 items-center flex-wrap">
          {(Object.keys(appliedFilters).length !== 0) && (
            <>
              Filtrando:
              {filteredAppliedFilters.map((paramKey) => {
                const filterEntry = Object.values(FILTER_INFO).find(
                   (info) =>  {
                    return info.urlParam === paramKey ||  paramKey.includes(info.urlParam);
                   } 
                );

                if (!filterEntry) return null;

                return (
                  <Button
                    key={paramKey}
                    variant="default"
                    onClick={() => { handleDeleteFilter(paramKey, filterEntry)}}
                    className="has-[>svg]:px-2 py-1 text-[10px] border-black rounded-md  h-5 "
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