import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCompanySlugFromHost(request?: Request): string {
  // Fallback para server-side sin request
  if (typeof window === "undefined" && !request) {
    return import.meta.env.VITE_X_COMPANY_SLUG ?? "";
  }

  let host: string = "";

  // Cliente (browser)
  if (typeof window !== "undefined") {
    host = window.location.hostname;
  }

  // Servidor (middleware)
  if (request) {
    const url = new URL(request.url);
    host = url.hostname;
  }

  // Si es localhost o IP, usar la variable de entorno
  if (
    host === "localhost" ||
    host.startsWith("127.") ||
    host.startsWith("192.") ||
    host.startsWith("10.")
  ) {
    return import.meta.env.VITE_X_COMPANY_SLUG ?? "";
  }

  // Extraer subdominio (ej: company.pekatafoods.com -> company, naturitas.test -> naturitas)
  const parts = host.split(".");
  if (parts.length < 2) {
    return import.meta.env.VITE_X_COMPANY_SLUG ?? "";
  }

  const subdomain = parts[0];

  // Si el subdominio no es válido (es 'www' o está vacío), usar fallback
  if (!subdomain || subdomain === "www" || subdomain.length === 0) {
    return import.meta.env.VITE_X_COMPANY_SLUG ?? "";
  }

  // Retornar el subdominio válido
  return subdomain;
}
