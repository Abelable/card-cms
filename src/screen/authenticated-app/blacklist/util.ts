import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useBlacklistSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "per_page"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useBlacklistQueryKey = () => {
  const [params] = useBlacklistSearchParams();
  return ["blacklist", params];
};

export const useBlackModal = () => {
  const [{ blackCreate }, setBlackModalOpen] = useUrlQueryParams([
    "blackCreate",
  ]);
  const [{ editingBlackId }, setEditingBlackId] = useUrlQueryParams([
    "editingBlackId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setBlackModalOpen({ blackCreate: true }),
    [setBlackModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingBlackId({ editingBlackId: id }),
    [setEditingBlackId]
  );
  const close = useCallback(
    () => setUrlParams({ blackCreate: "", editingBlackId: "" }),
    [setUrlParams]
  );

  return {
    blackModalOpen: blackCreate === "true" || !!editingBlackId,
    editingBlackId,
    open,
    startEdit,
    close,
  };
};
