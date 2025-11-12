
import { Campaign } from "./campaigns";

export type FiltersData = {
  work_centers: Campaign["work_centers"];
  predefined_lot_products: Campaign["predefined_lot_products"];
  subsidiaries: Campaign["subsidiaries"];
};

export const FILTER_INFO: Record< keyof FiltersData, { label: string; urlParam: string }> = {
  work_centers: { 
    label: "Por Centros de trabajo", 
    urlParam: "work_center" 
  },
  predefined_lot_products: { 
    label: "Por Productos", 
    urlParam: "lot" 
  },
  subsidiaries: { 
    label: "Por Subsidiarias", 
    urlParam: "subsidiary" 
  },
}