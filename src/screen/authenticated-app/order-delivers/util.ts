import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useOrderDeliversSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "product_name",
    "product_code",
    "order_id",
    "out_order_id",
    "order_status",
    "id_number",
    "express_code",
    "production_number",
    "phone",
    "is_recharged",
    "is_activated",
    "upper_order_id",
    "agent_id",
    "time_type",
    "start_time",
    "end_time",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useOrderDeliversQueryKey = () => {
  const [params] = useOrderDeliversSearchParams();
  return ["order_delivers", params];
};

export const useGoodsModal = () => {
  const [{ goodsCreate }, setGoodsListModalOpen] = useUrlQueryParams([
    "goodsCreate",
  ]);
  const [{ editingGoodsId }, setEditingGoodsId] = useUrlQueryParams([
    "editingGoodsId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsListModalOpen({ goodsCreate: true }),
    [setGoodsListModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingGoodsId({ editingGoodsId: id }),
    [setEditingGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsCreate: "", editingGoodsId: "" }),
    [setUrlParams]
  );

  return {
    goodsModalOpen: goodsCreate === "true" || !!editingGoodsId,
    editingGoodsId,
    open,
    startEdit,
    close,
  };
};

export const useAgentModal = () => {
  const [{ goodsIdOfEditingAgent }, setEditingGoodsId] = useUrlQueryParams([
    "goodsIdOfEditingAgent",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (id: string) => setEditingGoodsId({ goodsIdOfEditingAgent: id }),
    [setEditingGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsIdOfEditingAgent: "" }),
    [setUrlParams]
  );

  return {
    agentModalOpen: !!goodsIdOfEditingAgent,
    goodsIdOfEditingAgent,
    startEdit,
    close,
  };
};

export const useLinkModal = () => {
  const [{ goodsIdOfLink }, setGoodsIdOfLink] = useUrlQueryParams([
    "goodsIdOfLink",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (id: string) => setGoodsIdOfLink({ goodsIdOfLink: id }),
    [setGoodsIdOfLink]
  );
  const close = useCallback(
    () => setUrlParams({ goodsIdOfLink: "" }),
    [setUrlParams]
  );

  return {
    linkModalOpen: !!goodsIdOfLink,
    goodsIdOfLink,
    startEdit,
    close,
  };
};

export const usePublishModal = () => {
  const [{ publishModalVisible }, setPublishModalVisible] = useUrlQueryParams([
    "publishModalVisible",
  ]);
  const open = useCallback(
    () => setPublishModalVisible({ publishModalVisible: true }),
    [setPublishModalVisible]
  );
  const setUrlParams = useSetUrlSearchParams();
  const close = useCallback(
    () => setUrlParams({ publishModalVisible: "" }),
    [setUrlParams]
  );
  return {
    publishModalOpen: publishModalVisible === "true",
    open,
    close,
  };
};

export const useNewPublishModal = () => {
  const [{ newPublishModalVisible }, setNewPublishModalVisible] =
    useUrlQueryParams(["newPublishModalVisible"]);
  const open = useCallback(
    () => setNewPublishModalVisible({ newPublishModalVisible: true }),
    [setNewPublishModalVisible]
  );
  const setUrlParams = useSetUrlSearchParams();
  const close = useCallback(
    () => setUrlParams({ newPublishModalVisible: "" }),
    [setUrlParams]
  );
  return {
    newPublishModalOpen: newPublishModalVisible === "true",
    open,
    close,
  };
};
