import { Pagination } from "./common";

export interface HomeSearchParams {
  shop_name: string;
  goods_name: string;
  s_time: string;
  e_time: string;
}

export interface Home {
  id: string;
  shop_name: string;
  goods_name: string;
  order_num: number;
  deliver_num: number;
  activation_num: number;
  deliver_rate: number;
  activation_rate: number;
  recharge_num: number;
  recharge_rate: number;
  transfer_rate: number;
  created_at: string;
}

export interface HomeResult {
  data: Home[];
  meta: { pagination: Pagination };
}
