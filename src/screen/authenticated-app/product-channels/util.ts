import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useHomeSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "s_time",
    "e_time",
    "shop_name",
    "goods_name",
  ]);
  return [
    useMemo(
      () => ({
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
