import { Truck } from "lucide-react";
import { ShipmentAccordion } from "@/app/employees/components/ShipmentAccordion";
import { GoodsIssue } from "@/types/campaigns";

type ShipmentProps = {
  shipments: GoodsIssue[];
};

export const Shipment = ({ shipments }: ShipmentProps) => {
  if (shipments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md p-6 min-h-[300px] bg-gray-100">
        <Truck />

        <div>No hay envíos</div>
      </div>
    );
  }

  return <ShipmentAccordion shipments={shipments} />;
};
