import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useChannel } from "service/product";

export const useChannelsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "goods_name",
    "goods_code",
    "supplier_id",
    "is_removed",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
        is_removed: params.is_removed || "0",
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useChannelsQueryKey = () => {
  const [params] = useChannelsSearchParams();
  return ["channels", params];
};

export const useChannelModal = () => {
  const [{ channelCreate }, setChannelsModalOpen] = useUrlQueryParams([
    "channelCreate",
  ]);
  const [{ editingChannelId }, setEditingChannelId] = useUrlQueryParams([
    "editingChannelId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingChannel, isLoading } = useChannel(
    Number(editingChannelId)
  );

  const open = useCallback(
    () => setChannelsModalOpen({ channelCreate: true }),
    [setChannelsModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingChannelId({ editingChannelId: id }),
    [setEditingChannelId]
  );
  const close = useCallback(
    () => setUrlParams({ channelCreate: "", editingChannelId: "" }),
    [setUrlParams]
  );

  return {
    channelModalOpen: channelCreate === "true" || !!editingChannelId,
    editingChannelId,
    open,
    close,
    startEdit,
    editingChannel,
    isLoading,
  };
};
