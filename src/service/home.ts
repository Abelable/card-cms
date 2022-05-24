import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import {
  Home,
  HomeResult,
  HomeSearchParams,
  SecondHomeSearchParams,
} from "types/home";

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

export const useAddSecondHome = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<SecondHomeSearchParams>) =>
      client("/api/v1/admin/index/sub-agent", {
        data: cleanObject({
          "filter[date]": params.date,
          "filter[agent_id]": params.agent_id,
          "filter[goods_id]": params.goods_id,
        }),
      }),
    {
      onSuccess: (res: any) => {
        const list = res.map((item: any, index: number) => {
          const { id, date, ...rest } = item;
          return { id: `${id}${index + 1}`, children: [], ...rest };
        });
        queryClient.setQueryData(queryKey, (old: any) => ({
          ...old,
          list: old.list.map((item: any) =>
            item.id === res[0].id ? { ...item, children: list } : item
          ),
        }));
      },
    }
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
