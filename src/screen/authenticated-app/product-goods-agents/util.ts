import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useAgentsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "per_page"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
