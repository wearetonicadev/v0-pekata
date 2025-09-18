import { Truck, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { GoodsIssue } from "@/types/campaigns";
import { List } from "@/app/employees/components/List";

interface ShipmentAccordionProps {
  shipments: GoodsIssue[];
}

export const ShipmentAccordion = ({ shipments }: ShipmentAccordionProps) => {
  const dateTimeFormat = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
  });

  return (
    <div className="w-full space-y-2">
      {shipments.map((shipment, index) => (
        <div key={shipment.id} className="border border-gray-100 rounded-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={shipment.id.toString()} className="border-0">
              <AccordionTrigger className="px-4 py-4 hover:no-underline items-center">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full  bg-[#F7FAF8] border border-[#D5EADE]">
                      <Truck className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-gray-500">Envío {index + 1}</div>
                      <div className="font-semibold text-black">
                        {shipment.code}
                      </div>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-500">Enviado por</div>
                    <div className="font-semibold">{shipment.courier.name}</div>
                  </div>

                  <div>
                    <div className="text-gray-500">Estado</div>
                    <div className="font-bold">
                      {
                        {
                          shipped: "Enviado",
                          delivered: "Entregado",
                          returned: "Devuelto",
                          pending: "Pendiente",
                          processing: "En proceso",
                        }[shipment.state]
                      }{" "}
                      {shipment.shipped_at &&
                        `(${dateTimeFormat.format(
                          new Date(shipment.shipped_at)
                        )})`}
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
                <List items={shipment.lines} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};
