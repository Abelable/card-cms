import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { OperatorOption, OssConfig, RegionOption } from "types/common";

export const useOssConfig = () => {
  const client = useHttp();
  return useQuery<OssConfig>(["ossConfig"], () => client("/api/admin/oss/ali"));
};

export const useImportData = () => {
  const client = useHttp();
  return useMutation(({ excel_file }: { excel_file: any }) =>
    client("/api/admin/enter-apply/personal-import", {
      data: { excel_file },
      method: "POST",
    })
  );
};

export const useOperatorOptions = () => {
  const client = useHttp();
  const res = useQuery(["operator_options"], () =>
    client("/api/v1/admin/operator/pluck")
  );
  const operatorOptions: OperatorOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      operatorOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return operatorOptions;
};

export const useRegionOptions = (depth = 2) => {
  const client = useHttp();
  return useQuery<RegionOption[]>(["region_options"], () =>
    client("/api/v1/admin/province-city-area/tree", {
      data: { depth },
    })
  );
};
