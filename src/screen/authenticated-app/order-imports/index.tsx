import styled from "@emotion/styled";
import { useImports } from "service/order";
import { toNumber } from "utils";
import { List } from "./components/list";
import { useImportsSearchParams } from "./util";

export const OrderImports = () => {
  const [params, setParams] = useImportsSearchParams();
  const { data, isLoading, error } = useImports(params);

  return (
    <Container>
      <Main>
        <List
          error={error}
          params={params}
          setParams={setParams}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.meta.pagination.current_page),
            pageSize: toNumber(data?.meta.pagination.per_page),
            total: toNumber(data?.meta.pagination.total),
          }}
        />
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
