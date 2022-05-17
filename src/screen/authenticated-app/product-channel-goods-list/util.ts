import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "product_id",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
        product_id: Number(params.product_id) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
