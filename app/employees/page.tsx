import { Search, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import EmployeesClient from "./components/EmployeesClient";

interface Employee {
  employeeId: string;
  name: string;
  email: string;
  id: string;
  carritoState: string;
  logisticState: string;
  incidencia: string;
  petition: string;
}

interface EmployeesResponse {
  employees: Employee[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    availableCarritoStates: string[];
    availableLogisticStates: string[];
    availableIncidencias: string[];
  };
}

async function getInitialEmployeesData(): Promise<EmployeesResponse> {
  // For local development, use localhost
  // For production, use the environment variable or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  console.log("🔍 [Employees] Using base URL:", baseUrl);

  try {
    console.log(
      "[v0] Fetching employees from:",
      `${baseUrl}/api/employees?page=1&limit=10`
    );
    const response = await fetch(`${baseUrl}/api/employees?page=1&limit=10`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(
        "[v0] Response not ok:",
        response.status,
        response.statusText
      );
      throw new Error(`Failed to fetch employees: ${response.status}`);
    }

    const data = await response.json();
    console.log("[v0] Successfully fetched employees data");
    return data;
  } catch (error) {
    console.error("Initial employees data fetch error:", error);
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
    };
  }
}

export default async function EmpleadosPage() {
  const initialData = await getInitialEmployeesData();

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <EmployeesClient initialData={initialData} />
      </div>
    </div>
  );
}
