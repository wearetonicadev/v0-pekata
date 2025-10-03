import { CampaignUserDetail } from "@/types/campaigns";
import { Fragment } from "react";

type PaymentProps = CampaignUserDetail["cart"];

export const Payment = ({
  state,
  total_tokens,
  shipping_tokens,
  product_tokens,
  remaining_tokens,
}: PaymentProps) => {
  const items = [
    {
      label: "Estado del carrito",
      value: state === "open" ? "Abierto" : "Cerrado",
    },
    { label: "Tokens totales", value: total_tokens },
    { label: "Tokens usados", value: product_tokens },
    { label: "Tokens enviados", value: shipping_tokens },
    { label: "Tokens restantes", value: remaining_tokens },
  ];

  return (
    <div className="bg-white rounded-lg border border-neutral-100 p-6 text-neutral-700">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Dirección de entrega
      </h3>

      <div className="space-y-2">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <div key={index} className="flex items-center justify-between">
              <div className="text-sm font-medium text-neutral-600">
                {item.label}
              </div>
              <div>{item.value || "-"}</div>
            </div>
            {index < items.length - 1 && (
              <div className="border-b border-gray-300"></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
