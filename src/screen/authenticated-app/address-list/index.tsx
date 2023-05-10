import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useSupplierOptions } from "service/supplier";
import { useAddressList, useProvinceOptions } from "service/address";
import { useAddressListSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { AddressModal } from "./components/address-modal";

export const AddressList = () => {
  const supplierOptions = useSupplierOptions();
  const { data: provinceOptions } = useProvinceOptions();
  const [params, setParams] = useAddressListSearchParams();
  const { data, isLoading, error } = useAddressList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          provinceOptions={provinceOptions || []}
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
      <AddressModal
        supplierOptions={supplierOptions || []}
        addressList={data?.data || []}
      />
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
