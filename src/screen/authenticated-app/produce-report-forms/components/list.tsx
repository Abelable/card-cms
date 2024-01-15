import styled from "@emotion/styled";
import { Descriptions, Spin, Button, Empty } from "antd";
import { ErrorBox, Row } from "components/lib";
import { ReportForm } from "types/produce";

interface ListProps {
  data: ReportForm[];
  isLoading: boolean;
  error: Error | unknown;
}

export const List = ({ data, isLoading, error }: ListProps) => {
  const donwload = (url: string) => (window.location.href = url);

  return (
    <Container>
      <Header>
        <h3>订单列表</h3>
      </Header>
      <ErrorBox error={error} />
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <>
          {data.length ? (
            data.map((item, index) => (
              <Descriptions
                style={{ marginBottom: "2.4rem", border: "1px solid #f2f2f2" }}
                key={index}
                column={2}
                title={
                  <ItemHeader>
                    <div>操作人：{item.created_by.username}</div>
                    <div>生成时间：{item.created_at}</div>
                    <Button
                      type={"primary"}
                      onClick={() => donwload(item.file)}
                    >
                      下载数据
                    </Button>
                  </ItemHeader>
                }
              >
                <Descriptions.Item label={<Label>平台创建时间</Label>}>
                  {item?.start_created_at}
                </Descriptions.Item>
                <Descriptions.Item> </Descriptions.Item>
                <Descriptions.Item label={<Label>订单来源</Label>}>
                  {item?.source || "暂无"}
                </Descriptions.Item>
                <Descriptions.Item label={<Label>订单状态</Label>}>
                  {item?.status || "暂无"}
                </Descriptions.Item>
                <Descriptions.Item label={<Label>退款状态</Label>}>
                  {item?.refund_status || "暂无"}
                </Descriptions.Item>
                <Descriptions.Item label={<Label>激活状态</Label>}>
                  {item?.activate_status || "暂无"}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      )}
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

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;
  height: 6rem;
  font-size: 1.4rem;
  background: #f1f1f1;
`;

const Label = styled.div`
  margin-left: 2.4rem;
`;
