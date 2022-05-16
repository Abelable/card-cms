import styled from "@emotion/styled";
import { Table, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Home } from "types/home";
import { ErrorBox } from "components/lib";

interface ListProps extends TableProps<Home>, SearchPanelProps {
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
  return (
    <Container>
      <Title>数据列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"date"}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "日期",
            dataIndex: "date",
            sorter: (a, b) => Number(a.date) - Number(b.date),
          },
          {
            title: "代理商",
            render: (value, data) => <span>{data.shop_name || "*"}</span>,
          },
          {
            title: "商品名称",
            render: (value, data) => <span>{data.goods_name || "*"}</span>,
          },
          {
            title: "订单数",
            dataIndex: "count",
            sorter: (a, b) => Number(a.count) - Number(b.count),
          },
          {
            title: "发货数",
            dataIndex: "shipped_count",
            sorter: (a, b) => Number(a.shipped_count) - Number(b.shipped_count),
          },
          {
            title: "激活数",
            dataIndex: "activated_count",
            sorter: (a, b) =>
              Number(a.activated_count) - Number(b.activated_count),
          },
          {
            title: "发货率",
            dataIndex: "shipped_rate",
            sorter: (a, b) => Number(a.shipped_rate) - Number(b.shipped_rate),
          },
          {
            title: "激活率",
            dataIndex: "activated_rate",
            sorter: (a, b) =>
              Number(a.activated_rate) - Number(b.activated_rate),
          },
          {
            title: "充值数",
            dataIndex: "recharged_count",
            sorter: (a, b) =>
              Number(a.recharged_count) - Number(b.recharged_count),
          },
          {
            title: "充值率",
            dataIndex: "recharged_rate",
            sorter: (a, b) =>
              Number(a.recharged_rate) - Number(b.recharged_rate),
          },
          {
            title: "中转率",
            dataIndex: "transfer_rate",
            sorter: (a, b) => Number(a.transfer_rate) - Number(b.transfer_rate),
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

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;
