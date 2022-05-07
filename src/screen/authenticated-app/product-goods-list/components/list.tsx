import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  Tag,
} from "antd";
import { SearchPanelProps } from "./search-panel";
import { Goods, modeOption } from "types/product";
import { ErrorBox, Row } from "components/lib";
import { useGoodsModal } from "../util";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
  modeOptions: modeOption[];
  error: Error | unknown;
}

export const List = ({
  error,
  modeOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useGoodsModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>商品列表</h3>
        <Row gap>
          <Button onClick={open} type={"default"}>
            发布全新套餐
          </Button>
          <Button style={{ marginRight: 0 }} onClick={open} type={"primary"}>
            基于已有产品渠道发布商品
          </Button>
        </Row>
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
                  <div style={{ color: "#999" }}>商品编码：{goods.code}</div>
                  <div style={{ color: "#999" }}>
                    发布时间：{goods.created_at}
                  </div>
                </GoodsInfoWrap>
              </div>
            ),
          },
          {
            title: "供应商&产品",
            render: (value, goods) => (
              <>
                <div>{goods.supplier_name}</div>
                <div>{goods.product_name}</div>
              </>
            ),
          },
          {
            title: "代理商",
            render: (value, goods) => (
              <>
                <Button type={"link"}>设置代理商可见</Button>
                <Button type={"link"}>查看代理商</Button>
              </>
            ),
          },
          {
            title: "编辑商品",
            render: (value, goods) => (
              <>
                <Button type={"link"}>修改产品信息</Button>
                <Button type={"link"}>修改商品信息</Button>
                <Button type={"link"}>下架</Button>
              </>
            ),
          },
          {
            title: "操作",
            render: (value, goods) => <Button type={"link"}>推广链接</Button>,
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

const GoodsInfoWrap = styled.div`
  margin-left: 2rem;
  flex: 1;
  height: 80px;
`;
