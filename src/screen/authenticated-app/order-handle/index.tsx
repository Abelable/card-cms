import { Drawer, Select, Menu, MenuProps, Button } from "antd";
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
import {
  useOrderList,
  useOrderStatusOptions,
  useSettingOptions,
  useShopOptions,
} from "service/order";
import { toNumber } from "utils";
import { useOrderListSearchParams, useReapplyModal } from "./util";
import { FlagModal } from "./components/flag-modal";

export const OrderHandle = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useOrderListSearchParams();
  const { data: orderStatusOptions = [] } = useOrderStatusOptions();
  const menuStatusOptions = [
    { text: "全部", value: undefined },
    ...orderStatusOptions.filter((item) => [10, 20].includes(item.value)),
  ];
  const goodsOptions = useGoodsOptions();
  const shopOptions = useShopOptions("10");
  const { data: flagOptions = [] } = useSettingOptions("tag");
  const { data: regionOptions } = useRegionOptions(3);
  const { data, isLoading, error } = useOrderList(params);

  const { open: openReapplyModal } = useReapplyModal();

  const [menuIdx, setMenuIdx] = useState(0);
  const [batchFlag, setBatchFlag] = useState<number | undefined>(undefined);
  const selectBatchFlag = (ids: string[]) => (flag: number) => {
    setBatchFlag(flag);
    // todo 批量修改标旗
  };

  const menuItems: MenuProps["items"] = menuStatusOptions.map(
    (item, index) => ({
      label: (
        <div
          onClick={() => {
            setParams({ ...params, status: item.value });
            setMenuIdx(index);
          }}
        >
          {item.text}
        </div>
      ),
      key: `${index}`,
    })
  );

  return (
    <Container>
      <Menu mode="horizontal" selectedKeys={[`${menuIdx}`]} items={menuItems} />
      <Main>
        <SearchPanel
          menuIdx={menuIdx}
          orderStatusOptions={orderStatusOptions}
          shopOptions={shopOptions}
          goodsOptions={goodsOptions}
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
            <Button onClick={() => openReapplyModal(selectedRowKeys.join())}>
              批量修改商品
            </Button>
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
