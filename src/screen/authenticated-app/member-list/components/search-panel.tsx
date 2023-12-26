import { useState } from "react";
import styled from "@emotion/styled";

import { Button, Input } from "antd";
import { Row } from "components/lib";

import type { BlacklistSearchParams } from "types/system";

export interface SearchPanelProps {
  params: Partial<BlacklistSearchParams>;
  setParams: (params: Partial<BlacklistSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    idcard: undefined,
    phone: undefined,
  } as Partial<BlacklistSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<BlacklistSearchParams>>(defaultParams);

  const setIdCard = (evt: any) => {
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
        phone: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      phone: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  const query = () => {
    setParams({
      ...params,
      idcard: temporaryParams.idcard,
      phone: temporaryParams.phone,
    });
  };

  return (
    <Container>
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
        <div>联系电话：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.phone}
          onChange={setPhone}
          placeholder="请输入联系电话"
          allowClear={true}
        />
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
