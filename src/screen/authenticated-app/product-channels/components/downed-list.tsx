import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel, modeOption } from "types/product";
import { ErrorBox, Row } from "components/lib";

interface ListProps extends TableProps<Channel>, SearchPanelProps {
  modeOptions: modeOption[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const DownedList = ({
  error,
  modeOptions,
  params,
  setParams,
  setSelectedRowKeys,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>产品列表</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
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
            title: "生产方式",
            render: (value, channel) => (
              <span>
                {modeOptions.find((item) => item.id === channel.mode)?.name}
              </span>
            ),
          },
          {
            title: "创建时间",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
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
