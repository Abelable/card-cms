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
import { useRuleListQueryKey, useRuleModal } from "../util";
import { useDeleteRule, useEditRuleStatus } from "service/order";

import type { Rule, ShopOption } from "types/order";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Rule>, SearchPanelProps {
  shopOptions: ShopOption[];
  error: Error | unknown;
}

export const List = ({
  shopOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useRuleModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate } = useEditRuleStatus(useRuleListQueryKey());
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
            title: "计划名称",
            dataIndex: "name",
          },
          {
            title: "规则",
            dataIndex: "rule_name",
          },
          {
            title: "电商店铺",
            dataIndex: "shop_id",
            render: (value) => (
              <>{shopOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "使用状态",
            dataIndex: "status",
            render: (value, rule) => (
              <Switch
                key={rule.id}
                checked={value === 1}
                onChange={(checked) => onStatusChange(rule.id, checked)}
              />
            ),
          },
          {
            title: "操作",
            render: (value, rule) => <More id={rule.id} />,
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutate: deleteRule } = useDeleteRule(useRuleListQueryKey());

  const { startEdit } = useRuleModal();

  const confirmDeleteRule = (id: number) => {
    Modal.confirm({
      title: "确定删除该员工吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRule(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(String(id))}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDeleteRule(id)}>删除</div>,
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
