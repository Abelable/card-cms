import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useSuppliersSearchParams = () => {
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

export const useSuppliersQueryKey = () => {
  const [params] = useSuppliersSearchParams();
  return ["suppliers", params];
};

export const useSupplierModal = () => {
  const [{ supplierCreate }, setSuppliersModalOpen] = useUrlQueryParams([
    "supplierCreate",
  ]);
  const [{ editingSupplierId }, setEditingSupplierId] = useUrlQueryParams([
    "editingSupplierId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setSuppliersModalOpen({ supplierCreate: true }),
    [setSuppliersModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingSupplierId({ editingSupplierId: id }),
    [setEditingSupplierId]
  );
  const close = useCallback(
    () => setUrlParams({ supplierCreate: "", editingSupplierId: "" }),
    [setUrlParams]
  );

  return {
    supplierModalOpen: supplierCreate === "true" || !!editingSupplierId,
    editingSupplierId,
    open,
    startEdit,
    close,
  };
};
