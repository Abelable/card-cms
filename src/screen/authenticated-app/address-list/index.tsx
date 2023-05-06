import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useRegionOptions } from "service/common";
import { useSupplierOptions } from "service/supplier";
import { useAddressList } from "service/address";
import { useAddressListSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { AddressModal } from "./components/address-modal";

export const AddressList = () => {
  const supplierOptions = useSupplierOptions();
  const { data: regionOptions } = useRegionOptions(3);
  const [params, setParams] = useAddressListSearchParams();
  const { data, isLoading, error } = useAddressList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          regionOptions={regionOptions || []}
          supplierOptions={supplierOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          supplierOptions={supplierOptions || []}
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
      <AddressModal />
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
