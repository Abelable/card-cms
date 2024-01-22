import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useOrder, useOrderLogList } from "service/order";

export const useOrderListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "order_sn",
    "shop_order_sn",
    "shop_name",
    "flag",
    "start_created_at",
    "end_created_at",
    "page",
    "per_page",
  ]);
  return [
    useMemo(() => {
      const { page, per_page, ...rest } = params;
      return {
        page: Number(page) || 1,
        per_page: Number(per_page) || 10,
        ...rest,
      };
    }, [params]),
    setParams,
  ] as const;
};

export const useOrderListQueryKey = () => {
  const [params] = useOrderListSearchParams();
  return ["order_list", params];
};

export const useStatusModal = () => {
  const [{ editingStatusOrderId }, setEditingStatusOrderIds] =
    useUrlQueryParams(["editingStatusOrderId"]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingOrder, isLoading } = useOrder(editingStatusOrderId);

  const startEdit = useCallback(
    (id: string) => setEditingStatusOrderIds({ editingStatusOrderId: id }),
    [setEditingStatusOrderIds]
  );
  const close = useCallback(
    () => setUrlParams({ editingStatusOrderId: "" }),
    [setUrlParams]
  );

  return {
    statusModalOpen: !!editingStatusOrderId,
    editingStatusOrderId,
    editingOrder,
    startEdit,
    close,
    isLoading,
  };
};

export const useFailModal = () => {
  const [{ failOrderIds }, setFailOrderIds] = useUrlQueryParams([
    "failOrderIds",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (ids: string) => setFailOrderIds({ failOrderIds: ids }),
    [setFailOrderIds]
  );
  const close = useCallback(
    () => setUrlParams({ failOrderIds: "" }),
    [setUrlParams]
  );

  return {
    failModalOpen: !!failOrderIds,
    failOrderIds,
    startEdit,
    close,
  };
};

export const usePicModal = () => {
  const [{ showPicOrderId }, setShowPicOrderId] = useUrlQueryParams([
    "showPicOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingOrder, isLoading } = useOrder(showPicOrderId);

  const open = useCallback(
    (ids: string) => setShowPicOrderId({ showPicOrderId: ids }),
    [setShowPicOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ showPicOrderId: "" }),
    [setUrlParams]
  );

  return {
    picModalOpen: !!showPicOrderId,
    showPicOrderId,
    editingOrder,
    open,
    close,
    isLoading,
  };
};

export const useRecordModal = () => {
  const [{ showRecordOrderId }, setShowRecordOrderId] = useUrlQueryParams([
    "showRecordOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: logList, isLoading } = useOrderLogList(showRecordOrderId);

  const open = useCallback(
    (ids: string) => setShowRecordOrderId({ showRecordOrderId: ids }),
    [setShowRecordOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ showRecordOrderId: "" }),
    [setUrlParams]
  );

  return {
    recordModalOpen: !!showRecordOrderId,
    showRecordOrderId,
    logList,
    open,
    close,
    isLoading,
  };
};

export const useDataModal = () => {
  const [{ dataOrderId }, setDataOrderId] = useUrlQueryParams(["dataOrderId"]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingOrder, isLoading } = useOrder(dataOrderId);

  const open = useCallback(
    (id: string) => setDataOrderId({ dataOrderId: id }),
    [setDataOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ dataOrderId: "" }),
    [setUrlParams]
  );

  return {
    dataModalOpen: !!dataOrderId,
    dataOrderId,
    editingOrder,
    open,
    close,
    isLoading,
  };
};

export const useInfoModal = () => {
  const [{ infoOrderId }, setInfoOrderId] = useUrlQueryParams(["infoOrderId"]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingOrder, isLoading } = useOrder(infoOrderId);

  const open = useCallback(
    (id: string) => setInfoOrderId({ infoOrderId: id }),
    [setInfoOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ infoOrderId: "" }),
    [setUrlParams]
  );

  return {
    infoModalOpen: !!infoOrderId,
    infoOrderId,
    editingOrder,
    open,
    close,
    isLoading,
  };
};

export const useExportModal = () => {
  const [{ exportOrderModalVisible }, setExportModalVisible] =
    useUrlQueryParams(["exportOrderModalVisible"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setExportModalVisible({ exportOrderModalVisible: true }),
    [setExportModalVisible]
  );

  const close = useCallback(
    () => setUrlParams({ exportOrderModalVisible: "" }),
    [setUrlParams]
  );

  return {
    exportModalOpen: exportOrderModalVisible === "true",
    open,
    close,
  };
};

export const useExportProductModal = () => {
  const [{ exportProductModalVisible }, setExportProductModalVisible] =
    useUrlQueryParams(["exportProductModalVisible"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setExportProductModalVisible({ exportProductModalVisible: true }),
    [setExportProductModalVisible]
  );

  const close = useCallback(
    () => setUrlParams({ exportProductModalVisible: "" }),
    [setUrlParams]
  );

  return {
    exportProducModalOpen: exportProductModalVisible === "true",
    open,
    close,
  };
};

export const useDetailModal = () => {
  const [{ detailOrderId }, setDetailOrderId] = useUrlQueryParams([
    "detailOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingOrder, isLoading } = useOrder(detailOrderId);

  const open = useCallback(
    (ids: string) => setDetailOrderId({ detailOrderId: ids }),
    [setDetailOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ detailOrderId: "" }),
    [setUrlParams]
  );

  return {
    detailModalOpen: !!detailOrderId,
    detailOrderId,
    editingOrder,
    open,
    close,
    isLoading,
  };
};

export const useBlackModal = () => {
  const [{ blackOrderId }, setBlackOrderId] = useUrlQueryParams([
    "blackOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (ids: string) => setBlackOrderId({ blackOrderId: ids }),
    [setBlackOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ blackOrderId: "" }),
    [setUrlParams]
  );

  return {
    blackModalOpen: !!blackOrderId,
    blackOrderId,
    open,
    close,
  };
};
