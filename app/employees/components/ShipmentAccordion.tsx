import { Truck, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GoodsIssue } from "@/types/campaigns";
import { List } from "@/app/employees/components/List";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
interface ShipmentAccordionProps {
  shipments: GoodsIssue[];
}

export const ShipmentAccordion = ({ shipments }: ShipmentAccordionProps) => {
  const dateTimeFormat = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
  });

  const timeFormat = new Intl.DateTimeFormat("es-ES", {
    timeStyle: "short",
  });

  const [open, setOpen] = useState(false);
  const [activeShipment, setActiveShipment] = useState<GoodsIssue | null>(null);

  return (
    <div className="w-full space-y-2 bg-white rounded-lg rounded-t-[0] py-5 px-4 md:px-8 border border-t-[0] border-[#F1F1F4]">
      {shipments.map((shipment, index) => (
        <div key={shipment.id} className="border border-gray-100 rounded-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={shipment.id.toString()} className="border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline items-center">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full  bg-[#F7FAF8] border border-[#D5EADE]">
                      <Truck className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-[#4B5675] text-[13px]">Envío {index + 1}</div>
                      <div className="font-semibold text-[13px] text-[#071437]">
                        {shipment.code}
                      </div>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="flex-col gap-1 hidden md:flex">
                    <div className="text-[#4B5675] text-[13px]">Enviado por</div>
                    <div className="font-semibold text-[13px] text-[#071437]">{shipment.courier.name}</div>
                  </div>

                  <div className="hidden md:block">
                    <div className="text-[#4B5675] text-[13px]">Estado</div>
                    <div className="font-semibold text-[13px] text-[#071437]">
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

                  <div className="flex-row gap-2 hidden md:flex">
                    <Button
                      variant="link"
                      className="text-[13px] underline text-[#2E9858] underline-offset-1 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveShipment(shipment);
                        setOpen(true);
                      }}
                    >
                      Ver estados
                    </Button>

                    <Button
                      variant="link"
                      className="text-[13px] underline text-[#2E9858] underline-offset-1 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        window.open(shipment.tracking_url || "", "_blank");
                      }}
                    >
                      Seguimiento <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <List items={shipment.lines} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Estados</SheetTitle>
          </SheetHeader>

          <div className="mt-2 divide-y px-4">
            {activeShipment?.logistic_states.length === 0 && (
              <div className="text-sm text-muted-foreground">
                Sin estados disponibles
              </div>
            )}

            <ScrollArea className="h-[calc(100vh-8rem)]">
              {activeShipment?.logistic_states.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3 py-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7FAF8] border border-[#D5EADE] shrink-0">
                    <Truck className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black">
                      {s.description ?? s.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dateTimeFormat.format(new Date(s.created_at))} -{" "}
                      {timeFormat.format(new Date(s.created_at))}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
