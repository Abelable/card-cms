import { useHttp } from "./http";
import { useQuery } from "react-query";
import { OssConfig } from "types/common";

export const useOssConfig = () => {
  const client = useHttp();
  return useQuery<OssConfig>(["ossConfig"], () => client("/api/admin/oss/ali"));
};
