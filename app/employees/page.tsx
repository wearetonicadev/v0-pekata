import { Search, User, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import EmployeesClient from "./components/EmployeesClient"

interface Employee {
  employeeId: string
  name: string
  email: string
  id: string
  carritoState: string
  logisticState: string
  incidencia: string
  petition: string
}

interface EmployeesResponse {
  employees: Employee[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  filters: {
    availableCarritoStates: string[]
    availableLogisticStates: string[]
    availableIncidencias: string[]
  }
}

async function getInitialEmployeesData(): Promise<EmployeesResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

  try {
    console.log("[v0] Fetching employees from:", `${baseUrl}/api/employees?page=1&limit=10`)
    const response = await fetch(`${baseUrl}/api/employees?page=1&limit=10`, {
      cache: "no-store",
    })

    if (!response.ok) {
      console.log("[v0] Response not ok:", response.status, response.statusText)
      throw new Error(`Failed to fetch employees: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Successfully fetched employees data")
    return data
  } catch (error) {
    console.error("Initial employees data fetch error:", error)
    return {
      employees: [
        {
          employeeId: "emp_001",
          name: "Carlos Martínez",
          email: "carlos.martinez@gmail.com",
          id: "123456789",
          carritoState: "Activo",
          logisticState: "Enviado",
          incidencia: "Sí",
          petition: "Cambio de producto",
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        availableCarritoStates: ["Activo", "Pendiente"],
        availableLogisticStates: ["Enviado", "Entregado", "En almacén"],
        availableIncidencias: ["Sí", "No"],
      },
    }
  }
}

export default async function EmpleadosPage() {
  const initialData = await getInitialEmployeesData()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="bg-white border-b border-[#e6e6e6] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-[#191919]">Pekata</h1>
            <div className="relative hidden md:block flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78829d] w-4 h-4" />
              <Input
                placeholder="Buscar empleados..."
                className="pl-10 w-full bg-[#f8f8f8] border-[#e6e6e6]"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#78829d]">Última actualización 15-dic-2023 16:41</span>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[#78829d]" />
              <ChevronDown className="w-4 h-4 text-[#78829d]" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 xl:w-80 bg-white border-r border-[#e6e6e6] min-h-screen">
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-[#78829d] mb-2">Dashboard / Empleados</div>
            </div>
            <nav className="space-y-2">
              <div className="text-sm font-medium text-[#78829d] mb-4">Campaña Nadal</div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-[#78829d] px-3 py-2 hover:bg-[#f8f8f8] rounded"
              >
                <div className="w-2 h-2 bg-[#78829d] rounded-full"></div>
                <span className="text-sm">Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2 text-[#2e9858] bg-[#f0fdf4] px-3 py-2 rounded">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Empleados</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content - Client Component */}
        <main className="flex-1 p-6">
          <EmployeesClient initialData={initialData} />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-12">
        <div className="px-6 py-8">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Pekata</h3>
              <div className="space-y-2 text-sm">
                <div>Contacta con nosotros</div>
                <div>📞 930 467 474</div>
                <div>✉️ lotesnavidad@pekata.com</div>
                <div>✉️ lotesnavidad@pekata.com</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 text-sm">
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
                  <div>Lotes personalizadas</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#4b5675] mt-8 pt-4 flex justify-between text-xs">
            <div>Copyright © 2025. Pekata.</div>
            <div className="space-x-4">
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
