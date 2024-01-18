import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";
import { Table, TablePaginationConfig, TableProps } from "antd";
import dayjs from "dayjs";

import type { SearchPanelProps } from "./search-panel";
import type { OperatorOption } from "types/common";
import type { Goods } from "types/supplier";

interface ListProps
  extends TableProps<Goods>,
    Omit<SearchPanelProps, "channelOptions" | "supplierOptions"> {
  operatorOptions: OperatorOption[];
  error: Error | unknown;
}

export const List = ({
  operatorOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Title>产品列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "产品名称",
            dataIndex: "name",
          },
          {
            title: "产品编号",
            dataIndex: "encoding",
          },
          {
            title: "运营商",
            dataIndex: "operator_id",
            render: (value) => (
              <>{operatorOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "创建时间",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;
