
import { Campaign } from "./campaigns";

export type FiltersData = {
  work_centers: Campaign["work_centers"];
  predefined_lot_products: Campaign["predefined_lot_products"];
  subsidiaries: Campaign["subsidiaries"];
  cart_states: {
    id: "open" | "closed" | "processed";
    name: string;
  }[];
  has_empty_cart: {
    id: boolean;
    name: string;
  }[];
  has_personalized_lot: {
    id: boolean;
    name: string;
  }[];
  preparation_states: {
    id: "processing" | "preparing" | "prepared" | "in-pallet" | "shipped" | "returned" | "incidence";
    name: string;
  }[];
  logistic_states: {
    id: "registered" | "in-transit" | "in-parcel-shop" | "delivered" | "returning" | "returned" | "incidence";
    name: string;
  }[];
  close_date: {
    id: 'from' | 'to';
    name: string;
  }[];
};

export const FILTER_INFO: Record< keyof FiltersData, { label: string; urlParam: string, type: "checkbox" | "date" }> = {
  work_centers: { 
    label: "Por Centros de trabajo", 
    urlParam: "work_center" ,
    type: "checkbox"
  },
  predefined_lot_products: { 
    label: "Por Lotes predefinidos", 
    urlParam: "lot" ,
    type: "checkbox"
  },
  subsidiaries: { 
    label: "Por Subsidiarias", 
    urlParam: "subsidiary" ,
    type: "checkbox"
  },
  cart_states: { 
    label: "Por Estados de Carrito", 
    urlParam: "cart_state" ,
    type: "checkbox"
  },
  has_empty_cart: { 
    label: "¿Posee carrito vacío?", 
    urlParam: "has_empty_cart" ,
    type: "checkbox"
  },
  has_personalized_lot: { 
    label: "¿Posee lote personalizado?", 
    urlParam: "has_personalized_lot" ,
    type: "checkbox"
  },
  preparation_states:{
    label: "Por Estado de preparación", 
    urlParam: "preparation_state" ,
    type: "checkbox"
  },
  logistic_states: {
    label: "Por Estado logístico", 
    urlParam: "logistic_state" ,
    type: "checkbox"
  },
  close_date: {
    label: "Por Fecha de cierre", 
    urlParam: "close_date" ,
    type: "date"
  }
}