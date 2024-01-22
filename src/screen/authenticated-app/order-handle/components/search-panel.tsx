import { useState } from "react";
import { Button, DatePicker, Divider, Input, Select, Tooltip } from "antd";
import { Row } from "components/lib";
import { FormatPainterOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import moment from "moment";
import dayjs from "dayjs";
import { useExportModal } from "../util";

import type { Option, OrderListSearchParams, ShopOption } from "types/order";

export interface SearchPanelProps {
  shopOptions: ShopOption[];
  flagOptions: Option[];
  params: Partial<OrderListSearchParams>;
  setParams: (params: Partial<OrderListSearchParams>) => void;
}

export const SearchPanel = ({
  shopOptions,
  flagOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const endTime = new Date(
    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
  );
  const startTime = new Date(
    new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 7
  );
  const defaultParams: Omit<
    OrderListSearchParams,
    "status" | "page" | "per_page"
  > = {
    order_sn: "",
    shop_order_sn: "",
    shop_name: undefined,
    tag: undefined,
    start_created_at: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
    end_created_at: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
  };

  const [defaultDate, setDefaultDate] = useState<{
    start_created_at: string | undefined;
    end_created_at: string | undefined;
  }>({
    start_created_at: defaultParams.start_created_at,
    end_created_at: defaultParams.end_created_at,
  });

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<OrderListSearchParams>>(defaultParams);

  const { open: openExportModal } = useExportModal();

  const setOrderSn = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        order_sn: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      order_sn: evt.target.value,
    });
  };

  const formatOrderSn = () => {
    setTemporaryParams({
      ...temporaryParams,
      order_sn: temporaryParams.order_sn?.split(" ").join(),
    });
  };

  const setShopOrderSn = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        shop_order_sn: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      shop_order_sn: evt.target.value,
    });
  };

  const formatShopOrderSn = () => {
    setTemporaryParams({
      ...temporaryParams,
      shop_order_sn: temporaryParams.shop_order_sn?.split(" ").join(),
    });
  };

  const setShopName = (shop_name: string[]) =>
    setTemporaryParams({
      ...temporaryParams,
      shop_name: shop_name.join(),
    });
  const clearShopName = () =>
    setTemporaryParams({ ...temporaryParams, shop_name: undefined });

  const selectFlag = (tag: string) =>
    setTemporaryParams({ ...temporaryParams, tag });
  const clearTag = () =>
    setTemporaryParams({ ...temporaryParams, tag: undefined });

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_created_at: formatString[0],
      end_created_at: formatString[1],
    });

  const query = () => {
    const { start_created_at, end_created_at, ...rest } = temporaryParams;

    // 时间参数没有变化的情况，表示使用的是默认时间，需要刷新默认时间
    if (
      start_created_at === defaultDate.start_created_at &&
      end_created_at === defaultDate.end_created_at
    ) {
      const startTime = defaultParams.start_created_at;
      const endTime = defaultParams.end_created_at;
      setParams({
        ...params,
        start_created_at: startTime,
        end_created_at: endTime,
        ...rest,
      });
      setTemporaryParams({
        ...temporaryParams,
        start_created_at: startTime,
        end_created_at: endTime,
      });
      setDefaultDate({
        start_created_at: startTime,
        end_created_at: endTime,
      });
    } else {
      setParams({
        ...params,
        start_created_at,
        end_created_at,
        ...rest,
      });
    }
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
    setDefaultDate({
      start_created_at: defaultParams.start_created_at,
      end_created_at: defaultParams.end_created_at,
    });
  };

  return (
    <Container>
      <Item>
        <div>订单号：</div>
        <Input.Group compact>
          <Tooltip title={temporaryParams.order_sn}>
            <Input
              style={{ width: "38.6rem" }}
              value={temporaryParams.order_sn}
              onChange={setOrderSn}
              placeholder="可批量复制excel单号，查询前请点右侧按钮进行格式化"
              allowClear={true}
            />
          </Tooltip>
          <Tooltip title="格式刷">
            <Button onClick={formatOrderSn} icon={<FormatPainterOutlined />} />
          </Tooltip>
        </Input.Group>
      </Item>
      <Item>
        <div>外部订单号：</div>
        <Input.Group compact>
          <Tooltip title={temporaryParams.shop_order_sn}>
            <Input
              style={{ width: "38.6rem" }}
              value={temporaryParams.shop_order_sn}
              onChange={setShopOrderSn}
              placeholder="可批量复制excel单号，查询前请点右侧按钮进行格式化"
              allowClear={true}
            />
          </Tooltip>
          <Tooltip title="格式刷">
            <Button
              onClick={formatShopOrderSn}
              icon={<FormatPainterOutlined />}
            />
          </Tooltip>
        </Input.Group>
      </Item>
      <Item>
        <div>店铺名称：</div>
        <Select
          mode="multiple"
          maxTagCount="responsive"
          style={{ width: "40rem" }}
          allowClear={true}
          onChange={setShopName}
          onClear={clearShopName}
          placeholder="请选择店铺名称"
        >
          {shopOptions.map(({ id, name }) => (
            <Select.Option key={id} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>标旗：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.tag}
          allowClear={true}
          onSelect={selectFlag}
          onClear={clearTag}
          placeholder="请选择标旗"
        >
          {flagOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item style={{ marginRight: "40rem" }}>
        <div>选择时间：</div>
        <DatePicker.RangePicker
          showTime
          value={
            temporaryParams.start_created_at
              ? [
                  moment(temporaryParams.start_created_at),
                  moment(temporaryParams.end_created_at),
                ]
              : undefined
          }
          onChange={setDates}
        />
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button type={"primary"} onClick={query}>
          查询
        </Button>
        <Divider style={{ height: "3rem", marginLeft: 0 }} type={"vertical"} />
        <Button
          style={{ marginRight: 0 }}
          onClick={() => openExportModal()}
          type={"primary"}
        >
          导出信息
        </Button>
      </ButtonWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
  padding: 2.4rem 0rem 0 2.4rem;
  background: #fff;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
  white-space: nowrap;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
