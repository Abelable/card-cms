import { Pagination } from "./common";

export interface Option {
  name: string;
  value: string;
}

export interface FlagSetting {
  sync_order: string;
  production_error: string;
  shipping_error: string;
}

export interface ShopListSearchParams {
  shop_type: string;
  page: number;
  per_page: number;
}

export interface Shop {
  id: number;
  status: number;
  shop_type: number;
  shop_name: string;
  app_name: string;
  app_key: string;
  app_secret: string;
  app_code: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  express_at: string;
  extra_data: string;
}

export interface ShopListResult {
  data: Shop[];
  meta: { pagination: Pagination };
}

export interface ProduceStatusOption {
  id: number;
  name: string;
}

export interface RuleListSearchParams {
  name: string;
  page: number;
  per_page: number;
}

interface ShopInfo {
  shop_id: string;
  app_name: string;
  shop_type: number;
}
export interface Rule {
  id: number;
  status: number;
  name: string;
  rule_name: string;
  rule_id: string;
  shop_id: string;
  shop: ShopInfo;
  created_at: string;
  updated_at: string;
}

export interface RuleListResult {
  data: Rule[];
  meta: { pagination: Pagination };
}
