import styled from "@emotion/styled";
import { useLogList, useShopOptions } from "service/order";
import { toNumber } from "utils";
import { useLogListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

const statusOptions = [
  { name: "回调正常", value: 10 },
  { name: "回调失败", value: 20 },
  { name: "收单成功", value: 30 },
];

export const OrderLog = () => {
  const shopOptions = useShopOptions("10");

  const [params, setParams] = useLogListSearchParams();
  const { data, isLoading, error } = useLogList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
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
