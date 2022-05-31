import styled from "@emotion/styled";
import { Menu, MenuProps } from "antd";
import { ChannelModal } from "./components/channel-modal";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { toNumber } from "utils";
import { useChannelsSearchParams } from "./util";
import {
  useOperatorOptions,
  useDefaultWarningSetting,
  useRegionOptions,
} from "service/common";
import { useSupplierOptions } from "service/supplier";
import { useChannels, useChannelOptions } from "service/product";

const modeOptions = [
  { name: "手动生产", value: 0 },
  { name: "自动生产", value: 1 },
];

export const ProductChannels = () => {
  const operatorOptions = useOperatorOptions();
  const supplierOptions = useSupplierOptions();
  const channelOptions = useChannelOptions();
  const { data: regionOptions } = useRegionOptions();
  const { data: defaultWarningSetting } = useDefaultWarningSetting();
  const [params, setParams] = useChannelsSearchParams();
  const { data, isLoading, error } = useChannels(params);

  const items: MenuProps["items"] = [
    {
      label: (
        <div onClick={() => setParams({ ...params, is_removed: "0" })}>
          产品渠道中心
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div onClick={() => setParams({ ...params, is_removed: "1" })}>
          已下架的产品
        </div>
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
          channelOptions={channelOptions}
          supplierOptions={supplierOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          operatorOptions={operatorOptions}
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
      <ChannelModal
        regionOptions={regionOptions}
        defaultWarningSetting={defaultWarningSetting}
        operatorOptions={operatorOptions}
        supplierOptions={supplierOptions}
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
