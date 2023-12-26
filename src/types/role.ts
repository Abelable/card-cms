import { Pagination } from "./common";

export interface RoleListSearchParams {
  per_page: number;
  page: number;
}

export interface RoleItem {
  id: number;
  name: string;
  desc: string;
  created_at: string;
}

export interface RoleListResult {
  data: RoleItem[];
  meta: { pagination: Pagination };
}
