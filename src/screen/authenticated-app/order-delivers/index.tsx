import { toNumber } from "utils";
import { useDelivers } from "service/order";
import { useOrderDeliversSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { GoodsModal } from "./components/goods-modal";
import { AgentModal } from "./components/agent-modal";
import { LinkModal } from "./components/link-modal";
import { PublishModal } from "./components/publish-modal";
import { NewPublishModal } from "./components/new-publish-modal";

const modeOptions = [
  { id: 1, name: "手动生产" },
  { id: 2, name: "自动生产" },
];

export const ProductGoodsList = () => {
  const [params, setParams] = useOrderDeliversSearchParams();
  const { data, isLoading, error } = useDelivers(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          error={error}
          modeOptions={modeOptions}
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
      <GoodsModal goodsList={data?.data || []} />
      <AgentModal goodsList={data?.data || []} />
      <LinkModal goodsList={data?.data || []} />
      <PublishModal />
      <NewPublishModal />
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
