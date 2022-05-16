import { Pagination } from "./common";

export interface AgentsSearchParams {
  per_page: number;
  page: number;
}

export interface Agent {
  id: number;
  store: string;
  channel_id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  activation_days: number | undefined;
  recharge_days: number | undefined;
  created_at: string;
  updated_at: string;
}

export interface AgentsResult {
  data: Agent[];
  meta: { pagination: Pagination };
}

export interface GoodsListSearchParams {
  per_page: number;
  page: number;
}

export interface Goods {
  id: string;
  name: string;
  img: string;
  tags: string[];
  code: string;
  channel: string;
  created_at: string;
}

export interface AgentOption {
  id: number;
  name: string;
}

export interface GoodsListResult {
  data: Goods[];
  meta: { pagination: Pagination };
}
