import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "goods_name",
    "goods_code",
    "supplier",
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

export const useDownedGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "goods_name",
    "goods_code",
    "supplier",
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

export const useGoodsListQueryKey = () => {
  const [params] = useGoodsListSearchParams();
  return ["product_goods_list", params];
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
