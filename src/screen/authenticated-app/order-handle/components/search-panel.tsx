import { useState } from "react";
import { Button, DatePicker, Divider, Input, Select, Tooltip } from "antd";
import { Row } from "components/lib";
import { FormatPainterOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import moment from "moment";
import dayjs from "dayjs";
import { useExportOrderList } from "service/order";

import type { Option, OrderListSearchParams, ShopOption } from "types/order";
import type { GoodsOption } from "types/product";

const timeTypeOptions = [
  { name: "平台创建时间", value: 1 },
  { name: "订单激活时间", value: 2 },
];

export interface SearchPanelProps {
  menuIdx: Number;
  orderStatusOptions: { text: string; value: number }[];
  shopOptions: ShopOption[];
  goodsOptions: GoodsOption[];
  flagOptions: Option[];
  params: Partial<OrderListSearchParams>;
  setParams: (params: Partial<OrderListSearchParams>) => void;
}

export const SearchPanel = ({
  menuIdx,
  orderStatusOptions,
  shopOptions,
  goodsOptions,
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
  const defaultParams: Omit<OrderListSearchParams, "page" | "per_page"> = {
    status: menuIdx === 0 ? undefined : params.status,
    order_sn: "",
    shop_order_sn: "",
    shop_name: undefined,
    tag: undefined,
    concat_phone: "",
    idcard: "",
    goods_name: undefined,
    goods_sn: "",
    product_no: "",
    express_sn: "",
    express_company: "",
    time_type: 1,
    start_time: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
    end_time: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
  };

  const [defaultDate, setDefaultDate] = useState<{
    start_time: string | undefined;
    end_time: string | undefined;
  }>({
    start_time: defaultParams.start_time,
    end_time: defaultParams.end_time,
  });

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<OrderListSearchParams>>(defaultParams);

  const exportOrderList = useExportOrderList();

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

  const setGoodsName = (goods_name: string[]) =>
    setTemporaryParams({
      ...temporaryParams,
      goods_name: goods_name.join(),
    });
  const clearGoodsName = () =>
    setTemporaryParams({ ...temporaryParams, goods_name: undefined });

  const setGoodsSn = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        goods_sn: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      goods_sn: evt.target.value,
    });
  };

  const setProductNo = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        product_no: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      product_no: evt.target.value,
    });
  };

  const setExpressSn = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        express_sn: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      express_sn: evt.target.value,
    });
  };

  const setExpressCompany = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        express_company: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      express_company: evt.target.value,
    });
  };

  const setStatus = (status: number) =>
    setTemporaryParams({ ...temporaryParams, status });
  const clearStatus = () =>
    setTemporaryParams({ ...temporaryParams, status: undefined });

  const setIdCard = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        idcard: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      idcard: evt.target.value,
    });
  };

  const setPhone = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        concat_phone: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      concat_phone: evt.target.value,
    });
  };

  const selectFlag = (tag: string) =>
    setTemporaryParams({ ...temporaryParams, tag });
  const clearTag = () =>
    setTemporaryParams({ ...temporaryParams, tag: undefined });

  const setTimeType = (time_type: number) =>
    setTemporaryParams({ ...temporaryParams, time_type });
  const clearTimeType = () =>
    setTemporaryParams({ ...temporaryParams, time_type: undefined });

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_time: formatString[0],
      end_time: formatString[1],
    });

  const query = () => {
    const { status, start_time, end_time, ...rest } = temporaryParams;

    // 时间参数没有变化的情况，表示使用的是默认时间，需要刷新默认时间
    if (
      start_time === defaultDate.start_time &&
      end_time === defaultDate.end_time
    ) {
      const startTime = defaultParams.start_time;
      const endTime = defaultParams.end_time;
      setParams({
        ...params,
        status: menuIdx === 0 ? status : params.status,
        start_time: startTime,
        end_time: endTime,
        ...rest,
      });
      setTemporaryParams({
        ...temporaryParams,
        start_time: startTime,
        end_time: endTime,
      });
      setDefaultDate({
        start_time: startTime,
        end_time: endTime,
      });
    } else {
      setParams({
        ...params,
        status: menuIdx === 0 ? status : params.status,
        start_time,
        end_time,
        ...rest,
      });
    }
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
    setDefaultDate({
      start_time: defaultParams.start_time,
      end_time: defaultParams.end_time,
    });
  };

  return (
    <Container>
      <Item>
        <div>抓单订单号：</div>
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
        <div>商品名称：</div>
        <Select
          mode="multiple"
          maxTagCount="responsive"
          style={{ width: "40rem" }}
          allowClear={true}
          onChange={setGoodsName}
          onClear={clearGoodsName}
          placeholder="请选择商品名称"
        >
          {goodsOptions.map(({ id, name }) => (
            <Select.Option key={id} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>商品编码：</div>
        <Input
          style={{ width: "25rem" }}
          value={temporaryParams.goods_sn}
          onChange={setGoodsSn}
          placeholder="请输入商品编码"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>生产号码：</div>
        <Input
          style={{ width: "25rem" }}
          value={temporaryParams.product_no}
          onChange={setProductNo}
          placeholder="请输入生产号码"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>物流单号：</div>
        <Input
          style={{ width: "25rem" }}
          value={temporaryParams.express_sn}
          onChange={setExpressSn}
          placeholder="请输入物流单号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>物流公司：</div>
        <Input
          style={{ width: "25rem" }}
          value={temporaryParams.express_company}
          onChange={setExpressCompany}
          placeholder="请输入物流公司"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>身份证号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.idcard}
          onChange={setIdCard}
          placeholder="请输入身份证号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.concat_phone}
          onChange={setPhone}
          placeholder="请输入手机号"
          allowClear={true}
        />
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
      {menuIdx === 0 ? (
        <Item>
          <div>订单状态：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.status}
            allowClear={true}
            onSelect={setStatus}
            onClear={clearStatus}
            placeholder="请选择订单状态"
          >
            {orderStatusOptions.map(({ text, value }) => (
              <Select.Option key={value} value={value}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </Item>
      ) : (
        <></>
      )}
      <Item style={{ marginRight: "40rem" }}>
        <div>选择时间：</div>
        <Input.Group compact>
          <Select
            style={{ width: "14rem" }}
            value={
              temporaryParams.time_type
                ? Number(temporaryParams.time_type)
                : undefined
            }
            allowClear={true}
            onSelect={setTimeType}
            onClear={clearTimeType}
            placeholder="请选择时间类型"
          >
            {timeTypeOptions.map(({ name, value }) => (
              <Select.Option key={value} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
          <DatePicker.RangePicker
            showTime
            value={
              temporaryParams.start_time
                ? [
                    moment(temporaryParams.start_time),
                    moment(temporaryParams.end_time),
                  ]
                : undefined
            }
            onChange={setDates}
          />
        </Input.Group>
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button type={"primary"} onClick={query}>
          查询
        </Button>
        <Divider style={{ height: "3rem", marginLeft: 0 }} type={"vertical"} />
        <Button
          style={{ marginRight: 0 }}
          onClick={() => exportOrderList(temporaryParams)}
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
