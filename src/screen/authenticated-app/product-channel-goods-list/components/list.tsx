import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { Goods, GoodsListSearchParams } from "types/product";
import { ErrorBox } from "components/lib";

interface ListProps extends TableProps<Goods> {
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Title>关联商品列表-移动花卡</Title>
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
            title: "关联商品名称",
            dataIndex: "name",
          },
          {
            title: "商品上下架状态",
            render: (value, goods) => (
              <span>{goods.status === 1 ? "上架中" : "已下架"}</span>
            ),
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

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;
