
import { EmployeeDetail } from "../components/EmployeeDetail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CampaignLink } from "@/components/ui/campaign-link";
import { ArrowLeft, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { CampaignUserDetail } from "../types/campaigns";
import api from "../lib/axios";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle } from "@/components/ui/alert";



export default function EmployeePage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [employeeId]);


  const handleRemoveEmployeeSelect = () => {
    navigate(`/employees`);
  };

  const { data, isLoading, error } = useQuery<
    AxiosResponse<CampaignUserDetail>,
    AxiosError,
    CampaignUserDetail
  >({
    queryKey: ["campaign-user", { id: employeeId }],
    queryFn: () => {
      return api.get(`/admin/campaign-users/${employeeId}/`);
    },
    select: ({ data }) => data,
  });

  const employeeName = `${data?.user.first_name} ${data?.user.last_name}`;

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return (
      <div className="flex-1 p-6">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Hubo un error al cargar los datos</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex-1 p-0 md:py-6 mb-20">
      <Breadcrumb className="text-[#4b5675] mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CampaignLink to="/">Dashboard</CampaignLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Button
                variant="link"
                className={cn("max-h-max inline-block m-0 p-0 border-0 bg-transparent text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs font-normal leading-normal shadow-none outline-none hover:no-underline focus:outline-none focus:ring-0 focus:border-none disabled:pointer-events-auto disabled:opacity-100 whitespace-normal normal-case rounded-none")}
                onClick={() => handleRemoveEmployeeSelect?.()}
              >
                Empleados
              </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>{employeeName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button
        variant="link"
        className={cn("mb-4 text-[#4B5675] leading-none gap-1 bg-white hover:no-underline")}
        onClick={() => handleRemoveEmployeeSelect?.()}
      >
        <ArrowLeft className="text-[#4B5675]" /> Volver
      </Button>
      <EmployeeDetail data={data} />
    </div>
  );
}
