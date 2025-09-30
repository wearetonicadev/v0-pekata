import { Response } from "@/types/response";

export type ShippingAddress = {
  id: number;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  comments: string;
};

export type WorkCenter = {
  id: number;
  name: string;
  code: string;
  shipping_address: ShippingAddress;
};

export type Pallet = {
  id: number;
  code: string;
  state: string;
  workcenter: WorkCenter;
  company: number;
  n_goods_issues: number;
  logistic_state: string;
  shipped_at: string | null;
  delivered_at: string | null;
  returning_at: string | null;
  returned_at: string | null;
  incidence_at: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
};

export type Category = {
  id: number;
  icon: string;
  name: string;
  path: string;
  depth: number;
};

export type MainCategory = {
  category: Category;
  tokens: number;
  units: number;
  lines: number;
  total_price_exc_tax: string;
};

export type Product = {
  id: number;
  code: string;
  name: string;
  subtitle: string;
  main_image: string;
  brand: string;
};

export type MainProduct = {
  product: Product;
  tokens: number;
  units: number;
  lines: number;
  total_price_exc_tax: string;
};

export type GoodsIssueState = {
  goods_issue_state: string;
  n_goods_issues: number;
};

export type Incidence = {
  incidence_type: string;
  n_goods_issues: number;
  n_goods_issue_lines: number;
};

export type Stats = {
  total_employees: number;
  carts_with_selected_products: number;
  carts_with_personalised_lot: number;
  carts_with_donation: number;
  donated_amount: string;
  tokens_automatically_assigned: number;
  extra_purchase_amount: string;
  work_center_delivery_ratio: string;
  shipping_address_delivery_ratio: string;
  pallets: Pallet[];
  main_categories: MainCategory[];
  main_products: MainProduct[];
  goods_issue_states: GoodsIssueState[];
  incidences: Incidence[];
  processed_shipping_address_update_requests: number;
  pending_shipping_address_update_requests: number;
  expired_shipping_address_update_requests: number;
  processed_product_change_requests: number;
  pending_product_change_requests: number;
  expired_product_change_requests: number;
  last_update_at: string;
  nps_promoters: number;
  nps_passives: number;
  nps_detractors: number;
  total_survey_requests: string;
  nps_score: number;
  average_platform_score: number;
};

export type StatsResponse = Response<Stats>;
