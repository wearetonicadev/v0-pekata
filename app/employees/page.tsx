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
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EmpleadosPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4 p-6">
      <Breadcrumb className="text-[#4b5675]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Empleados</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-[#191919] mb-1 flex-1/3">
          Empleados
        </h2>

        <div className="flex-1/3">
          <Input
            placeholder="Buscar empleados..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <EmployeesTable search={search} />
    </div>
  );
}
