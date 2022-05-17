import { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { Row } from "components/lib";
import { HomeSearchParams } from "types/home";
import moment from "moment";
import styled from "@emotion/styled";
import { AgentOption } from "types/agent";
import dayjs from "dayjs";

export interface SearchPanelProps {
  agentOptions: AgentOption[];
  params: Partial<HomeSearchParams>;
  setParams: (params: Partial<HomeSearchParams>) => void;
}

export const SearchPanel = ({
  agentOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  const defaultParams = {
    start_created_at: dayjs(date).format("YYYY-MM-DD"),
    end_created_at: dayjs().format("YYYY-MM-DD"),
    agent_id: undefined,
    goods_name: "",
  } as Partial<HomeSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<HomeSearchParams>>(defaultParams);

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_created_at: formatString[0],
      end_created_at: formatString[1],
    });

  const setAgent = (agent_id: number) =>
    setTemporaryParams({ ...temporaryParams, agent_id });
  const clearAgent = () =>
    setTemporaryParams({ ...temporaryParams, agent_id: undefined });

  const setGoodsName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        goods_name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      goods_name: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>注册时间：</div>
          <DatePicker.RangePicker
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
        </Row>
        <Row>
          <div>代理商店铺名称：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.agent_id}
            allowClear={true}
            onSelect={setAgent}
            onClear={clearAgent}
            placeholder="请选择代理商"
          >
            {agentOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row>
          <div>商品名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.goods_name}
            onChange={setGoodsName}
            placeholder="请输入商品名称"
            allowClear={true}
          />
        </Row>
      </Row>
      <Row gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
          查询
        </Button>
        <Button style={{ marginRight: 0 }} type={"primary"} onClick={clear}>
          导出
        </Button>
      </Row>
    </Container>
  );
};

const Container = styled(Row)`
  padding: 2.4rem;
  background: #fff;
`;
