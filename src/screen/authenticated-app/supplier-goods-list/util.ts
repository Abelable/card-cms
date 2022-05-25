import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "supplier_id",
    "goods_name",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
        supplier_id: Number(params.supplier_id) || undefined,
        goods_name: params.goods_name || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
