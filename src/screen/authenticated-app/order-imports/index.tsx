import styled from "@emotion/styled";
import { useProducts } from "service/order";
import { toNumber } from "utils";
import { List } from "./components/list";
import { useProductsSearchParams } from "./util";

export const OrderImports = () => {
  const [params, setParams] = useProductsSearchParams();
  const { data, isLoading, error } = useProducts(params);

  return (
    <Container>
      <Main>
        <List
          error={error}
          params={params}
          setParams={setParams}
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
