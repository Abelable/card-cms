import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useProductsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "supplier_id",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useProductsQueryKey = () => {
  const [params] = useProductsSearchParams();
  return ["orderProducts", params];
};

export const useProductModal = () => {
  const [{ productCreate }, setProductModalOpen] = useUrlQueryParams([
    "productCreate",
  ]);
  const [{ editingProductId }, setEditingProductId] = useUrlQueryParams([
    "editingProductId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setProductModalOpen({ productCreate: true }),
    [setProductModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingProductId({ editingProductId: id }),
    [setEditingProductId]
  );
  const close = useCallback(
    () => setUrlParams({ productCreate: "", editingProductId: "" }),
    [setUrlParams]
  );

  return {
    productModalOpen: productCreate === "true" || !!editingProductId,
    editingProductId,
    open,
    startEdit,
    close,
  };
};
