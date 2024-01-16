import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useImportsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "supplier_id",
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

export const useImportsQueryKey = () => {
  const [params] = useImportsSearchParams();
  return ["produce_imports", params];
};
