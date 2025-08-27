import { Response } from "@/types/response";

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
  tokens: number;
  budget: string;
  block_own_address: boolean;
  cart_state: "open" | "closed";
  logistic_state: string | null;
  has_incidence: boolean;
  pending_requests: any[];
};

export type CampaignUsersResponse = Response<CampaignUser>;

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
