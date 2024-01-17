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

export interface OrderGrabListSearchParams {
  shop_type: string;
  page: number;
  per_page: number;
}

export interface OrderGrab {
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
  data: OrderGrab[];
  meta: { pagination: Pagination };
}

export interface ProduceStatusOption {
  id: number;
  name: string;
}
