import {  Lock, PackagePlus } from "lucide-react";

// Icono para compras por categoría
export const CategoryIcon = ({ className }: { className?: string }) => (
  <img src="/icons/compras-categoria.svg" alt="Compras por categoría" className={className} />
);

// Icono para top productos
export const ProductsIcon = ({ className }: { className?: string }) => (
  <img src="/icons/top-productos.svg" alt="Top productos" className={className} />
);

// Icono para envíos a oficina
export const OfficeIcon = ({ className }: { className?: string }) => (
  <img src="/icons/envios-oficina.svg" alt="Envíos a oficina" className={className} />
);

// Icono para envíos a domicilio
export const HomeIcon = ({ className }: { className?: string }) => (
  <img src="/icons/envios-domicilio.svg" alt="Envíos a domicilio" className={className} />
);

// Icono para incidencias
export const IncidentsIcon = ({ className }: { className?: string }) => (
  <img src="/icons/incidencias.svg" alt="Incidencias" className={className} />
);

// Icono para resultados encuesta
export const SurveyIcon = ({ className }: { className?: string }) => (
  <img src="/icons/resultados-encuesta.svg" alt="Resultados encuesta" className={className} />
);

// Icono Estadistica Lotes Cerrados
export const PackageLockedIcon = ({ className }: { className?: string }) => (
  <img src="/icons/package-locked.svg" alt="Lotes cerrados" className={className} />
);
