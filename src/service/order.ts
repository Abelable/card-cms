import { QueryKey, useMutation, useQuery } from "react-query";
import dayjs from "dayjs";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useEditFlagConfig,
  useEditOrderListConfig,
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
  OrderListSearchParams,
  OrderListResult,
  Order,
  OrderLog,
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

export const useShopAuthUrl = ({
  shop_id,
  app_name,
  app_key,
  app_secret,
}: {
  shop_id: string;
  app_name: string;
  app_key: string;
  app_secret: string;
}) => {
  const client = useHttp();
  return useQuery<{ url: string }>(
    ["shop_auth_url"],
    () =>
      client(`/api/v1/admin/shop/authorize-url/${shop_id}`, {
        data: { app_name, app_key, app_secret },
        method: "POST",
      }),
    { enabled: !!(shop_id && app_name && app_key && app_secret) }
  );
};

export const useEditShopSetting = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ shop_id, code }: { shop_id: string; code: string }) =>
      client(`/api/v1/admin/shop/authorize-code/${shop_id}`, {
        data: { code },
        method: "POST",
      }),
    useEditConfig(queryKey)
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

export const useOrderList = (params: Partial<OrderListSearchParams>) => {
  const client = useHttp();
  return useQuery<OrderListResult>(["order_list", params], () => {
    let { page, per_page, start_created_at, end_created_at, ...restParams } =
      params;
    if (!start_created_at) {
      const endTime = new Date(
        new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
      );
      const startTime = new Date(
        new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 7
      );
      start_created_at = dayjs(startTime).format("YYYY-MM-DD HH:mm:ss");
      end_created_at = dayjs(endTime).format("YYYY-MM-DD HH:mm:ss");
    }

    // "filter[shop_order.status]": restParams.status,
    // "filter[shop_order.start_created_at]": start_created_at,
    // "filter[shop_order.end_created_at]": [end_created_at],

    return client("/api/v1/admin/shop-order/lst", {
      data: cleanObject({
        "filter[shop_order.order_sn]": restParams.order_sn,
        "filter[shop_order.shop_order_sn]": restParams.shop_order_sn,
        "filter[shop.shop_name]": restParams.shop_name,
        "filter[shop.tag]": restParams.tag,
        page,
        per_page,
      }),
    });
  });
};

export const useOrder = (order_id: string) => {
  const client = useHttp();
  return useQuery<Order>(
    ["order", { order_id }],
    () => client("/api/v1/admin/shop-order/detail", { data: { order_id } }),
    {
      enabled: Boolean(order_id),
    }
  );
};

export const useEditOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...rest }: Partial<Order>) =>
      client("/api/v1/admin/shop-order/update", {
        data: { order_id: id, ...rest },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useCancelOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (order_id: string) =>
      client("/api/v1/admin/shop-order/terminate", {
        data: { order_id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEditOrderList = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: { ids: string[]; status: number; remark?: string }) =>
      client("/api/v1/admin/shop-order/batch-simple-update", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useEditOrderListConfig(queryKey)
  );
};

export const useOrderLogList = (order_id: string) => {
  const client = useHttp();
  return useQuery<OrderLog[]>(
    ["order_log_list", order_id],
    () =>
      client("/api/v1/admin/shop-order/logs", {
        data: { order_id },
      }),
    {
      enabled: Boolean(order_id),
    }
  );
};

export const useOrderFlagRemark = (order_id: string) => {
  const client = useHttp();
  return useQuery<{ text: string }>(
    ["order_flag_remark", { order_id }],
    () =>
      client("/api/v1/admin/shop-order/logs-text", {
        data: { order_id },
        method: "POST",
      }),
    {
      enabled: Boolean(order_id),
    }
  );
};

export const useEditOrderFlagRemark = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: {
      order_id: string;
      desc: string;
      jiumeng_desc: string;
      tag: string;
    }) =>
      client("/api/v1/admin/shop-order/remark", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
