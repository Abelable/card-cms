import { useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { Home, HomeResult, HomeSearchParams } from "types/home";

export const useHome = (params: Partial<HomeSearchParams>) => {
  const client = useHttp();
  return useQuery<HomeResult>(["home_records", params], async () => {
    const res: Home[] = await client("/api/v1/admin/index/index", {
      data: cleanObject({
        "filter[agent_id]": params.agent_id,
        "filter[goods_id]": params.goods_id,
        "filter[start_created_at]": params.start_created_at,
        "filter[end_created_at]": params.end_created_at,
      }),
    });
    const list = res.slice(0, -1).map((item) => ({ ...item, children: [] }));
    return {
      list,
      total: res[res.length - 1],
    };
  });
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
