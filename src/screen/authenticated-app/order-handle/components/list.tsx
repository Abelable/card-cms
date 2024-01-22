import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  message,
  Space,
  Divider,
  Tooltip,
} from "antd";
import {
  CopyOutlined,
  DownloadOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { ErrorBox, Row } from "components/lib";
import { FileUpload } from "components/file-upload";
import { useQueryClient } from "react-query";
import copy from "copy-to-clipboard";
import {
  useDataModal,
  useDetailModal,
  useExportProductModal,
  useFailModal,
  useInfoModal,
  useOrderListQueryKey,
  usePicModal,
  useRecordModal,
  useStatusModal,
  useBlackModal,
} from "../util";
import { useDownloadTemplate } from "service/common";

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
  const downloadTemplate = useDownloadTemplate();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const { open: openExportProductModal } = useExportProductModal();
  const { open: openPicModal } = usePicModal();
  const { open: openRecordModal } = useRecordModal();
  const { startEdit: editStatus } = useStatusModal();
  const { startEdit: failOrder } = useFailModal();
  const { open: openDataModal } = useDataModal();
  const { open: openInfoModal } = useInfoModal();
  const { open: openBlackModal } = useBlackModal();
  const { open: openDetailModal } = useDetailModal();
  const copyInfo = (info: string) => {
    copy(info);
    message.success("复制成功");
  };

  const queryClient = useQueryClient();
  const queryKey = useOrderListQueryKey();
  const handleSuccess = () => queryClient.invalidateQueries(queryKey);

  return (
    <Container>
      <Header between={true}>
        <h3>订单生产列表</h3>
        <Row gap>
          <Button type={"primary"} onClick={() => openExportProductModal()}>
            导出生产
          </Button>
          <Divider
            style={{ height: "3rem", marginLeft: 0 }}
            type={"vertical"}
          />
          <div style={{ marginRight: "1rem" }}>
            <FileUpload
              scene={1}
              name="导入生产数据"
              onSuccess={handleSuccess}
            />
          </div>
          <Tooltip title="下载生产模版">
            <Button
              onClick={() => downloadTemplate(1)}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
          <Divider
            style={{ height: "3rem", marginLeft: 0 }}
            type={"vertical"}
          />
          <div style={{ marginRight: "1rem" }}>
            <FileUpload
              scene={2}
              name="导入激活数据"
              onSuccess={handleSuccess}
            />
          </div>
          <Tooltip title="下载激活模版">
            <Button
              onClick={() => downloadTemplate(2)}
              style={{ marginRight: 0 }}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
        </Row>
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
                {order.status !== 3 ? (
                  <Link type={"link"} onClick={() => failOrder(`${order.id}`)}>
                    生产失败
                  </Link>
                ) : null}
                <Link
                  type={"link"}
                  onClick={() => openDataModal(`${order.id}`)}
                >
                  录入生产数据
                </Link>
                <Link type={"link"} onClick={() => editStatus(`${order.id}`)}>
                  修改状态
                </Link>
                <Link
                  type={"link"}
                  onClick={() => openInfoModal(`${order.id}`)}
                >
                  修改订单信息
                </Link>
                <Link
                  type={"link"}
                  onClick={() => openBlackModal(`${order.id}`)}
                >
                  添加黑名单
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
