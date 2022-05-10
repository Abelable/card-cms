import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  message,
  Space,
  Divider,
} from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import { ErrorBox, Row } from "components/lib";
import { Deliver } from "types/order";
import copy from "copy-to-clipboard";
import { FileUpload } from "components/file-upload";
import { useFailModal, useStatusModal } from "../util";

type ExportDelivers = (ids: string[]) => void;
interface ListProps extends TableProps<Deliver>, SearchPanelProps {
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  exportDelivers: ExportDelivers;
  error: Error | unknown;
}

export const List = ({
  error,
  orderStatusOptions,
  setSelectedRowKeys,
  exportDelivers,
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
  const { startEdit: editStatus } = useStatusModal();
  const { startEdit: failDeliver } = useFailModal();
  const copyInfo = (info: string) => {
    copy(info);
    message.success("复制成功");
  };

  return (
    <Container>
      <Header between={true}>
        <h3>订单生产列表</h3>
        <Row gap>
          <Button icon={<DownloadOutlined />}>下载生产模版</Button>
          <FileUpload name="导入生产数据" />
          <Divider
            style={{ height: "3rem", marginRight: "2.8rem" }}
            type={"vertical"}
          />
          <Button icon={<DownloadOutlined />}>下载激活模版</Button>
          <div style={{ marginRight: 0 }}>
            <FileUpload name="导入激活数据" />
          </div>
        </Row>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "订单信息",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Copy onClick={() => copyInfo(deliver.id)}>
                  <div>订单id：{deliver.id}</div>
                  <CopyOutlined style={{ color: "#1890ff" }} />
                </Copy>
                <Copy onClick={() => copyInfo(deliver.source)}>
                  <div>订单来源：{deliver.source}</div>
                  <CopyOutlined style={{ color: "#1890ff" }} />
                </Copy>
                <Copy onClick={() => copyInfo(deliver.downstream_order_code)}>
                  <div>下游订单编号：{deliver.downstream_order_code}</div>
                  <CopyOutlined style={{ color: "#1890ff" }} />
                </Copy>
                <div>平台创建时间：{deliver.created_at}</div>
              </Space>
            ),
          },
          {
            title: "产品信息",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>产品名称：{deliver.pruduct_name}</div>
                <div>产品编码：{deliver.pruduct_code}</div>
              </Space>
            ),
          },
          {
            title: "证件信息&收货信息",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>证件姓名：{deliver.id_card_name}</div>
                  <Button type={"link"}>查看照片</Button>
                </Row>
                <div>证件号码：{deliver.id_card_code}</div>
                <div>收件人：{deliver.consignee_name}</div>
                <div>联系电话：{deliver.consignee_phone}</div>
                <div>收获地址：{deliver.consignee_address}</div>
              </Space>
            ),
          },
          {
            title: "订单状态",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>
                  {
                    orderStatusOptions.find(
                      (item) => item.id === deliver.status
                    )?.name
                  }
                </div>
                <Link type={"link"}>查看操作记录</Link>
                <div>
                  激活状态：{deliver.is_activated ? "已激活" : "未激活"}
                </div>
                <div>充值金额：{deliver.recharge_amount}元</div>
              </Space>
            ),
          },
          {
            title: "失败原因",
            dataIndex: "fail_reason",
          },
          {
            title: "生产信息",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>生产号码：{deliver.production_number}</div>
                <div>物流公司：{deliver.express_company}</div>
                <div>物流单号：{deliver.express_code}</div>
              </Space>
            ),
          },
          {
            title: "操作",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Link type={"link"}>查看详情</Link>
                <Link type={"link"} onClick={() => failDeliver(deliver.id)}>
                  生产失败
                </Link>
                <Link type={"link"}>录入生产数据</Link>
                <Link type={"link"} onClick={() => editStatus(deliver.id)}>
                  修改状态
                </Link>
                <Link type={"link"}>修改订单信息</Link>
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

const Copy = styled(Row)`
  cursor: pointer;
`;

const Link = styled(Button)`
  padding: 0;
  height: fit-content;
  line-height: 1;
`;
