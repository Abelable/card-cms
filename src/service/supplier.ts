import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
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
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditSupplier = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Supplier>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
