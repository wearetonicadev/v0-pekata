import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#2e9858] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#191919] mb-4">
          Página no encontrada
        </h2>
        <p className="text-[#4b5675] mb-8 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="space-x-4">
          <Link href="/">
            <Button className="bg-[#2e9858] hover:bg-[#1f503b]">
              Ir al Dashboard
            </Button>
          </Link>
          <Link href="/employees">
            <Button variant="outline">
              Ver Empleados
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
