import { useState } from "react";
import { Button, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { ProductsSearchParams } from "types/order";
import { SupplierOption } from "types/supplier";

export interface SearchPanelProps {
  supplierOptions: SupplierOption[];
  params: Partial<ProductsSearchParams>;
  setParams: (params: Partial<ProductsSearchParams>) => void;
}

export const SearchPanel = ({
  supplierOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    supplier_id: undefined,
  } as Partial<ProductsSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<ProductsSearchParams>>(params);

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
