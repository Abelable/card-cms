import styled from "@emotion/styled";
import { useRuleList, useShopOptions } from "service/order";
import { useGoodsOptions } from "service/product";
import { toNumber } from "utils";
import { useRuleListSearchParams } from "./util";

import { List } from "./components/list";
import { RuleModal } from "./components/rule-modal";
import { SearchPanel } from "./components/search-panel";

export const OrderConvert = () => {
  const goodsOptions = useGoodsOptions();
  const shopOptions = useShopOptions("10");

  const [params, setParams] = useRuleListSearchParams();
  const { data, isLoading, error } = useRuleList(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          shopOptions={shopOptions || []}
          error={error}
          params={params}
          setParams={setParams}
          dataSource={data?.data || []}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.meta.pagination.current_page),
            pageSize: toNumber(data?.meta.pagination.per_page),
            total: toNumber(data?.meta.pagination.total),
          }}
        />
        <RuleModal
          ruleList={data?.data || []}
          goodsOptions={goodsOptions || []}
          shopOptions={shopOptions || []}
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
