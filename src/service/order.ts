import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

import type {
  Option,
  OrderGrabListSearchParams,
  ShopListResult,
} from "types/order";

export const useSettingOptions = (key: string): Option[] => {
  const client = useHttp();
  const res = useQuery([`${key}_options`], () =>
    client(`/api/v1/admin/setting/show/${key}`)
  );
  return res.data || [];
};

export const useOrderGrabList = (
  params: Partial<OrderGrabListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShopListResult>(["order_grab_list", params], () => {
    const { shop_type, ...rest } = params;
    return client("/api/v1/admin/shop/lst", {
      data: cleanObject({
        "filter[shop_type]": shop_type,
        ...rest,
      }),
    });
  });
};

export const useApplyShop = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: { shop_type: string; shop_name: string }) =>
      client("/api/v1/admin/shop/create", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteOrderGrab = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/shop/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEditPDDFlag = () => {
  const client = useHttp();
  return useMutation(
    (params: {
      grab_flag: number;
      produce_fail_flag: number;
      delivery_fail_flag: number;
    }) =>
      client("/api/v1/admin/shop/create", {
        data: params,
        method: "POST",
      })
  );
};
