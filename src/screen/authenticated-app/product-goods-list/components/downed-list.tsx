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
import { useAgentModal, useGoodsModal } from "../util";
import { useNavigate } from "react-router";
import { SupplierOption } from "types/supplier";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
  supplierOptions: SupplierOption[];
  modeOptions: modeOption[];
  error: Error | unknown;
}

export const DownedList = ({
  error,
  modeOptions,
  supplierOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const navigate = useNavigate();
  const linkToChannels = (id: number) =>
    navigate(`/product/channels?editingChannelId=${id}`);
  const linkToAgents = (id: number) =>
    navigate(`/product/sales/agents?goodsId=${id}`);
  const { startEdit } = useGoodsModal();
  const { startEdit: editAgent } = useAgentModal();

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
                <Image width={80} height={80} src={goods.main_picture} />
                <GoodsInfoWrap>
                  <div>{goods.name}</div>
                  {goods.sale_point ? (
                    goods.sale_point
                      .split(",")
                      .map((item, index) => <Tag key={index}>{item}</Tag>)
                  ) : (
                    <></>
                  )}
                  <div style={{ color: "#999" }}>
                    商品编码：{goods.encoding}
                  </div>
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
                <div>
                  {
                    supplierOptions.find(
                      (item) => item.id === goods.product.supplier_id
                    )?.name
                  }
                </div>
                <div>{goods.product_name}</div>
              </>
            ),
          },
          {
            title: "代理商",
            render: (value, goods) => (
              <>
                <div>
                  <Button
                    type={"link"}
                    onClick={() => editAgent(String(goods.id))}
                  >
                    设置代理商可见
                  </Button>
                </div>
                <div>
                  <Button type={"link"} onClick={() => linkToAgents(goods.id)}>
                    查看代理商
                  </Button>
                </div>
              </>
            ),
          },
          {
            title: "编辑商品",
            render: (value, goods) => (
              <>
                <div>
                  <Button
                    type={"link"}
                    onClick={() => linkToChannels(goods.product_id)}
                  >
                    修改产品信息
                  </Button>
                </div>
                <div>
                  <Button
                    type={"link"}
                    onClick={() => startEdit(String(goods.id))}
                  >
                    修改商品信息
                  </Button>
                </div>
                <div>
                  <Button type={"link"}>上架</Button>
                </div>
                <div>
                  <Button type={"link"}>删除</Button>
                </div>
              </>
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

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;

const GoodsInfoWrap = styled.div`
  margin-left: 2rem;
  flex: 1;
  height: 80px;
`;
