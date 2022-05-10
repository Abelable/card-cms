import { Button, Descriptions, Drawer } from "antd";
import { useDetailModal, usePicModal } from "../util";
import { Row } from "components/lib";
import styled from "@emotion/styled";

export const DetailModal = () => {
  const { detailModalOpen, detailDeliverId, close } = useDetailModal();
  const { open: openPicModal } = usePicModal();

  const closeModal = () => {
    close();
  };

  return (
    <Drawer
      title={"订单详情"}
      width={"100rem"}
      forceRender={true}
      onClose={closeModal}
      visible={detailModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Descriptions
        title={
          <div style={{ borderBottom: "1px dotted #d9d9d9" }}>
            <Row gap>
              <div>订单ID：172172129</div>
              <Extra>外部订单编号：WHJHWKJWK7217912</Extra>
            </Row>
            <Row gap style={{ margin: "1.6rem 0" }}>
              <Time>用户下单时间：2022-05-01 01:38:05</Time>
              <Time>平台创建时间：2022-05-01 01:38:05</Time>
              <Time>状态变更时间：2022-05-01 01:38:05</Time>
            </Row>
          </div>
        }
        column={2}
      >
        <Descriptions.Item label="订单来源">WEBAPP</Descriptions.Item>
        <Descriptions.Item label="收货人">方某某</Descriptions.Item>
        <Descriptions.Item label="分销商">159292000</Descriptions.Item>
        <Descriptions.Item label="联系电话">1597829229</Descriptions.Item>
        <Descriptions.Item label="订单状态">待开卡</Descriptions.Item>
        <Descriptions.Item label="收获地址">杭州市上城区</Descriptions.Item>
        <Descriptions.Item label="上游订单号">172172129</Descriptions.Item>
        <Descriptions.Item label="证件姓名">
          <Row>
            <div>方某某</div>
            <Link type={"link"} onClick={() => openPicModal(detailDeliverId)}>
              查看照片
            </Link>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item> </Descriptions.Item>
        <Descriptions.Item label="证件号码">32002018188198</Descriptions.Item>
      </Descriptions>
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
const Link = styled(Button)`
  margin-left: 1rem;
  padding: 0;
  height: fit-content;
  line-height: 1;
`;
