import { CartLine } from "@/types/campaigns";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

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
    <div className="bg-white px-4 md:px-7 pb-6 rounded-lg rounded-t-[0] border border-[#F1F1F4] border-t-[0px]">
      {items.map((item) => (
        <div key={item.product.id}>
          <div
            
            className="p-1 md:p-1 flex items-center justify-between rounded-lg"
          >
            <div className="flex flex-row items-center flex-4">
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
            <div className="text-sm text-[#191919] font-medium flex-1 md:flex-none">
              {item.quantity} {item.quantity === 1 ? "ud" : "uds"}
            </div>
            {item.tokens && (
              <div className="flex-1 flex justify-end">
                <Badge className="text-sm bg-[#EAF5EE] text-black px-3 py-1 flex items-center justify-center gap-1">
                  <Coins className="w-4 h-4" />
                  {item.tokens}€
                </Badge>
              </div>
            )}
          </div>
          <div className="w-full h-px my-2 bg-[#E6E6E6]"></div>
        </div>
      ))}
    </div>
  );
};
