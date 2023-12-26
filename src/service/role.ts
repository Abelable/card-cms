import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { RoleItem, RoleListResult, RoleListSearchParams } from "types/role";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

export const useRoleList = (params: Partial<RoleListSearchParams>) => {
  const client = useHttp();
  return useQuery<RoleListResult>(["role_list", params], () =>
    client("/api/v1/admin/role/lst", {
      data: cleanObject({ ...params }),
    })
  );
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
