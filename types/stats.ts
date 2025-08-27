import { Response } from "@/types/response";

export type Stats = {
  carts_with_donation: number;
  carts_with_personalised_lot: number;
  carts_with_selected_products: number;
  donated_amount: string;
  expired_product_change_requests: number;
  expired_shipping_address_update_requests: number;
  extra_purchase_amount: string;
  goods_issue_states: string[];
  incidences: string[];
  last_update_at: string | null;
  main_categories: string[];
  main_products: string[];
  pallets: string[];
  pending_product_change_requests: number;
  pending_shipping_address_update_requests: number;
  processed_product_change_requests: number;
  processed_shipping_address_update_requests: number;
  shipping_address_delivery_ratio: number | null;
  tokens_automatically_assigned: number;
  total_employees: number;
  work_center_delivery_ratio: number | null;
};

export type StatsResponse = Response<Stats>;
