import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  GoodsListResult,
  GoodsListSearchParams,
  Agent,
  AgentsResult,
  AgentsSearchParams,
  AgentOption,
} from "types/agent";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

export const useAgents = (params: Partial<AgentsSearchParams>) => {
  const client = useHttp();
  return useQuery<AgentsResult>(["agents", params], () =>
    client("/api/v1/admin/agent/index", {
      data: cleanObject({ ...params }),
    })
  );
};

export const useAddAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Agent>) =>
      client("/api/v1/admin/agent/store", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Agent>) =>
      client(`/api/v1/admin/agent/simple-update/${id}`, {
        data: cleanObject({ ...params }),
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

export const useAgentOptions = () => {
  const client = useHttp();
  const res = useQuery(["agent_options"], () =>
    client("/api/v1/admin/agent/pluck")
  );
  const agentOptions: AgentOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      agentOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return agentOptions;
};

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["agent_goods_list", params], () => {
    const { page, per_page, agent_id } = params;
    return client("/api/v1/admin/goods/index", {
      data: cleanObject({
        "filter[goodsAgents.agent_id]": agent_id,
        page,
        per_page,
      }),
    });
  });
};
