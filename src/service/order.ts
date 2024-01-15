import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useEditDeliversConfig,
} from "./use-optimistic-options";

import type {
  OrderGrabListSearchParams,
  ShopListResult,
  Deliver,
  DeliversSearchParams,
  ImportsResult,
  ImportsSearchParams,
  ProduceStatusOption,
  Product,
  ProductsResult,
  ProductsSearchParams,
  ReportForm,
} from "types/order";

export const useOrderGrabList = (
  params: Partial<OrderGrabListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShopListResult>(["order_grab_list", params], () => {
    const { page, per_page } = params;
    return client("/api/v1/admin/shop/lst", {
      data: cleanObject({
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
    return client("/api/v1/admin/order-export/store", {
      data: cleanObject({
        filter: cleanObject({
          "product.name": restParams.product_name,
          "product.encoding": restParams.product_code,
          "order.order_no": restParams.order_id,
          "order.outer_order_no": restParams.out_order_id,
          "order.status": restParams.order_status,
          "order.idcard": restParams.id_number,
          "order.express_no": restParams.express_code,
          "order.product_no": restParams.production_number,
          "order.phone": restParams.phone,
          "order.is_recharged": restParams.is_recharged,
          "order.is_activated": restParams.is_activated,
          "order.agent_id": restParams.agent_id,
          "order.start_created_at":
            Number(restParams.time_type) === 1 ? restParams.start_time : "",
          "order.end_created_at":
            Number(restParams.time_type) === 1 ? restParams.end_time : "",
          "order.start_activated_at":
            Number(restParams.time_type) === 2 ? restParams.start_time : "",
          "order.end_activated_at":
            Number(restParams.time_type) === 2 ? restParams.end_time : "",
        }),
        page,
        per_page,
      }),
      method: "POST",
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

export const useProduceStatusOptions = () => {
  const client = useHttp();
  const res = useQuery(["produce_status_options"], () =>
    client("/api/v1/admin/order/status-pluck")
  );
  const produceStatusOptions: ProduceStatusOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      produceStatusOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return produceStatusOptions;
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

export const useEditDeliverSimple = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status, remark }: Partial<Deliver>) =>
      client(`/api/v1/admin/order/simple-update/${id}`, {
        data: cleanObject({
          status,
          remark,
        }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditDeliverData = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, product_no, express_name, express_no }: Partial<Deliver>) =>
      client(`/api/v1/admin/order/update-product/${id}`, {
        data: { product_no, express_name, express_no },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditDelivers = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: { ids: string[]; status: number; remark?: string }) =>
      client("/api/v1/admin/order/batch-simple-update", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useEditDeliversConfig(queryKey)
  );
};

export const useBlackDelivers = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: {
      ids: string[];
      is_phone?: boolean;
      is_idcard?: boolean;
      is_address?: boolean;
    }) =>
      client("/api/v1/admin/order/batch-black-list", {
        data: cleanObject({ ...params }),
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
        data: cleanObject({ ...params }),
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
        data: cleanObject({ ...params }),
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
  return useQuery<ImportsResult>(["produce_imports", params], () =>
    client("/api/v1/admin/order-import/index", {
      data: cleanObject({ ...params }),
    })
  );
};

export const useTestConfig = (params: Partial<Product>) => {
  const client = useHttp();
  return client("/api/v1/admin/supplier-product/check", {
    data: cleanObject({ ...params }),
    method: "POST",
  });
};

export const useExportProduceProduct = () => {
  const client = useHttp();
  return ({
    agentId,
    encodings,
    password,
  }: {
    agentId?: number | undefined;
    encodings?: string[] | undefined;
    password: string;
  }) =>
    client("/api/v1/admin/order/export-product", {
      data: cleanObject({
        filter: cleanObject({
          "order.agent_id": agentId,
          "product-encoding": encodings,
        }),
        password,
      }),
      method: "POST",
      headers: {
        responseType: "arraybuffer",
      },
    });
};

export const useReportForms = () => {
  const client = useHttp();
  return useQuery<ReportForm[]>(["report_forms"], () =>
    client("/api/v1/admin/order-export/index")
  );
};
