import styled from "@emotion/styled";
import { Button, Table, TablePaginationConfig, TableProps, Modal } from "antd";
import { ErrorBox, Row, ButtonNoPadding } from "components/lib";
import {
  useShopListQueryKey,
  useNewPublishModal,
  usePublishModal,
} from "../util";
import { useDeleteGoods } from "service/product";

import type { ColumnsType } from "antd/lib/table";
import type { ShopListSearchParams, OrderCatchShop } from "types/order";

interface ListProps extends TableProps<OrderCatchShop> {
  error: Error | unknown;
  params: Partial<ShopListSearchParams>;
  setParams: (params: Partial<ShopListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open: openPublishModal } = usePublishModal();
  const { open: openNewPublishModal } = useNewPublishModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate: deleteGoods } = useDeleteGoods(useShopListQueryKey());
  const confirmDeleteGoods = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteGoods(id),
    });
  };

  const columns: ColumnsType<OrderCatchShop> = [
    {
      title: "店铺名称",
      dataIndex: "shop_name",
      width: "40rem",
    },
    {
      title: "所属应用",
      dataIndex: "app_name",
      width: "30rem",
    },
  ];

  const editColumns: ColumnsType<OrderCatchShop> = [
    {
      title: "编辑商品",
      render: (value, goods) => (
        <>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => confirmDeleteGoods(goods.id)}
            >
              删除
            </ButtonNoPadding>
          </div>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Header between={true}>
        <h3>店铺列表</h3>
        <Row gap>
          <Button type={"default"} onClick={openNewPublishModal}>
            发布全新套餐
          </Button>
          <Button
            style={{ marginRight: 0 }}
            type={"primary"}
            onClick={openPublishModal}
          >
            基于已有产品渠道发布商品
          </Button>
        </Row>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[...columns, ...editColumns]}
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
