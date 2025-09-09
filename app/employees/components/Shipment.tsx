import { Truck } from "lucide-react";
import { ShipmentAccordion } from "@/app/employees/components/ShipmentAccordion";

export const Shipment = () => {
  return (
    <ShipmentAccordion
      shipments={[
        {
          id: "1",
          shipmentId: "Envío 1",
          trackingNumber: "HJ439834743439",
          carrier: "DHL",
          status: "Enviado",
          statusDate: "15/12/1992",
        },
        {
          id: "1",
          shipmentId: "Envío 1",
          trackingNumber: "HJ439834743439",
          carrier: "DHL",
          status: "Enviado",
          statusDate: "15/12/1992",
        },
      ]}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md p-6 min-h-[300px] bg-gray-100">
      <Truck />

      <div>No hay envíos</div>
    </div>
  );
};
