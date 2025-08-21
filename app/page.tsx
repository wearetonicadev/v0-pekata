import { Search, User, ChevronDown, MoreHorizontal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface DashboardMetrics {
  totalLines: number
  selectedLines: { value: number; percentage: number }
  selectedLinesSecond: { value: number; percentage: number }
  employees: number
  authorizedOrders: number
  totalAmount: string
}

interface Category {
  name: string
  percentage: number
  color: string
}

interface TopProduct {
  id: number
  name: string
  units: string
  price: string
  color: string
}

interface PendingRequests {
  productChange: { count: number; label: string }
  attentionDeadline: { count: number; label: string }
}

interface OfficeShipment {
  id: string
  employee: string
  status: string
  date: string
  state: string
}

interface OfficeShipments {
  deliveryRatio: number
  shipments: OfficeShipment[]
}

interface HomeShipmentStatus {
  name: string
  count: number
  percentage: number
  color: string
}

interface HomeShipments {
  totalLines: number
  statuses: HomeShipmentStatus[]
}

interface Incidents {
  incidentRatio: number
  details: {
    brokenProducts: number
    missingProducts: number
    wrongProducts: number
    outOfStock: number
  }
}

interface SurveySegment {
  name: string
  count: number
  percentage: number | null
  color: string
}

interface SurveyResults {
  totalSurveyed: number
  nps: number
  averageScore: number
  segments: SurveySegment[]
}

async function getDashboardData() {
  // For local development, use localhost
  // For production, use the environment variable or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  
  console.log("🔍 [Dashboard] Using base URL:", baseUrl)

  try {
    // Single API call to get all dashboard data
    const response = await fetch(`${baseUrl}/api/dashboard`, { cache: "no-store" })
    
    if (!response.ok) {
      console.error(`Dashboard API call failed: ${response.url} - Status: ${response.status}`)
      throw new Error(`Failed to fetch dashboard data: ${response.status}`)
    }

    const dashboardData = await response.json()
    console.log("✅ [Dashboard] Successfully fetched all data from single endpoint")
    
    return dashboardData
  } catch (error) {
    console.error("Dashboard data fetch error:", error)
    return {
      metrics: {
        totalLines: 0,
        selectedLines: { value: 0, percentage: 0 },
        selectedLinesSecond: { value: 0, percentage: 0 },
        employees: 0,
        authorizedOrders: 0,
        totalAmount: "0€",
      },
      categories: [],
      topProducts: [],
      pendingRequests: {
        productChange: { count: 0, label: "empleados" },
        attentionDeadline: { count: 0, label: "empleados" },
      },
      officeShipments: {
        deliveryRatio: 0,
        shipments: [],
      },
      homeShipments: {
        totalLines: 0,
        statuses: [],
      },
      incidents: {
        incidentRatio: 0,
        details: {
          brokenProducts: 0,
          missingProducts: 0,
          wrongProducts: 0,
          outOfStock: 0,
        },
      },
      surveyResults: {
        totalSurveyed: 0,
        nps: 0,
        averageScore: 0,
        segments: [],
      },
    }
  }
}

export default async function Dashboard() {
  const {
    metrics,
    categories,
    topProducts,
    pendingRequests,
    officeShipments,
    homeShipments,
    incidents,
    surveyResults,
  } = await getDashboardData()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <h1 className="text-xl md:text-2xl font-bold text-[#191919]">Pekata</h1>
            <div className="md:hidden">
              <Search className="w-5 h-5 text-[#78829d]" />
            </div>
            <div className="hidden md:block relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78829d] w-4 h-4" />
              <Input placeholder="Buscar empleados..." className="pl-10 w-full bg-[#f8f8f8] border-[#e6e6e6]" />
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="hidden md:block text-sm text-[#78829d]">Última actualización 15-dic-2023 16:41</span>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[#78829d]" />
              <ChevronDown className="w-4 h-4 text-[#78829d]" />
            </div>
            <div className="md:hidden">
              <Menu className="w-5 h-5 text-[#78829d]" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 xl:w-80 bg-white border-r border-[#e6e6e6] min-h-screen">
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-[#78829d] mb-2">Dashboard / Campaña Nadal</div>
            </div>
            <nav className="space-y-2">
              <div className="text-sm font-medium text-[#78829d] mb-4">Campaña Nadal</div>
              <div className="flex items-center space-x-2 text-[#2e9858] bg-[#f0fdf4] px-3 py-2 rounded">
                <div className="w-2 h-2 bg-[#2e9858] rounded-full"></div>
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <Link
                href="/employees"
                className="flex items-center space-x-2 text-[#78829d] px-3 py-2 hover:bg-[#f8f8f8] rounded"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Employees</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden w-full bg-white border-b border-[#e6e6e6] px-4 py-2">
          <div className="text-xs text-[#78829d] mb-2">Dashboard</div>
          <div className="text-xs text-[#78829d] mb-3">Campaña Nadal</div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 text-[#2e9858] bg-[#f0fdf4] px-3 py-2 rounded text-sm">
              <div className="w-2 h-2 bg-[#2e9858] rounded-full"></div>
              <span>Dashboard</span>
            </div>
            <Link href="/employees" className="flex items-center space-x-2 text-[#78829d] px-3 py-2 text-sm">
              <User className="w-4 h-4" />
              <span>Empleados</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold text-[#191919]">Selección Campaña Nadal</h2>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Descargar</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">{metrics.totalLines}</div>
                <div className="text-xs md:text-sm text-[#78829d]">Total de líneas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">
                  {metrics.selectedLines.value}{" "}
                  <span className="text-sm md:text-base text-[#2e9858]">{metrics.selectedLines.percentage}%</span>
                </div>
                <div className="text-xs md:text-sm text-[#78829d]">Líneas seleccionadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">
                  {metrics.selectedLinesSecond.value}{" "}
                  <span className="text-sm md:text-base text-[#2e9858]">{metrics.selectedLinesSecond.percentage}%</span>
                </div>
                <div className="text-xs md:text-sm text-[#78829d]">Líneas seleccionadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">{metrics.employees}</div>
                <div className="text-xs md:text-sm text-[#78829d]">Empleados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">{metrics.authorizedOrders}</div>
                <div className="text-xs md:text-sm text-[#78829d]">Pedidos autorizados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-4 h-4 bg-[#1b84ff] rounded"></div>
                </div>
                <div className="text-2xl md:text-xl font-bold text-[#191919]">{metrics.totalAmount}</div>
                <div className="text-xs md:text-sm text-[#78829d]">Importe total</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold">Compras por categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-full max-w-32 h-32 md:max-w-24 md:h-24 relative mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                      {categories.map((category, index) => {
                        const circumference = 2 * Math.PI * 40
                        const strokeDasharray = `${(category.percentage / 100) * circumference} ${circumference}`
                        const strokeDashoffset = -categories
                          .slice(0, index)
                          .reduce((acc, cat) => acc + (cat.percentage / 100) * circumference, 0)

                        return (
                          <circle
                            key={category.name}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={category.color}
                            strokeWidth="8"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 50 50)"
                          />
                        )
                      })}
                    </svg>
                  </div>
                  <div className="space-y-2 md:space-y-1 text-sm md:text-xs">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span>{category.name}</span>
                        <span className="font-medium">{category.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold">Top 5 productos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-2">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: product.color }}
                        >
                          <span className="text-xs md:text-sm font-bold text-white">{product.id}</span>
                        </div>
                        <div>
                          <div className="text-sm md:text-base font-medium">{product.name}</div>
                          <div className="text-xs md:text-sm text-[#78829d]">{product.units}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm md:text-base font-medium">{product.units}</div>
                        <div className="text-xs md:text-sm text-[#78829d]">{product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold">Peticiones pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm md:text-base text-[#78829d]">Cambio de producto</div>
                  <div className="text-2xl md:text-xl font-bold">
                    {pendingRequests.productChange.count}{" "}
                    <span className="text-sm md:text-base text-[#78829d]">{pendingRequests.productChange.label}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm md:text-base text-[#78829d]">Fecha límite de atención</div>
                  <div className="text-2xl md:text-xl font-bold">
                    {pendingRequests.attentionDeadline.count}{" "}
                    <span className="text-sm md:text-base text-[#78829d]">
                      {pendingRequests.attentionDeadline.label}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold">Envíos a Oficina</CardTitle>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </Button>
                </div>
                <div className="text-sm text-[#78829d]">Ratio de entrega: {officeShipments.deliveryRatio}%</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="hidden md:flex justify-between font-medium">
                    <span>Pedido</span>
                    <span>Empleado</span>
                    <span>Estado</span>
                    <span>Fecha</span>
                    <span>Estado</span>
                  </div>
                  <div className="space-y-2">
                    {officeShipments.shipments.map((shipment, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:justify-between md:items-center py-1 space-y-1 md:space-y-0"
                      >
                        <div className="flex justify-between md:contents">
                          <span className="font-medium md:font-normal">{shipment.id}</span>
                          <span className="md:hidden">
                            {shipment.employee} - {shipment.status}
                          </span>
                        </div>
                        <div className="hidden md:contents">
                          <span>{shipment.employee}</span>
                          <span>{shipment.status}</span>
                        </div>
                        <div className="flex justify-between md:contents">
                          <span>{shipment.date}</span>
                          <Badge className="bg-[#2e9858] text-white text-xs md:text-sm">{shipment.state}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-[#2e9858] text-sm md:text-base">
                    Mostrar más
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold">Envíos a Domicilio</CardTitle>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </Button>
                </div>
                <div className="text-sm text-[#78829d]">Total líneas: {homeShipments.totalLines}</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                      {homeShipments.statuses.map((status, index) => {
                        const circumference = 2 * Math.PI * 35
                        const strokeDasharray = `${(status.percentage / 100) * circumference} ${circumference}`
                        const strokeDashoffset = -homeShipments.statuses
                          .slice(0, index)
                          .reduce((acc, stat) => acc + (stat.percentage / 100) * circumference, 0)

                        return (
                          <circle
                            key={status.name}
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke={status.color}
                            strokeWidth="8"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 50 50)"
                          />
                        )
                      })}
                    </svg>
                  </div>
                  <div className="space-y-1 text-xs md:text-sm">
                    {homeShipments.statuses.map((status) => (
                      <div key={status.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                        <span>{status.name}</span>
                        <span className="font-medium">
                          {status.count} {status.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold">Incidencias</CardTitle>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </Button>
                </div>
                <div className="text-sm text-[#78829d]">Incidencias respecto envíos: {incidents.incidentRatio}%</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#2e9858"
                        strokeWidth="8"
                        strokeDasharray="95 5"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#bf0000"
                        strokeWidth="8"
                        strokeDasharray="5 95"
                        strokeDashoffset="-95"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-xs md:text-sm">
                    <div>Productos rotos: {incidents.details.brokenProducts}</div>
                    <div>Productos que faltan: {incidents.details.missingProducts}</div>
                    <div>Productos equivocados: {incidents.details.wrongProducts}</div>
                    <div>Out of stock: {incidents.details.outOfStock}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold">Resultados encuesta</CardTitle>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </Button>
                </div>
                <div className="text-sm text-[#78829d]">Total de encuestados: {surveyResults.totalSurveyed}</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                      {surveyResults.segments.map((segment, index) => {
                        if (!segment.percentage) return null
                        const circumference = 2 * Math.PI * 35
                        const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`
                        const strokeDashoffset = -surveyResults.segments
                          .slice(0, index)
                          .reduce((acc, seg) => acc + ((seg.percentage || 0) / 100) * circumference, 0)

                        return (
                          <circle
                            key={segment.name}
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="8"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 50 50)"
                          />
                        )
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm md:text-lg font-bold">NPS = {surveyResults.nps}</div>
                        <div className="text-xs text-[#78829d]">Nota promedio = {surveyResults.averageScore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs md:text-sm">
                    {surveyResults.segments.map((segment) => (
                      <div key={segment.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                        <span>{segment.name}</span>
                        <span className="font-medium">
                          {segment.count} {segment.percentage ? `${segment.percentage}%` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-8 md:mt-12">
        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Pekata</h3>
              <div className="space-y-2 text-sm">
                <div>Contacta con nosotros</div>
                <div>📞 934 567 234</div>
                <div>✉️ atencioncliente@pekata.com</div>
                <div>✉️ atencioncliente@pekata.com</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-sm">
              <div>
                <div className="font-semibold mb-2">Customer service</div>
                <div className="space-y-1">
                  <div>Preguntas frecuentes</div>
                  <div>Contacto</div>
                  <div>Condiciones de compra</div>
                  <div>Envíos y devoluciones</div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Sobre Nosotros</div>
                <div className="space-y-1">
                  <div>Quiénes somos</div>
                  <div>Formas de pago</div>
                  <div>Presupuesto a medida</div>
                  <div>Listas personalizadas</div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Sobre Nosotros</div>
                <div className="space-y-1">
                  <div>Quiénes somos</div>
                  <div>Formas de pago</div>
                  <div>Presupuesto a medida</div>
                  <div>Listas personalizadas</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#4b5675] mt-6 md:mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs space-y-2 md:space-y-0">
            <div>Copyright © 2023, Pekata.</div>
            <div className="flex flex-wrap gap-4">
              <span>Política de privacidad</span>
              <span>Aviso legal</span>
              <span>Términos y condiciones</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
