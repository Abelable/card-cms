import { toNumber } from "utils";
import { useGoodsList, useDownedGoodsList } from "service/product";
import {
  useGoodsListSearchParams,
  useDownedGoodsListSearchParams,
} from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { DownedList } from "./components/downed-list";
import { DownedSearchPanel } from "./components/downed-search-panel";
import { GoodsModal } from "./components/goods-modal";

const modeOptions = [
  { id: 1, name: "手动生产" },
  { id: 2, name: "自动生产" },
];

export const ProductGoods = () => {
  const [type, setType] = useState("0");
  const [params, setParams] = useGoodsListSearchParams();
  const [downedParams, setDownedParams] = useDownedGoodsListSearchParams();
  const { data, isLoading, error } = useGoodsList(params);
  const {
    data: downedData,
    isLoading: downedLoading,
    error: downedError,
  } = useDownedGoodsList(downedParams);

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => setType("0")}>销售中的商品</span>,
      key: "0",
    },
    {
      label: <span onClick={() => setType("1")}>已下架的商品</span>,
      key: "1",
    },
  ];

  return (
    <Container>
      <TypeMenu>
        <Menu mode="horizontal" selectedKeys={[type]} items={items} />
      </TypeMenu>
      <Main>
        {type === "0" ? (
          <>
            <SearchPanel params={params} setParams={setParams} />
            <List
              error={error}
              modeOptions={modeOptions}
              params={params}
              setParams={setParams}
              dataSource={data?.data}
              loading={isLoading}
              pagination={{
                current: toNumber(data?.meta.pagination.current_page),
                pageSize: toNumber(data?.meta.pagination.per_page),
                total: toNumber(data?.meta.pagination.total),
              }}
            />
          </>
        ) : (
          <>
            <DownedSearchPanel
              params={downedParams}
              setParams={setDownedParams}
            />
            <DownedList
              error={downedError}
              modeOptions={modeOptions}
              params={downedParams}
              setParams={setDownedParams}
              dataSource={downedData?.data}
              loading={downedLoading}
              pagination={{
                current: toNumber(downedData?.meta.pagination.current_page),
                pageSize: toNumber(downedData?.meta.pagination.per_page),
                total: toNumber(downedData?.meta.pagination.total),
              }}
            />
          </>
        )}
      </Main>
      <GoodsModal goodsList={data?.data || []} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const TypeMenu = styled.div`
  background: #fff;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;