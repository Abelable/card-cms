import { Pagination } from "./common";

export interface DeliversSearchParams {
  product_name: string;
  product_code: string;
  order_id: string;
  out_order_id: string;
  order_status: number;
  id_number: string;
  express_code: string;
  production_number: string;
  phone: string;
  is_recharged: number;
  is_activated: number;
  upper_order_id: string;
  agent_id: number;
  time_type: number;
  start_time: string;
  end_time: string;
  per_page: number;
  page: number;
}

export interface Deliver {
  id: string;
  source: string;
  downstream_order_code: string;
  created_at: string;
  pruduct_name: string;
  pruduct_code: string;
  id_card_name: string;
  id_card_code: string;
  id_card_positive_img: string;
  id_card_back_img: string;
  consignee_name: string;
  consignee_phone: string;
  consignee_address: string;
  status: number;
  is_activated: boolean;
  recharge_amount: number;
  fail_reason: string;
  production_number: string;
  express_company: string;
  express_code: string;
}

export interface DeliversResult {
  data: Deliver[];
  meta: { pagination: Pagination };
}

export interface ProductsSearchParams {
  supplier_id: number;
  per_page: number;
  page: number;
}

export interface Product {
  id: number;
  supplier_id: number;
  supplier_name: string;
  upper_product_name: string;
  upper_product_code: string;
  name: string;
  code: string;
  contact_name: string;
  created_at: string;
}

export interface ProductsResult {
  data: Product[];
  meta: { pagination: Pagination };
}

export interface ImportsSearchParams {
  per_page: number;
  page: number;
}

export interface Import {
  id: number;
  order_number: number;
  pic_number: number;
  matching_pic_number: number;
  unmatching_pic_number: number;
  fail_number: number;
  created_at: string;
}

export interface ImportsResult {
  data: Import[];
  meta: { pagination: Pagination };
}
