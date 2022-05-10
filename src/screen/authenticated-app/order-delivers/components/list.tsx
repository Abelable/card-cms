import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  message,
  Space,
} from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import { ErrorBox, Row, ButtonNoPadding } from "components/lib";
import { useNewPublishModal, usePublishModal } from "../util";
import { Deliver } from "types/order";
import copy from "copy-to-clipboard";

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
  const { open: openPublishModal } = usePublishModal();
  const { open: openNewPublishModal } = useNewPublishModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const copyInfo = (info: string) => {
    copy(info);
    message.success("复制成功");
  };

  return (
    <Container>
      <Header between={true}>
        <h3>商品列表</h3>
        <Row gap>
          <Button type={"default"} onClick={openNewPublishModal}>
            发布全新套餐
          </Button>
          <Button
            style={{ marginRight: 0 }}
            type={"primary"}
            onClick={openPublishModal}
          >
            基于已有产品渠道发布商品
          </Button>
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
              <>
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
              </>
            ),
          },
          {
            title: "产品信息",
            render: (value, deliver) => (
              <>
                <div>产品名称：{deliver.pruduct_name}</div>
                <div>产品编码哦：{deliver.pruduct_code}</div>
              </>
            ),
          },
          {
            title: "证件信息&收获信息",
            render: (value, deliver) => (
              <>
                <Row>
                  <div>证件姓名：{deliver.id_card_name}</div>
                  <Button type={"link"}>查看照片</Button>
                </Row>
                <div>证件号码：{deliver.id_card_code}</div>
                <div>收件人：{deliver.consignee_name}</div>
                <div>联系电话：{deliver.consignee_phone}</div>
                <div>收获地址：{deliver.consignee_address}</div>
              </>
            ),
          },
          {
            title: "订单状态",
            render: (value, deliver) => (
              <>
                <div>
                  {
                    orderStatusOptions.find(
                      (item) => item.id === deliver.status
                    )?.name
                  }
                </div>
                <ButtonNoPadding type={"link"}>操作记录</ButtonNoPadding>
                <div>
                  激活状态：{deliver.is_activated ? "已激活" : "未激活"}
                </div>
                <div>充值金额：{deliver.recharge_amount}元</div>
              </>
            ),
          },
          {
            title: "失败原因",
            dataIndex: "fail_reason",
          },
          {
            title: "生产信息",
            render: (value, deliver) => (
              <>
                <div>生产号码：{deliver.production_number}</div>
                <div>物流公司：{deliver.express_company}</div>
                <div>物流单号：{deliver.express_code}</div>
              </>
            ),
          },
          {
            title: "操作",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Button type={"link"}>查看详情</Button>
                <Button type={"link"}>生产失败</Button>
                <Button type={"link"}>录入生产数据</Button>
                <Button type={"link"}>修改状态</Button>
                <Button type={"link"}>修改订单信息</Button>
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
