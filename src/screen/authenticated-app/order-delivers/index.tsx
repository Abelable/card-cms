import { toNumber } from "utils";
import { useDelivers } from "service/order";
import {
  useFailModal,
  useOrderDeliversSearchParams,
  useStatusModal,
} from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { Button, Drawer, Select } from "antd";
import { Row } from "components/lib";
import { useState } from "react";
import { FailModal } from "./components/fail-modal";
import { StatusModal } from "./components/status-modal";
import { PicModal } from "./components/pic-modal";
import { RecordModal } from "./components/record-modal";
import { DataModal } from "./components/data-modal";

const orderStatusOptions = [
  { id: 1, name: "待发货" },
  { id: 2, name: "待收货" },
  { id: 3, name: "已收货" },
];

const batchOperationOptions = [
  { id: 1, name: "批量修改状态" },
  { id: 2, name: "批量标记失败" },
];

export const OrderDelivers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderDeliversSearchParams();
  const { data, isLoading, error } = useDelivers(params);
  const exportDelivers = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/export?ids=${ids.join()}`;
  };
  const { startEdit: editStatus, editingStatusDeliverIds } = useStatusModal();
  const { startEdit: failDelivers, failDeliverIds } = useFailModal();
  const selectBatchOperation = (ids: string[]) => (type: number) => {
    switch (type) {
      case 1:
        editStatus(ids.join());
        break;
      case 2:
        failDelivers(ids.join());
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
          exportDelivers={exportDelivers}
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
      <PicModal />
      <RecordModal />
      <StatusModal />
      <FailModal />
      <DataModal />
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
            <Button onClick={() => exportDelivers(selectedRowKeys)}>
              批量导出生产
            </Button>
            <Button
              onClick={() => exportDelivers(selectedRowKeys)}
              type={"primary"}
            >
              批量导出信息
            </Button>
            <Select
              style={{ width: "14rem" }}
              value={
                editingStatusDeliverIds ? 1 : failDeliverIds ? 2 : undefined
              }
              allowClear={true}
              onSelect={selectBatchOperation(selectedRowKeys)}
              placeholder="批量操作"
            >
              {batchOperationOptions.map(({ id, name }) => (
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
