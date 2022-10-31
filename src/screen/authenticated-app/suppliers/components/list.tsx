import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  Dropdown,
  Menu,
  MenuProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useSupplierModal } from "../util";
import type { Supplier, SuppliersSearchParams } from "types/supplier";

interface ListProps extends TableProps<Supplier> {
  error: Error | unknown;
  params: Partial<SuppliersSearchParams>;
  setParams: (params: Partial<SuppliersSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const { open } = useSupplierModal();

  return (
    <Container>
      <Header between={true}>
        <h3>供应商列表</h3>
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
            title: "公司名称",
            dataIndex: "name",
          },
          {
            title: "联系电话",
            dataIndex: "phone",
          },
          {
            title: "操作",
            render(value, supplier) {
              return <More supplier={supplier} />;
            },
            width: "10rem",
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

const More = ({ supplier }: { supplier: Supplier }) => {
  const navigate = useNavigate();
  const link = (id: string) =>
    navigate(`/suppliers/goods_list?supplier_id=${id}`);
  const { startEdit } = useSupplierModal();

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => link(`${supplier.id}`)}>查看产品</div>,
      key: "link",
    },
    {
      label: (
        <div onClick={() => startEdit(`${supplier.id}`)}>
          修改发展人ID和触点编码
        </div>
      ),
      key: "edit",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
