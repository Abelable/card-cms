import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  Modal,
  Tooltip,
} from "antd";
import { ErrorBox, Row, ButtonNoPadding } from "components/lib";
import {
  PlusOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useOrderGrabListQueryKey, useApplyModal } from "../util";
import { useDeleteOrderGrab } from "service/order";

import type { ColumnsType } from "antd/lib/table";
import type { OrderGrabListSearchParams, OrderGrab } from "types/order";

interface ListProps extends TableProps<OrderGrab> {
  error: Error | unknown;
  params: Partial<OrderGrabListSearchParams>;
  setParams: (params: Partial<OrderGrabListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open: openApplyModal } = useApplyModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate: deleteOrderGrab } = useDeleteOrderGrab(
    useOrderGrabListQueryKey()
  );
  const confirmDeleteOrderGrab = (id: number) => {
    Modal.confirm({
      title: "确定删除该店铺吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteOrderGrab(id),
    });
  };

  const columns: ColumnsType<OrderGrab> = [
    {
      title: "店铺名称",
      dataIndex: "shop_name",
    },
    {
      title: "所属应用",
      dataIndex: "app_name",
    },
    {
      title: "授权配置",
      dataIndex: "refresh_token",
      render: (value, grab) => (
        <ButtonNoPadding
          type={"link"}
          onClick={() => confirmDeleteOrderGrab(grab.id)}
        >
          {value ? "已配置，修改配置" : "点击配置"}
        </ButtonNoPadding>
      ),
    },
    {
      title: "授权状态",
      dataIndex: "status",
      render: (value) => (
        <>
          {value === 20 ? (
            "正常"
          ) : value === 30 ? (
            <>
              <span>失败</span>
              <Tooltip
                title={
                  <>
                    授权验证失败通常是以下三种情况：
                    <br />
                    1、在拼多多的自研应用页面重置了应用ID <br />
                    2、操作新店铺授权时未退出之前的店铺登录
                    <br />
                    3、店铺未授权给开放应用，请在应用添加授权
                  </>
                }
              >
                <Info />
              </Tooltip>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "授权到期时间",
      dataIndex: "refresh_token_expires_at",
    },
  ];

  const editColumns: ColumnsType<OrderGrab> = [
    {
      title: "操作",
      render: (value, grab) => (
        <>
          <div>
            <ButtonNoPadding
              type={"link"}
              onClick={() => confirmDeleteOrderGrab(grab.id)}
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
          <Tooltip title="注意：一个自研应用最多绑定5个店铺">
            <Question />
          </Tooltip>
          <Button
            style={{ marginRight: 0 }}
            onClick={openApplyModal}
            type={"primary"}
            icon={<PlusOutlined />}
          >
            申请添加店铺
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

const Question = styled(QuestionCircleOutlined)`
  margin-right: 1rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

const Info = styled(InfoCircleOutlined)`
  margin-left: 0.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #ff4d4f;
  }
`;