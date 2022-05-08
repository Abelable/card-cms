import styled from "@emotion/styled";
import { useBlacklist } from "service/system";
import { toNumber } from "utils";
import { BlackModal } from "./components/black-modal";
import { List } from "./components/list";
import { useBlacklistSearchParams } from "./util";

export const Blacklist = () => {
  const [params, setParams] = useBlacklistSearchParams();
  const { data, isLoading, error } = useBlacklist(params);

  return (
    <Container>
      <Main>
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
