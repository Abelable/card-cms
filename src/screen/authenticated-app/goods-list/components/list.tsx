import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Goods } from "types/supplier";
import { ErrorBox } from "components/lib";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
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
      <Title>用户列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
          },
          {
            title: "产品名称",
            dataIndex: "name",
          },
          {
            title: "产品编号",
            dataIndex: "code",
          },
          {
            title: "运营商",
            dataIndex: "supplier_name",
          },
          {
            title: "注册时间",
            render: (value, user) => (
              <span>
                {user.created_at
                  ? dayjs(Number(user.created_at) * 1000).format(
                      "YYYY-MM-DD HH:mm"
                    )
                  : "无"}
              </span>
            ),
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
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
