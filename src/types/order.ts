import { Pagination } from "./common";
import { Channel, Goods } from "./product";

export interface OrderStatusOption {
  id: number;
  name: string;
}

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
  agent_id: number;
  time_type: number;
  start_time: string;
  end_time: string;
  page: number;
  per_page: number;
}

export interface Deliver {
  id: string;
  source: string;
  outer_order_no: string;
  created_at: string;
  updated_at: string;
  agent_id: number;
  product: Channel;
  goods: Goods;
  idcard: string;
  idcard_front_photo: string;
  idcard_back_photo: string;
  buyer: string;
  receiver: string;
  phone: string;
  detail_address: string;
  status: number;
  is_activated: number;
  activated_at: string;
  is_recharged: number;
  first_recharged_at: string;
  recharge_amount: number;
  product_failed_reason: string;
  product_no: string;
  express_name: string;
  express_no: string;
  province_id: number;
  city_id: number;
  area_id: number;
  operation_logs: { content: string }[];
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

interface Supplier {
  id: number;
  name: string;
  phone: string;
}
export interface Product {
  id: number;
  supplier_id: number;
  supplier: Supplier;
  supplier_product_encoding: string;
  product_id: number;
  product_encoding: string;
  trigger_mark: string;
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
  import_order_num: number;
  import_order_photo_num: number;
  matched_photo_order_num: number;
  unmatched_photo_order_num: number;
  photo_review_num: number;
  created_at: string;
}

export interface ImportsResult {
  data: Import[];
  meta: { pagination: Pagination };
}
