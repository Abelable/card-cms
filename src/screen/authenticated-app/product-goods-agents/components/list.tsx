import styled from "@emotion/styled";
import { Table, TableProps } from "antd";
import { ErrorBox } from "components/lib";
import { GoodsAgent } from "types/product";

interface ListProps extends TableProps<GoodsAgent> {
  goodsName: string;
  error: Error | unknown;
}

export const List = ({ goodsName, error, ...restProps }: ListProps) => {
  return (
    <Container>
      <Title>{goodsName}的代理商</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "可见该商品的分销商",
            dataIndex: "store",
          },
          {
            title: "联系电话",
            dataIndex: "phone",
          },
          {
            title: "是否已上架",
            render: (value, agent) => (
              <span>{agent.is_removed === 0 ? "上架中" : "已下架"}</span>
            ),
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
