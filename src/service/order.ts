import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  DeliversResult,
  DeliversSearchParams,
  ImportsResult,
  ImportsSearchParams,
  Product,
  ProductsResult,
  ProductsSearchParams,
} from "types/order";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useDelivers = (params: Partial<DeliversSearchParams>) => {
  const client = useHttp();
  return useQuery<DeliversResult>(["products", params], () =>
    client("/api/v1/admin/order/index", {
      data: params,
    })
  );
};

export const useEditDeliversStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Product>) =>
      client(`/api/v1/admin/order/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
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
