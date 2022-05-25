import { Descriptions, Drawer, Spin, Tooltip } from "antd";
import { useDetailModal, usePicModal } from "../util";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { IdcardOutlined } from "@ant-design/icons";
import { useAgentOptions } from "service/agent";
import { OrderStatusOption } from "types/order";

export const DetailModal = ({
  orderStatusOptions,
}: {
  orderStatusOptions: OrderStatusOption[];
}) => {
  const { detailModalOpen, detailDeliverId, editingDeliver, close, isLoading } =
    useDetailModal();
  const agentOptions = useAgentOptions();
  const { open: openPicModal } = usePicModal();

  const closeModal = () => {
    close();
  };

  return (
    <Drawer
      title={"订单详情"}
      width={"120rem"}
      forceRender={true}
      onClose={closeModal}
      visible={detailModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <>
          <Descriptions
            title={
              <div style={{ borderBottom: "1px dotted #d9d9d9" }}>
                <Row gap>
                  <div>订单ID：{editingDeliver?.id}</div>
                  <Extra>外部订单编号：{editingDeliver?.outer_order_no}</Extra>
                </Row>
                <Row gap style={{ margin: "1.6rem 0" }}>
                  <Time>用户下单时间：2022-05-01 01:38:05</Time>
                  <Time>平台创建时间：{editingDeliver?.created_at}</Time>
                  <Time>状态变更时间：{editingDeliver?.updated_at}</Time>
                </Row>
              </div>
            }
            column={2}
            size={"small"}
          >
            <Descriptions.Item label="订单来源">
              {editingDeliver?.source}
            </Descriptions.Item>
            <Descriptions.Item label="收货人">
              {editingDeliver?.buyer}
            </Descriptions.Item>
            <Descriptions.Item label="分销商">
              {
                agentOptions.find(
                  (item) => item.id === editingDeliver?.agent_id
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              {editingDeliver?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">
              {
                orderStatusOptions.find(
                  (item) => item.id === editingDeliver?.status
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="收获地址">
              {editingDeliver?.detail_address}
            </Descriptions.Item>
            <Descriptions.Item label="上游订单号">172172129</Descriptions.Item>
            <Descriptions.Item label="证件姓名">
              <Row>
                <div>{editingDeliver?.buyer}</div>
                <Tooltip title="查看证件照片">
                  <Check onClick={() => openPicModal(detailDeliverId)} />
                </Tooltip>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item> </Descriptions.Item>
            <Descriptions.Item label="证件号码">
              {editingDeliver?.idcard}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginTop: "3rem" }}
            title="商品信息"
            bordered
            layout="vertical"
            size={"small"}
            column={7}
          >
            <Descriptions.Item label="产品渠道">
              {editingDeliver?.product.name}
            </Descriptions.Item>
            <Descriptions.Item label="产品渠道编码">
              {editingDeliver?.product.encoding}
            </Descriptions.Item>
            <Descriptions.Item label="商品名称">
              {editingDeliver?.goods.name}
            </Descriptions.Item>
            <Descriptions.Item label="商品编号">
              {editingDeliver?.goods.encoding}
            </Descriptions.Item>
            <Descriptions.Item label="归属地">浙江杭州</Descriptions.Item>
            <Descriptions.Item label="购买号码">60</Descriptions.Item>
            <Descriptions.Item label="购买数量">1</Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginTop: "5rem" }}
            title="备注信息"
            bordered
            layout="vertical"
            size={"small"}
            column={1}
          >
            <Descriptions.Item label="生产备注（失败原因）">
              {editingDeliver?.product_failed_reason || "暂无"}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginTop: "5rem" }}
            title="发货&激活信息"
            bordered
            layout="vertical"
            size={"small"}
            column={7}
          >
            <Descriptions.Item label="物流公司">
              {editingDeliver?.express_name}
            </Descriptions.Item>
            <Descriptions.Item label="物流单号">
              {editingDeliver?.express_no}
            </Descriptions.Item>
            <Descriptions.Item label="生产号码">
              {editingDeliver?.product_no}
            </Descriptions.Item>
            <Descriptions.Item label="激活状态">
              {editingDeliver?.is_activated === 1 ? "已激活" : "未激活"}
            </Descriptions.Item>
            <Descriptions.Item label="激活时间">
              {editingDeliver?.activated_at || ""}
            </Descriptions.Item>
            <Descriptions.Item label="充值状态">
              {editingDeliver?.is_recharged === 1 ? "已充值" : "未充值"}
            </Descriptions.Item>
            <Descriptions.Item label="充值时间">
              {editingDeliver?.first_recharged_at}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginTop: "5rem" }}
            title="操作记录"
            size={"small"}
            column={1}
          >
            {editingDeliver?.operation_logs.map((item, index) => (
              <Descriptions.Item key={index}>{item.content}</Descriptions.Item>
            ))}
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};

const Extra = styled.div`
  color: #666;
  font-size: 13px;
  font-weight: 400;
`;
const Time = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 400;
`;

const Check = styled(IdcardOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
