import { toNumber } from "utils";
import { useChannelOptions, useGoodsList } from "service/product";
import { useGoodsListSearchParams } from "./util";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { Menu, MenuProps } from "antd";
import { GoodsModal } from "./components/goods-modal";
import { AgentModal } from "./components/agent-modal";
import { LinkModal } from "./components/link-modal";
import { PublishModal } from "./components/publish-modal";
import { NewPublishModal } from "./components/new-publish-modal";
import { useSupplierOptions } from "service/supplier";
import { useAgentOptions } from "service/agent";

export const ProductGoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const supplierOptions = useSupplierOptions();
  const agentOptions = useAgentOptions();
  const channelOptions = useChannelOptions();
  const { data, isLoading, error } = useGoodsList(params);

  const items: MenuProps["items"] = [
    {
      label: (
        <span onClick={() => setParams({ ...params, is_removed: "0" })}>
          销售中的商品
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span onClick={() => setParams({ ...params, is_removed: "1" })}>
          已下架的商品
        </span>
      ),
      key: "1",
    },
  ];

  return (
    <Container>
      <TypeMenu>
        <Menu
          mode="horizontal"
          selectedKeys={[params.is_removed]}
          items={items}
        />
      </TypeMenu>
      <Main>
        <SearchPanel
          supplierOptions={supplierOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          supplierOptions={supplierOptions}
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
      <GoodsModal channelOptions={channelOptions} />
      <AgentModal params={params} />
      <LinkModal />
      <PublishModal
        agentOptions={agentOptions}
        channelOptions={channelOptions}
      />
      <NewPublishModal
        supplierOptions={supplierOptions}
        agentOptions={agentOptions}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const TypeMenu = styled.div`
  background: #fff;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
