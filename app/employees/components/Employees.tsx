"use client";
import { EmployeesTable } from "./EmployeesTable";

export const Employees = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#191919] mb-1">Empleados</h2>

      <EmployeesTable />
    </div>
  );
};
