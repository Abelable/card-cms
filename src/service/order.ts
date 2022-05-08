import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
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

export const useProducts = (params: Partial<ProductsSearchParams>) => {
  const client = useHttp();
  return useQuery<ProductsResult>(["products", params], () =>
    client("/api/v1/admin/product/index", {
      data: params,
    })
  );
};

export const useAddProduct = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Product>) =>
      client("/api/v1/admin/product/store", {
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
      client(`/api/v1/admin/product/update/${id}`, {
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
      client(`/api/v1/admin/product/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useImports = (params: Partial<ImportsSearchParams>) => {
  const client = useHttp();
  return useQuery<ImportsResult>(["products", params], () =>
    client("/api/v1/admin/product/index", {
      data: params,
    })
  );
};
