import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  Tag,
  Modal,
} from "antd";
import { ErrorBox, Row, ButtonNoPadding } from "components/lib";
import { SearchPanelProps } from "./search-panel";
import { useNavigate } from "react-router";
import {
  useAgentModal,
  useGoodsListQueryKey,
  useGoodsModal,
  useLinkModal,
  useNewPublishModal,
  usePublishModal,
} from "../util";
import { useDeleteGoods, useDownGoods, useUpGoods } from "service/product";
import type { ColumnsType } from "antd/lib/table";
import type { Goods } from "types/product";

interface ListProps
  extends TableProps<Goods>,
    Omit<SearchPanelProps, "operatorOptions" | "regionOptions"> {
  error: Error | unknown;
}

export const List = ({
  error,
  supplierOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const navigate = useNavigate();
  const linkToChannels = (id: number) =>
    navigate(`/product/channels?editingChannelId=${id}`);
  const linkToAgents = (id: number) =>
    navigate(`/product/sales/agents?goods_id=${id}`);
  const { startEdit } = useGoodsModal();
  const { startEdit: editAgent } = useAgentModal();
  const { startEdit: checkLink } = useLinkModal();
  const { open: openPublishModal } = usePublishModal();
  const { open: openNewPublishModal } = useNewPublishModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate: upGoods } = useUpGoods(useGoodsListQueryKey());
  const confirmUpGoods = (id: number) => {
    Modal.confirm({
      title: "确定上架该商品吗？",
      content: "点击确定上架",
      okText: "确定",
      cancelText: "取消",
      onOk: () => upGoods(id),
    });
  };

  const { mutate: downGoods } = useDownGoods(useGoodsListQueryKey());
  const confirmDownGoods = (id: number) => {
    Modal.confirm({
      title: "确定下架该商品吗？",
      content: "下架此商品，分销此商品的分销商，也会强制下架此商品，是否继续？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => downGoods(id),
    });
  };

  const { mutate: deleteGoods } = useDeleteGoods(useGoodsListQueryKey());
  const confirmDeleteGoods = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteGoods(id),
    });
  };

  const columns: ColumnsType<Goods> = [
    {
      title: "编号",
      dataIndex: "id",
      width: "8rem",
      sorter: (a, b) => Number(a.id) - Number(b.id),
    },
    {
      title: "商品名称",
      width: "40rem",
      render: (value, goods) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            width={90}
            height={90}
            src={
              goods.main_picture ||
              "https://91haoka.cn/91haoka_platform/static/img/kenan.837a3f3.jpg"
            }
          />
          <GoodsInfoWrap>
            <Link onClick={() => startEdit(String(goods.id))}>
              {goods.name}
            </Link>
            {goods.sale_point ? (
              goods.sale_point
                .split(",")
                .map((item, index) => <Tag key={index}>{item}</Tag>)
            ) : (
              <></>
            )}
            <div style={{ color: "#999" }}>商品编码：{goods.encoding}</div>
            <div style={{ color: "#999" }}>发布时间：{goods.created_at}</div>
          </GoodsInfoWrap>
        </div>
      ),
    },
    {
      title: "供应商&产品",
      render: (value, goods) => (
        <>
          <div>
            供应商：
            {goods.product
              ? supplierOptions.find(
                  (item) => item.id === goods.product.supplier_id
                )?.name
              : ""}
          </div>
          <div>产品：{goods.product ? goods.product.name : ""}</div>
        </>
      ),
    },
    {
      title: "代理商",
      render: (value, goods) => (
        <>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => editAgent(String(goods.id))}
            >
              设置代理商可见
            </ButtonNoPadding>
          </div>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => linkToAgents(goods.id)}
            >
              查看代理商
            </ButtonNoPadding>
          </div>
        </>
      ),
    },
  ];

  const editColumns: ColumnsType<Goods> = [
    {
      title: "编辑商品",
      render: (value, goods) => (
        <>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => linkToChannels(goods.product_id)}
            >
              修改产品信息
            </ButtonNoPadding>
          </div>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => startEdit(String(goods.id))}
            >
              修改商品信息
            </ButtonNoPadding>
          </div>
          {params.is_removed === "0" ? (
            <div>
              <ButtonNoPadding
                type={"link"}
                onClick={() => confirmDownGoods(goods.id)}
              >
                下架
              </ButtonNoPadding>
            </div>
          ) : (
            <>
              <div>
                <ButtonNoPadding
                  type={"link"}
                  onClick={() => confirmUpGoods(goods.id)}
                >
                  上架
                </ButtonNoPadding>
              </div>
              <div>
                <ButtonNoPadding
                  type={"link"}
                  onClick={() => confirmDeleteGoods(goods.id)}
                >
                  删除
                </ButtonNoPadding>
              </div>
            </>
          )}
        </>
      ),
    },
  ];

  const linkColumns: ColumnsType<Goods> = [
    {
      title: "操作",
      render: (value, goods) => (
        <ButtonNoPadding
          type={"link"}
          onClick={() => checkLink(String(goods.id))}
        >
          推广链接
        </ButtonNoPadding>
      ),
    },
  ];

  return (
    <Container>
      <Header between={true}>
        <h3>商品列表</h3>
        {params.is_removed === "0" ? (
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
        ) : null}
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={
          params.is_removed === "0"
            ? [...columns, ...editColumns, ...linkColumns]
            : [...columns, ...editColumns]
        }
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
`;

const Link = styled.div`
  color: #1890ff;
  cursor: pointer;
`;
