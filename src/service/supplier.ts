import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  GoodsListResult,
  GoodsListSearchParams,
  Supplier,
  SuppliersResult,
  SuppliersSearchParams,
} from "types/supplier";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useSuppliers = (params: Partial<SuppliersSearchParams>) => {
  const client = useHttp();
  return useQuery<SuppliersResult>(["suppliers", params], () =>
    client("/api/v1/admin/supplier/index", {
      data: params,
    })
  );
};

export const useAddSupplier = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Supplier>) =>
      client("/api/v1/admin/supplier/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditSupplier = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Supplier>) =>
      client(`/api/v1/admin/supplier/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["goods_list", params], () =>
    client("/api/v1/admin/supplier/index", {
      data: params,
    })
  );
};
