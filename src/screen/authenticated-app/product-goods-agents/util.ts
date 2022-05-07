import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useAgentsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
