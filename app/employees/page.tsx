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
import { Sidebar } from "@/components/Sidebar";

export default function EmpleadosPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <Breadcrumb className="text-[#4b5675]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>Empleados</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
        <Sidebar />

        <div className="flex-1  flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-[#191919]">
              Empleados
            </h2>

            <Input
              className="w-full md:w-1/3 rounded-full"
              placeholder="Buscar empleados..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <EmployeesTable search={search} />
        </div>
      </div>
    </div>
  );
}
