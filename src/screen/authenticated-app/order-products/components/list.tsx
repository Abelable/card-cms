import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import { useProductsQueryKey, useProductModal } from "../util";
import { Product } from "types/order";
import { useDeleteProduct } from "service/order";
import { ChannelOption } from "types/product";

interface ListProps
  extends TableProps<Product>,
    Omit<SearchPanelProps, "supplierOptions"> {
  channelOptions: ChannelOption[];
  error: Error | unknown;
}

export const List = ({
  channelOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useProductModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>配置列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "供应商店铺名",
            render: (value, setting) => <>{setting.supplier.name}</>,
          },
          {
            title: "上游产品编码",
            dataIndex: "supplier_product_encoding",
          },
          {
            title: "本地产品名称",
            render: (value, setting) => (
              <>
                {
                  channelOptions.find((item) => item.id === setting.product_id)
                    ?.name
                }
              </>
            ),
          },
          {
            title: "本地产品编码",
            dataIndex: "product_encoding",
          },
          {
            title: "操作",
            render(value, product) {
              return <More id={product.id} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutate: deleteProduct } = useDeleteProduct(useProductsQueryKey());

  const { startEdit } = useProductModal();

  const confirmDeleteProduct = (id: string) => {
    Modal.confirm({
      title: "确定删除该头图吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteProduct(id),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(String(id))} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProduct(String(id))}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
