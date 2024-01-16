import { Menu, MenuProps } from "antd";
import { List } from "./components/list";
import { PlatformBar } from "./components/platform-bar";
// import { ShopModal } from "./components/goods-modal";
// import { AgentModal } from "./components/agent-modal";
// import { LinkModal } from "./components/link-modal";
// import { PublishModal } from "./components/publish-modal";
// import { NewPublishModal } from "./components/new-publish-modal";
import styled from "@emotion/styled";

import { toNumber } from "utils";
import { useOrderGrabListSearchParams } from "./util";
import { useOrderGrabList, usePlatformOptions } from "service/order";
import { useEffect } from "react";

export const OrderGrabList = () => {
  const platformOptions = usePlatformOptions();
  console.log("platformOptions", platformOptions);
  const [params, setParams] = useOrderGrabListSearchParams();
  const { data, isLoading, error } = useOrderGrabList(params);

  useEffect(() => {
    setParams({ ...params, shop_type: platformOptions[0].value });
  }, [params, platformOptions, setParams]);

  const menuItems: MenuProps["items"] = platformOptions.map((item) => ({
    label: (
      <div onClick={() => setParams({ ...params, shop_type: item.value })}>
        {item.name}
      </div>
    ),
    key: `${item.value}`,
  }));

  return (
    <Container>
      <Menu
        mode="horizontal"
        selectedKeys={[params.shop_type]}
        items={menuItems}
      />
      <Main>
        <PlatformBar />
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

const Main = styled.div`
  padding: 2.4rem;
  height: calc(100% - 4.6rem);
  overflow: scroll;
`;
