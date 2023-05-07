import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  Address,
  AddressForm,
  AddressListResult,
  AddressListSearchParams,
} from "types/address";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useAddressList = (params: Partial<AddressListSearchParams>) => {
  const client = useHttp();
  return useQuery<AddressListResult>(["address_list", params], () => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/address/mapping/index", {
      data: cleanObject({
        "filter[province_id]": restParams.province_code,
        "filter[city_id]": restParams.city_code,
        "filter[area_id]": restParams.area_code,
        "filter[supplier_id]": restParams.supplier_id,
        page,
        per_page,
      }),
    });
  });
};

export const useAddAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<AddressForm>) =>
      client("/api/v1/admin/address/mapping/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: AddressForm) =>
      client(`/api/v1/admin/address/mapping/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/supplier-product/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
