import { Menu, MenuProps } from "antd";
import { List } from "./components/list";
// import { ShopModal } from "./components/goods-modal";
// import { AgentModal } from "./components/agent-modal";
// import { LinkModal } from "./components/link-modal";
// import { PublishModal } from "./components/publish-modal";
// import { NewPublishModal } from "./components/new-publish-modal";
import styled from "@emotion/styled";

import { toNumber } from "utils";
import { useShopListSearchParams } from "./util";
import { useShopList } from "service/order";
import { useState } from "react";

export const OrderCatchShopList = () => {
  const [curMenuKey, setCurMenuKey] = useState("0");
  const [params, setParams] = useShopListSearchParams();
  const { data, isLoading, error } = useShopList(params);

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
      {/* <ShopModal productOptions={productOptions} />
      <AgentModal agentOptions={agentOptions} params={params} />
      <LinkModal />
      <PublishModal
        productOptions={productOptions}
        agentOptions={agentOptions}
      />
      <NewPublishModal
        supplierOptions={supplierOptions}
        agentOptions={agentOptions}
      /> */}
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
