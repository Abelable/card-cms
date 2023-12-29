import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

import type { Key } from "react";
import type {
  RoleItem,
  RoleListResult,
  RoleListSearchParams,
  RoleOption,
} from "types/role";

export const useRoleList = (params: Partial<RoleListSearchParams>) => {
  const client = useHttp();
  return useQuery<RoleListResult>(["role_list", params], () =>
    client("/api/v1/admin/role/lst", {
      data: cleanObject({ ...params }),
    })
  );
};

export const useRoleOptions = () => {
  const client = useHttp();
  const res = useQuery<RoleListResult>(["member_options"], () =>
    client("/api/v1/admin/role/lst", { data: { per_page: 1000, page: 1 } })
  );
  const memberOptions: RoleOption[] = res.data?.data
    ? res.data?.data.map(({ id, name }) => ({ id, name }))
    : [];
  return memberOptions;
};

export const useAddRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RoleItem>) =>
      client("/api/v1/admin/role/create", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<RoleItem>) =>
      client(`/api/v1/admin/role/update/${id}`, {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/role/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRolePermission = (id: number) => {
  const client = useHttp();
  return useQuery(
    ["role_auth", { id }],
    () => client(`/api/v1/admin/role/get-perms/${id}`),
    {
      enabled: !!id,
    }
  );
};

export const useUpdateRolePermission = () => {
  const client = useHttp();
  return useMutation(({ id, perms }: { id: number; perms: Key[] }) =>
    client(`/api/v1/admin/role/perms/${id}`, {
      data: { id, perms },
      method: "POST",
    })
  );
};
