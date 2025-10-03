import { Response } from "@/types/response";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  external_id: string | null;
  phone_number: string;
  subsidiary: string | null;
  work_center: string | null;
  language: string;
  is_admin: boolean;
  is_owner: boolean;
};

export type EmployeesResponse = Response<Employee>;
