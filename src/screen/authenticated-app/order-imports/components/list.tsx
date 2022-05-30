import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { FileUpload } from "components/file-upload";
import { ErrorBox, Row } from "components/lib";
import dayjs from "dayjs";
import { DownloadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ImportsSearchParams, Import } from "types/order";
import { useDownloadTemplate } from "service/common";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useQueryClient } from "react-query";
import { useImportsQueryKey } from "../util";

interface ListProps extends TableProps<Import> {
  params: Partial<ImportsSearchParams>;
  setParams: (params: Partial<ImportsSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const downloadTemplate = useDownloadTemplate();

  const queryClient = useQueryClient();
  const queryKey = useImportsQueryKey();
  const handleSuccess = (info: UploadChangeParam<UploadFile<any>>) =>
    info.file.status === "done" && queryClient.invalidateQueries(queryKey);

  return (
    <Container>
      <Header between={true}>
        <h3>导入记录</h3>
        <Row gap>
          <div style={{ marginRight: "1rem" }}>
            <FileUpload scene={3} name="导入订单" onChange={handleSuccess} />
          </div>
          <Tooltip title="下载订单模版">
            <Button
              onClick={() => downloadTemplate(3)}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
          <Divider
            style={{ height: "3rem", marginLeft: 0 }}
            type={"vertical"}
          />
          <Tooltip title="照片包上传后识别匹配大概需要等待30分钟">
            <Question />
          </Tooltip>
          <div style={{ marginRight: "1rem" }}>
            <FileUpload scene={4} name="上传照片" onChange={handleSuccess} />
          </div>
          <Tooltip title="下载照片模版">
            <Button
              onClick={() => downloadTemplate(4)}
              style={{ marginRight: 0 }}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
        </Row>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "导入日期",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
          },
          {
            title: "导入订单数",
            dataIndex: "import_order_num",
            sorter: (a, b) =>
              Number(a.import_order_num) - Number(b.import_order_num),
          },
          {
            title: "导入照片压缩包次数",
            dataIndex: "import_order_photo_num",
            sorter: (a, b) =>
              Number(a.import_order_photo_num) -
              Number(b.import_order_photo_num),
          },
          {
            title: "已匹配照片订单数（包含不需要照片的订单数）",
            dataIndex: "matched_photo_order_num",
            sorter: (a, b) =>
              Number(a.matched_photo_order_num) -
              Number(b.matched_photo_order_num),
          },
          {
            title: "未匹配照片订单数",
            dataIndex: "unmatched_photo_order_num",
            sorter: (a, b) =>
              Number(a.unmatched_photo_order_num) -
              Number(b.unmatched_photo_order_num),
          },
          {
            title: "照片人工审核失败",
            dataIndex: "photo_review_num",
            sorter: (a, b) =>
              Number(a.photo_review_num) - Number(b.photo_review_num),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;

const Question = styled(QuestionCircleOutlined)`
  margin-right: 1rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
