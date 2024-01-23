import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  message,
  Space,
  Tooltip,
  Modal,
} from "antd";
import { CopyOutlined, IdcardOutlined } from "@ant-design/icons";
import { ErrorBox, Row } from "components/lib";

import copy from "copy-to-clipboard";
import { useCancelOrder } from "service/order";
import {
  useDetailModal,
  useInfoModal,
  useOrderListQueryKey,
  usePicModal,
  useReapplyModal,
  useRecordModal,
} from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { StatusOption, Order } from "types/order";

interface ListProps extends TableProps<Order>, SearchPanelProps {
  orderStatusOptions: StatusOption[];
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const List = ({
  error,
  orderStatusOptions,
  selectedRowKeys,
  setSelectedRowKeys,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const { open: openPicModal } = usePicModal();
  const { open: openRecordModal } = useRecordModal();
  const { open: openInfoModal } = useInfoModal();
  const { open: openReapplyModal } = useReapplyModal();
  const { open: openDetailModal } = useDetailModal();
  const { mutate: cancelOrder } = useCancelOrder(useOrderListQueryKey());

  const confirmCancelOrder = (id: string) => {
    Modal.confirm({
      title: "确定取消该订单吗？",
      content: "点击确定取消",
      okText: "确定",
      cancelText: "取消",
      onOk: () => cancelOrder(id),
    });
  };

  const copyInfo = (info: string) => {
    copy(info);
    message.success("复制成功");
  };

  return (
    <Container>
      <Header between={true}>
        <h3>订单列表</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "订单信息",
            fixed: "left",
            width: "32rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>订单id：{order.order_sn}</div>
                  <Copy
                    onClick={() => copyInfo(order.order_sn)}
                    style={{ color: "#1890ff" }}
                  />
                </Row>
                <Row>
                  <div>下游订单编号：{order.shop_order_sn}</div>
                  <Copy
                    onClick={() => copyInfo(order.shop_order_sn)}
                    style={{ color: "#1890ff" }}
                  />
                </Row>
                <div>平台创建时间：{order.created_at}</div>
              </Space>
            ),
          },
          {
            title: "产品信息",
            width: "26rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <div>产品名称：{order.goods?.goods_name}</div>
                <div>产品编码：{order.goods?.goods_sn}</div>
              </Space>
            ),
          },
          {
            title: "证件信息&收货信息",
            width: "30rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>证件姓名：{order.idcard_name}</div>
                  <Tooltip title="查看证件照片">
                    <Check onClick={() => openPicModal(`${order.id}`)} />
                  </Tooltip>
                </Row>
                <div>证件号码：{order.idcard}</div>
                <div>收件人：{order.concat_name}</div>
                <div>联系电话：{order.concat_phone}</div>
                <div>
                  收货地址：
                  {`${order.province}${order.city}${order.town}${order.concat_address}`}
                </div>
              </Space>
            ),
          },
          {
            title: "订单状态",
            width: "18rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <div>
                  {
                    orderStatusOptions.find(
                      (item) => item.value === order.status
                    )?.label
                  }
                </div>
                <Link
                  type={"link"}
                  onClick={() => openRecordModal(`${order.id}`)}
                >
                  查看操作记录
                </Link>
              </Space>
            ),
          },
          {
            title: "失败原因",
            width: "20rem",
            render: (value, order) => <>{order.error_reason}</>,
          },
          {
            title: "生产信息",
            width: "30rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <div>生产号码：{order.product_no}</div>
              </Space>
            ),
          },
          {
            title: "操作",
            fixed: "right",
            width: "12rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <Link
                  type={"link"}
                  onClick={() => openDetailModal(`${order.id}`)}
                >
                  查看详情
                </Link>
                <Link
                  type={"link"}
                  onClick={() => openInfoModal(`${order.id}`)}
                >
                  修改订单信息
                </Link>
                <Link
                  type={"link"}
                  onClick={() => openReapplyModal(`${order.id}`)}
                >
                  修改商品
                </Link>
                <Link
                  type={"link"}
                  onClick={() => confirmCancelOrder(`${order.id}`)}
                >
                  取消订单
                </Link>
              </Space>
            ),
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

const Copy = styled(CopyOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;

const Check = styled(IdcardOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;

const Link = styled(Button)`
  padding: 0;
  height: fit-content;
  line-height: 1;
`;
