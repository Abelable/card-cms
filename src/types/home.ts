import { Pagination } from "./common";

export interface HomeSearchParams {
  agent_id: number;
  goods_name: string;
  start_created_at: string;
  end_created_at: string;
}

export interface Home {
  shop_name: string;
  goods_name: string;
  count: number;
  shipped_count: number;
  activated_count: number;
  shipped_rate: number;
  activated_rate: string;
  recharged_count: number;
  recharged_rate: number;
  transfer_rate: number;
  date: string;
}

export interface HomeResult {
  data: Home[];
  meta: { pagination: Pagination };
}
