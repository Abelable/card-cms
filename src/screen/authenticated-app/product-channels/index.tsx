import { toNumber } from "utils";
import { useChannels, useDownedChannels } from "service/product";
import { useChannelsSearchParams, useDownedChannelsSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Drawer, Menu, MenuProps } from "antd";
import { Row } from "components/lib";
import { DownedList } from "./components/downed-list";
import { DownedSearchPanel } from "./components/downed-search-panel";
import { ChannelModal } from "./components/channel-modal";
import { useOperatorOptions } from "service/common";

const modeOptions = [
  { id: 1, name: "手动生产" },
  { id: 2, name: "自动生产" },
];

export const ProductChannels = () => {
  const [type, setType] = useState("0");
  const operatorOptions = useOperatorOptions();
  const [params, setParams] = useChannelsSearchParams();
  const [downedParams, setDownedParams] = useDownedChannelsSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { data, isLoading, error } = useChannels(params);
  const {
    data: downedData,
    isLoading: downedLoading,
    error: downedError,
  } = useDownedChannels(downedParams);
  const exportApplications = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/export?ids=${ids.join()}`;
  };

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => setType("0")}>产品渠道中心</span>,
      key: "0",
    },
    {
      label: <span onClick={() => setType("1")}>已下架的产品</span>,
      key: "1",
    },
  ];

  return (
    <Container>
      <TypeMenu>
        <Menu mode="horizontal" selectedKeys={[type]} items={items} />
      </TypeMenu>
      <Main>
        {type === "0" ? (
          <>
            <SearchPanel params={params} setParams={setParams} />
            <List
              error={error}
              operatorOptions={operatorOptions}
              modeOptions={modeOptions}
              params={params}
              setParams={setParams}
              dataSource={data?.data}
              setSelectedRowKeys={setSelectedRowKeys}
              loading={isLoading}
              pagination={{
                current: toNumber(data?.meta.pagination.current_page),
                pageSize: toNumber(data?.meta.pagination.per_page),
                total: toNumber(data?.meta.pagination.total),
              }}
            />
          </>
        ) : (
          <>
            <DownedSearchPanel
              params={downedParams}
              setParams={setDownedParams}
            />
            <DownedList
              error={downedError}
              modeOptions={modeOptions}
              params={downedParams}
              setParams={setDownedParams}
              dataSource={downedData?.data}
              loading={downedLoading}
              pagination={{
                current: toNumber(downedData?.meta.pagination.current_page),
                pageSize: toNumber(downedData?.meta.pagination.per_page),
                total: toNumber(downedData?.meta.pagination.total),
              }}
            />
          </>
        )}
      </Main>
      <ChannelModal channels={data?.data || []} />
      <Drawer
        visible={!!selectedRowKeys.length}
        style={{ position: "absolute" }}
        height={"8rem"}
        placement="bottom"
        mask={false}
        getContainer={false}
        closable={false}
      >
        <Row between={true}>
          <div>
            已选择 <SelectedCount>{selectedRowKeys.length}</SelectedCount> 项
          </div>
          <Row gap={true}>
            <Button
              onClick={() => exportApplications(selectedRowKeys)}
              type={"primary"}
              style={{ marginRight: 0 }}
            >
              批量导出
            </Button>
          </Row>
        </Row>
      </Drawer>
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

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
