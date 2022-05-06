import { toNumber } from "utils";
import { useGoodsList } from "service/product";
import { useGoodsListSearchParams } from "./util";

import { List } from "./components/list";
import styled from "@emotion/styled";

export const ProductChannelGoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { data, isLoading, error } = useGoodsList(params);

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
