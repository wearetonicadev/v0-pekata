"use client";

import { EmployeesTable } from "@/app/employees/components/EmployeesTable";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function EmpleadosPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Breadcrumb className="text-[#4b5675]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Empleados</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-xl font-semibold text-[#191919] mb-1">Empleados</h2>

      <EmployeesTable />
    </div>
  );
}
