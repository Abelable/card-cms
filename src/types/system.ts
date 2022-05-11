import { Pagination } from "./common";

export interface BlacklistSearchParams {
  per_page: number;
  page: number;
}

export interface Black {
  id: number;
  idcard: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface BlacklistResult {
  data: Black[];
  meta: { pagination: Pagination };
}
