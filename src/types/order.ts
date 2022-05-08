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
  created_at: string;
}

export interface ProductsResult {
  data: Product[];
  meta: { pagination: Pagination };
}
