import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useSuppliersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "per_page"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useSuppliersQueryKey = () => {
  const [params] = useSuppliersSearchParams();
  return ["articleSuppliers", params];
};
