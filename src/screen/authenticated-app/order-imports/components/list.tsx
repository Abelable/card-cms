import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import dayjs from "dayjs";
import { ImportsSearchParams, Import } from "types/order";

interface ListProps extends TableProps<Import> {
  params: Partial<ImportsSearchParams>;
  setParams: (params: Partial<ImportsSearchParams>) => void;
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
      <Header between={true}>
        <h3>导入记录列表</h3>
      </Header>
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
            title: "导入日期",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
          },
          {
            title: "导入订单数",
            dataIndex: "order_number",
            sorter: (a, b) => Number(a.order_number) - Number(b.order_number),
          },
          {
            title: "导入照片压缩包次数",
            dataIndex: "pic_number",
            sorter: (a, b) => Number(a.pic_number) - Number(b.pic_number),
          },
          {
            title: "已匹配照片订单数（包含不需要照片的订单数）",
            dataIndex: "matching_pic_number",
            sorter: (a, b) =>
              Number(a.matching_pic_number) - Number(b.matching_pic_number),
          },
          {
            title: "未匹配照片订单数",
            dataIndex: "unmatching_pic_number",
            sorter: (a, b) =>
              Number(a.unmatching_pic_number) - Number(b.unmatching_pic_number),
          },
          {
            title: "照片人工审核失败",
            dataIndex: "fail_number",
            sorter: (a, b) => Number(a.fail_number) - Number(b.fail_number),
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