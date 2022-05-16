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
  return useQuery<GoodsListResult>(["agent_goods_list", params], () =>
    client("/api/v1/admin/agent/index", {
      data: params,
    })
  );
};

// export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
//   const client = useHttp();
//   return useQuery<GoodsListResult>(["product_goods_list", params], () =>
//     client("/api/v1/admin/goods/index", {
//       data: params,
//     })
//   );
// };

// export const useChannels = (params: Partial<ChannelsSearchParams>) => {
//   const client = useHttp();
//   return useQuery<ChannelsResult>(["channels", params], () => {
//     const { page, per_page, ...restParams } = params;
//     return client("/api/v1/admin/product/index", {
//       data: cleanObject({
//         "filter[supplier_id]": restParams.supplier_id,
//         "filter[name]": restParams.goods_name,
//         "filter[encoding]": restParams.goods_code,
//         page,
//         per_page,
//       }),
//     });
//   });
// };
