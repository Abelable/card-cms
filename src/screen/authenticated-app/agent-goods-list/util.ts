import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "agent_id",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        ...params,
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
