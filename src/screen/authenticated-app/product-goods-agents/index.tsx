import { toNumber } from "utils";
import { useGoodsAgents } from "service/product";
import { useAgentsSearchParams } from "./util";

import { List } from "./components/list";
import styled from "@emotion/styled";

export const ProductGoodsAgents = () => {
  const [params, setParams] = useAgentsSearchParams();
  const { data, isLoading, error } = useGoodsAgents(params);

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