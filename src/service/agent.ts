import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  GoodsListResult,
  GoodsListSearchParams,
  Agent,
  AgentsResult,
  AgentsSearchParams,
} from "types/agent";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useAgents = (params: Partial<AgentsSearchParams>) => {
  const client = useHttp();
  return useQuery<AgentsResult>(["agents", params], () =>
    client("/api/v1/admin/agent/index", {
      data: params,
    })
  );
};

export const useAddAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Agent>) =>
      client("/api/v1/admin/agent/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Agent>) =>
      client(`/api/v1/admin/agent/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/agent/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["goods_list", params], () =>
    client("/api/v1/admin/agent/index", {
      data: params,
    })
  );
};
