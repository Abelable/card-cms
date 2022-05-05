import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel } from "types/product";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useEditChannel } from "service/product";
import { useChannelModal, useChannelsQueryKey } from "../util";

interface ListProps extends TableProps<Channel>, SearchPanelProps {
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const List = ({
  error,
  params,
  setParams,
  setSelectedRowKeys,
  ...restProps
}: ListProps) => {
  const { open } = useChannelModal();
  const { mutate: editChannel } = useEditChannel(useChannelsQueryKey());

  return (
    <Container>
      <Header between={true}>
        <h3>代理商列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        pagination={false}
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
                    items={[
                      { id: 1, name: "手动生产" },
                      { id: 2, name: "自动生产" },
                    ].map((item) => ({
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
                  {channel.mode || "选择等级名称"}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
            ),
            width: "18rem",
          },
          {
            title: "创建时间",
            render: (value, data) => (
              <span>
                {data.created_at
                  ? dayjs(Number(data.created_at) * 1000).format("YYYY-MM-DD")
                  : ""}
              </span>
            ),
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
        ]}
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
