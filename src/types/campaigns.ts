import { Response } from "@/types/response";
import { Product } from "./stats";

export type CampaignTranslation = {
  id: number;
  name: string;
  description: string | null;
  video_id: string | null;
  language: string;
};

export type Campaign = {
  id: number;
  code: string;
  state: string;
  login_image: string | null;
  is_default: boolean;
  selection_start_date: string;
  selection_end_date: string;
  address_delivery_start_date: string;
  address_delivery_end_date: string;
  work_center_delivery_start_date: string;
  work_center_delivery_end_date: string;
  discount: string;
  allow_own_address: boolean;
  allow_work_center_change: boolean;
  shipping_fee_paid_by: string;
  default_donation_product: number;
  shipping_fee_per_order: string;
  tokens_per_user: number;
  budget_per_user: string;
  tokens_per_euro: string;
  created_at: string;
  updated_at: string;
  translations: CampaignTranslation[];
  employee_portal_url: string;
  auto_assign_employees: boolean;
  mode: string;
  is_demo: boolean;
  work_centers: {
    id: string,
    code: string,
    name: string
  },
  predefined_lot_products: Product[];
  subsidiaries: {
    id: string,
    code: string,
    name: string
  },
};

export type CampaignsResponse = Response<Campaign>;

export type CampaignUser = {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    external_id: string | null;
    phone_number: string;
  };
  consumed_tokens: number;
  tokens: number;
  budget: string;
  block_own_address: boolean;
  cart_state: "open" | "closed" | "processed";
  logistic_state: "shipped";
  has_incidence: boolean;
  pending_requests: unknown[];
};

export type CampaignUsersResponse = Response<CampaignUser>;

export type CampaignExport = {
  file_url: string
}

export type CartLine = {
  product: {
    id: number;
    code: string;
    name: string;
    subtitle: string;
    kind: string;
    state: string;
    visibility: string;
    brand: {
      name: string;
      code: string;
      logo: string | null;
    };
    categories: ProductCategory[] | null;
    main_image: {
      listing_image_cache: string;
      big_listing_image_cache: string;
      cart_image_cache: string;
      thumbnail_image_cache: string;
      big_thumbnail_image_cache: string;
      regular_image_cache: string;
      big_regular_image_cache: string;
      email_image_cache: string;
      zoom_image_cache: string;
      big_email_image_cache: string;
    };
  };
  kind: string;
  quantity: number;
  tokens: number;
  automatically_assigned: boolean;
  incidences: Incidence[];
};

export type ProductCategory = {
  depth: number;
  icon: string;
  id: number;
  name: string;
  path: string;
};

export type Incidence = {
  quantity: number;
  incidence: {
    code: string;
    metadata: {
      days_to_wait: number;
      product_options: number[];
    };
    created_at: string;
  };
  related_entity_type: {
    app_label: string;
    model: string;
  };
  related_entity_id: number;
};

export type CampaignUserDetail = {
  id: number;
  campaign: {
    id: number;
    code: string;
    state: string;
    name: string;
    tokens_per_user: number;
    budget_per_user: string;
    is_demo: boolean;
    is_default: boolean;
  };
  user: {
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
  tokens: number;
  budget: string;
  block_own_address: boolean;
  cart: {
    uuid: string;
    code: string;
    state: "open" | "closed";
    total_tokens: number;
    product_tokens: number;
    consumed_tokens: number;
    remaining_tokens: number;
    delivery_mode: string;
    wallet_shipping_address: {
      id: number;
      first_name: string;
      last_name: string;
      dni: string | null;
      street: string;
      country: string;
      city: string;
      postcode: string;
      phone: string;
      comments: string;
      is_default: boolean;
    };
    work_center: string | null;
    lines: CartLine[];
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    contact_email: string | null;
    shipping_tokens: number;
    price_to_pay_exc_tax: string;
    price_to_pay_inc_tax: string;
    price_to_pay_tax: string;
    payment_state: string;
    requires_shipping: boolean;
  };
  sale_order: {
    lines: CartLine[];
  } | null;
  product_change_requests: [];
  shipping_address_update_requests: [];
  incidences: Incidence[];
  goods_issues: GoodsIssue[];
};

export type CampaignUserDetailResponse = Response<CampaignUserDetail>;

// Helper types for common campaign states
export type CampaignState =
  | "pending"
  | "active"
  | "inactive"
  | "completed"
  | "cancelled";

// Helper types for campaign modes
export type CampaignMode = "whole-catalog" | "limited-catalog" | "custom";

// Helper types for shipping fee payment
export type ShippingFeePaidBy = "employee" | "company" | "shared";

export type LogisticState = {
  name: string;
  code: string;
  description: string | null;
  metadata: {
    tipo: string;
    fecha: string;
    plaza: string;
    codigo: string;
    evento: string;
    prioridad: string;
    nombreplaza: string;
  };
  created_at: string;
};

// Goods issues (warehouse shipments) for a campaign user detail
export type GoodsIssue = {
  id: number;
  uuid: string;
  code: string;
  state: string;
  created_at: string;
  updated_at: string;
  lines: CartLine[];
  warehouse: GoodsIssueWarehouse;
  sale_order: number;
  courier: {
    id: number;
    name: string;
    code: string;
    mode: string;
  };
  logistic_states: LogisticState[];
  work_center: {
    id: number;
    name: string;
    code: string;
    shipping_address: GoodsIssueAddress;
  } | null;
  subsidiary: unknown | null;
  delivery_mode: string;
  shipping_address: GoodsIssueAddress | null;
  pallet: {
    id: number;
    code: string;
    state: string;
    workcenter: {
      id: number;
      name: string;
      code: string;
      shipping_address: GoodsIssueAddress;
    };
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
  } | null;
  inner_volume: string;
  outer_volume: string;
  expected_weight: string | null;
  comment: string | null;
  max_preparation_date: string;
  min_shipping_date: string;
  start_promise_date: string;
  end_promise_date: string;
  tracking_number: string | null;
  tracking_url: string | null;
  processed_at: string | null;
  preparing_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  returned_at: string | null;
};

export type GoodsIssueImageCache = {
  listing_image_cache: string;
  big_listing_image_cache: string;
  cart_image_cache: string;
  thumbnail_image_cache: string;
  big_thumbnail_image_cache: string;
  regular_image_cache: string;
  big_regular_image_cache: string;
  email_image_cache: string;
  zoom_image_cache: string;
  big_email_image_cache: string;
};

export type GoodsIssueWarehouse = {
  id: number;
  name: string;
  code: string;
  is_default: boolean;
  allow_whole_catalog: boolean;
  preparation_days: number;
  billing_address: GoodsIssueAddress;
  shipping_address: GoodsIssueAddress;
};

export type GoodsIssueAddress = {
  id: number;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone?: string;
  comments?: string;
  vat_number?: string;
  legal_name?: string;
  is_default?: boolean;
};
