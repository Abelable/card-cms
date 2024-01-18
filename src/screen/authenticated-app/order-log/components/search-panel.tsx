import { useState } from "react";
import styled from "@emotion/styled";

import { Button, Input, Select } from "antd";
import { Row } from "components/lib";

import type { LogListSearchParams } from "types/order";

export interface SearchPanelProps {
  params: Partial<LogListSearchParams>;
  setParams: (params: Partial<LogListSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    status: undefined,
    tag_sn: "",
  } as Partial<LogListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<LogListSearchParams>>(defaultParams);

  const setStatus = (status: number) =>
    setTemporaryParams({
      ...temporaryParams,
      status,
    });
  const clearStatus = () =>
    setTemporaryParams({ ...temporaryParams, status: undefined });

  const setTagSN = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        tag_sn: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      tag_sn: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  const query = () => {
    setParams({
      ...params,
      tag_sn: temporaryParams.tag_sn,
    });
  };

  return (
    <Container>
      <Item>
        <div>电商订单号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.tag_sn}
          onChange={setTagSN}
          placeholder="请输入电商订单号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>回调状态：</div>
        <Select
          style={{ width: "20rem" }}
          allowClear={true}
          onChange={setStatus}
          onClear={clearStatus}
          placeholder="请选择产品名称"
        >
          {[
            { value: 10, lable: "正常" },
            { value: 20, lable: "回调失败" },
          ].map(({ value, lable }) => (
            <Select.Option key={value} value={value}>
              {lable}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button style={{ marginRight: 0 }} type={"primary"} onClick={query}>
          查询
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
  padding: 2.4rem 22rem 0 2.4rem;
  background: #fff;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
