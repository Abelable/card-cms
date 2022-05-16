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
        s_time: params.start_created_at
          ? dayjs(params.start_created_at).valueOf()
          : "",
        e_time: params.end_created_at
          ? dayjs(params.end_created_at).valueOf()
          : "",
        ...params,
      }),
    })
  );
};
