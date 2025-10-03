import { Truck } from "lucide-react";
import { ShipmentAccordion } from "@/app/employees/components/ShipmentAccordion";
import { GoodsIssue } from "@/types/campaigns";

type ShipmentProps = {
  shipments: GoodsIssue[];
};

export const Shipment = ({ shipments }: ShipmentProps) => {
  if (shipments.length === 0) {
    return (
      <div className="rounded-lg rounded-t-[0] bg-white border border-t-[0] border-[#F1F1F4] py-5 px-8">
        <div className="flex flex-col items-center justify-center gap-1 rounded-md p-6 min-h-[180px] bg-[#FBFBFB]">
          <Truck />
          <div>No hay envíos</div>
        </div>
      </div>
    );
  }

  return <ShipmentAccordion shipments={shipments} />;
};
