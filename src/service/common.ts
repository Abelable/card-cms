import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { OperatorOption, OssConfig, RegionPluck } from "types/common";

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

export const useRegionPlucks = (id: "0") => {
  const client = useHttp();
  const res = useQuery([`region_plucks_${id}`], () =>
    client(`/api/v1/admin/province-city-area/pluck/${id}`)
  );
  const operatorPlucks: RegionPluck[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      operatorPlucks.push({
        value: item,
        label: res.data[item],
      })
    );
  }
  return operatorPlucks;
};
