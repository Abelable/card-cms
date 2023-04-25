import styled from "@emotion/styled";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useProductsSearchParams } from "./util";
import { useProducts } from "service/order";
import { useSupplierOptions } from "service/supplier";
import { useChannelOptions } from "service/product";

export const AddressList = () => {
  const supplierOptions = useSupplierOptions();
  const channelOptions = useChannelOptions();
  const [params, setParams] = useProductsSearchParams();
  const { data, isLoading, error } = useProducts(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          supplierOptions={supplierOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          channelOptions={channelOptions}
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
