import { Pagination } from "./common";

export interface Option {
  name: string;
  value: string;
}

export interface FlagSetting {
  shop_type: string;
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
  shop_id: string;
  shop_type: number;
  shop_name: string;
  app_name: string;
  app_key: string;
  app_secret: string;
  app_code: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  callback_url: string;
  express_at: string;
  extra_data: string;
}

export interface ShopOption {
  id: string;
  name: string;
}

export interface ShopListResult {
  data: Shop[];
  meta: { pagination: Pagination };
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

export interface LogListSearchParams {
  status: number;
  tag_sn: string;
  page: number;
  per_page: number;
}

export interface Log {
  id: number;
  status: number;
  error_msg: string;
  shop_id: string;
  tag_sn: string;
  callback_url: string;
  extra_data: string;
  created_at: string;
  updated_at: string;
}

export interface LogListResult {
  data: Log[];
  meta: { pagination: Pagination };
}

interface OrderGoods {
  id: number;
  order_id: number;
  goods_sn: string;
  goods_name: string;
  created_at: string;
  updated_at: string;
}
interface OrderShop {
  shop_id: string;
  shop_name: string;
}
interface OrderTransfer {
  id: number;
  order_id: number;
  goods_sn: string;
  goods_name: string;
  created_at: string;
  updated_at: string;
}
export interface Order {
  id: number;
  status: number;
  error_reason: string;
  shop_id: string;
  order_sn: string;
  shop_order_sn: string;
  product_no: string;
  is_transfer: number;
  flag: string;
  province_id: number;
  province: string;
  city_id: number;
  city: string;
  area_id: number;
  town: string;
  idcard_name: string;
  idcard: string;
  concat_name: string;
  concat_phone: string;
  concat_address: string;
  express_sn: string;
  express_company: string;
  goods: OrderGoods;
  shop: OrderShop;
  transfer: OrderTransfer[];
  created_at: string;
  updated_at: string;
}

export interface OrderListResult {
  data: Order[];
  meta: { pagination: Pagination };
}

export interface OrderListSearchParams {
  status: number | undefined;
  tag: string | undefined;
  order_sn: string;
  shop_order_sn: string;
  shop_name: string | undefined;
  concat_phone: string;
  idcard: string;
  goods_name: string | undefined;
  goods_sn: string;
  product_no: string;
  express_sn: string;
  express_company: string;
  time_type: number | string;
  start_time: string;
  end_time: string;
  page: number;
  per_page: number;
}

export interface StatusOption {
  label: string;
  value: number;
}

export interface OrderLog {
  id: number;
  order_id: number;
  desc: string;
  is_system: number;
  created_at: string;
  updated_at: string;
}
