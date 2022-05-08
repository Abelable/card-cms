import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useProductsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "supplier_id",
    "page",
    "page_size",
  ]);
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

export const useProductsQueryKey = () => {
  const [params] = useProductsSearchParams();
  return ["orderProducts", params];
};
