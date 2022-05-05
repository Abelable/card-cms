import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Table, TablePaginationConfig, TableProps, Image, Tag } from "antd";
import { Goods, GoodsListSearchParams } from "types/agent";
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
      <Title>商品列表</Title>
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
            title: "商品名称",
            render: (value, goods) => (
              <div style={{ display: "flex" }}>
                <Image width={80} height={80} src={goods.img} />
                <GoodsInfoWrap>
                  <div style={{ marginBottom: "1rem" }}>{goods.name}</div>
                  {goods.tags ? (
                    goods.tags.map((item, index) => (
                      <Tag key={index}>{item}</Tag>
                    ))
                  ) : (
                    <></>
                  )}
                </GoodsInfoWrap>
              </div>
            ),
          },
          {
            title: "商品编号",
            dataIndex: "code",
          },
          {
            title: "所属产品渠道",
            dataIndex: "channel",
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

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;

const GoodsInfoWrap = styled.div`
  margin-left: 2rem;
  flex: 1;
  height: 80px;
`;
