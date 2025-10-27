import { CampaignUserDetail } from "@/types/campaigns";
import { House } from "lucide-react";


type AddressExtraProps = {
  isEmpty?: boolean;
};

type AddressProps = CampaignUserDetail["cart"]["wallet_shipping_address"] & AddressExtraProps;

export const Address = ({
  first_name,
  last_name,
  street,
  country,
  city,
  postcode,
  phone,
  comments,
  isEmpty,
}: AddressProps,
) => {
  // if (isEmpty) {
  //   return(
  //     <div className="bg-white rounded-lg border border-[#F1F1F4] p-6 text-neutral-700 flex flex-col">
  //       <h3 className="text-lg font-semibold mb-4 text-black">
  //         Dirección de entrega
  //       </h3>
    
        
     
  //     </div>
  //   )
  // }

  return (
    <div className="bg-white rounded-lg border border-[#F1F1F4] p-6 text-[#4D4D4D] flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Dirección de entrega
      </h3>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-1 rounded-md p-6 grow-1 bg-[#FBFBFB]">
          <House />
          <div>No hay dirección de entrega</div>
        </div>
      )}

      {!isEmpty && (
        <div>
         <div className="space-y-2 mb-2">
         <p className="font-normal text-black mb-1">
           {first_name} {last_name}
         </p>
         <p className="font-normal text-[15px] mb-0">{street}</p>
 
         <p className="font-normal text-[15px] mb-0">
           {city}, {postcode}
         </p>
 
         {country && (
           <p className="font-normal text-[15px] mb-0">{country}</p>
         )}
 
         {phone && (
           <p className="font-normal text-[15px] mb-0">Tel. {phone}</p>
           )
         }
       </div>
       {comments && (
         <div>
           <h4 className="font-normal text-black mb-1">Comentarios</h4>
           <p className="font-normal text-[15px] mb-0">{comments}</p>
         </div>
       )}
       </div>
      )}
    </div>
  );
};
