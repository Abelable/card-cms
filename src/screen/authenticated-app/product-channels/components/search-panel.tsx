import { useState } from "react";
import { Button, Divider, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { useExportChannels } from "service/product";
import type { ChannelsSearchParams } from "types/product";
import type { SupplierOption } from "types/supplier";

export interface SearchPanelProps {
  supplierOptions: SupplierOption[];
  params: Partial<ChannelsSearchParams>;
  setParams: (params: Partial<ChannelsSearchParams>) => void;
}

export const SearchPanel = ({
  supplierOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    goods_name: "",
    goods_code: "",
    supplier_id: undefined,
  } as Partial<ChannelsSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<ChannelsSearchParams>>(params);

  const exportChannels = useExportChannels();

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
          <div>产品编码：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.goods_code}
            onChange={setGoodsCode}
            placeholder="请输入产品编码"
            allowClear={true}
          />
        </Row>
        <Row>
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
        <Divider style={{ height: "3rem", marginLeft: 0 }} type={"vertical"} />
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => exportChannels(params)}
        >
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
