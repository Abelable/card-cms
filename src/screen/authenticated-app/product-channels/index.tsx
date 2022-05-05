import { toNumber } from "utils";
import { useChannels } from "service/product";
import { useChannelsSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { Row } from "components/lib";

const modeOptions = [
  { id: 1, name: "手动生产" },
  { id: 2, name: "自动生产" },
];

export const ProductChannels = () => {
  const [params, setParams] = useChannelsSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { data, isLoading, error } = useChannels(params);
  const exportApplications = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/export?ids=${ids.join()}`;
  };

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
          setSelectedRowKeys={setSelectedRowKeys}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.meta.pagination.current_page),
            pageSize: toNumber(data?.meta.pagination.per_page),
            total: toNumber(data?.meta.pagination.total),
          }}
        />
      </Main>
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

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
