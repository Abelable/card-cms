import { Pagination } from "./common";

export interface MemberListSearchParams {
  per_page: number;
  page: number;
}

export interface MemberItem {
  id: number;
  status: number;
  name: string;
  username: string;
  password: string;
  role_id: number;
  created_at: string;
}

export interface MemberListResult {
  data: MemberItem[];
  meta: { pagination: Pagination };
}
