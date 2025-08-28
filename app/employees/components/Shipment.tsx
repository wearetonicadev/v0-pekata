import { Truck } from "lucide-react";

export const Shipment = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md p-6 min-h-[300px] bg-gray-100">
      <Truck />

      <div>No hay envíos</div>
    </div>
  );
};
