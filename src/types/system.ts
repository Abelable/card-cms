import { Pagination } from "./common";

export interface BlacklistSearchParams {
  supplier_id: number;
  per_page: number;
  page: number;
}

export interface Black {
  id: number;
  id_number: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface BlacklistResult {
  data: Black[];
  meta: { pagination: Pagination };
}
