import styled from "@emotion/styled";
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  MenuProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { usePermissionModal, useRoleListQueryKey, useRoleModal } from "../util";
import { useDeleteRole } from "service/role";
import type { RoleListSearchParams, RoleItem } from "types/role";

interface ListProps extends TableProps<RoleItem> {
  params: Partial<RoleListSearchParams>;
  setParams: (params: Partial<RoleListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useRoleModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>岗位列表</h3>
        <Row gap>
          <Button
            style={{ marginRight: 0 }}
            onClick={open}
            type={"primary"}
            icon={<PlusOutlined />}
          >
            新增
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
            fixed: "left",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "岗位名称",
            dataIndex: "name",
          },
          {
            title: "描述",
            dataIndex: "desc",
          },
          {
            title: "操作",
            render: (value, roleItem) =>
              roleItem.name === "超级管理员" ? (
                <></>
              ) : (
                <More id={roleItem.id} />
              ),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutate: deleteRole } = useDeleteRole(useRoleListQueryKey());

  const { startEdit } = useRoleModal();
  const { open } = usePermissionModal();

  const confirmDeleteRole = (id: number) => {
    Modal.confirm({
      title: "确定删除该岗位吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRole(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(String(id))}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => open(String(id))}>权限配置</div>,
      key: "auth",
    },
    {
      label: <div onClick={() => confirmDeleteRole(id)}>删除</div>,
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
