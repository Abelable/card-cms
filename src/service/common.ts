import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import {
  ExpressOption,
  OperatorOption,
  RegionOption,
  WarningSetting,
} from "types/common";
import { useEditDefaultWarningSettingConfig } from "./use-optimistic-options";

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

export const useDefaultWarningSetting = () => {
  const client = useHttp();
  return useQuery<WarningSetting>(["default_warning_setting"], () =>
    client("/api/v1/admin/setting/show/product.prewarn")
  );
};

export const useUpdateDefaultWarningSetting = () => {
  const client = useHttp();
  return useMutation(
    (params: WarningSetting) =>
      client("/api/v1/admin/setting/update/product.prewarn", {
        data: params,
        method: "POST",
      }),
    useEditDefaultWarningSettingConfig()
  );
};

export const useExpressOptions = () => {
  const client = useHttp();
  const res = useQuery(["express_options"], () =>
    client("/api/v1/admin/setting/express-pluck")
  );
  const expressOptions: ExpressOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      expressOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return expressOptions;
};
