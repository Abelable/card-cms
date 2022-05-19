import { useGoods } from "service/product";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useUrlQueryParams } from "utils/url";

export const ProductGoodsAgents = () => {
  const [{ goods_id }] = useUrlQueryParams(["goods_id"]);
  const { data, isLoading, error } = useGoods(Number(goods_id));

  return (
    <Container>
      <Main>
        <List
          goodsName={data?.name || ""}
          error={error}
          dataSource={data?.agents}
          loading={isLoading}
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
