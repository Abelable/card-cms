import styled from "@emotion/styled";
import { useAgents } from "service/agent";
import { toNumber } from "utils";
import { useAgentsSearchParams } from "./util";
import { List } from "./components/list";
import { AgentModal } from "./components/agent-modal";
import { AgentShopModal } from "./components/agent-shop-modal";
import { AgentRechargeModal } from "./components/agent-recharge-modal";
import { AgentActivationModal } from "./components/agent-activation-modal";

export const Agents = () => {
  const [params, setParams] = useAgentsSearchParams();
  const { data, isLoading, error } = useAgents(params);

  return (
    <Container>
      <Main>
        <List
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
        <AgentModal agents={data?.data || []} />
        <AgentShopModal agents={data?.data || []} />
        <AgentRechargeModal agents={data?.data || []} />
        <AgentActivationModal agents={data?.data || []} />
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
