import { useQuery } from "react-query";
import { useHttp } from "./http";
import { SuppliersResult, SuppliersSearchParams } from "types/supplier";

export const useSuppliers = (params: Partial<SuppliersSearchParams>) => {
  const client = useHttp();
  return useQuery<SuppliersResult>(["suppliers", params], () =>
    client("/api/v1/admin/supplier/index", {
      data: params,
    })
  );
};
