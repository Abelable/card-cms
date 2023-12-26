import styled from "@emotion/styled";
import { useMemberList } from "service/member";
import { toNumber } from "utils";
import { useMemberListSearchParams } from "./util";

import { List } from "./components/list";
import { MemberModal } from "./components/member-modal";

export const MemberList = () => {
  const [params, setParams] = useMemberListSearchParams();
  const { data, isLoading, error } = useMemberList(params);

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
        <MemberModal memberList={data?.data || []} />
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
