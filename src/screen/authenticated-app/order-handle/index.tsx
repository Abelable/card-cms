import { Drawer, Select, Menu, MenuProps } from "antd";
import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { Row } from "components/lib";
import { RecordModal } from "./components/record-modal";
import { InfoModal } from "./components/info-modal";
import { ReapplyModal } from "./components/reapply-modal";
import { DetailModal } from "./components/detail-modal";

import { useState } from "react";
import styled from "@emotion/styled";
import { useRegionOptions } from "service/common";
import { useGoodsOptions } from "service/product";
import { useOrderList, useSettingOptions, useShopOptions } from "service/order";
import { toNumber } from "utils";
import { useOrderListSearchParams } from "./util";
import { FlagModal } from "./components/flag-modal";

const menuStatusOptions = [
  { label: "全部", value: 0 },
  { label: "待完善证件信息", value: 10 },
  { label: "开卡失败", value: 20 },
  { label: "自动发货失败", value: 30 },
];
const orderStatusOptions = [
  { label: "初始化收单成功", value: 0 },
  ...menuStatusOptions.slice(1),
  { label: "待开卡", value: 40 },
  { label: "发货成功", value: 45 },
  { label: "待开卡超时", value: 50 },
  { label: "订单终止", value: 100 },
];

export const OrderHandle = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderListSearchParams();
  const goodsOptions = useGoodsOptions();
  const shopOptions = useShopOptions("10");
  const { data: flagOptions = [] } = useSettingOptions("tag");
  const { data: regionOptions } = useRegionOptions(3);
  const { data, isLoading, error } = useOrderList(params);

  const [batchFlag, setBatchFlag] = useState<number | undefined>(undefined);
  const selectBatchFlag = (ids: string[]) => (flag: number) => {
    setBatchFlag(flag);
    // todo 批量修改标旗
  };

  const menuItems: MenuProps["items"] = menuStatusOptions.map((item) => ({
    label: (
      <div onClick={() => setParams({ ...params, status: item.value })}>
        {item.label}
      </div>
    ),
    key: `${item.value}`,
  }));

  return (
    <Container>
      <Menu
        mode="horizontal"
        selectedKeys={[`${params.status}`]}
        items={menuItems}
      />
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
      <InfoModal regionOptions={regionOptions} />
      <ReapplyModal goodsOptions={goodsOptions} />
      <FlagModal flagOptions={flagOptions} />
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
            <Select
              style={{ width: "14rem", marginRight: 0 }}
              value={batchFlag}
              allowClear={true}
              onSelect={selectBatchFlag(selectedRowKeys)}
              placeholder="批量标旗"
            >
              {flagOptions.map(({ name, value }) => (
                <Select.Option key={value} value={value}>
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
