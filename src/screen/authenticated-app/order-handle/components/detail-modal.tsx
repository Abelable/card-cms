import { Descriptions, Drawer, Spin, Tooltip } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { IdcardOutlined } from "@ant-design/icons";
import { useDetailModal, usePicModal } from "../util";
import type { StatusOption } from "types/order";

export const DetailModal = ({
  orderStatusOptions,
}: {
  orderStatusOptions: StatusOption[];
}) => {
  const { detailModalOpen, detailOrderId, editingOrder, close, isLoading } =
    useDetailModal();
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
                  <div>订单ID：{editingOrder?.order_sn}</div>
                  <Extra>外部订单编号：{editingOrder?.shop_order_sn}</Extra>
                </Row>
                <Row gap style={{ margin: "1.6rem 0" }}>
                  <Time>平台创建时间：{editingOrder?.created_at}</Time>
                  <Time>状态变更时间：{editingOrder?.updated_at}</Time>
                </Row>
              </div>
            }
            column={2}
            size={"small"}
          >
            <Descriptions.Item label="收货人">
              {editingOrder?.concat_name}
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              {editingOrder?.concat_phone}
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">
              {
                orderStatusOptions.find(
                  (item) => item.value === editingOrder?.status
                )?.label
              }
            </Descriptions.Item>
            <Descriptions.Item label="收获地址">
              {editingOrder?.concat_address}
            </Descriptions.Item>
            <Descriptions.Item label="证件姓名">
              <Row>
                <div>{editingOrder?.idcard_name}</div>
                <Tooltip title="查看证件照片">
                  <Check onClick={() => openPicModal(detailOrderId)} />
                </Tooltip>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item> </Descriptions.Item>
            <Descriptions.Item label="证件号码">
              {editingOrder?.idcard}
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
            <Descriptions.Item label="商品名称">
              {editingOrder?.goods.goods_name}
            </Descriptions.Item>
            <Descriptions.Item label="商品编号">
              {editingOrder?.goods.goods_sn}
            </Descriptions.Item>
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
              {editingOrder?.error_reason || "暂无"}
            </Descriptions.Item>
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
