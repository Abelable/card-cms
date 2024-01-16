import { Menu, MenuProps } from "antd";
import { List } from "./components/list";
import { PlatformBar } from "./components/platform-bar";
import { ApplyModal } from "./components/apply-modal";
import styled from "@emotion/styled";

import { toNumber } from "utils";
import { useOrderGrabListSearchParams } from "./util";
import { useOrderGrabList, usePlatformOptions } from "service/order";

export const OrderGrabList = () => {
  const platformOptions = usePlatformOptions();
  const [params, setParams] = useOrderGrabListSearchParams();
  const { data, isLoading, error } = useOrderGrabList(params);

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
        {params.shop_type === "10" ? <PlatformBar /> : <></>}
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
      <ApplyModal shop_type={params.shop_type} />
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
