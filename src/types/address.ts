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
  post_province_name: string;
  post_province_code: number;
  post_city_name: string;
  post_city_code: number;
  post_district_name: string;
  post_district_code: number;
}

export interface Address extends AddressUnit {
  id: number;
  supplier_id: number;
  un: AddressUnit;
}

export interface AddressListResult {
  data: Address[];
  meta: { pagination: Pagination };
}

export interface AddressMappingItem {
  jm_post_province_name: string;
  jm_post_province_code: string;
  jm_post_city_name: string;
  jm_post_city_code: string;
  jm_post_district_name: string;
  jm_post_district_code: string;
  post_province_name: string;
  post_province_code: string;
  post_city_name: string;
  post_city_code: string;
  post_district_name: string;
  post_district_code: string;
}

export interface AddressForm {
  mapping: AddressMappingItem[];
  supplier_id: number;
}
