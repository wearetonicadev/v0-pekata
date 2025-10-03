import { Truck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Shipment = {
  id: string;
  destination: string;
  batches: number;
  status: "Entregado" | "Enviado" | "En preparación";
  deliveryDate: string;
};

interface ShipmentsListProps {
  shipments: Shipment[];
  deliveryRatio?: number;
  onDownload?: () => void;
  onShowMore?: () => void;
}

export const ShipmentsList = ({
  shipments,
  deliveryRatio = 95,
}: ShipmentsListProps) => {
  const getRowBgColor = (index: number) => {
    return index % 2 === 0 ? "bg-green-50" : "bg-blue-50";
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl text-black font-family-apercu font-semibold">
            Envíos a Oficina
          </CardTitle>

          <div className="flex flex-row items-center gap-2 ">
            <div className="text-[#1F503B] text-sm">Ratio de entrega:</div>

            <div className="bg-[#EAF5EE] text-[#1F503B] px-3 py-0.5 rounded-sm text-sm font-medium">
              {deliveryRatio}%
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {shipments.map((shipment, index) => (
            <div
              key={shipment.id}
              className={`grid grid-cols-13 gap-4 px-3 py-2 rounded-lg items-center ${getRowBgColor(
                index
              )}`}
            >
              <div className="col-span-5 h-full md:col-span-2 flex flex-col justify-between">
                <div className="text-[#4B5675] text-sm">Destino</div>

                <div className="text-sm font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {shipment.destination}
                </div>
              </div>
              <div className="col-span-2 h-full hidden md:flex flex-col justify-between">
                <div className="text-[#4B5675] text-sm">Lotes</div>

                <div className="text-sm font-bold text-gray-900">
                  {shipment.batches}
                </div>
              </div>
              <div className="col-span-4 h-full hidden md:flex flex-col justify-between">
                <div className="text-[#4B5675] text-sm">Estado</div>

                <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
                  {shipment.status}
                </div>
              </div>
              <div className="col-span-4 h-full md:col-span-3 flex flex-col justify-between">
                <div className="text-[#4B5675] text-sm">Entrega</div>

                <div className="text-sm font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {shipment.deliveryDate}
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <div
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center`}
                >
                  <Truck className="size-5 text-green-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
