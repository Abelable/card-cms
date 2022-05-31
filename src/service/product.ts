import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils/index";
import {
  Channel,
  ChannelEncodingOption,
  ChannelForm,
  ChannelGoodsListResult,
  ChannelGoodsListSearchParams,
  ChannelOption,
  ChannelsResult,
  ChannelsSearchParams,
  Goods,
  GoodsForm,
  GoodsListResult,
  GoodsListSearchParams,
  GoodsOption,
  ProductOption,
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
        "filter[is_removed]": restParams.is_removed,
        "filter[supplier_id]": restParams.supplier_id,
        "filter[name]": restParams.goods_name,
        "filter[encoding]": restParams.goods_code,
        page,
        per_page,
      }),
    });
  });
};

export const useExportChannels = () => {
  const client = useHttp();
  return (params: Partial<ChannelsSearchParams>) => {
    const { page, per_page, ...restParams } = params;
    return client("/api/v1/admin/product/index", {
      data: cleanObject({
        is_export: 1,
        "filter[is_removed]": restParams.is_removed,
        "filter[supplier_id]": restParams.supplier_id,
        "filter[name]": restParams.goods_name,
        "filter[encoding]": restParams.goods_code,
        page,
        per_page,
      }),
      headers: {
        responseType: "arraybuffer",
        fileName: "product",
      },
    });
  };
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

export const useProductOptions = () => {
  const client = useHttp();
  return useQuery<ProductOption[]>(["product_options"], () =>
    client("/api/v1/admin/product/simple-index")
  );
};

export const useChannelEncodingOptions = () => {
  const client = useHttp();
  const res = useQuery(["channel_options"], () =>
    client("/api/v1/admin/product/pluck-encoding")
  );
  const channelOptions: ChannelEncodingOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      channelOptions.push({
        encoding: item,
        name: res.data[item],
      })
    );
  }
  return channelOptions;
};

export const useChannelGoodsList = (
  params: Partial<ChannelGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ChannelGoodsListResult>(
    ["product_channel_goods_list", params],
    () => {
      const { product_id, page, per_page } = params;
      return client("/api/v1/admin/goods/index", {
        data: cleanObject({
          "filter[goods.product_id]": product_id,
          page,
          per_page,
        }),
      });
    }
  );
};

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["product_goods_list", params], () => {
    const { page, per_page, ...rest } = params;
    return client("/api/v1/admin/goods/index", {
      data: cleanObject({
        "filter[goods.name]": rest.goods_name,
        "filter[product.supplier_id]": rest.supplier_id,
        "filter[product.encoding]": rest.product_code,
        "filter[goods.encoding]": rest.goods_code,
        "filter[product.operator_id]": rest.operator_id,
        "filter[product.ship_province_id]": rest.ship_province_id,
        "filter[product.ship_city_id]": rest.ship_city_id,
        "filter[product.province_id]": rest.province_id,
        "filter[product.city_id]": rest.city_id,
        "filter[goods.is_removed]": rest.is_removed,
        page,
        per_page,
      }),
    });
  });
};

export const useGoods = (id?: number) => {
  const client = useHttp();
  return useQuery<GoodsForm>(
    ["goods", { id }],
    () => client(`/api/v1/admin/goods/show/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("/api/v1/admin/goods/store", {
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
      client(`/api/v1/admin/goods/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/goods/simple-update/${id}`, {
        data: { is_removed: 1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useUpGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/goods/simple-update/${id}`, {
        data: { is_removed: 0 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useDeleteGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/goods/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGoodsExtension = (id?: number) => {
  const client = useHttp();
  return useQuery<string[]>(
    ["goods_extension", { id }],
    () => client("/api/v1/admin/goods/sponsored-link", { data: { id } }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useGoodsOptions = () => {
  const client = useHttp();
  const res = useQuery(["goods_options"], () =>
    client("/api/v1/admin/goods/pluck")
  );
  const goodsOptions: GoodsOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      goodsOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return goodsOptions;
};

export const useFailReasons = () => {
  const client = useHttp();
  return useQuery(["fail_reasons"], () =>
    client("/api/v1/admin/setting/product-failed-reasons")
  );
};
