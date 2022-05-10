import { Button, Upload } from "antd";
import { ImportOutlined, LoadingOutlined } from "@ant-design/icons";
import { fileToBase64 } from "utils";
import { useImportData } from "service/common";

interface FileUploadType extends React.ComponentProps<typeof Upload> {
  name: string;
}

export const FileUpload = ({ name, ...restProps }: FileUploadType) => {
  const { mutate: importTalentData, isLoading } = useImportData();

  const upload = async (info: any) => {
    const file = await fileToBase64(info.file);
    importTalentData({ excel_file: file });
  };

  return (
    <Upload
      customRequest={upload}
      maxCount={1}
      showUploadList={false}
      {...restProps}
    >
      <Button
        type={"primary"}
        icon={isLoading ? <LoadingOutlined /> : <ImportOutlined />}
      >
        {name}
      </Button>
    </Upload>
  );
};
