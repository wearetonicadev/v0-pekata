"use client"

import Link from "next/link"
import { ArrowLeft, User, Phone, MapPin, Truck, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface CartItem {
  id: number
  name: string
  description: string
  image: string
  lot: string
  status: string
  quantity: string
  price: number
  hasAlert?: boolean
}

interface CartSummary {
  cartStatus: string
  totalTokens: number
  usedTokens: number
  extraTokens: number
  closureDate: string
  totalItems: number
}

interface CartData {
  employeeId: string
  items: CartItem[]
  summary: CartSummary
}

interface ShipmentTimeline {
  status: string
  date: string
}

interface Shipment {
  id: string
  name: string
  carrier: string
  status: string
  statusDate: string
  items: CartItem[]
  timeline: ShipmentTimeline[]
}

interface ShipmentsData {
  employeeId: string
  shipments: Shipment[]
}

interface EmployeeDetail {
  employeeId: string
  name: string
  email: string
  phone: string
  externalId: string
}

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null)
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [shipmentsData, setShipmentsData] = useState<ShipmentsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"seleccion" | "envio">("seleccion")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [expandedShipments, setExpandedShipments] = useState<Set<string>>(new Set())

  const fetchEmployeeDetail = async () => {
    const response = await fetch(`/api/employees/${params.id}`)
    if (!response.ok) throw new Error("Failed to fetch employee details")
    return response.json()
  }

  const fetchCartData = async () => {
    const response = await fetch(`/api/employees/${params.id}/cart`)
    if (!response.ok) throw new Error("Failed to fetch cart data")
    return response.json()
  }

  const fetchShipmentsData = async () => {
    const response = await fetch(`/api/employees/${params.id}/shipments`)
    if (!response.ok) throw new Error("Failed to fetch shipments data")
    return response.json()
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [employeeData, cartResponse, shipmentsResponse] = await Promise.all([
          fetchEmployeeDetail(),
          fetchCartData(),
          fetchShipmentsData(),
        ])

        setEmployee(employeeData)
        setCartData(cartResponse)
        setShipmentsData(shipmentsResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [params.id])

  const openShippingStatus = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    setIsDrawerOpen(true)
  }

  const toggleShipmentExpansion = (shipmentId: string) => {
    const newExpanded = new Set(expandedShipments)
    if (newExpanded.has(shipmentId)) {
      newExpanded.delete(shipmentId)
    } else {
      newExpanded.add(shipmentId)
    }
    setExpandedShipments(newExpanded)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e9858] mx-auto mb-4"></div>
          <p className="text-[#4b5675]">Cargando detalles del empleado...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#2e9858] hover:bg-[#1f503b]">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  if (!employee || !cartData || !shipmentsData) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4b5675]">No se encontraron detalles del empleado</p>
          <Link href="/employees">
            <Button className="mt-4 bg-[#2e9858] hover:bg-[#1f503b]">Volver a empleados</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbdfe9] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-[#191919]">Pekata</h1>
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Buscar empleados..."
                className="w-full px-4 py-2 bg-[#f1f1f4] border border-[#dbdfe9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1b84ff]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-[#4b5675]">
              <User className="w-4 h-4 mr-2" />
              Usuario
            </Button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 xl:w-80 bg-white border-r border-[#dbdfe9] min-h-screen">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#4b5675] mb-4">Campaña Nadal</h3>
            </div>
            <nav className="space-y-2">
              <Link href="/" className="flex items-center gap-3 px-3 py-2 text-[#4b5675] hover:bg-[#f1f1f4] rounded-lg">
                <div className="w-2 h-2 bg-[#4b5675] rounded-full"></div>
                Dashboard
              </Link>
              <Link
                href="/employees"
                className="flex items-center gap-3 px-3 py-2 text-[#2e9858] bg-[#f7faf8] rounded-lg"
              >
                <div className="w-2 h-2 bg-[#2e9858] rounded-full"></div>
                Empleados
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
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
                  <h2 className="text-lg font-semibold text-[#191919] mb-1">{employee.name}</h2>
                  <p className="text-sm text-[#4b5675]">{employee.email}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#4b5675]">Teléfono</label>
                    <p className="text-[#191919]">{employee.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#4b5675]">External ID</label>
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
                        <h3 className="text-lg font-semibold text-[#191919]">Carrito</h3>
                        <span className="text-sm text-[#4b5675]">{cartData.summary.totalItems} Items</span>
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
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-[#191919] mb-1">{item.name}</h4>
                            <p className="text-sm text-[#4b5675]">{item.description}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#4b5675] mb-1">{item.lot}</p>
                            <Badge
                              variant={item.status === "Seleccionado" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#191919] font-medium">{item.quantity}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#191919] font-medium">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Delivery Address */}
                    <div className="bg-white rounded-lg border border-[#dbdfe9] p-6">
                      <h3 className="text-lg font-semibold text-[#191919] mb-4">Dirección de entrega</h3>
                      <div className="text-center py-8">
                        <MapPin className="w-12 h-12 text-[#4b5675] mx-auto mb-4" />
                        <p className="text-[#4b5675] mb-2">No hay dirección de entrega</p>
                        <Button variant="link" className="text-[#1b84ff] p-0">
                          Introducir manualmente
                        </Button>
                      </div>
                    </div>

                    {/* Additional Payment */}
                    <div className="bg-white rounded-lg border border-[#dbdfe9] p-6">
                      <h3 className="text-lg font-semibold text-[#191919] mb-4">Pago adicional</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Estado del carrito</span>
                          <Badge className="bg-[#2e9858] text-white">{cartData.summary.cartStatus}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Tokens totales</span>
                          <span className="text-[#191919] font-medium">{cartData.summary.totalTokens}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Tokens Usados</span>
                          <span className="text-[#191919] font-medium">{cartData.summary.usedTokens}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Tokens Extra</span>
                          <span className="text-[#191919] font-medium">{cartData.summary.extraTokens} (3.5€)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4b5675]">Fecha de cierre</span>
                          <span className="text-[#191919] font-medium">{cartData.summary.closureDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg border border-[#dbdfe9]">
                  <div className="divide-y divide-[#dbdfe9]">
                    {shipmentsData.shipments.map((shipment, index) => {
                      const isExpanded = expandedShipments.has(shipment.id + index)
                      return (
                        <div key={index} className="p-6">
                          <div className="flex items-center gap-4">
                            <Truck className="w-8 h-8 text-[#4b5675]" />
                            <div className="flex-1">
                              <h4 className="font-medium text-[#191919] mb-1">{shipment.name}</h4>
                              <p className="text-sm text-[#4b5675]">{shipment.id}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-[#4b5675] mb-1">Enviado por</p>
                              <p className="text-sm text-[#191919] font-medium">{shipment.carrier}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-[#4b5675] mb-1">Status</p>
                              <Badge
                                variant={shipment.status === "Entregado" ? "default" : "secondary"}
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
                                onClick={() => toggleShipmentExpansion(shipment.id + index)}
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
                                  <div key={item.id} className="py-4 flex items-center gap-4">
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
                                      <h4 className="font-medium text-[#191919] mb-1">{item.name}</h4>
                                      <p className="text-sm text-[#4b5675]">{item.description}</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-[#4b5675] mb-1">{item.lot}</p>
                                      <Badge
                                        variant={item.status === "Seleccionado" ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {item.status}
                                      </Badge>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-[#191919] font-medium">{item.quantity}</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-[#191919] font-medium">{item.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Shipping Status Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-80" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-xl">
            <div className="p-6 border-b border-[#dbdfe9]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#191919]">Estados</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)} className="p-1">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {selectedShipment && (
                <div className="space-y-4">
                  {selectedShipment.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-[#4b5675] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#191919] mb-1">{event.status}</p>
                        <p className="text-xs text-[#4b5675]">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#191919] text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Pekata</h3>
              <div className="space-y-4">
                <h4 className="font-semibold">Contacta con nosotros</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    930 467 474
                  </div>
                  <p>lotesnavidad@pekata.com</p>
                  <p>lotesnavidad@pekata.com</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer service</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Preguntas frecuentes</p>
                <p>Contacto</p>
                <p>Condiciones de compra</p>
                <p>Envíos y devoluciones</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sobre Nosotros</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Quienes somos</p>
                <p>Formas de pago</p>
                <p>Presupuesto a medida</p>
                <p>Lotes personalizados</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>Copyright © 2025. Pekata.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-white">
                Aviso legal
              </a>
              <a href="#" className="hover:text-white">
                Términos y condiciones
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
