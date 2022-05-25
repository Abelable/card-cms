import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  Deliver,
  DeliversResult,
  DeliversSearchParams,
  ImportsResult,
  ImportsSearchParams,
  OrderStatusOption,
  Product,
  ProductsResult,
  ProductsSearchParams,
} from "types/order";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useEditDeliversConfig,
} from "./use-optimistic-options";

export const useDelivers = (params: Partial<DeliversSearchParams>) => {
  const client = useHttp();
  return useQuery<DeliversResult>(["order_delivers", params], () => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/order/index", {
      data: cleanObject({
        "filter[product.name]": restParams.product_name,
        "filter[product.code]": restParams.product_code,
        "filter[order.id]": restParams.order_id,
        "filter[order.outer_order_no]": restParams.out_order_id,
        "filter[order.status]": restParams.order_status,
        "filter[order.idcard]": restParams.id_number,
        "filter[order.express_no]": restParams.express_code,
        "filter[order.product_no]": restParams.production_number,
        "filter[order.phone]": restParams.phone,
        "filter[order.is_recharged]": restParams.is_recharged,
        "filter[order.is_activated]": restParams.is_activated,
        "filter[order.agent_id]": restParams.agent_id,
        "filter[order.start_created_at]":
          restParams.time_type === 1 ? restParams.start_time : "",
        "filter[order.end_created_at]":
          restParams.time_type === 1 ? restParams.end_time : "",
        "filter[order.start_activated_at]":
          restParams.time_type === 2 ? restParams.start_time : "",
        "filter[order.end_activated_at]":
          restParams.time_type === 2 ? restParams.end_time : "",
        page,
        per_page,
      }),
    });
  });
};

export const useExportDelivers = () => {
  const client = useHttp();
  return (params: Partial<DeliversSearchParams>) => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/index/index", {
      data: cleanObject({
        is_export: 1,
        "filter[product.name]": restParams.product_name,
        "filter[product.code]": restParams.product_code,
        "filter[order.id]": restParams.order_id,
        "filter[order.outer_order_no]": restParams.out_order_id,
        "filter[order.status]": restParams.order_status,
        "filter[order.idcard]": restParams.id_number,
        "filter[order.express_no]": restParams.express_code,
        "filter[order.product_no]": restParams.production_number,
        "filter[order.phone]": restParams.phone,
        "filter[order.is_recharged]": restParams.is_recharged,
        "filter[order.is_activated]": restParams.is_activated,
        "filter[order.agent_id]": restParams.agent_id,
        "filter[order.start_created_at]":
          restParams.time_type === 1 ? restParams.start_time : "",
        "filter[order.end_created_at]":
          restParams.time_type === 1 ? restParams.end_time : "",
        "filter[order.start_activated_at]":
          restParams.time_type === 2 ? restParams.start_time : "",
        "filter[order.end_activated_at]":
          restParams.time_type === 2 ? restParams.end_time : "",
        page,
        per_page,
      }),
      headers: {
        responseType: "arraybuffer",
      },
    });
  };
};

export const useDeliver = (id?: number) => {
  const client = useHttp();
  return useQuery<Deliver>(
    ["deliver", { id }],
    () => client(`/api/v1/admin/order/show/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useOrderStatusOptions = () => {
  const client = useHttp();
  const res = useQuery(["order_status_options"], () =>
    client("/api/v1/admin/order/status-pluck")
  );
  const orderStatusOptions: OrderStatusOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      orderStatusOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return orderStatusOptions;
};

export const useEditDeliver = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...rest }: Partial<Deliver>) =>
      client(`/api/v1/admin/order/update/${id}`, {
        data: rest,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditDelivers = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: {
      ids: string[];
      status: number;
      product_failed_reason?: string;
    }) =>
      client("/api/v1/admin/order/batch-simple-update", {
        data: params,
        method: "POST",
      }),
    useEditDeliversConfig(queryKey)
  );
};

export const useProducts = (params: Partial<ProductsSearchParams>) => {
  const client = useHttp();
  return useQuery<ProductsResult>(["products", params], () => {
    const { supplier_id, ...rest } = params;
    return client("/api/v1/admin/supplier-product/index", {
      data: cleanObject({ "filter[supplier_id]": supplier_id, ...rest }),
    });
  });
};

export const useAddProduct = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Product>) =>
      client("/api/v1/admin/supplier-product/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditProduct = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Product>) =>
      client(`/api/v1/admin/supplier-product/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteProduct = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/supplier-product/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useImports = (params: Partial<ImportsSearchParams>) => {
  const client = useHttp();
  return useQuery<ImportsResult>(["imports", params], () =>
    client("/api/v1/admin/order-import/index", {
      data: params,
    })
  );
};

export const useTestConfig = (params: Partial<Product>) => {
  const client = useHttp();
  return client("/api/v1/admin/supplier-product/check", {
    data: params,
    method: "POST",
  });
};

export const useExportOrderProduct = () => {
  const client = useHttp();
  return ({
    agentId,
    encodings,
  }: {
    agentId?: number | undefined;
    encodings?: string[] | undefined;
  }) =>
    client("/api/v1/admin/order/export-product", {
      data: cleanObject({
        "filter[order.agent_id]": agentId,
        "filter[product-encoding]": encodings,
      }),
      method: "POST",
      headers: {
        responseType: "arraybuffer",
      },
    });
};
