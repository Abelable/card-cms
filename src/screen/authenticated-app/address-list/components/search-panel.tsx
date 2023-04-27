import { useState } from "react";
import { Button, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";

import type { RegionOption } from "types/common";
import type { AddressListSearchParams } from "types/address";

export interface SearchPanelProps {
  regionOptions: RegionOption[];
  params: Partial<AddressListSearchParams>;
  setParams: (params: Partial<AddressListSearchParams>) => void;
}

export const SearchPanel = ({
  regionOptions,
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
    const cityOptions =
      regionOptions.find((item) => item.id === province_code)?.children || [];
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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
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
            {regionOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row>
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
        </Row>
        <Row>
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
