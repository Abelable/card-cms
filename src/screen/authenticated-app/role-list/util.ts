import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRolePermission } from "service/role";

export const useRoleListSearchParams = () => {
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

export const useRoleListQueryKey = () => {
  const [params] = useRoleListSearchParams();
  return ["role_list", params];
};

export const useRoleModal = () => {
  const [{ roleCreate }, setRoleModalOpen] = useUrlQueryParams(["roleCreate"]);
  const [{ editingRoleId }, setEditingRoleId] = useUrlQueryParams([
    "editingRoleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setRoleModalOpen({ roleCreate: true }),
    [setRoleModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingRoleId({ editingRoleId: id }),
    [setEditingRoleId]
  );
  const close = useCallback(
    () => setUrlParams({ roleCreate: "", editingRoleId: "" }),
    [setUrlParams]
  );

  return {
    roleModalOpen: roleCreate === "true" || !!editingRoleId,
    editingRoleId,
    open,
    startEdit,
    close,
  };
};

export const usePermissionModal = () => {
  const [{ editingPermissionRoleId }, setEditingRoleId] = useUrlQueryParams([
    "editingPermissionRoleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: permission,
    isLoading,
    error,
  } = useRolePermission(Number(editingPermissionRoleId));

  const open = useCallback(
    (id: string) => setEditingRoleId({ editingPermissionRoleId: id }),
    [setEditingRoleId]
  );
  const close = useCallback(
    () => setUrlParams({ editingPermissionRoleId: "" }),
    [setUrlParams]
  );

  return {
    permissionModalOpen: !!editingPermissionRoleId,
    editingPermissionRoleId,
    isLoading,
    permission,
    error,
    open,
    close,
  };
};
