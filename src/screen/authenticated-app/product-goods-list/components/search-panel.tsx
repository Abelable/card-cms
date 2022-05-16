import { useState } from "react";
import { Button, Cascader, Input, Select } from "antd";
import { Row } from "components/lib";
import { GoodsListSearchParams } from "types/product";
import styled from "@emotion/styled";
import { SupplierOption } from "types/supplier";

export interface SearchPanelProps {
  supplierOptions: SupplierOption[];
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

const operatorOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];

const regionOptions = [
  {
    value: "1",
    label: "浙江省",
    children: [
      {
        value: "1",
        label: "杭州市",
        children: [
          {
            value: "1",
            label: "西湖区",
          },
          {
            value: "2",
            label: "上城区",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "江苏省",
    children: [
      {
        value: "1",
        label: "南京市",
        children: [
          {
            value: "1",
            label: "中华门",
          },
        ],
      },
    ],
  },
];

export const SearchPanel = ({
  supplierOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    goods_name: "",
    supplier_id: undefined,
    product_code: "",
    goods_code: "",
    agent_id: undefined,
    deliver_address: "",
    ownership: undefined,
  } as Partial<GoodsListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<GoodsListSearchParams>>(params);

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

  const setProductCode = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        goods_code: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      goods_code: evt.target.value,
    });
  };

  const setGoodsCode = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        goods_code: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      goods_code: evt.target.value,
    });
  };

  const setSupplier = (supplier_id: number) =>
    setTemporaryParams({ ...temporaryParams, supplier_id });
  const clearSupplier = () =>
    setTemporaryParams({ ...temporaryParams, supplier_id: undefined });

  const setOperator = (operator_id: number) =>
    setTemporaryParams({ ...temporaryParams, operator_id });
  const clearOperator = () =>
    setTemporaryParams({ ...temporaryParams, operator_id: undefined });

  const setAddress = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        deliver_address: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      deliver_address: evt.target.value,
    });
  };

  const setOwnership = (ownership: any) =>
    setTemporaryParams({ ...temporaryParams, ownership });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container>
      <Item>
        <div>商品名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.goods_name}
          onChange={setGoodsName}
          placeholder="请输入商品名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>供应商：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.supplier_id}
          allowClear={true}
          onSelect={setSupplier}
          onClear={clearSupplier}
          placeholder="请选择供应商"
        >
          {supplierOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
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
        <div>商品编码：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.goods_code}
          onChange={setGoodsCode}
          placeholder="请输入商品编码"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>运营商：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.operator_id}
          allowClear={true}
          onSelect={setOperator}
          onClear={clearOperator}
          placeholder="请选择运营商"
        >
          {operatorOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>发货地址：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.deliver_address}
          onChange={setAddress}
          placeholder="请输入发货地址"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>归属地：</div>
        <Cascader
          style={{ width: "20rem" }}
          options={regionOptions}
          value={temporaryParams.ownership}
          onChange={setOwnership}
          placeholder="请选择归属地"
        />
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
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
  padding: 2.4rem 16.8rem 0 2.4rem;
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
