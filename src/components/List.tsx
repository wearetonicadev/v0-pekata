import { CartLine } from "@/types/campaigns";
import { Badge } from "@/components/ui/badge";
import { Coins, CircleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { translateIncidenceType } from "../lib/utils";

type ListProps = {
  items: CartLine[];
 
};

export const List = ({ items }: ListProps) => {
  if (items.length === 0) {
    return (
      <div className="p-6 pt-0 text-center text-[#4b5675] bg-white rounded-lg border border-t-[0] border-[#F1F1F4] rounded-t-[0]">
        No hay items en el carrito
      </div>
    );
  }

  return (
    <div className="bg-white pb-6 px-8 pt-4 rounded-lg rounded-t-[0] border border-[#F1F1F4] border-t-[0px]">
      {items.map((item, index) => (
        
        <div key={item.product.id} >
          {index > 0 && (
            <div className="w-full h-px my-[5px] bg-[#E6E6E6]"></div>
          )}
          <div className="flex relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-[-23px] hidden lg:flex items-center justify-center">
              <IncidenceTooltip item={item}></IncidenceTooltip>
            </div>
            <div
              
              className={`p-1 md:p-1 grow-1 flex items-center justify-between rounded-lg ${item?.incidences?.length > 0 ? 'bg-[#FFF6F6]': '' }`}
            >
              <div className="flex flex-row items-center flex-2">
                {item.product.main_image && (
                  <img
                    src={item.product.main_image.listing_image_cache}
                    alt={item.product.name}
                    className="size-12 mr-2 bg-[#F8F8F8] rounded-md"
                  />
                )}

                <div className="flex flex-col min-w-2 max-w-40">
                  <p className="text-xs font-normal text-[#4D4D4D]">
                    {item.product.brand?.name}
                  </p>
                  <h4 className="font-medium text-[13px] text-[#000000]  text-[#071437] text-sm font-medium leading-5 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs font-normal text-[#4D4D4D]">
                    {item.product.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex-1 text-center hidden md:block font-medium text-[13px]">
                Lote tradicional
              </div>
              <div className="flex-1 text-center hidden md:block font-medium text-[13px]">
                {item.automatically_assigned ? "Seleccionado" : "Por defecto"}
              </div>
              {item.quantity && (
                <div className="text-sm text-[#1F503B] font-medium flex-1 md:flex-none mx-2">
                  {item.quantity} {item.quantity === 1 ? "ud" : "uds"}
                </div>
              )}

              {item.tokens && (
                <div className="flex-1 flex justify-end">
                  <Badge className="text-sm bg-[#EAF5EE] text-black px-3 py-1 flex items-center justify-center gap-1">
                    <Coins className="w-4 h-4" />
                    {item.tokens}€
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



function IncidenceTooltip({ item }: { item: CartLine }){
  const incidencesCodes: string[] = item?.incidences?.map(incidenceItem => incidenceItem.incidence?.code) || [];

  if (item?.incidences?.length > 0) return(
    <TooltipProvider>
      <Tooltip delayDuration={0} >
        <TooltipTrigger>
          <CircleAlert width={15} height={15} className="text-[#BF0000] bg-[#FFF6F6] rounded-[100%]"/>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" sideOffset={20}>
          <div className="relative bg-white py-[8px] px-[12px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),_0px_1px_3px_0px_rgba(16,24,40,0.1)] rounded-[8px] z-[5]
            after:content-[''] after:block after:w-[10px] after:h-[10px] after:absolute after:left-1/2 after:-translate-x-1/2
            after:rotate-[45deg] after:translate-y-[3px] after:bg-white after:shadow-[2px_4px_3px_-1px_rgba(16,24,40,0.12)] after:z-[0]">
              <div className="space-y-1">
                {incidencesCodes.map(code => (
                  <p>{translateIncidenceType(code)}</p>)
                  )}
              </div>
          </div>
        </TooltipContent>
      </Tooltip>
   </TooltipProvider>
  )
}