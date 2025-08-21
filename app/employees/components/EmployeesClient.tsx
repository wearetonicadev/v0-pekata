"use client"
import { useState, useEffect } from "react"
import { Search, User, ChevronDown, Filter, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type SortField = "name" | "email" | "id" | "carritoState" | "logisticState" | "incidencia" | "petition"
type SortDirection = "asc" | "desc"

interface Filters {
  carritoState: string[]
  logisticState: string[]
  incidencia: string[]
}

interface SortOption {
  label: string
  field: SortField
  direction: SortDirection
}

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

interface EmployeesClientProps {
  initialData: EmployeesResponse
}

export default function EmployeesClient({ initialData }: EmployeesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const [filters, setFilters] = useState<Filters>({
    carritoState: [],
    logisticState: [],
    incidencia: [],
  })

  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const [employeesData, setEmployeesData] = useState<EmployeesResponse>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sortOptions: SortOption[] = [
    { label: "Nombre (A-Z)", field: "name", direction: "asc" },
    { label: "Nombre (Z-A)", field: "name", direction: "desc" },
    { label: "Email (A-Z)", field: "email", direction: "asc" },
    { label: "Email (Z-A)", field: "email", direction: "desc" },
    { label: "Estado carrito", field: "carritoState", direction: "asc" },
    { label: "Estado logístico", field: "logisticState", direction: "asc" },
    { label: "Incidencia", field: "incidencia", direction: "asc" },
  ]

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      })

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim())
      }

      if (sortField) {
        params.append("sortField", sortField)
        params.append("sortDirection", sortDirection)
      }

      if (filters.carritoState.length > 0) {
        params.append("carritoState", filters.carritoState.join(","))
      }
      if (filters.logisticState.length > 0) {
        params.append("logisticState", filters.logisticState.join(","))
      }
      if (filters.incidencia.length > 0) {
        params.append("incidencia", filters.incidencia.join(","))
      }

      const response = await fetch(`/api/employees?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch employees")
      }

      const data: EmployeesResponse = await response.json()
      setEmployeesData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Skip initial fetch since we have server-side data
    if (currentPage === 1 && !searchQuery && !sortField && Object.values(filters).every((arr) => arr.length === 0)) {
      return
    }
    fetchEmployees()
  }, [currentPage, searchQuery, sortField, sortDirection, filters])

  const handleSortSelect = (option: SortOption) => {
    setSortField(option.field)
    setSortDirection(option.direction)
    setCurrentPage(1)
    setShowSortDropdown(false)
  }

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      carritoState: [],
      logisticState: [],
      incidencia: [],
    })
    setCurrentPage(1)
  }

  const hasActiveFilters = Object.values(filters).some((filterArray) => filterArray.length > 0)

  const currentEmployees = employeesData?.employees || []
  const totalPages = employeesData?.pagination.totalPages || 1
  const totalItems = employeesData?.pagination.totalItems || 0

  const getCurrentSortLabel = () => {
    if (!sortField) return "Sin ordenar"
    const option = sortOptions.find((opt) => opt.field === sortField && opt.direction === sortDirection)
    return option?.label || "Personalizado"
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchEmployees} className="bg-[#2e9858] hover:bg-[#1f503b]">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78829d] w-4 h-4" />
          <Input
            placeholder="Buscar empleados..."
            className="pl-10 w-full bg-white border-[#e6e6e6]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#191919] mb-1">Empleados</h2>
            <p className="text-sm text-[#78829d]">
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  Mostrando {currentEmployees.length} de {totalItems} empleados
                  {searchQuery && ` (filtrado por "${searchQuery}")`}
                  {hasActiveFilters && ` (con filtros aplicados)`}
                </>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                disabled={loading}
              >
                <span>Ordenar: {getCurrentSortLabel()}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#f8f8f8] rounded"
                      onClick={() => {
                        setSortField(null)
                        setSortDirection("asc")
                        setShowSortDropdown(false)
                      }}
                    >
                      Sin ordenar
                    </button>
                    {sortOptions.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f8f8f8] rounded ${
                          sortField === option.field && sortDirection === option.direction
                            ? "bg-[#f1f8ff] text-[#4370a8]"
                            : ""
                        }`}
                        onClick={() => handleSortSelect(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className={`flex items-center space-x-2 ${hasActiveFilters ? "bg-[#4370a8] text-white border-[#4370a8]" : "bg-transparent"}`}
              onClick={() => setShowFilterModal(true)}
              disabled={loading}
            >
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
              {hasActiveFilters && (
                <span className="bg-white text-[#4370a8] rounded-full px-2 py-0.5 text-xs font-medium">
                  {Object.values(filters).flat().length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2e9858]"></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f8f8] border-b border-[#e6e6e6]">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">Empleado</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">ID Login</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">Estado carrito</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">Estado logístico</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">Incidencia</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]">Petición</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-[#78829d]"></th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, index) => (
                  <tr key={index} className="border-b border-[#f1f1f4] hover:bg-[#f8f8f8]">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#f1f8ff] rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-[#4370a8]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#191919]">{employee.name}</div>
                          <div className="text-xs text-[#78829d]">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#191919]">{employee.id}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#191919]">{employee.carritoState}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#191919]">{employee.logisticState}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#191919]">{employee.incidencia}</td>
                    <td className="px-6 py-4 text-sm text-[#78829d]">{employee.petition}</td>
                    <td className="px-6 py-4">
                      <Link href={`/employees/${employee.employeeId}`}>
                        <Button variant="link" size="sm" className="text-[#4370a8] p-0">
                          Ver
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#78829d]">
                    {searchQuery || hasActiveFilters
                      ? `No se encontraron empleados que coincidan con los criterios de búsqueda`
                      : "No hay empleados disponibles"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {currentEmployees.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#e6e6e6]">
            <div className="text-sm text-[#78829d]">
              {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                }

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="sm"
                    className={currentPage === pageNum ? "bg-[#4370a8] text-white border-[#4370a8]" : ""}
                    onClick={() => setCurrentPage(pageNum)}
                    disabled={loading}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && <span className="text-sm text-[#78829d]">...</span>}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || loading}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilterModal(false)} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#191919]">Filtros</h3>
                <div className="flex items-center space-x-3">
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#4370a8]">
                      Limpiar filtros
                    </Button>
                  )}
                  <button onClick={() => setShowFilterModal(false)} className="text-[#78829d] hover:text-[#191919]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#191919] mb-3 block">Estado carrito</label>
                  <div className="space-y-3">
                    {employeesData?.filters.availableCarritoStates.map((state) => (
                      <label key={state} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.carritoState.includes(state)}
                          onChange={() => handleFilterChange("carritoState", state)}
                          className="rounded border-[#e6e6e6] text-[#4370a8] focus:ring-[#4370a8]"
                        />
                        <span className="text-sm text-[#191919]">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#191919] mb-3 block">Estado logístico</label>
                  <div className="space-y-3">
                    {employeesData?.filters.availableLogisticStates.map((state) => (
                      <label key={state} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.logisticState.includes(state)}
                          onChange={() => handleFilterChange("logisticState", state)}
                          className="rounded border-[#e6e6e6] text-[#4370a8] focus:ring-[#4370a8]"
                        />
                        <span className="text-sm text-[#191919]">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#191919] mb-3 block">Incidencia</label>
                  <div className="space-y-3">
                    {employeesData?.filters.availableIncidencias.map((state) => (
                      <label key={state} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.incidencia.includes(state)}
                          onChange={() => handleFilterChange("incidencia", state)}
                          className="rounded border-[#e6e6e6] text-[#4370a8] focus:ring-[#4370a8]"
                        />
                        <span className="text-sm text-[#191919]">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-[#e6e6e6]">
                <Button variant="outline" onClick={() => setShowFilterModal(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-[#4370a8] hover:bg-[#2e5a8a] text-white"
                  onClick={() => setShowFilterModal(false)}
                >
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSortDropdown && <div className="fixed inset-0 z-5" onClick={() => setShowSortDropdown(false)} />}
    </>
  )
}
