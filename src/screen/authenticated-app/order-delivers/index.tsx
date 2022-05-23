import { toNumber } from "utils";
import {
  useDelivers,
  useEditDelivers,
  useOrderStatusOptions,
} from "service/order";
import {
  useFailModal,
  useOrderDeliversQueryKey,
  useOrderDeliversSearchParams,
} from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { Drawer, Select } from "antd";
import { Row } from "components/lib";
import { useState } from "react";
import { FailModal } from "./components/fail-modal";
import { StatusModal } from "./components/status-modal";
import { PicModal } from "./components/pic-modal";
import { RecordModal } from "./components/record-modal";
import { DataModal } from "./components/data-modal";
import { InfoModal } from "./components/info-modal";
import { ExportModal } from "./components/export-modal";
import { DetailModal } from "./components/detail-modal";

export const OrderDelivers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderDeliversSearchParams();
  const orderStatusOptions = useOrderStatusOptions();
  const { data, isLoading, error } = useDelivers(params);
  const { mutateAsync: editDelivers } = useEditDelivers(
    useOrderDeliversQueryKey()
  );
  const { startEdit: failDelivers } = useFailModal();
  const selectBatchStatus = (ids: string[]) => (status: number) => {
    switch (status) {
      case 3:
        failDelivers(ids.join());
        break;
      default:
        editDelivers({ ids, status });
        break;
    }
  };

  return (
    <Container>
      <Main>
        <SearchPanel
          orderStatusOptions={orderStatusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          orderStatusOptions={orderStatusOptions}
          setSelectedRowKeys={setSelectedRowKeys}
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
      <PicModal orderList={data?.data || []} />
      <RecordModal />
      <StatusModal orderStatusOptions={orderStatusOptions} />
      <FailModal />
      <DataModal />
      <InfoModal />
      <ExportModal />
      <DetailModal />
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
          <Row gap>
            <Select
              style={{ width: "14rem", marginRight: 0 }}
              allowClear={true}
              onSelect={selectBatchStatus(selectedRowKeys)}
              placeholder="批量修改状态"
            >
              {orderStatusOptions.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
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
