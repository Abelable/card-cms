import styled from "@emotion/styled";
import dayjs from "dayjs";
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
        rowKey={"id"}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "日期",
            render: (value, data) => (
              <span>
                {data.created_at
                  ? dayjs(Number(data.created_at) * 1000).format("YYYY-MM-DD")
                  : ""}
              </span>
            ),
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
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
            dataIndex: "order_num",
            sorter: (a, b) => Number(a.order_num) - Number(b.order_num),
          },
          {
            title: "发货数",
            dataIndex: "deliver_num",
            sorter: (a, b) => Number(a.deliver_num) - Number(b.deliver_num),
          },
          {
            title: "激活数",
            dataIndex: "activation_num",
            sorter: (a, b) =>
              Number(a.activation_num) - Number(b.activation_num),
          },
          {
            title: "发货率",
            dataIndex: "deliver_rate",
            sorter: (a, b) => Number(a.deliver_rate) - Number(b.deliver_rate),
          },
          {
            title: "激活率",
            dataIndex: "activation_rate",
            sorter: (a, b) =>
              Number(a.activation_rate) - Number(b.activation_rate),
          },
          {
            title: "充值数",
            dataIndex: "recharge_num",
            sorter: (a, b) => Number(a.recharge_num) - Number(b.recharge_num),
          },
          {
            title: "充值率",
            dataIndex: "recharge_rate",
            sorter: (a, b) => Number(a.recharge_rate) - Number(b.recharge_rate),
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
