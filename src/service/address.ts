import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  useAddAddressConfig,
  useDeleteConfig,
  useEditAddressConfig,
} from "./use-optimistic-options";

import type {
  AddressForm,
  AddressListResult,
  AddressListSearchParams,
  ProvinceOpttion,
} from "types/address";

export const useProvinceOptions = () => {
  const client = useHttp();
  return useQuery<ProvinceOpttion[]>(["province_options"], () =>
    client("/api/v1/admin/address/province")
  );
};

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
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useAddAddressConfig(queryKey)
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
    useEditAddressConfig(queryKey)
  );
};

export const useDeleteAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/address/mapping/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
