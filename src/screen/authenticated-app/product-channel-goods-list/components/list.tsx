import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { ChannelGoods, ChannelGoodsListSearchParams } from "types/product";
import { ErrorBox } from "components/lib";
import { useChannelOptions } from "service/product";

interface ListProps extends TableProps<ChannelGoods> {
  params: Partial<ChannelGoodsListSearchParams>;
  setParams: (params: Partial<ChannelGoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const productOptions = useChannelOptions();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Title>
        关联商品列表-
        {
          productOptions.find((item) => item.id === Number(params.product_id))
            ?.name
        }
      </Title>
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
              <span>{goods.is_removed === 0 ? "上架中" : "已下架"}</span>
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
