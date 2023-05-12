import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useAddressListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "province_code",
    "city_code",
    "area_code",
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

export const useAddressListQueryKey = () => {
  const [params] = useAddressListSearchParams();
  return ["address_list", params];
};

export const useAddressModal = () => {
  const [{ addressCreate }, setAddressModalOpen] = useUrlQueryParams([
    "addressCreate",
  ]);
  const [{ editingAddressId }, setEditingAddressId] = useUrlQueryParams([
    "editingAddressId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setAddressModalOpen({ addressCreate: true }),
    [setAddressModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingAddressId({ editingAddressId: id }),
    [setEditingAddressId]
  );
  const close = useCallback(
    () => setUrlParams({ addressCreate: "", editingAddressId: "" }),
    [setUrlParams]
  );

  return {
    addressModalOpen: addressCreate === "true" || !!editingAddressId,
    editingAddressId,
    open,
    startEdit,
    close,
  };
};
