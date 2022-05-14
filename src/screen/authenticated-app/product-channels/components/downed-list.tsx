import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Modal, Table, TablePaginationConfig, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel, modeOption } from "types/product";
import { ErrorBox, Row } from "components/lib";
import { useDownedChannelsQueryKey } from "../util";
import { useUpChannel } from "service/product";

interface ListProps
  extends TableProps<Channel>,
    Omit<SearchPanelProps, "supplierOptions"> {
  modeOptions: modeOption[];
  error: Error | unknown;
}

export const DownedList = ({
  error,
  modeOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { mutate: upChannel } = useUpChannel(useDownedChannelsQueryKey());
  const confirmUpChannel = (id: number) => {
    Modal.confirm({
      title: "确定上架该产品吗？",
      content: "点击确定上架",
      okText: "确定",
      cancelText: "取消",
      onOk: () => upChannel(String(id)),
    });
  };
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>产品列表</h3>
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
            title: "产品名称",
            dataIndex: "goods_name",
          },
          {
            title: "产品编码",
            dataIndex: "goods_code",
          },
          {
            title: "运营商",
            dataIndex: "supplier",
          },
          {
            title: "生产方式",
            render: (value, channel) => (
              <span>
                {
                  modeOptions.find(
                    (item) => item.value === channel.is_auto_product
                  )?.name
                }
              </span>
            ),
          },
          {
            title: "创建时间",
            dataIndex: "created_at",
            sorter: (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
          },
          {
            title: "操作",
            render: (value, channel) => (
              <span onClick={() => confirmUpChannel(channel.id)}>上架</span>
            ),
            width: "8rem",
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
