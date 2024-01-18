import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import dayjs from "dayjs";

import type { Log, ShopOption } from "types/order";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Log>, SearchPanelProps {
  shopOptions: ShopOption[];
  error: Error | unknown;
}

export const List = ({
  shopOptions,
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
      <Header between={true}>
        <h3>回调记录</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
            sorter: (a, b) => Number(a.id) - Number(b.id),
          },
          {
            title: "电商订单号",
            dataIndex: "tag_sn",
          },
          {
            title: "回调地址",
            dataIndex: "callback_url",
          },
          {
            title: "回调状态",
            dataIndex: "error_msg",
            render: (value) => (
              <>
                {!value ? (
                  "正常"
                ) : (
                  <span style={{ color: "#ff4d4f" }}>回调失败</span>
                )}
              </>
            ),
          },
          {
            title: "返回信息",
            render: (value, log) => <>{log.error_msg || log.extra_data}</>,
          },
          {
            title: "回调时间",
            dataIndex: "updated_at",
            sorter: (a, b) =>
              dayjs(a.updated_at).valueOf() - dayjs(b.updated_at).valueOf(),
          },
          {
            title: "操作",
            width: "8rem",
            render: (value, log) => (
              <ButtonNoPadding type={"link"}>重试</ButtonNoPadding>
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

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
