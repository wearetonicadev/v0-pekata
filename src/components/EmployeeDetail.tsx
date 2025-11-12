import { Address } from "./Address";
import { EmployeeProfile } from "./EmployeeProfile";
import { List } from "./List";
import { Payment } from "./Payment";
import { Shipment } from "./Shipment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useMemo } from "react";
import { CampaignUserDetail } from "@/types/campaigns";

interface EmployeeDetailProps {
  data: CampaignUserDetail;
}

export function EmployeeDetail({ data }: EmployeeDetailProps) {
  const cartLines = data?.cart.lines;
  const filteredSaleOrderLines = data?.sale_order?.lines.filter(
    (item) => item.product.categories && item.product.categories.length > 0
  );

  const items = useMemo(() => {
    return filteredSaleOrderLines ?? cartLines ?? [];
  }, [cartLines, filteredSaleOrderLines]);

  const isAddressEmpty = useMemo(() => {
    const address = data?.cart?.wallet_shipping_address;
    if (!address) return true;
  
    const hasValue = Object.values(address).some(v => v);
    return !hasValue;
  }, [data?.cart?.wallet_shipping_address]);

  const Heading = data?.sale_order?.lines ? 'Pedido' : 'Carrito';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <EmployeeProfile user={data.user} />

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        <Tabs
          defaultValue="selection"
          className="rounded-md gap-0"
        >
          <TabsList className="bg-white rounded-b-[0] w-full pt-5 gap-[10px] h-[57px] border border-[#F1F1F4] pb-0">
            <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[3px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none text-base font-light" value="selection">Selección</TabsTrigger>
            <TabsTrigger className="pb-4 max-w-max text-[#808080] data-[state=active]:text-[#2E9858] data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-[3px] border-b-transparent data-[state=active]:border-b-[#2E9858] rounded-none text-base" value="shipment">Envío</TabsTrigger>
          </TabsList>

          <TabsContent value="selection">
            <>
              <div className="p-5 px-8 md:pl-8 bg-white border border-[#F1F1F4] border-y-[0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold ">{Heading}</h3>
                  <span className="text-sm text-gray-700">
                    {items.length || 0} Items
                  </span>
                </div>
              </div>

              <List items={items} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#FCFCFC] mt-5">
                <Address {...data.cart.wallet_shipping_address} isEmpty={isAddressEmpty} />
                <Payment {...data.cart} />
              </div>
            </>
          </TabsContent>
          <TabsContent value="shipment">
            <Shipment shipments={data.goods_issues} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
