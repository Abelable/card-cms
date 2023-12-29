import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

import type {
  MemberItem,
  MemberListResult,
  MemberListSearchParams,
} from "types/member";

export const useMemberList = (params: Partial<MemberListSearchParams>) => {
  const client = useHttp();
  return useQuery<MemberListResult>(["member_list", params], () =>
    client("/api/v1/admin/user/lst", {
      data: cleanObject({ ...params }),
    })
  );
};

export const useAddMember = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<MemberItem>) =>
      client("/api/v1/admin/user/create", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditMember = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<MemberItem>) =>
      client(`/api/v1/admin/user/update/${id}`, {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditMemberStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status }: { id: number; status: number }) =>
      client(`/api/v1/admin/user/status/${id}`, {
        data: { status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteMember = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/user/delete/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useResetMemberPwd = () => {
  const client = useHttp();
  return useMutation(
    ({
      id,
      password,
      password_confirm,
    }: {
      id: number;
      password: string;
      password_confirm: string;
    }) =>
      client(`/api/v1/admin/user/update/${id}`, {
        data: { id, password, password_confirm },
        method: "POST",
      })
  );
};
