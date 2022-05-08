import { Pagination } from "./common";

export interface ProductsSearchParams {
  supplier_id: number;
  per_page: number;
  page: number;
}

export interface Product {
  id: number;
  supplier_id: number;
  supplier_name: string;
  upper_product_name: string;
  upper_product_code: string;
  name: string;
  code: string;
  contact_name: string;
  created_at: string;
}

export interface ProductsResult {
  data: Product[];
  meta: { pagination: Pagination };
}

export interface ImportsSearchParams {
  per_page: number;
  page: number;
}

export interface Import {
  id: number;
  order_number: number;
  pic_number: number;
  matching_pic_number: number;
  unmatching_pic_number: number;
  fail_number: number;
  created_at: string;
}

export interface ImportsResult {
  data: Import[];
  meta: { pagination: Pagination };
}
