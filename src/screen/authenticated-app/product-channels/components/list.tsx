import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel, modeOption } from "types/product";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useEditChannel } from "service/product";
import { useChannelModal, useChannelsQueryKey } from "../util";

interface ListProps extends TableProps<Channel>, SearchPanelProps {
  modeOptions: modeOption[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const List = ({
  error,
  modeOptions,
  params,
  setParams,
  setSelectedRowKeys,
  ...restProps
}: ListProps) => {
  const { open } = useChannelModal();
  const { mutate: editChannel } = useEditChannel(useChannelsQueryKey());
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
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
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
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu
                    items={modeOptions.map((item) => ({
                      label: (
                        <span
                          onClick={() =>
                            editChannel({ id: channel.id, mode: item.id })
                          }
                        >
                          {item.name}
                        </span>
                      ),
                      key: item.id,
                    }))}
                  />
                }
              >
                <ButtonNoPadding
                  style={{ color: channel.mode ? "#1890ff" : "#999" }}
                  type={"link"}
                  onClick={(e) => e.preventDefault()}
                >
                  {modeOptions.find((item) => item.id === channel.mode)?.name ||
                    "选择等级名称"}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
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

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
