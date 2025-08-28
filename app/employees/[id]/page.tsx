"use client";

import Link from "next/link";
import { ArrowLeft, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { AxiosResponse, AxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampaignUserDetail } from "@/types/campaigns";
import { useQuery } from "@tanstack/react-query";
import { useState, use } from "react";
import api from "@/lib/axios";
import { EmployeeProfile } from "@/app/employees/components/EmployeeProfile";
import { Address } from "@/app/employees/components/Address";

export default function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"seleccion" | "envio">(
    "seleccion"
  );
  const [expandedShipments, setExpandedShipments] = useState<Set<string>>(
    new Set()
  );

  const { data, isLoading, error } = useQuery<
    AxiosResponse<CampaignUserDetail>,
    AxiosError,
    CampaignUserDetail
  >({
    queryKey: ["campaign-user", { id }],
    queryFn: () => {
      return api.get(`/admin/campaign-users/${id}/`, {
        headers: {
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
        },
      });
    },
    select: ({ data }) => data,
  });

  console.log("Employee detail data:", data);

  const openShippingStatus = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsDrawerOpen(true);
  };

  const toggleShipmentExpansion = (shipmentId: string) => {
    const newExpanded = new Set(expandedShipments);
    if (newExpanded.has(shipmentId)) {
      newExpanded.delete(shipmentId);
    } else {
      newExpanded.add(shipmentId);
    }
    setExpandedShipments(newExpanded);
  };

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "Error";
  }

  if (!data) {
    return "No details";
  }

  const employee = data;
  const employeeName = `${employee.user.first_name} ${employee.user.last_name}`;

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center gap-2 text-sm text-[#4b5675] mb-6">
        <Link href="/" className="hover:text-[#1b84ff]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/employees" className="hover:text-[#1b84ff]">
          Empleados
        </Link>
        <span>/</span>
        <span className="text-[#191919]">{employeeName}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6 text-[#4b5675]" asChild>
        <Link href="/employees">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <EmployeeProfile user={data.user} />

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex border-b border-neutral-100 mb-6">
            <button
              onClick={() => setActiveTab("seleccion")}
              className={`px-4 py-2 font-medium ${
                activeTab === "seleccion"
                  ? "text-[#2e9858] border-b-2 border-[#2e9858]"
                  : "text-[#4b5675] hover:text-[#191919]"
              }`}
            >
              Selección
            </button>
            <button
              onClick={() => setActiveTab("envio")}
              className={`px-4 py-2 font-medium ${
                activeTab === "envio"
                  ? "text-[#2e9858] border-b-2 border-[#2e9858]"
                  : "text-[#4b5675] hover:text-[#191919]"
              }`}
            >
              Envío
            </button>
          </div>

          {activeTab === "seleccion" ? (
            <>
              {/* Cart Section */}
              <div className="bg-white rounded-lg border border-neutral-100 mb-6">
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#191919]">
                      Carrito
                    </h3>
                    <span className="text-sm text-[#4b5675]">
                      {employee.cart?.lines?.length || 0} Items
                    </span>
                  </div>
                </div>

                {employee.cart?.lines && employee.cart.lines.length > 0 ? (
                  <div className="divide-y divide-[#dbdfe9]">
                    {employee.cart.lines.map((item: any) => (
                      <div
                        key={item.id}
                        className="p-6 flex items-center gap-4"
                      >
                        {item.product?.product_feature?.is_expired && (
                          <div className="w-4 h-4 bg-[#bf0000] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">!</span>
                          </div>
                        )}
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-[#191919] mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#4b5675]">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#4b5675] mb-1">
                            {item.lot}
                          </p>
                          <Badge
                            variant={
                              item.status === "selected"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#191919] font-medium">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#191919] font-medium">
                            {item.price}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-[#4b5675]">
                    No hay items en el carrito
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Address {...data.cart.wallet_shipping_address} />

                {/* Additional Payment */}
                <div className="bg-white rounded-lg border border-neutral-100 p-6">
                  <h3 className="text-lg font-semibold text-[#191919] mb-4">
                    Resumen de pago
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Estado del carrito</span>
                      <Badge className="bg-[#2e9858] text-white">
                        {employee.cart_state === "open" ? "Abierto" : "Cerrado"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Tokens disponibles</span>
                      <span className="text-[#191919] font-medium">
                        {employee.tokens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Budget asignado</span>
                      <span className="text-[#191919] font-medium">
                        {employee.budget}€
                      </span>
                    </div>
                    {employee.cart?.summary && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Tokens usados</span>
                          <span className="text-[#191919] font-medium">
                            {employee.cart.summary.used_tokens || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Tokens extra</span>
                          <span className="text-[#191919] font-medium">
                            {employee.cart.summary.extra_tokens || 0}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-neutral-100">
              {employee.shipments && employee.shipments.length > 0 ? (
                <div className="divide-y divide-[#dbdfe9]">
                  {employee.shipments.map((shipment: any, index: number) => {
                    const isExpanded = expandedShipments.has(
                      shipment.id + index
                    );
                    return (
                      <div key={index} className="p-6">
                        <div className="flex items-center gap-4">
                          <Truck className="w-8 h-8 text-[#4b5675]" />
                          <div className="flex-1">
                            <h4 className="font-medium text-[#191919] mb-1">
                              {shipment.name || `Envío ${index + 1}`}
                            </h4>
                            <p className="text-sm text-[#4b5675]">
                              {shipment.id}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#4b5675] mb-1">
                              Enviado por
                            </p>
                            <p className="text-sm text-[#191919] font-medium">
                              {shipment.carrier || "N/A"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#4b5675] mb-1">
                              Status
                            </p>
                            <Badge
                              variant={
                                shipment.status === "delivered"
                                  ? "default"
                                  : "secondary"
                              }
                              className={`text-xs ${
                                shipment.status === "delivered"
                                  ? "bg-[#2e9858] text-white"
                                  : "bg-[#4b5675] text-white"
                              }`}
                            >
                              {shipment.status} ({shipment.status_date})
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="link"
                              className="text-[#2e9858] p-0"
                              onClick={() => openShippingStatus(shipment)}
                            >
                              Ver estados
                            </Button>
                            <Button
                              variant="link"
                              className="text-[#2e9858] p-0"
                            >
                              Seguimiento ↗
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                toggleShipmentExpansion(shipment.id + index)
                              }
                              className="p-1"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#4b5675]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#4b5675]" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {isExpanded && shipment.items && (
                          <div className="mt-6 border-t border-neutral-100 pt-6">
                            <div className="divide-y divide-[#dbdfe9]">
                              {shipment.items.map((item: any) => (
                                <div
                                  key={item.id}
                                  className="py-4 flex items-center gap-4"
                                >
                                  {item.has_alert && (
                                    <div className="w-4 h-4 bg-[#bf0000] rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">
                                        !
                                      </span>
                                    </div>
                                  )}
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-12 h-12 rounded"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-[#191919] mb-1">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-[#4b5675]">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-[#4b5675] mb-1">
                                      {item.lot}
                                    </p>
                                    <Badge
                                      variant={
                                        item.status === "selected"
                                          ? "default"
                                          : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {item.status}
                                    </Badge>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-[#191919] font-medium">
                                      {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-[#191919] font-medium">
                                      {item.price}€
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-[#4b5675]">
                  No hay envíos disponibles
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
