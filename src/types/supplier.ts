import { Pagination } from "./common";

export interface SuppliersSearchParams {
  per_page: number;
  page: number;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface SuppliersResult {
  data: Supplier[];
  meta: { pagination: Pagination };
}
