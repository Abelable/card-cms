import styled from "@emotion/styled";
import { Descriptions, Spin } from "antd";
import { ErrorBox, Row } from "components/lib";
import { ReportForm } from "types/order";

interface ListProps {
  data: ReportForm[];
  isLoading: boolean;
  error: Error | unknown;
}

export const List = ({ data, isLoading, error }: ListProps) => {
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
          {data.map((item, index) => (
            <Item
              column={2}
              title={
                <Row>
                  <div>操作人：{item.created_by.name}</div>
                </Row>
              }
            ></Item>
          ))}
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

const Item = styled(Descriptions)`
  margin-bottom: 2.4rem;
  border: 1px solid #f9f9f9;
`;
const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  height: 0.8rem;
  background: #d1d1d1;
`;
const ItemContent = styled.div`
  padding: 2.4rem;
`;
