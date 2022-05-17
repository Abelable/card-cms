import { useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { HomeResult, HomeSearchParams } from "types/home";

export const useHome = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return useQuery<HomeResult>(["datas", params], () =>
    client("/api/v1/admin/index/index", {
      data: cleanObject(params),
    })
  );
};

export const useExportHome = () => {
  const client = useHttp();
  return (params: Partial<HomeSearchParams>) =>
    client("/api/v1/admin/index/index", {
      data: cleanObject({
        is_export: 1,
        ...params,
      }),
    });
};
