import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";
import dayjs from "dayjs";

export const useHomeSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "start_created_at",
    "end_created_at",
    "agent_id",
    "goods_id",
  ]);
  return [
    useMemo(() => {
      const date = new Date();
      date.setDate(date.getDate() - 6);
      const { start_created_at, end_created_at, ...rest } = params;
      return {
        start_created_at: start_created_at || dayjs(date).format("YYYY-MM-DD"),
        end_created_at: end_created_at || dayjs().format("YYYY-MM-DD"),
        ...rest,
      };
    }, [params]),
    setParams,
  ] as const;
};

export const useHomeQueryKey = () => {
  const [params] = useHomeSearchParams();
  return ["home_records", params];
};
