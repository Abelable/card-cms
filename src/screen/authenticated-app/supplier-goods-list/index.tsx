import styled from "@emotion/styled";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";
import { useGoodsList, useSupplierOptions } from "service/supplier";
import { useChannelOptions } from "service/product";
import { useOperatorOptions } from "service/common";

export const SupplierGoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { data, isLoading, error } = useGoodsList(params);
  const channelOptions = useChannelOptions();
  const supplierOptions = useSupplierOptions();
  const operatorOptions = useOperatorOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          channelOptions={channelOptions}
          supplierOptions={supplierOptions}
          params={params}
          setParams={setParams}
        />
        <List
          operatorOptions={operatorOptions}
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
