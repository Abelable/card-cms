import { Modal, Upload } from "antd";
import { useOssConfig } from "service/common";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHttp } from "service/http";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {
  maxCount?: number;
}

export const OssUpload = (props: OssUploadProps) => {
  const client = useHttp();
  const { data: ossConfig } = useOssConfig();
  const getExtraData = (file: any) => {
    return {
      key: file.key,
      OSSAccessKeyId: ossConfig?.OSSAccessKeyId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    file.key = ossConfig?.dir + filename;
    file.url = `https:${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    return file;
  };

  const uploadImg = (info: any) => {
    console.log(info);
    client("/api/v1/admin/upload/image", {
      data: { image: info.file },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    }).then((res) => {
      console.log("res", res);
      info.onSuccess(res, info.file);
    });
  };

  const [previewImage, setPreviewImage] = useState("");
  const preview = (file: any) => setPreviewImage(file.url);

  return (
    <>
      <Upload
        customRequest={uploadImg}
        onPreview={preview}
        listType="picture-card"
        {...props}
      >
        {props.maxCount &&
        props.fileList &&
        props.fileList.length >= props.maxCount ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage("")}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
