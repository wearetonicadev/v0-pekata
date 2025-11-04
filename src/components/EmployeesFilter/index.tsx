import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, SlidersHorizontal, XIcon } from "lucide-react";
import { useState } from "react";
import { Campaign } from "@/types/campaigns";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";

export type FiltersData = {
  work_centers: Campaign["work_centers"];
  products: Campaign["predefined_lot_products"];
  subsidiaries: Campaign["subsidiaries"];
};

const FILTER_INFO: Record< keyof FiltersData, { label: string; urlParam: string }> = {
  work_centers: { 
    label: "Por Centros de trabajo", 
    urlParam: "work_center" 
  },
  products: { 
    label: "Por Productos", 
    urlParam: "lot" 
  },
  subsidiaries: { 
    label: "Por Subsidiarias", 
    urlParam: "subsidiary" 
  },
}

type FiltersProps = {
  isDisabled: boolean;
  filters?: FiltersData;
};

export function EmployeesFilter({ filters, isDisabled }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleFilter = (key: keyof FiltersData, id: number | string) => {
    const param = FILTER_INFO[key].urlParam;
    const current = searchParams.get(param);

    let newValue: string;
    if (!current) {
      newValue = String(id);
    } else {
      const values = current.split(",");
      if (values.includes(String(id))) {
        newValue = values.filter(v => v !== String(id)).join(",");
      } else {

        newValue = [...values, String(id)].join(",");
      }
    }

    if (newValue === "") {
      searchParams.delete(param);
    } else {
      searchParams.set(param, newValue);
    }
    setSearchParams(searchParams);
  };

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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtrar:</SheetTitle>
            </SheetHeader>

            <ScrollArea className=" h-[calc(100vh-8rem)] px-4">
              {(Object.keys(filters) as Array<keyof FiltersData>).map((key) => {
                const label = FILTER_INFO[key].label;
                const items = filters[key] as Array<{ id: string | number; name: string }>;

                if (items.length > 0) return (
                  <Accordion key={key} type="single" collapsible className="w-full bg-white border-1 rounded-lg border-gray-100 mt-2 first:mt-0">
                    <AccordionItem value={label} className="data-[state=open]:border-b-0">
                      <AccordionTrigger className="px-4 py-2  h-[48px] hover:no-underline items-center  ">
                        <h3 className="text-black font-normal">{label}</h3>

                      </AccordionTrigger>
                      <AccordionContent overflowHidden className=" px-1 pb-2 flex flex-col gap-2">
                        {items.map((item) => {
                          const param = FILTER_INFO[key].urlParam;
                          const isActive = searchParams.get(param)?.split(",").includes(String(item.id));

                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleFilter(key, item.id)}
                              className={`text-left px-3 flex cursor-pointer hover:bg-gray-100 text-gray-800" items-center justify-start gap-3 py-1 rounded-md text-sm transition-colors
                               `}
                            >
                              <Checkbox checked={isActive} />
                              {item.name}
                            </button>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
