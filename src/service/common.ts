import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { OssConfig } from "types/common";

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
