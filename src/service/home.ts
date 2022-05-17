import { useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { HomeResult, HomeSearchParams } from "types/home";

export const useHome = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return useQuery<HomeResult>(["datas", params], () =>
    client("/api/v1/admin/index/index", {
      data: cleanObject({
        start_created_at: params.start_created_at || "",
        end_created_at: params.end_created_at || "",
        ...params,
      }),
    })
  );
};

export const useExport = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return client("/api/v1/admin/index/index", {
    data: cleanObject({
      start_created_at: params.start_created_at || "",
      end_created_at: params.end_created_at || "",
      ...params,
    }),
  });
};
