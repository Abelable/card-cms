import styled from "@emotion/styled";
import { useBlacklist } from "service/system";
import { toNumber } from "utils";
import { useBlacklistSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { BlackModal } from "./components/black-modal";

export const Blacklist = () => {
  const [params, setParams] = useBlacklistSearchParams();
  const { data, isLoading, error } = useBlacklist(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
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
        <BlackModal blacklist={data?.data || []} />
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
