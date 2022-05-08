import styled from "@emotion/styled";
import { Button, Table, TablePaginationConfig, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import { BlacklistSearchParams, Black } from "types/system";
import { useBlackModal } from "../util";
import { FileUpload } from "components/file-upload";

interface ListProps extends TableProps<Black> {
  params: Partial<BlacklistSearchParams>;
  setParams: (params: Partial<BlacklistSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useBlackModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>黑名单列表</h3>
        <Row gap>
          <Button icon={<DownloadOutlined />}>下载模版</Button>
          <FileUpload name="上传文件" />
          <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
            新增
          </Button>
        </Row>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "身份证号",
            dataIndex: "id_number",
          },
          {
            title: "联系电话",
            dataIndex: "phone",
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
