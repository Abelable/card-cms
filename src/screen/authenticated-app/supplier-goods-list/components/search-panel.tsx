import { useState } from "react";
import { Button, Select } from "antd";
import { Row } from "components/lib";
import { GoodsListSearchParams } from "types/supplier";
import styled from "@emotion/styled";
import { useSupplierOptions } from "service/supplier";
import { useChannelOptions } from "service/product";

export interface SearchPanelProps {
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    goods_name: undefined,
    supplier_id: undefined,
  } as Partial<GoodsListSearchParams>;
  const channelOptions = useChannelOptions();
  const supplierOptions = useSupplierOptions();

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<GoodsListSearchParams>>(params);

  const setGoodsName = (goods_name: string) =>
    setTemporaryParams({ ...temporaryParams, goods_name });
  const clearGoodsName = () =>
    setTemporaryParams({ ...temporaryParams, goods_name: undefined });

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
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.goods_name}
            allowClear={true}
            onSelect={setGoodsName}
            onClear={clearGoodsName}
            showSearch
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择产品"
          >
            {channelOptions.map(({ id, name }) => (
              <Select.Option key={id} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row>
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
