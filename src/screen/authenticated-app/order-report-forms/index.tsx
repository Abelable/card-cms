import { List } from "./components/list";
import styled from "@emotion/styled";
import { useReportForms } from "service/order";

export const OrderReportForms = () => {
  const { data, isLoading, error } = useReportForms();

  return (
    <Container>
      <Main>
        <List data={data || []} isLoading={isLoading} error={error} />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
