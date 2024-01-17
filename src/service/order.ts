import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditFlagConfig,
} from "./use-optimistic-options";

import type {
  FlagSetting,
  Option,
  OrderGrabListSearchParams,
  ShopListResult,
} from "types/order";

export const useSettingOptions = (key: string) => {
  const client = useHttp();
  return useQuery<Option[]>([`${key}_options`], () =>
    client(`/api/v1/admin/setting/show/${key}`)
  );
};

export const useFlagSetting = (flagModalOpen: boolean) => {
  const client = useHttp();
  return useQuery<FlagSetting>(
    ["flag_setting"],
    () => client("/api/v1/admin/shop/get-tag", { method: "POST" }),
    {
      enabled: flagModalOpen,
    }
  );
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

export const useUpdateFlagSetting = () => {
  const client = useHttp();
  return useMutation(
    (params: FlagSetting) =>
      client("/api/v1/admin/shop/set-tag", {
        data: params,
        method: "POST",
      }),
    useEditFlagConfig(["flag_setting"])
  );
};
