import { useState } from "react";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import { HomeSearchParams } from "types/home";
import moment from "moment";
import styled from "@emotion/styled";

export interface SearchPanelProps {
  params: Partial<HomeSearchParams>;
  setParams: (params: Partial<HomeSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    s_time: "",
    e_time: "",
    nickname: "",
  } as Partial<HomeSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<HomeSearchParams>>(params);

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      s_time: formatString[0],
      e_time: formatString[1],
    });

  const setShopName = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        shop_name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      shop_name: evt.target.value,
    });
  };

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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>注册时间：</div>
          <DatePicker.RangePicker
            value={
              temporaryParams.s_time
                ? [
                    moment(temporaryParams.s_time),
                    moment(temporaryParams.e_time),
                  ]
                : undefined
            }
            onChange={setDates}
          />
        </Row>
        <Row>
          <div>代理商店铺名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.shop_name}
            onChange={setShopName}
            placeholder="请输入代理商店铺名称"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>商品名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.goods_name}
            onChange={setGoodsName}
            placeholder="请输入商品名称"
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
