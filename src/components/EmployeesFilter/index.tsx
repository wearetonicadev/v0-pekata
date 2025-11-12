import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {SlidersHorizontal} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { FiltersData, FILTER_INFO   } from "@/types/filters";
import {useAppliedFilters} from '@/hooks/use-applied-filters';
import { Input } from "@/components/ui/input";

type FiltersProps = {
  isDisabled: boolean;
  filters?: FiltersData;
};

export function EmployeesFilter({ filters, isDisabled }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const {
    appliedFilters,
    toggleFilter,
    toggleDateFilter,
    applyFilters,
    resetFilters,
  } = useAppliedFilters();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="font-normal px-2 flex items-center gap-1 border-[#E6E6E6] shadow-none text-xs"
        disabled={isDisabled}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <SlidersHorizontal className="w-3 h-3" />
        <span className="hidden md:block">Filtros</span>
      </Button>

      {filters && (
        <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setTimeout(() => {
              resetFilters();
            }, 300);
          }
        }}
      >
          <SheetContent side="right" className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtrar:</SheetTitle>
            </SheetHeader>
            <ScrollArea className=" h-[calc(100vh-8rem)] px-4">     
              {(Object.keys(filters) as Array<keyof FiltersData>).map((key) => {
                const label = FILTER_INFO[key].label;
                const param = FILTER_INFO[key].urlParam;
                const items = filters[key] as Array<{ id: string | number; name: string }>;

                const activeValues = appliedFilters.get(param)?.split(",") || [];
                const isAccordionActive = items.some(item =>
                  activeValues.includes(String(item.id))
                );

                if (items.length > 0)
                  return (
                    <Accordion
                      key={key}
                      defaultValue={isAccordionActive ? label : undefined}
                      type="single"
                      collapsible
                      className="w-full bg-white border-1 rounded-lg border-gray-100 mt-2 first:mt-0"
                    >
                      <AccordionItem
                        value={label}
                        className="data-[state=open]:border-b-0"
                      >
                        <AccordionTrigger className="px-4 py-2 h-[48px] hover:no-underline items-center">
                          <h3 className="text-black font-normal">{label}</h3>
                        </AccordionTrigger>

                        <AccordionContent
                          overflowHidden
                          className="px-1 pb-2 flex flex-col gap-2"
                        >
                          {items.map((item) => {
                            const isActive = activeValues.includes(String(item.id));

                            if(FILTER_INFO[key].type === "checkbox") {
                              return (
                              <button
                                key={item.id}
                                onClick={() => toggleFilter(key, item.id)}
                                className={`text-left px-3 flex cursor-pointer hover:bg-gray-100 text-gray-800 items-center justify-start gap-3 py-1 rounded-md text-sm transition-colors`}
                              >
                                <Checkbox checked={isActive} />
                                {item.name}
                              </button>
                            );
                          } else if(FILTER_INFO[key].type === "date") {
                            const baseParam = FILTER_INFO[key].urlParam;
                            const dateType = item.id as "from" | "to";
                            const param = `${baseParam}_${dateType}`;
                            const currentDate = appliedFilters.get(param) || "";
                        
                            return (
                              <div key={item.id} className="flex items-center gap-2 px-3 py-2">
                                <label className="text-sm text-gray-700 min-w-[60px]">{item.name}:</label>
                                <Input
                                  type="date"
                                  value={currentDate}
                                  onChange={(e) => toggleDateFilter(key, dateType, e.target.value)}
                                  className="flex-1"
                                />
                              </div>
                            );
                          }
                        })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
              })}
            </ScrollArea>
            <SheetFooter>
    
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-normal w-full px-2 flex items-center gap-1 border-black shadow-none text-xs"
                      onClick={() => {
                        applyFilters();
                        setOpen(false);
                        }
                      }
                    >
                    <span className="block">Aplicar filtros</span>
                </Button>
      
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
