import { toNumber } from "utils";
import {
  useDelivers,
  useEditDelivers,
  useOrderStatusOptions,
} from "service/order";
import { useAgentOptions } from "service/agent";
import { useChannelEncodingOptions, useFailReasons } from "service/product";
import { useExpressOptions, useRegionOptions } from "service/common";
import {
  useFailModal,
  useBlackModal,
  useOrderDeliversQueryKey,
  useOrderDeliversSearchParams,
} from "./util";

import { Drawer, Modal, Select, Button } from "antd";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
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
import { ExportProductModal } from "./components/export-product-modal";
import { BlackModal } from "./components/black-modal";

export const OrderDelivers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderDeliversSearchParams();
  const orderStatusOptions = useOrderStatusOptions();
  const agentOptions = useAgentOptions();
  const channelEncodingOptions = useChannelEncodingOptions();
  const { data: regionOptions } = useRegionOptions(3);
  const { data: failReasons } = useFailReasons();
  const expressOptions = useExpressOptions();
  const { data, isLoading, error } = useDelivers(params);
  const { mutateAsync: editDelivers } = useEditDelivers(
    useOrderDeliversQueryKey()
  );
  const { startEdit: failDelivers } = useFailModal();
  const { open: openBlackModal } = useBlackModal();

  const [batchStatus, setBatchStatus] = useState<number | undefined>(undefined);
  const selectBatchStatus = (ids: string[]) => (status: number) => {
    setBatchStatus(status);
    switch (status) {
      case 3:
        failDelivers(ids.join());
        break;
      default:
        Modal.confirm({
          title: `确定将选中订单状态修改为${
            orderStatusOptions.find((item) => item.id === status)?.name
          }吗？`,
          content: "点击确定修改",
          okText: "确定",
          cancelText: "取消",
          onCancel: () => setBatchStatus(undefined),
          onOk: () => {
            editDelivers({ ids, status });
            setBatchStatus(undefined);
            setSelectedRowKeys([]);
          },
        });
        break;
    }
  };

  return (
    <Container>
      <Main>
        <SearchPanel
          channelEncodingOptions={channelEncodingOptions}
          agentOptions={agentOptions}
          orderStatusOptions={orderStatusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          orderStatusOptions={orderStatusOptions}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          params={params}
          setParams={setParams}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.meta.pagination.current_page),
            pageSize: toNumber(data?.meta.pagination.per_page),
            total: toNumber(data?.meta.pagination.total),
            showTotal: (total) => `共${total}条`,
          }}
        />
      </Main>
      <PicModal />
      <RecordModal />
      <StatusModal orderStatusOptions={orderStatusOptions} />
      <BlackModal />
      <FailModal
        failReasons={failReasons}
        setBatchStatus={setBatchStatus}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <DataModal expressOptions={expressOptions} />
      <InfoModal regionOptions={regionOptions} />
      <ExportModal params={params} />
      <ExportProductModal
        agentOptions={agentOptions}
        channelEncodingOptions={channelEncodingOptions}
      />
      <DetailModal orderStatusOptions={orderStatusOptions} />
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
            <Button onClick={() => openBlackModal(selectedRowKeys.join())}>
              批量添加黑名单
            </Button>
            <Select
              style={{ width: "14rem", marginRight: 0 }}
              value={batchStatus}
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
