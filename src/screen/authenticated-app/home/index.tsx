import { toNumber } from "utils";
import { useHome } from "service/home";
import { useHomeSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useAgentOptions } from "service/agent";

export const Home = () => {
  const [params, setParams] = useHomeSearchParams();
  const agentOptions = useAgentOptions();
  const { data, isLoading, error } = useHome(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          agentOptions={agentOptions}
          params={params}
          setParams={setParams}
        />
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
