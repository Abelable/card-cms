import { useState } from "react";
import styled from "@emotion/styled";

import { Button, Input } from "antd";
import { Row } from "components/lib";

import type { RuleListSearchParams } from "types/order";

export interface SearchPanelProps {
  params: Partial<RuleListSearchParams>;
  setParams: (params: Partial<RuleListSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    name: undefined,
  } as Partial<RuleListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<RuleListSearchParams>>(defaultParams);

  const setIdCard = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      name: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  const query = () => {
    setParams({
      ...params,
      name: temporaryParams.name,
    });
  };

  return (
    <Container>
      <Item>
        <div>规则名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.name}
          onChange={setIdCard}
          placeholder="请输入规则名称"
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
