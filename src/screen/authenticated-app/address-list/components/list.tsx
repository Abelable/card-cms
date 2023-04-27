import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import { useAddressListQueryKey, useAddressModal } from "../util";
import { useDeleteProduct } from "service/order";
import type { Product } from "types/order";

interface ListProps
  extends TableProps<Product>,
    Omit<SearchPanelProps, "regionOptions"> {
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useAddressModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>地址列表</h3>
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
            title: "省",
            dataIndex: "province_name",
          },
          {
            title: "省code",
            dataIndex: "province_code",
          },
          {
            title: "市",
            dataIndex: "city_name",
          },
          {
            title: "市code",
            dataIndex: "city_code",
          },
          {
            title: "区",
            dataIndex: "area_name",
          },
          {
            title: "区code",
            dataIndex: "area_code",
          },
          {
            title: "操作",
            render(value, address) {
              return <More id={address.id} />;
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
  const { mutate: deleteProduct } = useDeleteProduct(useAddressListQueryKey());

  const { startEdit } = useAddressModal();

  const confirmDeleteProduct = (id: string) => {
    Modal.confirm({
      title: "确定删除该配置吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteProduct(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(String(id))}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDeleteProduct(String(id))}>删除</div>,
      key: "delete",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
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
