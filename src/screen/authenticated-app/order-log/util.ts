import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useLogListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "tag_sn",
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

export const useLogListQueryKey = () => {
  const [params] = useLogListSearchParams();
  return ["log_list", params];
};
