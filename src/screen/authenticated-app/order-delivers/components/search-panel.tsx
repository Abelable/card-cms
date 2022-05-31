import { useState } from "react";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import moment from "moment";
import { useExportModal } from "../util";
import type { DeliversSearchParams, OrderStatusOption } from "types/order";
import type { AgentOption } from "types/agent";

export interface SearchPanelProps {
  agentOptions: AgentOption[];
  orderStatusOptions: OrderStatusOption[];
  params: Partial<DeliversSearchParams>;
  setParams: (params: Partial<DeliversSearchParams>) => void;
}

const rechargeOptions = [
  { name: "未充值", value: 0 },
  { name: "已充值", value: 1 },
];
const activateOptions = [
  { name: "未激活", value: 0 },
  { name: "已激活", value: 1 },
];
const timeTypeOptions = [
  { name: "平台创建时间", value: 1 },
  { name: "订单激活时间", value: 2 },
];

export const SearchPanel = ({
  agentOptions,
  orderStatusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    product_name: "",
    product_code: "",
    order_id: "",
    out_order_id: "",
    order_status: undefined,
    id_number: "",
    express_code: "",
    production_number: "",
    phone: "",
    is_recharged: undefined,
    is_activated: undefined,
    agent_id: undefined,
    time_type: undefined,
    start_time: "",
    end_time: "",
  } as Partial<DeliversSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<DeliversSearchParams>>(params);

  const { open: openExportModal } = useExportModal();

  const setProductName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        product_name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      product_name: evt.target.value,
    });
  };

  const setProductCode = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        product_code: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      product_code: evt.target.value,
    });
  };

  const setOrderId = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        order_id: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      order_id: evt.target.value,
    });
  };

  const setOutOrderId = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        out_order_id: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      out_order_id: evt.target.value,
    });
  };

  const setOrderStatus = (order_status: number) =>
    setTemporaryParams({ ...temporaryParams, order_status });
  const clearOrderStatus = () =>
    setTemporaryParams({ ...temporaryParams, order_status: undefined });

  const setIdNumber = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        id_number: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      id_number: evt.target.value,
    });
  };

  const setExpressCode = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        express_code: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      express_code: evt.target.value,
    });
  };

  const setProductionNumber = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        production_number: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      production_number: evt.target.value,
    });
  };

  const setPhone = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        phone: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      phone: evt.target.value,
    });
  };

  const setIsRecharge = (is_recharged: number) =>
    setTemporaryParams({ ...temporaryParams, is_recharged });
  const clearIsRecharge = () =>
    setTemporaryParams({ ...temporaryParams, is_recharged: undefined });

  const setIsActivated = (is_activated: number) =>
    setTemporaryParams({ ...temporaryParams, is_activated });
  const clearIsActivated = () =>
    setTemporaryParams({ ...temporaryParams, is_activated: undefined });

  // const setUpperOrderId = (evt: any) => {
  //   // onInputClear
  //   if (!evt.target.value && evt.type !== "change") {
  //     setTemporaryParams({
  //       ...temporaryParams,
  //       upper_order_id: "",
  //     });
  //     return;
  //   }

  //   setTemporaryParams({
  //     ...temporaryParams,
  //     upper_order_id: evt.target.value,
  //   });
  // };

  const setAgent = (agent_id: number) =>
    setTemporaryParams({ ...temporaryParams, agent_id });
  const clearAgent = () =>
    setTemporaryParams({ ...temporaryParams, agent_id: undefined });

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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container>
      <Item>
        <div>产品名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.product_name}
          onChange={setProductName}
          placeholder="请输入产品名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>产品编码：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.product_code}
          onChange={setProductCode}
          placeholder="请输入产品编码"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>订单id：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.order_id}
          onChange={setOrderId}
          placeholder="请输入订单id"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>外部订单id：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.out_order_id}
          onChange={setOutOrderId}
          placeholder="请输入外部订单id"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>订单状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.order_status}
          allowClear={true}
          onSelect={setOrderStatus}
          onClear={clearOrderStatus}
          placeholder="请选择订单状态"
        >
          {orderStatusOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>身份证号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.id_number}
          onChange={setIdNumber}
          placeholder="请输入身份证号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>物流单号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.express_code}
          onChange={setExpressCode}
          placeholder="请输入物流单号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>生产号码：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.production_number}
          onChange={setProductionNumber}
          placeholder="请输入生产号码"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.phone}
          onChange={setPhone}
          placeholder="请输入手机号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>是否充值：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.is_recharged}
          allowClear={true}
          onSelect={setIsRecharge}
          onClear={clearIsRecharge}
          placeholder="请选择是否充值"
        >
          {rechargeOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>是否激活：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.is_activated}
          allowClear={true}
          onSelect={setIsActivated}
          onClear={clearIsActivated}
          placeholder="请选择是否充值"
        >
          {activateOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      {/* <Item>
        <div>上游订单id：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.upper_order_id}
          onChange={setUpperOrderId}
          placeholder="请输入上游订单id"
          allowClear={true}
        />
      </Item> */}
      <Item>
        <div>代理商：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.agent_id}
          allowClear={true}
          onSelect={setAgent}
          onClear={clearAgent}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择代理商"
        >
          {agentOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>选择时间：</div>
        <Input.Group compact>
          <Select
            style={{ width: "14rem" }}
            value={temporaryParams.time_type}
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
        <Button
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
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
