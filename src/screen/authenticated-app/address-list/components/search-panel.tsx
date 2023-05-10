import { useState } from "react";
import { Button, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";

import type { RegionOption } from "types/common";
import type { SupplierOption } from "types/supplier";
import type { AddressListSearchParams, ProvinceOpttion } from "types/address";

export interface SearchPanelProps {
  provinceOptions: ProvinceOpttion[];
  supplierOptions: SupplierOption[];
  params: Partial<AddressListSearchParams>;
  setParams: (params: Partial<AddressListSearchParams>) => void;
}

export const SearchPanel = ({
  provinceOptions,
  supplierOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    province_code: undefined,
    city_code: undefined,
    area_code: undefined,
  } as Partial<AddressListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<AddressListSearchParams>>(params);
  const [cityOptions, setCityOptions] = useState<RegionOption[]>([]);
  const [areaOptions, setAreaOptions] = useState<RegionOption[]>([]);

  const setProvinceCode = (province_code: number) => {
    setTemporaryParams({ ...temporaryParams, province_code });
    // const cityOptions =
    //   provincOptions.find((item) => item.id === province_code)?.children || [];
    setCityOptions(cityOptions);
  };
  const clearProvinceCode = () => {
    setTemporaryParams({ ...temporaryParams, province_code: undefined });
    setCityOptions([]);
  };

  const setCityCode = (city_code: number) => {
    setTemporaryParams({ ...temporaryParams, city_code });
    const areaOptions =
      cityOptions.find((item) => item.id === city_code)?.children || [];
    setAreaOptions(areaOptions);
  };
  const clearCityCode = () => {
    setTemporaryParams({ ...temporaryParams, city_code: undefined });
    setCityOptions([]);
  };

  const setAreaCode = (area_code: number) =>
    setTemporaryParams({ ...temporaryParams, area_code });
  const clearAreaCode = () =>
    setTemporaryParams({ ...temporaryParams, area_code: undefined });

  const setSupplier = (supplier_id: number) =>
    setTemporaryParams({ ...temporaryParams, supplier_id });
  const clearSupplier = () =>
    setTemporaryParams({ ...temporaryParams, supplier_id: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container>
      <Item>
        <div>省：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.province_code}
          allowClear={true}
          onSelect={setProvinceCode}
          onClear={clearProvinceCode}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择省"
        >
          {provinceOptions.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>市：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.city_code}
          allowClear={true}
          onSelect={setCityCode}
          onClear={clearCityCode}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择市"
        >
          {cityOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>区：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.area_code}
          allowClear={true}
          onSelect={setAreaCode}
          onClear={clearAreaCode}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择区"
        >
          {areaOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item style={{ marginRight: "30rem" }}>
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
  padding: 2.4rem 0rem 0 2.4rem;
  background: #fff;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
  white-space: nowrap;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
