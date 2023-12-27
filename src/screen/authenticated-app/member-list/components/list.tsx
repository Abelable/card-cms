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
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { useMemberListQueryKey, useMemberModal } from "../util";
import { useDeleteMember, useEditMemberStatus } from "service/member";
import type { MemberListSearchParams, MemberItem } from "types/member";
import type { RoleOption } from "types/role";

interface ListProps extends TableProps<MemberItem> {
  roleOptions: RoleOption[];
  params: Partial<MemberListSearchParams>;
  setParams: (params: Partial<MemberListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  roleOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useMemberModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate } = useEditMemberStatus(useMemberListQueryKey());
  const onStatusChange = (id: number, checked: boolean) =>
    mutate({ id, status: checked ? 1 : 2 });

  return (
    <Container>
      <Header between={true}>
        <h3>员工列表</h3>
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
            title: "账号名",
            dataIndex: "username",
          },
          {
            title: "昵称",
            dataIndex: "name",
          },
          {
            title: "岗位",
            dataIndex: "role_id",
            render: (value) =>
              roleOptions.find((item) => item.id === value)?.name,
          },
          {
            title: "使用状态",
            dataIndex: "status",
            render: (value, member) => (
              <Switch
                key={member.id}
                checked={value === 1}
                onChange={(checked) => onStatusChange(member.id, checked)}
              />
            ),
          },
          {
            title: "操作",
            render: (value, member) => <More id={member.id} />,
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutate: deleteMember } = useDeleteMember(useMemberListQueryKey());

  const { startEdit } = useMemberModal();

  const confirmDeleteMember = (id: number) => {
    Modal.confirm({
      title: "确定删除该岗位吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteMember(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(String(id))}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDeleteMember(id)}>重制密码</div>,
      key: "pwd",
    },
    {
      label: <div onClick={() => confirmDeleteMember(id)}>删除</div>,
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
