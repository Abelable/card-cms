import { useState } from "react";
import { Button, Upload, message } from "antd";
import { initNonce, initTimestamp } from "service/http";
import { useAuth } from "context/auth-context";

import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";

interface FileUploadType extends React.ComponentProps<typeof Upload> {
  scene?: number;
  name: string;
  onSuccess: () => void;
}

export const FileUpload = ({
  scene,
  name,
  onSuccess,
  ...restProps
}: FileUploadType) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  let url = "";
  switch (scene) {
    case 1:
      url = "/api/v1/admin/order/import-product";
      break;
    case 2:
      url = "/api/v1/admin/order/import-activate";
      break;
    case 3:
      url = "/api/v1/admin/order-import/import";
      break;
    case 4:
      url = "/api/v1/admin/order-import/import-photo";
      break;
    case 5:
      url = "/api/v1/admin/blacklist/import";
      break;
  }

  return (
    <Upload
      action={`${process.env.REACT_APP_API_URL}${url}`}
      headers={{
        Authorization: `Bearer ${token}`,
        timestamp: initTimestamp(),
        nonce: initNonce(),
      }}
      name={scene === 4 ? "zip" : "excel"}
      accept={
        scene === 4
          ? "application/zip"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
      maxCount={1}
      showUploadList={false}
      onChange={(info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === "uploading" && info.file.percent === 0) {
          setLoading(true);
        }
        if (info.file.status === "done") {
          setLoading(false);
          if (info.file.response.status === "success") {
            onSuccess();
            message.success(info.file.response.message);
          } else {
            message.error(info.file.response.message);
          }
        } else if (info.file.status === "error") {
          setLoading(false);
          message.error("文件导入失败");
        }
      }}
      {...restProps}
    >
      <Button type={"primary"} loading={loading}>
        {name}
      </Button>
    </Upload>
  );
};
