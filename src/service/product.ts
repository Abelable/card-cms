import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Channel, ChannelsResult, ChannelsSearchParams } from "types/product";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useChannels = (params: Partial<ChannelsSearchParams>) => {
  const client = useHttp();
  return useQuery<ChannelsResult>(["channels", params], () =>
    client("/api/v1/admin/channel/index", {
      data: params,
    })
  );
};

export const useDownedChannels = (params: Partial<ChannelsSearchParams>) => {
  const client = useHttp();
  return useQuery<ChannelsResult>(["downed_channels", params], () =>
    client("/api/v1/admin/downed_channel/index", {
      data: params,
    })
  );
};

export const useAddChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Channel>) =>
      client("/api/v1/admin/channel/store", {
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
      client(`/api/v1/admin/channel/update/${id}`, {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/channel/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useUpChannel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client(`/api/v1/admin/channel/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
