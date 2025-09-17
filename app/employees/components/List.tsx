import { CartLine } from "@/types/campaigns";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

type ListProps = {
  items: CartLine[];
};

export const List = ({ items }: ListProps) => {
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-[#4b5675]">
        No hay items en el carrito
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#dbdfe9]">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="p-2 md:p-6 flex items-center justify-between"
        >
          <div className="flex flex-row items-center flex-4">
            {item.product.main_image && (
              <img
                src={item.product.main_image.listing_image_cache}
                alt={item.product.name}
                className="size-12 mr-2"
              />
            )}

            <div className="flex flex-col">
              <p className="text-sm font-normal text-[#4D4D4D] mb-1">
                {item.product.brand?.name}
              </p>
              <h4 className="font-medium text-[#000000] mb-1">
                {item.product.name}
              </h4>
              <p className="text-xs font-normal text-[#4D4D4D]">
                {item.product.subtitle}
              </p>
            </div>
          </div>
          <div className="flex-1 text-center hidden md:block font-thin">
            Lote tradicional
          </div>
          <div className="flex-1 text-center hidden md:block">
            {item.automatically_assigned ? "Seleccionado" : "Por defecto"}
          </div>
          <div className="text-sm text-[#191919] font-medium flex-1 md:flex-none">
            {item.quantity} {item.quantity === 1 ? "ud" : "uds"}
          </div>
          <div className="flex-1 flex justify-end">
            <Badge className="text-sm bg-[#EAF5EE] text-black px-3 py-1 flex items-center justify-center gap-1">
              <Coins className="w-4 h-4" />
              {item.tokens}€
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
