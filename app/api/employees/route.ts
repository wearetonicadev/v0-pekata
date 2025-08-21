import { type NextRequest, NextResponse } from "next/server"

// Mock employees data
const employees = [
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
  {
    employeeId: "emp_002",
    name: "Laura Pérez",
    email: "laura.perez@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "Enviado",
    incidencia: "Sí",
    petition: "Datos de dirección",
  },
  {
    employeeId: "emp_003",
    name: "Javier Fernández",
    email: "javier.fernandez@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "Entregado",
    incidencia: "Sí",
    petition: "Cambio de producto",
  },
  {
    employeeId: "emp_004",
    name: "Ana Gómez",
    email: "ana.gomez@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "En almacén",
    incidencia: "No",
    petition: "Datos de dirección",
  },
  {
    employeeId: "emp_005",
    name: "Sofía Ramírez",
    email: "sofia.ramirez@gmail.com",
    id: "123456789",
    carritoState: "Pendiente",
    logisticState: "Pendiente",
    incidencia: "Sí",
    petition: "Datos de dirección",
  },
  {
    employeeId: "emp_006",
    name: "Miguel Torres",
    email: "miguel.torres@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "Entregado",
    incidencia: "No",
    petition: "Datos de dirección",
  },
  {
    employeeId: "emp_007",
    name: "Claudia Sánchez",
    email: "claudia.sanchez@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "En almacén",
    incidencia: "Sí",
    petition: "Cambio de producto",
  },
  {
    employeeId: "emp_008",
    name: "Fernando López",
    email: "fernando.lopez@gmail.com",
    id: "123456789",
    carritoState: "Pendiente",
    logisticState: "Pendiente",
    incidencia: "No",
    petition: "Cambio de producto",
  },
  {
    employeeId: "emp_009",
    name: "Valeria Díaz",
    email: "valeria.diaz@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "En almacén",
    incidencia: "Sí",
    petition: "Datos de dirección",
  },
  {
    employeeId: "emp_010",
    name: "Andrés Ruiz",
    email: "andres.ruiz@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "Entregado",
    incidencia: "Sí",
    petition: "Cambio de producto",
  },
  // Add more employees for pagination testing
  {
    employeeId: "emp_011",
    name: "María González",
    email: "maria.gonzalez@gmail.com",
    id: "123456789",
    carritoState: "Activo",
    logisticState: "Enviado",
    incidencia: "No",
    petition: "Cambio de producto",
  },
  {
    employeeId: "emp_012",
    name: "Roberto Silva",
    email: "roberto.silva@gmail.com",
    id: "123456789",
    carritoState: "Pendiente",
    logisticState: "Pendiente",
    incidencia: "Sí",
    petition: "Datos de dirección",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get query parameters
  const search = searchParams.get("search") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const sortField = searchParams.get("sortField") || ""
  const sortDirection = searchParams.get("sortDirection") || "asc"

  // Get filter parameters
  const carritoStateFilter = searchParams.get("carritoState")?.split(",") || []
  const logisticStateFilter = searchParams.get("logisticState")?.split(",") || []
  const incidenciaFilter = searchParams.get("incidencia")?.split(",") || []

  let filteredEmployees = [...employees]

  // Apply search filter
  if (search.trim()) {
    const query = search.toLowerCase()
    filteredEmployees = filteredEmployees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.carritoState.toLowerCase().includes(query) ||
        employee.logisticState.toLowerCase().includes(query) ||
        employee.petition.toLowerCase().includes(query),
    )
  }

  // Apply filters
  if (carritoStateFilter.length > 0) {
    filteredEmployees = filteredEmployees.filter((emp) => carritoStateFilter.includes(emp.carritoState))
  }
  if (logisticStateFilter.length > 0) {
    filteredEmployees = filteredEmployees.filter((emp) => logisticStateFilter.includes(emp.logisticState))
  }
  if (incidenciaFilter.length > 0) {
    filteredEmployees = filteredEmployees.filter((emp) => incidenciaFilter.includes(emp.incidencia))
  }

  // Apply sorting
  if (sortField) {
    filteredEmployees.sort((a, b) => {
      let aValue = a[sortField as keyof typeof a]
      let bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex)

  return NextResponse.json({
    employees: paginatedEmployees,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredEmployees.length / limit),
      totalItems: filteredEmployees.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < filteredEmployees.length,
      hasPreviousPage: page > 1,
    },
    filters: {
      availableCarritoStates: [...new Set(employees.map((emp) => emp.carritoState))],
      availableLogisticStates: [...new Set(employees.map((emp) => emp.logisticState))],
      availableIncidencias: [...new Set(employees.map((emp) => emp.incidencia))],
    },
  })
}
