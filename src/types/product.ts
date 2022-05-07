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
  need_id_number: boolean;
  need_id_card_pic: boolean;
  deliver_area_type: number;
  deliver_area: string[][];
  only_deliver_area: string[][];
  age_limit: number[];
  card_number_limit: number;
  card_test_cycle: number;
  risk_warning_type: number;
  default_phone_repeat_limit: number;
  default_phone_test_cycle: number;
  default_address_repeat_limit: number;
  default_address_test_cycle: number;
  phone_repeat_limit: number;
  phone_test_cycle: number;
  address_repeat_limit: number;
  address_test_cycle: number;
  enable_automatic_blacklist_filtering: boolean;
}

export interface ChannelGoodsListSearchParams {
  per_page: number;
  page: number;
}

export interface ChannelGoods {
  id: string;
  name: string;
  status: number;
}

export interface ChannelGoodsListResult {
  data: ChannelGoods[];
  meta: { pagination: Pagination };
}

export interface GoodsListSearchParams {
  goods_name: string;
  supplier: string;
  product_code: string;
  goods_code: string;
  operator_id: number;
  deliver_address: string;
  ownership: number[];
  per_page: number;
  page: number;
}

export interface GoodsForm {
  product_id: number;
  name: string;
  code: string;
  tags: string[];
  needImg: boolean;
  img: string;
  detail: string;
  remarks: string;
  isForce: boolean;
}
export interface Goods {
  id: number;
  name: string;
  img: string;
  tags: string[];
  code: string;
  supplier_name: string;
  product_id: number;
  product_name: string;
  visible_type: number;
  agent_id: number;
  created_at: string;
}

export interface GoodsListResult {
  data: Goods[];
  meta: { pagination: Pagination };
}

export interface DownedGoodsListSearchParams extends GoodsListSearchParams {}

export interface DownedGoods extends Goods {}

export interface DownedGoodsListResult {
  data: DownedGoods[];
  meta: { pagination: Pagination };
}

export interface AgentsSearchParams {
  per_page: number;
  page: number;
}
export interface Agent {
  id: number;
  distributor_name: string;
  phone: string;
  status: number;
  created_at: string;
}

export interface AgentsResult {
  data: Agent[];
  meta: { pagination: Pagination };
}
