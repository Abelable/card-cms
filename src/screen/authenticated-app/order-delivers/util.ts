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

export const useStatusModal = () => {
  const [{ editingStatusDeliverIds }, setEditingStatusDeliverIds] =
    useUrlQueryParams(["editingStatusDeliverIds"]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (ids: string) =>
      setEditingStatusDeliverIds({ editingStatusDeliverIds: ids }),
    [setEditingStatusDeliverIds]
  );
  const close = useCallback(
    () => setUrlParams({ editingStatusDeliverIds: "" }),
    [setUrlParams]
  );

  return {
    statusModalOpen: !!editingStatusDeliverIds,
    editingStatusDeliverIds,
    startEdit,
    close,
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
    statusModalOpen: !!failDeliverIds,
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
    open,
    close,
  };
};

export const useRecordModal = () => {
  const [{ showRecordDeliverId }, setShowRecordDeliverId] = useUrlQueryParams([
    "showRecordDeliverId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

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
    open,
    close,
  };
};
