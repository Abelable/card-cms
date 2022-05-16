import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  AgentsResult,
  AgentsSearchParams,
  Channel,
  ChannelForm,
  ChannelGoodsListResult,
  ChannelOption,
  ChannelsResult,
  ChannelsSearchParams,
  Goods,
  GoodsListResult,
  GoodsListSearchParams,
} from "types/product";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useChannels = (params: Partial<ChannelsSearchParams>) => {
  const client = useHttp();
  return useQuery<ChannelsResult>(["channels", params], () => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/product/index", {
      data: cleanObject({
        "filter[supplier_id]": restParams.supplier_id,
        "filter[name]": restParams.goods_name,
        "filter[encoding]": restParams.goods_code,
        page,
        per_page,
      }),
    });
  });
};

export const useDownedChannels = (params: Partial<ChannelsSearchParams>) => {
  const client = useHttp();
  return useQuery<ChannelsResult>(["downed_channels", params], () => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/product/index", {
      data: cleanObject({
        "filter[supplier_id]": restParams.supplier_id,
        "filter[name]": restParams.goods_name,
        "filter[encoding]": restParams.goods_code,
        page,
        per_page,
      }),
    });
  });
};

export const useChannel = (id?: number) => {
  const client = useHttp();
  return useQuery<ChannelForm>(
    ["channel", { id }],
    () => client(`/api/v1/admin/product/show/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useAddChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Channel>) =>
      client("/api/v1/admin/product/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Channel>) =>
      client(`/api/v1/admin/product/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditChannelMode = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, is_auto_product }: { id: number; is_auto_product: number }) =>
      client(`/api/v1/admin/product/simple-update/${id}`, {
        data: { is_auto_product },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/product/simple-update/${id}`, {
        data: { is_removed: 1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useUpChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/product/simple-update/${id}`, {
        data: { is_removed: 0 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useChannelOptions = () => {
  const client = useHttp();
  const res = useQuery(["channel_options"], () =>
    client("/api/v1/admin/product/pluck")
  );
  const channelOptions: ChannelOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      channelOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return channelOptions;
};

export const useChannelGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<ChannelGoodsListResult>(
    ["product_channel_goods_list", params],
    () =>
      client("/api/v1/admin/agent/index", {
        data: params,
      })
  );
};

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["product_goods_list", params], () =>
    client("/api/v1/admin/goods/index", {
      data: params,
    })
  );
};

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

export const useDownedGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["downed_product_goods_list", params], () =>
    client("/api/v1/admin/goods/index", {
      data: params,
    })
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("/api/v1/admin/channel/store", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<Goods>) =>
      client(`/api/v1/admin/channel/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

interface EditGoodsAgentParams extends Partial<Goods> {
  id: number;
}
export const useEditGoodsAgent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: EditGoodsAgentParams) =>
      client(`/api/v1/admin/channel/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useGoodsAgents = (params: Partial<AgentsSearchParams>) => {
  const client = useHttp();
  return useQuery<AgentsResult>(["product_goods_agents", params], () =>
    client("/api/v1/admin/agent/index", {
      data: params,
    })
  );
};

export const usePublishGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("/api/v1/admin/channel/update", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useNewPublishGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("/api/v1/admin/channel/update", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
