import { Pagination } from "./common";

export interface AddressListSearchParams {
  province_code: number;
  city_code: number;
  area_code: number;
  supplier_id: number;
  page: number;
  per_page: number;
}

interface AddressUnit {
  id: number;
  post_province_name: string;
  post_province_code: number;
  post_city_name: string;
  post_city_code: number;
  post_district_name: string;
  post_district_code: number;
}

export interface Address extends AddressUnit {
  supplier_id: number;
  un: AddressUnit;
}

export interface AddressListResult {
  data: Address[];
  meta: { pagination: Pagination };
}
