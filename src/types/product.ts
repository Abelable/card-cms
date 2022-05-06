import { Pagination } from "./common";

export interface modeOption {
  id: number;
  name: string;
}
export interface ChannelsSearchParams {
  goods_name: string;
  goods_code: string;
  supplier: string;
  per_page: number;
  page: number;
}

export interface Channel {
  id: number;
  goods_name: string;
  goods_code: string;
  supplier: string;
  mode: number;
  created_at: string;
}

export interface ChannelsResult {
  data: Channel[];
  meta: { pagination: Pagination };
}

export interface ChannelForm {
  operator_id: number;
  supplier_id: number;
  goods_name: string;
  goods_code: string;
  ownership: string[];
  need_id_number: number;
  need_id_card_pic: number;
  deliver_area_type: number;
  deliver_area: string[][];
  age_limit: number[];
  card_number_limit: number;
  card_test_cycle: number;
  risk_warning_type: number;
  phone_repeat_limit: number;
  phone_test_cycle: number;
  address_repeat_limit: number;
  address_test_cycle: number;
  enable_automatic_blacklist_filtering: boolean;
}
