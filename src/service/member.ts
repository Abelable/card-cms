import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  MemberItem,
  MemberListResult,
  MemberListSearchParams,
} from "types/member";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

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
