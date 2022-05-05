import { Pagination } from "./common";

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
