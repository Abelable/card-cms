import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { Agent, AgentsSearchParams } from "types/product";
import { ErrorBox } from "components/lib";

interface ListProps extends TableProps<Agent> {
  params: Partial<AgentsSearchParams>;
  setParams: (params: Partial<AgentsSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Title>999商品的代理商</Title>
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
            title: "可见该商品的分销商",
            dataIndex: "distributor_name",
          },
          {
            title: "联系电话",
            dataIndex: "phone",
          },
          {
            title: "是否已上架",
            render: (value, agent) => (
              <span>{agent.status === 1 ? "上架中" : "已下架"}</span>
            ),
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
