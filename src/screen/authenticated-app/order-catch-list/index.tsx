import { Menu, MenuProps } from "antd";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { GoodsModal } from "./components/goods-modal";
import { AgentModal } from "./components/agent-modal";
import { LinkModal } from "./components/link-modal";
import { PublishModal } from "./components/publish-modal";
import { NewPublishModal } from "./components/new-publish-modal";
import styled from "@emotion/styled";

import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";
import { useGoodsList, useProductOptions } from "service/product";
import { useSupplierOptions } from "service/supplier";
import { useAgentOptions } from "service/agent";
import { useOperatorOptions, useRegionOptions } from "service/common";
import { useState } from "react";

export const OrderCatchList = () => {
  const [curMenuKey, setCurMenuKey] = useState("0");
  const [params, setParams] = useGoodsListSearchParams();
  const operatorOptions = useOperatorOptions();
  const { data: regionOptions } = useRegionOptions();
  const supplierOptions = useSupplierOptions();
  const agentOptions = useAgentOptions();
  const { data: productOptions } = useProductOptions();
  const { data, isLoading, error } = useGoodsList(params);

  const menuItems: MenuProps["items"] = ["拼多多（自研应用）", "京东抓单"].map(
    (item, index) => ({
      label: <div onClick={() => setCurMenuKey(`${index}`)}>{item}</div>,
      key: `${index}`,
    })
  );

  return (
    <Container>
      <TypeMenu>
        <Menu mode="horizontal" selectedKeys={[curMenuKey]} items={menuItems} />
      </TypeMenu>
      <Main>
        <SearchPanel
          operatorOptions={operatorOptions}
          regionOptions={regionOptions}
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
      <GoodsModal productOptions={productOptions} />
      <AgentModal agentOptions={agentOptions} params={params} />
      <LinkModal />
      <PublishModal
        productOptions={productOptions}
        agentOptions={agentOptions}
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
  height: calc(100% - 4.6rem);
  overflow: scroll;
`;
