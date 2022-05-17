import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";
import dayjs from "dayjs";

export const useHomeSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "start_created_at",
    "end_created_at",
    "agent_id",
    "goods_name",
  ]);
  return [
    useMemo(() => {
      const date = new Date();
      date.setDate(date.getDate() - 6);
      return {
        start_created_at:
          params.start_created_at || dayjs(date).format("YYYY-MM-DD"),
        end_created_at: params.start_created_at || dayjs().format("YYYY-MM-DD"),
        ...params,
      };
    }, [params]),
    setParams,
  ] as const;
};
