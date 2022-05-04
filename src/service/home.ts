import { useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import { HomeResult, HomeSearchParams } from "types/home";

export const useHome = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return useQuery<HomeResult>(["users", params], () =>
    client("/api/admin/user/list", {
      data: cleanObject({
        s_time: params.s_time ? dayjs(params.s_time).valueOf() : "",
        e_time: params.e_time ? dayjs(params.e_time).valueOf() : "",
        ...params,
      }),
    })
  );
};
