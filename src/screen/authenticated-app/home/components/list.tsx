import styled from "@emotion/styled";
import { Table, TableProps } from "antd";
import { Home, HomeSearchParams } from "types/home";
import { ErrorBox } from "components/lib";
import dayjs from "dayjs";
import { useHttp } from "service/http";
import { cleanObject } from "utils";
import { useQueryClient } from "react-query";

interface ListProps extends TableProps<Home> {
  params: Partial<HomeSearchParams>;
  error: Error | unknown;
}

export const List = ({ params, error, ...restProps }: ListProps) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return (
    <Container>
      <Title>数据列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        expandable={{
          onExpand: async (expanded, record) => {
            console.log("expanded", expanded);
            console.log("record", record);
            const res = await client("/api/v1/admin/index/sub-agent", {
              data: cleanObject({
                "filter[date]": record.date,
                "filter[agent_id]": params.agent_id,
                "filter[goods_id]": params.goods_id,
              }),
            });
            console.log(res);
            const list = res.map((item: any, index: number) => {
              const { id, date, ...rest } = item;
              return { id: `${id}${index + 1}`, children: [], ...rest };
            });
            queryClient.setQueryData(["home_records", {}], (old: any) => ({
              ...old,
              list: old.list.map((item: any) =>
                item.date === record.date ? { ...item, children: list } : item
              ),
            }));
          },
        }}
        columns={[
          {
            title: "日期",
            dataIndex: "date",
            sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
          },
          {
            title: "代理商",
            dataIndex: "agent_name",
          },
          {
            title: "商品名称",
            dataIndex: "goods_name",
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
        pagination={false}
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
