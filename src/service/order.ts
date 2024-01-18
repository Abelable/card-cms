import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useEditFlagConfig,
} from "./use-optimistic-options";

import type {
  FlagSetting,
  Option,
  ShopListSearchParams,
  ShopListResult,
  RuleListResult,
  RuleListSearchParams,
  Rule,
  ShopOption,
  LogListResult,
  LogListSearchParams,
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

export const useEditFlagSetting = () => {
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

export const useShopList = (params: Partial<ShopListSearchParams>) => {
  const client = useHttp();
  return useQuery<ShopListResult>(["shop_list", params], () => {
    const { shop_type, ...rest } = params;
    return client("/api/v1/admin/shop/lst", {
      data: cleanObject({
        "filter[shop_type]": shop_type,
        ...rest,
      }),
    });
  });
};

export const useShopOptions = (shop_type: string) => {
  const client = useHttp();
  const res = useQuery<ShopListResult>(["shop_options"], () =>
    client("/api/v1/admin/shop/lst", {
      data: { "filter[shop_type]": shop_type, per_page: 1000, page: 1 },
    })
  );
  const shopOptions: ShopOption[] = res.data?.data
    ? res.data?.data.map(({ shop_id, shop_name }) => ({
        id: shop_id,
        name: shop_name,
      }))
    : [];
  return shopOptions;
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

export const useDeleteShop = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/shop/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRuleList = (params: Partial<RuleListSearchParams>) => {
  const client = useHttp();
  return useQuery<RuleListResult>(["rule_list", params], () => {
    const { name, ...rest } = params;
    return client("/api/v1/admin/transfer-order/lst", {
      data: cleanObject({
        "filter[name]": name,
        ...rest,
      }),
    });
  });
};

export const useAddRule = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Rule>) =>
      client("/api/v1/admin/transfer-order/create", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRule = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Rule>) =>
      client(`/api/v1/admin/transfer-order/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditRuleStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status }: { id: number; status: number }) =>
      client(`/api/v1/admin/transfer-order/status/${id}`, {
        data: { status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRule = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/transfer-order/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useLogList = (params: Partial<LogListSearchParams>) => {
  const client = useHttp();
  return useQuery<LogListResult>(["log_list", params], () => {
    return client("/api/v1/admin/message-log/lst", {
      data: cleanObject(params),
    });
  });
};
