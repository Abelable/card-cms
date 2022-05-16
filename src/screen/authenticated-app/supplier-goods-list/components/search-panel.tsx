import { useState } from "react";
import { Button, Input } from "antd";
import { Row } from "components/lib";
import { GoodsListSearchParams } from "types/supplier";
import styled from "@emotion/styled";

export interface SearchPanelProps {
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    goods_name: "",
    supplier_name: "",
  } as Partial<GoodsListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<GoodsListSearchParams>>(params);

  const setGoodsName = (evt: any) => {
    // onInputClear
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

  const setSupplierName = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        supplier_name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      supplier_name: evt.target.value,
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
          <div>产品名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.goods_name}
            onChange={setGoodsName}
            placeholder="请输入产品名称"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>供应商：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.supplier_name}
            onChange={setSupplierName}
            placeholder="请输入供应商名称"
            allowClear={true}
          />
        </Row>
      </Row>
      <Row gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
          查询
        </Button>
      </Row>
    </Container>
  );
};

const Container = styled(Row)`
  padding: 2.4rem;
  background: #fff;
`;
