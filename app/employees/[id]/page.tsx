"use client";

import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Truck,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, use } from "react";

interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  lot: string;
  status: string;
  quantity: string;
  price: number;
  hasAlert?: boolean;
}

interface CartSummary {
  cartStatus: string;
  totalTokens: number;
  usedTokens: number;
  extraTokens: number;
  closureDate: string;
  totalItems: number;
}

interface CartData {
  employeeId: string;
  items: CartItem[];
  summary: CartSummary;
}

interface ShipmentTimeline {
  status: string;
  date: string;
}

interface Shipment {
  id: string;
  name: string;
  carrier: string;
  status: string;
  statusDate: string;
  items: CartItem[];
  timeline: ShipmentTimeline[];
}

interface ShipmentsData {
  employeeId: string;
  shipments: Shipment[];
}

interface EmployeeDetail {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  externalId: string;
}

export default function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [shipmentsData, setShipmentsData] = useState<ShipmentsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"seleccion" | "envio">(
    "seleccion"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [expandedShipments, setExpandedShipments] = useState<Set<string>>(
    new Set()
  );

  const fetchEmployeeDetail = async () => {
    const response = await fetch(`/api/employees/${id}`);
    if (!response.ok) throw new Error("Failed to fetch employee details");
    return response.json();
  };

  const fetchCartData = async () => {
    const response = await fetch(`/api/employees/${id}/cart`);
    if (!response.ok) throw new Error("Failed to fetch cart data");
    return response.json();
  };

  const fetchShipmentsData = async () => {
    const response = await fetch(`/api/employees/${id}/shipments`);
    if (!response.ok) throw new Error("Failed to fetch shipments data");
    return response.json();
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [employeeData, cartResponse, shipmentsResponse] =
          await Promise.all([
            fetchEmployeeDetail(),
            fetchCartData(),
            fetchShipmentsData(),
          ]);

        setEmployee(employeeData);
        setCartData(cartResponse);
        setShipmentsData(shipmentsResponse);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const openShippingStatus = (shipment: Shipment) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e9858] mx-auto mb-4"></div>
          <p className="text-[#4b5675]">Cargando detalles del empleado...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#2e9858] hover:bg-[#1f503b]"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!employee || !cartData || !shipmentsData) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4b5675]">
            No se encontraron detalles del empleado
          </p>
          <Link href="/employees">
            <Button className="mt-4 bg-[#2e9858] hover:bg-[#1f503b]">
              Volver a empleados
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#4b5675] mb-6">
        <Link href="/" className="hover:text-[#1b84ff]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/employees" className="hover:text-[#1b84ff]">
          Empleados
        </Link>
        <span>/</span>
        <span className="text-[#191919]">{employee.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6 text-[#4b5675]" asChild>
        <Link href="/employees">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Employee Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-[#dbdfe9] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#f1f1f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#4b5675]" />
              </div>
              <h2 className="text-lg font-semibold text-[#191919] mb-1">
                {employee.name}
              </h2>
              <p className="text-sm text-[#4b5675]">{employee.email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#4b5675]">
                  Teléfono
                </label>
                <p className="text-[#191919]">{employee.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#4b5675]">
                  External ID
                </label>
                <p className="text-[#191919]">{employee.externalId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex border-b border-[#dbdfe9] mb-6">
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
              <div className="bg-white rounded-lg border border-[#dbdfe9] mb-6">
                <div className="p-6 border-b border-[#dbdfe9]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#191919]">
                      Carrito
                    </h3>
                    <span className="text-sm text-[#4b5675]">
                      {cartData.summary.totalItems} Items
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#dbdfe9]">
                  {cartData.items.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4">
                      {item.hasAlert && (
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
                            item.status === "Seleccionado"
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
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Delivery Address */}
                <div className="bg-white rounded-lg border border-[#dbdfe9] p-6">
                  <h3 className="text-lg font-semibold text-[#191919] mb-4">
                    Dirección de entrega
                  </h3>
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-[#4b5675] mx-auto mb-4" />
                    <p className="text-[#4b5675] mb-2">
                      No hay dirección de entrega
                    </p>
                    <Button variant="link" className="text-[#1b84ff] p-0">
                      Introducir manualmente
                    </Button>
                  </div>
                </div>

                {/* Additional Payment */}
                <div className="bg-white rounded-lg border border-[#dbdfe9] p-6">
                  <h3 className="text-lg font-semibold text-[#191919] mb-4">
                    Pago adicional
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Estado del carrito</span>
                      <Badge className="bg-[#2e9858] text-white">
                        {cartData.summary.cartStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Tokens totales</span>
                      <span className="text-[#191919] font-medium">
                        {cartData.summary.totalTokens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Tokens Usados</span>
                      <span className="text-[#191919] font-medium">
                        {cartData.summary.usedTokens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Tokens Extra</span>
                      <span className="text-[#191919] font-medium">
                        {cartData.summary.extraTokens} (3.5€)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4b5675]">Fecha de cierre</span>
                      <span className="text-[#191919] font-medium">
                        {cartData.summary.closureDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-[#dbdfe9]">
              <div className="divide-y divide-[#dbdfe9]">
                {shipmentsData.shipments.map((shipment, index) => {
                  const isExpanded = expandedShipments.has(shipment.id + index);
                  return (
                    <div key={index} className="p-6">
                      <div className="flex items-center gap-4">
                        <Truck className="w-8 h-8 text-[#4b5675]" />
                        <div className="flex-1">
                          <h4 className="font-medium text-[#191919] mb-1">
                            {shipment.name}
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
                            {shipment.carrier}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#4b5675] mb-1">Status</p>
                          <Badge
                            variant={
                              shipment.status === "Entregado"
                                ? "default"
                                : "secondary"
                            }
                            className={`text-xs ${
                              shipment.status === "Entregado"
                                ? "bg-[#2e9858] text-white"
                                : "bg-[#4b5675] text-white"
                            }`}
                          >
                            {shipment.status} ({shipment.statusDate})
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
                          <Button variant="link" className="text-[#2e9858] p-0">
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

                      {isExpanded && (
                        <div className="mt-6 border-t border-[#dbdfe9] pt-6">
                          <div className="divide-y divide-[#dbdfe9]">
                            {shipment.items.map((item) => (
                              <div
                                key={item.id}
                                className="py-4 flex items-center gap-4"
                              >
                                {item.hasAlert && (
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
                                      item.status === "Seleccionado"
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
                                    {item.price}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
