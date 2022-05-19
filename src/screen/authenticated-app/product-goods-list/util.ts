import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useGoods } from "service/product";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "goods_name",
    "supplier_id",
    "product_code",
    "goods_code",
    "operator_id",
    "ship_province_id",
    "ship_city_id",
    "province_id",
    "city_id",
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

  const { data: editingGoods, isLoading } = useGoods(Number(editingGoodsId));

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
    editingGoods,
    open,
    startEdit,
    close,
    isLoading,
  };
};

export const useAgentModal = () => {
  const [{ goodsIdOfEditingAgent }, setEditingGoodsId] = useUrlQueryParams([
    "goodsIdOfEditingAgent",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingGoods, isLoading } = useGoods(
    Number(goodsIdOfEditingAgent)
  );

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
    editingGoods,
    startEdit,
    close,
    isLoading,
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
