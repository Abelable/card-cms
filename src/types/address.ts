import { Pagination } from "./common";

export interface AddressListSearchParams {
  province_code: number;
  city_code: number;
  area_code: number;
  page: number;
  per_page: number;
}

export interface Address {
  id: string;
  province_name: string;
  province_code: number;
  city_name: string;
  city_code: number;
  area_name: string;
  area_code: number;
}

export interface AddressListResult {
  data: Address[];
  meta: { pagination: Pagination };
}
