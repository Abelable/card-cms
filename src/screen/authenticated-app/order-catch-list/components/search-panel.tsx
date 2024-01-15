import { useState } from "react";
import { Button, Cascader, Input, Select } from "antd";
import { Row } from "components/lib";
import { GoodsListSearchParams } from "types/product";
import styled from "@emotion/styled";
import type { SupplierOption } from "types/supplier";
import type { OperatorOption, RegionOption } from "types/common";

export interface SearchPanelProps {
  operatorOptions: OperatorOption[];
  regionOptions: RegionOption[] | undefined;
  supplierOptions: SupplierOption[];
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

export const SearchPanel = ({
  operatorOptions,
  regionOptions,
  supplierOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    goods_name: "",
    supplier_id: undefined,
    product_code: "",
    goods_code: "",
    operator_id: undefined,
    ship_province_id: undefined,
    ship_city_id: undefined,
    province_id: undefined,
    city_id: undefined,
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
        product_code: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      product_code: evt.target.value,
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

  const setAddress = (deliver_address: any) =>
    deliver_address &&
    setTemporaryParams({
      ...temporaryParams,
      ship_province_id: deliver_address[0],
      ship_city_id: deliver_address[1],
    });
  const clearAddress = () =>
    setTemporaryParams({
      ...temporaryParams,
      ship_province_id: undefined,
      ship_city_id: undefined,
    });

  const setOwnership = (ownership: any) =>
    ownership &&
    setTemporaryParams({
      ...temporaryParams,
      province_id: ownership[0],
      city_id: ownership[1],
    });
  const clearOwnership = () =>
    setTemporaryParams({
      ...temporaryParams,
      province_id: undefined,
      city_id: undefined,
    });

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
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
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
      {params.is_removed === "0" ? (
        <>
          <Item>
            <div>运营商：</div>
            <Select
              style={{ width: "20rem" }}
              value={temporaryParams.operator_id}
              allowClear={true}
              onSelect={setOperator}
              onClear={clearOperator}
              showSearch
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
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
            <Cascader
              style={{ width: "20rem" }}
              fieldNames={{ label: "name", value: "id" }}
              options={regionOptions}
              value={
                temporaryParams.ship_province_id
                  ? [
                      Number(temporaryParams.ship_province_id),
                      Number(temporaryParams.ship_city_id),
                    ]
                  : undefined
              }
              onChange={setAddress}
              onClear={clearAddress}
              placeholder="请选择发货地址"
            />
          </Item>
          <Item>
            <div>归属地：</div>
            <Cascader
              style={{ width: "20rem" }}
              fieldNames={{ label: "name", value: "id" }}
              options={regionOptions}
              value={
                temporaryParams.province_id
                  ? [
                      Number(temporaryParams.province_id),
                      Number(temporaryParams.city_id),
                    ]
                  : undefined
              }
              onChange={setOwnership}
              onClear={clearOwnership}
              placeholder="请选择归属地"
            />
          </Item>
        </>
      ) : (
        <></>
      )}
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
