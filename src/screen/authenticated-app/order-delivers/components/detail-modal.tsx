import { Button, Descriptions, Drawer, Tooltip } from "antd";
import { useDetailModal, usePicModal } from "../util";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { IdcardOutlined } from "@ant-design/icons";

export const DetailModal = () => {
  const { detailModalOpen, detailDeliverId, close } = useDetailModal();
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
        size={"small"}
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
            <Tooltip title="查看证件照片">
              <Check onClick={() => openPicModal(detailDeliverId)} />
            </Tooltip>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item> </Descriptions.Item>
        <Descriptions.Item label="证件号码">32002018188198</Descriptions.Item>
      </Descriptions>

      <Descriptions
        style={{ marginTop: "3rem" }}
        title="商品信息"
        bordered
        layout="vertical"
        size={"small"}
        column={7}
      >
        <Descriptions.Item label="产品渠道">测试卡</Descriptions.Item>
        <Descriptions.Item label="产品渠道编码">111111</Descriptions.Item>
        <Descriptions.Item label="商品名称">移动花卡</Descriptions.Item>
        <Descriptions.Item label="商品编号">12122</Descriptions.Item>
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
          2022-04-14系统身份证号错误
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
        <Descriptions.Item label="物流公司">申通快递</Descriptions.Item>
        <Descriptions.Item label="物流单号">111111</Descriptions.Item>
        <Descriptions.Item label="生产号码">17121021</Descriptions.Item>
        <Descriptions.Item label="激活状态">未激活</Descriptions.Item>
        <Descriptions.Item label="激活时间">
          2022-05-01 01:38:05
        </Descriptions.Item>
        <Descriptions.Item label="充值状态">已充值</Descriptions.Item>
        <Descriptions.Item label="充值时间">
          2022-05-01 01:38:05
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        style={{ marginTop: "5rem" }}
        title="操作记录"
        size={"small"}
        column={1}
      >
        <Descriptions.Item>
          2022-05-01 01:38:05订单初审：身份证号码错误
        </Descriptions.Item>
        <Descriptions.Item>
          2022-05-01 01:38:05订单初审：身份证号码错误
        </Descriptions.Item>
        <Descriptions.Item>
          2022-05-01 01:38:05订单初审：身份证号码错误
        </Descriptions.Item>
        <Descriptions.Item>
          2022-05-01 01:38:05订单初审：身份证号码错误
        </Descriptions.Item>
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

const Check = styled(IdcardOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;
