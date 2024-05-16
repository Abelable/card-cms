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
  Spin,
  Tag,
} from "antd";
import { CopyOutlined, IdcardOutlined, FlagFilled } from "@ant-design/icons";
import { ErrorBox, Row } from "components/lib";

import { useState } from "react";
import copy from "copy-to-clipboard";
import { useCancelOrder, useOrderFlagRemark } from "service/order";
import {
  useDetailModal,
  useFlagModal,
  useInfoModal,
  useOrderListQueryKey,
  usePicModal,
  useReapplyModal,
  useRecordModal,
} from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Order } from "types/order";

interface ListProps
  extends TableProps<Order>,
    Omit<SearchPanelProps, "menuIdx" | "goodsOptions"> {
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
  const [curOrderId, setCurOrderId] = useState("");
  const { data: remark, isLoading: remarkLoading } =
    useOrderFlagRemark(curOrderId);
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
  const { open: openFlagModal } = useFlagModal();
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
            width: "36rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>抓单订单号：{order.order_sn}</div>
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
            title: "商品信息",
            width: "32rem",
            render: (value, order) => (
              <Space direction={"vertical"}>
                <div>
                  <span>
                    商品名称：
                    {order.is_transfer === 1
                      ? order.transfer[0].goods_name
                      : order.goods?.goods_name}
                  </span>
                  {order.is_transfer === 1 ? (
                    <Tooltip title={`原：${order.goods?.goods_name}`}>
                      <Tag
                        color="warning"
                        style={{ cursor: "pointer", marginLeft: "1rem" }}
                      >
                        转
                      </Tag>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <span>
                    商品编码：
                    {order.is_transfer === 1
                      ? order.transfer[0].goods_sn
                      : order.goods?.goods_sn}
                  </span>
                  {order.is_transfer === 1 ? (
                    <Tooltip title={`原：${order.goods?.goods_sn}`}>
                      <Tag
                        color="warning"
                        style={{ cursor: "pointer", marginLeft: "1rem" }}
                      >
                        转
                      </Tag>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </div>
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
                    )?.text
                  }
                </div>
                <Link
                  type={"link"}
                  onClick={() => openRecordModal(`${order.id}`)}
                >
                  查看操作记录
                </Link>
                <div>激活状态：{order.active_at ? "已激活" : "未激活"}</div>
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
                <Tooltip title={remarkLoading ? <Spin /> : remark?.text}>
                  <FlagFilled
                    style={{
                      color: [
                        "rgb(228, 223, 215)",
                        "rgb(238, 63, 77)",
                        "rgb(235, 177, 13)",
                        "rgb(34, 148, 83)",
                        "rgb(39, 117, 182)",
                        "rgb(128, 118, 163)",
                      ][order.flag ? +order.flag : 0],
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setCurOrderId(`${order.id}`)}
                    onClick={() => openFlagModal(`${order.id}`, order.flag)}
                  />
                </Tooltip>
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
