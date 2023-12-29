import styled from "@emotion/styled";
import { useRoleList } from "service/role";
import { toNumber } from "utils";
import { useRoleListSearchParams } from "./util";

import { List } from "./components/list";
import { RoleModal } from "./components/role-modal";
import { PermissionModal } from "./components/permission-modal";

export const RoleList = () => {
  const [params, setParams] = useRoleListSearchParams();
  const { data, isLoading, error } = useRoleList(params);

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
        <RoleModal roleList={data?.data || []} />
        <PermissionModal />
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
