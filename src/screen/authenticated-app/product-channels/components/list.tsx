import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Button, Table, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel } from "types/product";
import { ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { useChannelModal } from "../util";

interface ListProps extends TableProps<Channel>, SearchPanelProps {
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const List = ({
  error,
  params,
  setParams,
  setSelectedRowKeys,
  ...restProps
}: ListProps) => {
  const { open } = useChannelModal();

  return (
    <Container>
      <Header between={true}>
        <h3>代理商列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "产品名称",
            dataIndex: "goods_name",
          },
          {
            title: "产品编码",
            dataIndex: "goods_code",
          },
          {
            title: "运营商",
            dataIndex: "supplier",
          },
          {
            title: "创建时间",
            render: (value, data) => (
              <span>
                {data.created_at
                  ? dayjs(Number(data.created_at) * 1000).format("YYYY-MM-DD")
                  : ""}
              </span>
            ),
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
        ]}
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
