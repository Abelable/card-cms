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

const statusOptions = [
  { name: "回调正常", value: 10 },
  { name: "回调失败", value: 20 },
  { name: "收单成功", value: 30 },
];

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
        scroll={{ x: 1500 }}
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
            width: "26rem",
          },
          {
            title: "电商店铺",
            dataIndex: "shop_id",
            width: "16rem",
            render: (value) => (
              <>{shopOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "回调地址",
            dataIndex: "callback_url",
          },
          {
            title: "回调状态",
            dataIndex: "status",
            width: "12rem",
            render: (value) => (
              <span style={{ color: value === 20 ? "#ff4d4f" : "#333" }}>
                {statusOptions.find((item) => item.value === value)?.name}
              </span>
            ),
          },
          {
            title: "返回信息",
            render: (value, log) => <>{log.error_msg || log.extra_data}</>,
          },
          {
            title: "回调时间",
            dataIndex: "updated_at",
            width: "22rem",
            render: (value) => (
              <>{dayjs(value).format("YYYY-MM-DD hh:mm:ss")}</>
            ),
            sorter: (a, b) =>
              dayjs(a.updated_at).valueOf() - dayjs(b.updated_at).valueOf(),
          },
          {
            title: "操作",
            fixed: "right",
            width: "8rem",
            render: (value, log) => (
              <>
                {log.status === 20 ? (
                  <ButtonNoPadding type={"link"}>重试</ButtonNoPadding>
                ) : (
                  <></>
                )}
              </>
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
