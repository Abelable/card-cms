import { Pagination } from "./common";

export interface BlacklistSearchParams {
  idcard: string;
  phone: string;
  per_page: number;
  page: number;
}

export interface BlackItem {
  id: number;
  idcard: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface BlacklistResult {
  data: BlackItem[];
  meta: { pagination: Pagination };
}
