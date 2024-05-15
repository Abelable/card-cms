import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useOrder, useOrderFlagRemark, useOrderLogList } from "service/order";

export const useOrderListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "order_sn",
    "shop_order_sn",
    "product_no",
    "express_sn",
    "express_company",
    "shop_name",
    "tag",
    "concat_phone",
    "idcard",
    "goods_name",
    "goods_sn",
    "time_type",
    "start_time",
    "end_time",
    "page",
    "per_page",
  ]);
  return [
    useMemo(() => {
      const { status, page, per_page, ...rest } = params;
      return {
        status: Number(status) || -1,
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

export const useReapplyModal = () => {
  const [{ reapplyOrderId }, setReapplyOrderId] = useUrlQueryParams([
    "reapplyOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: string) => setReapplyOrderId({ reapplyOrderId: id }),
    [setReapplyOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ reapplyOrderId: "" }),
    [setUrlParams]
  );

  return {
    reapplyModalOpen: !!reapplyOrderId,
    reapplyOrderId,
    open,
    close,
  };
};

export const useFlagModal = () => {
  const [{ flagOrderId, flag }, setFlagOrderId] = useUrlQueryParams([
    "flagOrderId",
    "flag",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data, isLoading } = useOrderFlagRemark(flagOrderId);

  const open = useCallback(
    (id: string, flag: string) => setFlagOrderId({ flagOrderId: id, flag }),
    [setFlagOrderId]
  );

  const close = useCallback(
    () => setUrlParams({ flagOrderId: "", flag: "" }),
    [setUrlParams]
  );

  return {
    flagModalOpen: !!flagOrderId,
    flagOrderId,
    flag,
    flagRemark: data?.text,
    isLoading,
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
