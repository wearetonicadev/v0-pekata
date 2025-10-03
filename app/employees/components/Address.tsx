import { CampaignUserDetail } from "@/types/campaigns";

type AddressProps = CampaignUserDetail["cart"]["wallet_shipping_address"];

export const Address = ({
  first_name,
  last_name,
  street,
  country,
  city,
  postcode,
  phone,
  comments,
}: AddressProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#F1F1F4] p-6 text-neutral-700">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Dirección de entrega
      </h3>
      <div className="space-y-2 mb-6">
        <p className=" font-medium">
          {first_name} {last_name}
        </p>
        <p>{street}</p>
        <p>
          {city}, {postcode}
        </p>
        <p>{country}</p>
        <p>Tel. {phone}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2 text-black">Comentarios</h4>
        <p className="text-sm leading-relaxed">{comments || "-"}</p>
      </div>
    </div>
  );
};
