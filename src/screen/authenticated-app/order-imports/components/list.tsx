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
            title: "导入日期",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
          },
          {
            title: "导入订单数",
            dataIndex: "import_order_num",
            sorter: (a, b) =>
              Number(a.import_order_num) - Number(b.import_order_num),
          },
          {
            title: "导入照片压缩包次数",
            dataIndex: "import_order_photo_num",
            sorter: (a, b) =>
              Number(a.import_order_photo_num) -
              Number(b.import_order_photo_num),
          },
          {
            title: "已匹配照片订单数（包含不需要照片的订单数）",
            dataIndex: "matched_photo_order_num",
            sorter: (a, b) =>
              Number(a.matched_photo_order_num) -
              Number(b.matched_photo_order_num),
          },
          {
            title: "未匹配照片订单数",
            dataIndex: "unmatched_photo_order_num",
            sorter: (a, b) =>
              Number(a.unmatched_photo_order_num) -
              Number(b.unmatched_photo_order_num),
          },
          {
            title: "照片人工审核失败",
            dataIndex: "photo_review_num",
            sorter: (a, b) =>
              Number(a.photo_review_num) - Number(b.photo_review_num),
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
