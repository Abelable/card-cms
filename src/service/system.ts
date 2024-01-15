import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  BlackItem,
  BlacklistResult,
  BlacklistSearchParams,
} from "types/system";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

export const useBlacklist = (params: Partial<BlacklistSearchParams>) => {
  const client = useHttp();
  return useQuery<BlacklistResult>(["blacklist", params], () => {
    const { idcard, phone, page, per_page } = params;
    return client("/api/v1/admin/blacklist/index", {
      data: cleanObject({
        "filter[idcard]": idcard,
        "filter[phone]": phone,
        page,
        per_page,
      }),
    });
  });
};

export const useAddBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<BlackItem>) =>
      client("/api/v1/admin/blacklist/store", {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, ...params }: Partial<BlackItem>) =>
      client(`/api/v1/admin/blacklist/update/${id}`, {
        data: cleanObject({ ...params }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteBlack = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client(`/api/v1/admin/blacklist/destroy/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
