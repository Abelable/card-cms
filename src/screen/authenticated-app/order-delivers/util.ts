import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useDeliver } from "service/order";

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
    "agent_id",
    "time_type",
    "start_time",
    "end_time",
    "page",
    "per_page",
  ]);
  return [
    useMemo(() => {
      const { page, per_page, time_type, ...rest } = params;
      return {
        page: Number(page) || 1,
        per_page: Number(per_page) || 10,
        time_type: time_type || 1,
        ...rest,
      };
    }, [params]),
    setParams,
  ] as const;
};

export const useOrderDeliversQueryKey = () => {
  const [params] = useOrderDeliversSearchParams();
  return ["order_delivers", params];
};

export const useStatusModal = () => {
  const [{ editingStatusDeliverId }, setEditingStatusDeliverIds] =
    useUrlQueryParams(["editingStatusDeliverId"]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingDeliver, isLoading } = useDeliver(
    Number(editingStatusDeliverId)
  );

  const startEdit = useCallback(
    (id: string) => setEditingStatusDeliverIds({ editingStatusDeliverId: id }),
    [setEditingStatusDeliverIds]
  );
  const close = useCallback(
    () => setUrlParams({ editingStatusDeliverId: "" }),
    [setUrlParams]
  );

  return {
    statusModalOpen: !!editingStatusDeliverId,
    editingStatusDeliverId,
    editingDeliver,
    startEdit,
    close,
    isLoading,
  };
};

export const useFailModal = () => {
  const [{ failDeliverIds }, setFailDeliverIds] = useUrlQueryParams([
    "failDeliverIds",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (ids: string) => setFailDeliverIds({ failDeliverIds: ids }),
    [setFailDeliverIds]
  );
  const close = useCallback(
    () => setUrlParams({ failDeliverIds: "" }),
    [setUrlParams]
  );

  return {
    failModalOpen: !!failDeliverIds,
    failDeliverIds,
    startEdit,
    close,
  };
};

export const usePicModal = () => {
  const [{ showPicDeliverId }, setShowPicDeliverId] = useUrlQueryParams([
    "showPicDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingDeliver, isLoading } = useDeliver(
    Number(showPicDeliverId)
  );

  const open = useCallback(
    (ids: string) => setShowPicDeliverId({ showPicDeliverId: ids }),
    [setShowPicDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ showPicDeliverId: "" }),
    [setUrlParams]
  );

  return {
    picModalOpen: !!showPicDeliverId,
    showPicDeliverId,
    editingDeliver,
    open,
    close,
    isLoading,
  };
};

export const useRecordModal = () => {
  const [{ showRecordDeliverId }, setShowRecordDeliverId] = useUrlQueryParams([
    "showRecordDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingDeliver, isLoading } = useDeliver(
    Number(showRecordDeliverId)
  );

  const open = useCallback(
    (ids: string) => setShowRecordDeliverId({ showRecordDeliverId: ids }),
    [setShowRecordDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ showRecordDeliverId: "" }),
    [setUrlParams]
  );

  return {
    recordModalOpen: !!showRecordDeliverId,
    showRecordDeliverId,
    editingDeliver,
    open,
    close,
    isLoading,
  };
};

export const useDataModal = () => {
  const [{ dataDeliverId }, setDataDeliverId] = useUrlQueryParams([
    "dataDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingDeliver, isLoading } = useDeliver(Number(dataDeliverId));

  const open = useCallback(
    (id: string) => setDataDeliverId({ dataDeliverId: id }),
    [setDataDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ dataDeliverId: "" }),
    [setUrlParams]
  );

  return {
    dataModalOpen: !!dataDeliverId,
    dataDeliverId,
    editingDeliver,
    open,
    close,
    isLoading,
  };
};

export const useInfoModal = () => {
  const [{ infoDeliverId }, setInfoDeliverId] = useUrlQueryParams([
    "infoDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingDeliver, isLoading } = useDeliver(Number(infoDeliverId));

  const open = useCallback(
    (id: string) => setInfoDeliverId({ infoDeliverId: id }),
    [setInfoDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ infoDeliverId: "" }),
    [setUrlParams]
  );

  return {
    infoModalOpen: !!infoDeliverId,
    infoDeliverId,
    editingDeliver,
    open,
    close,
    isLoading,
  };
};

export const useExportModal = () => {
  const [{ exportModalVisible }, setExportModalVisible] = useUrlQueryParams([
    "exportModalVisible",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setExportModalVisible({ exportModalVisible: true }),
    [setExportModalVisible]
  );

  const close = useCallback(
    () => setUrlParams({ exportModalVisible: "" }),
    [setUrlParams]
  );

  return {
    exportModalOpen: exportModalVisible === "true",
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
  const [{ detailDeliverId }, setDetailDeliverId] = useUrlQueryParams([
    "detailDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: editingDeliver, isLoading } = useDeliver(
    Number(detailDeliverId)
  );

  const open = useCallback(
    (ids: string) => setDetailDeliverId({ detailDeliverId: ids }),
    [setDetailDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ detailDeliverId: "" }),
    [setUrlParams]
  );

  return {
    detailModalOpen: !!detailDeliverId,
    detailDeliverId,
    editingDeliver,
    open,
    close,
    isLoading,
  };
};

export const useBlackModal = () => {
  const [{ blackDeliverId }, setBlackDeliverId] = useUrlQueryParams([
    "blackDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (ids: string) => setBlackDeliverId({ blackDeliverId: ids }),
    [setBlackDeliverId]
  );

  const close = useCallback(
    () => setUrlParams({ blackDeliverId: "" }),
    [setUrlParams]
  );

  return {
    blackModalOpen: !!blackDeliverId,
    blackDeliverId,
    open,
    close,
  };
};
