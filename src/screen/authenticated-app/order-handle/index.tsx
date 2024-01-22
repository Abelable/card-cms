import { toNumber } from "utils";
import {
  useOrderList,
  useEditOrderList,
  useSettingOptions,
  useShopOptions,
} from "service/order";
import { useAgentOptions } from "service/agent";
import { useChannelEncodingOptions } from "service/product";
import { useRegionOptions } from "service/common";
import {
  useFailModal,
  useBlackModal,
  useOrderListQueryKey,
  useOrderListSearchParams,
} from "./util";

import { Drawer, Modal, Select, Button } from "antd";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useState } from "react";
import { StatusModal } from "./components/status-modal";
import { RecordModal } from "./components/record-modal";
import { InfoModal } from "./components/info-modal";
import { ExportModal } from "./components/export-modal";
import { DetailModal } from "./components/detail-modal";
import { ExportProductModal } from "./components/export-product-modal";

const orderStatusOptions = [
  { label: "初始化收单成功", value: 0 },
  { label: "待完善证件信息", value: 10 },
  { label: "开卡失败", value: 20 },
  { label: "自动发货失败", value: 30 },
  { label: "待开卡", value: 40 },
  { label: "发货成功", value: 45 },
  { label: "待开卡超时", value: 50 },
  { label: "订单终止", value: 100 },
];

export const OrderHandle = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderListSearchParams();
  const shopOptions = useShopOptions("10");
  const { data: flagOptions = [] } = useSettingOptions("tag");
  const agentOptions = useAgentOptions();
  const channelEncodingOptions = useChannelEncodingOptions();
  const { data: regionOptions } = useRegionOptions(3);
  const { data, isLoading, error } = useOrderList(params);
  const { mutateAsync: editOrderList } = useEditOrderList(
    useOrderListQueryKey()
  );
  const { startEdit: failOrderList } = useFailModal();
  const { open: openBlackModal } = useBlackModal();

  const [batchStatus, setBatchStatus] = useState<number | undefined>(undefined);
  const selectBatchStatus = (ids: string[]) => (status: number) => {
    setBatchStatus(status);
    switch (status) {
      case 3:
        failOrderList(ids.join());
        break;
      default:
        Modal.confirm({
          title: `确定将选中订单状态修改为${
            orderStatusOptions.find((item) => item.value === status)?.label
          }吗？`,
          content: "点击确定修改",
          okText: "确定",
          cancelText: "取消",
          onCancel: () => setBatchStatus(undefined),
          onOk: () => {
            editOrderList({ ids, status });
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
          shopOptions={shopOptions}
          flagOptions={flagOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          shopOptions={shopOptions}
          flagOptions={flagOptions}
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
      <RecordModal />
      <StatusModal orderStatusOptions={orderStatusOptions} />
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
              {orderStatusOptions.map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  {label}
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
