import { useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import { HomeResult, HomeSearchParams } from "types/home";

export const useHome = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return useQuery<HomeResult>(["datas", params], () =>
    client("/api/v1/admin/index/index", {
      data: cleanObject({
        s_time: params.s_time ? dayjs(params.s_time).valueOf() : "",
        e_time: params.e_time ? dayjs(params.e_time).valueOf() : "",
        ...params,
      }),
    })
  );
};
