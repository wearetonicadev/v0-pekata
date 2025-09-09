import { Truck, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type ShipmentStatus = "Entregado" | "Enviado" | "En preparación";

interface Shipment {
  id: string;
  shipmentId: string;
  trackingNumber: string;
  carrier: string;
  status: ShipmentStatus;
  statusDate: string;
}

interface ShipmentAccordionProps {
  shipments: Shipment[];
}

export const ShipmentAccordion = ({ shipments }: ShipmentAccordionProps) => {
  return (
    <div className="w-full space-y-2">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="border border-gray-100 rounded-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={shipment.id} className="border-0">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full  bg-[#F7FAF8] border border-[#D5EADE]">
                      <Truck className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">
                        {shipment.shipmentId}
                      </div>
                      <div className="font-semibold text-black">
                        {shipment.trackingNumber}
                      </div>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-500 text-sm">Enviado por</div>
                    <div className="font-semibold">{shipment.carrier}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-sm">Status</div>
                    <div className="font-semibold">
                      {shipment.status} ({shipment.statusDate})
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <Link className="text-sm underline text-[#2E9858]" href="/">
                      Ver estados
                    </Link>

                    <Link
                      className="text-sm underline flex flex-row items-center gap-1 text-[#2E9858]"
                      href="/"
                    >
                      Seguimiento <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Lista de productos
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};
