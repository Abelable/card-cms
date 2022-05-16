import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  MenuProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { Agent, AgentsSearchParams } from "types/agent";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  useAgentModal,
  useAgentShopModal,
  useAgentsQueryKey,
  useAgentRechargeModal,
  useAgentActivationModal,
} from "../util";
import { useDeleteAgent } from "service/agent";

interface ListProps extends TableProps<Agent> {
  error: Error | unknown;
  params: Partial<AgentsSearchParams>;
  setParams: (params: Partial<AgentsSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const { open } = useAgentModal();
  const { startEdit: startEditShop } = useAgentShopModal();
  const { startEdit: startEditingActivation } = useAgentActivationModal();
  const { startEdit: startEditingRecharge } = useAgentRechargeModal();

  return (
    <Container>
      <Header between={true}>
        <h3>代理商列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "代理商店铺名",
            dataIndex: "store",
            render: (value, agent) => (
              <Edit onClick={() => startEditShop(String(agent.id))}>
                <span>{value}</span>
                <EditOutlined
                  style={{ marginLeft: ".4rem", color: "#1890ff" }}
                />
              </Edit>
            ),
            width: "28rem",
          },
          {
            title: "渠道id",
            dataIndex: "channel_id",
            width: "14rem",
          },
          {
            title: "公司名称",
            dataIndex: "company",
            width: "28rem",
          },
          {
            title: "店铺负责人",
            dataIndex: "contact",
            width: "13rem",
          },
          {
            title: "联系电话",
            dataIndex: "phone",
            width: "18rem",
          },
          {
            title: "邮箱",
            dataIndex: "email",
            width: "24rem",
          },
          {
            title: "激活状态回传的有效天数（订单创建时起）",
            dataIndex: "activation_days",
            render: (value, agent) => (
              <Edit onClick={() => startEditingActivation(String(agent.id))}>
                <span>{value || 0}天</span>
                <EditOutlined
                  style={{ marginLeft: ".4rem", color: "#1890ff" }}
                />
              </Edit>
            ),
            width: "18rem",
          },
          {
            title: "充值金额回传的有效天数（订单创建时起）",
            dataIndex: "recharge_days",
            render: (value, agent) => (
              <Edit onClick={() => startEditingRecharge(String(agent.id))}>
                <span>{value || 0}天</span>
                <EditOutlined
                  style={{ marginLeft: ".4rem", color: "#1890ff" }}
                />
              </Edit>
            ),
            width: "18rem",
          },
          {
            title: "操作",
            render(value, agent) {
              return <More agent={agent} />;
            },
            fixed: "right",
            width: "8rem",
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

const Edit = styled(Row)`
  cursor: pointer;
`;

const More = ({ agent }: { agent: Agent }) => {
  const navigate = useNavigate();
  const link = (id: number) => navigate(`/agents/goods_list?agent_id=${id}`);

  const { mutate: deleteAgent } = useDeleteAgent(useAgentsQueryKey());

  const confirmDeleteAgent = (id: number) => {
    Modal.confirm({
      title: "确定删除该代理商吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteAgent(String(id)),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => link(agent.id)}>查看分销商品</span>,
      key: "link",
    },
    {
      label: (
        <span onClick={() => confirmDeleteAgent(agent.id)}>删除代理商</span>
      ),
      key: "delete",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
