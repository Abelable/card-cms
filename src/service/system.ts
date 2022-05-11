import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Black, BlacklistResult, BlacklistSearchParams } from "types/system";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useBlacklist = (params: Partial<BlacklistSearchParams>) => {
  const client = useHttp();
  return useQuery<BlacklistResult>(["blacklist", params], () =>
    client("/api/v1/admin/blacklist/index", {
      data: params,
    })
  );
};

export const useAddBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Black>) =>
      client("/api/v1/admin/product/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Black>) =>
      client(`/api/v1/admin/product/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/product/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
