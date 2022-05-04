import { Pagination } from "./common";

export interface AgentsSearchParams {
  per_page: number;
  page: number;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface AgentsResult {
  data: Agent[];
  meta: { pagination: Pagination };
}

export interface GoodsListSearchParams {
  goods_name: string;
  supplier_name: string;
  per_page: number;
  page: number;
}

export interface Goods {
  id: string;
  name: string;
  code: string;
  supplier_name: string;
  created_at: string;
}

export interface GoodsListResult {
  data: Goods[];
  meta: { pagination: Pagination };
}
