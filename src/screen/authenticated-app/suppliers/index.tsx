import styled from "@emotion/styled";
import { useSuppliers } from "service/supplier";
import { toNumber } from "utils";
import { List } from "./components/list";
import { useSuppliersSearchParams } from "./util";

export const Suppliers = () => {
  const [params, setParams] = useSuppliersSearchParams();
  const { data, isLoading, error } = useSuppliers(params);

  return (
    <Container>
      <Main>
        <List
          error={error}
          params={params}
          setParams={setParams}
          loading={isLoading}
          dataSource={data?.data}
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
