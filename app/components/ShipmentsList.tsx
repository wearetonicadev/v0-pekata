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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "text-green-600";
      case "Enviado":
        return "text-blue-600";
      case "En preparación":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getRowBgColor = (index: number) => {
    return index % 2 === 0 ? "bg-green-50" : "bg-blue-50";
  };

  const getIconBgColor = (index: number) => {
    return index % 2 === 0 ? "bg-green-100" : "bg-blue-100";
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col  gap-4">
          <CardTitle className="text-xl text-black font-family-apercu font-semibold">
            Envíos a Oficina
          </CardTitle>

          <div className="flex flex-row items-center gap-2">
            <div>Ratio de entrega</div>

            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-sm text-sm font-medium">
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
              className={`grid grid-cols-12 gap-4 p-4 rounded-lg ${getRowBgColor(
                index
              )}`}
            >
              <div className="col-span-5 md:col-span-2">
                <div className="text-[#4B5675] text-sm mb-1">Destino</div>

                <div className="text-sm font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {shipment.destination}
                </div>
              </div>
              <div className="col-span-2 hidden md:block">
                <div className="text-[#4B5675] text-sm mb-1">Lotes</div>

                <div className="text-sm font-bold text-gray-900">
                  {shipment.batches}
                </div>
              </div>
              <div className="col-span-3 hidden md:block">
                <div className="text-[#4B5675] text-sm mb-1">Estado</div>

                <div className="text-sm font-bold text-gray-900">
                  {shipment.status}
                </div>
              </div>
              <div className="col-span-5 md:col-span-3">
                <div className="text-[#4B5675] text-sm mb-1">Entrega</div>

                <div className="text-sm font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {shipment.deliveryDate}
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <div
                  className={`w-8 h-8 rounded-full ${getIconBgColor(
                    index
                  )} flex items-center justify-center`}
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
