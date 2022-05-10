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
  const [{ editingDeliverIds }, setEditingDeliverIds] = useUrlQueryParams([
    "editingDeliverIds",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (ids: string) => setEditingDeliverIds({ editingDeliverIds: ids }),
    [setEditingDeliverIds]
  );
  const close = useCallback(
    () => setUrlParams({ editingDeliverIds: "" }),
    [setUrlParams]
  );

  return {
    statusModalOpen: !!editingDeliverIds,
    editingDeliverIds,
    startEdit,
    close,
  };
};
