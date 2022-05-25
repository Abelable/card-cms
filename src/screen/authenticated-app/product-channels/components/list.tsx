import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel, modeOption } from "types/product";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import {
  useDownChannel,
  useEditChannelMode,
  useUpChannel,
} from "service/product";
import { useChannelModal, useChannelsQueryKey } from "../util";
import { useNavigate } from "react-router";
import { OperatorOption } from "types/common";

interface ListProps
  extends TableProps<Channel>,
    Omit<SearchPanelProps, "supplierOptions"> {
  operatorOptions: OperatorOption[];
  modeOptions: modeOption[];
  error: Error | unknown;
}

export const List = ({
  error,
  operatorOptions,
  modeOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useChannelModal();
  const { mutate: editChannel } = useEditChannelMode(useChannelsQueryKey());
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });

  const { mutate: upChannel } = useUpChannel(useChannelsQueryKey());
  const confirmUpChannel = (id: number) => {
    Modal.confirm({
      title: "确定上架该产品吗？",
      content: "点击确定上架",
      okText: "确定",
      cancelText: "取消",
      onOk: () => upChannel(String(id)),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <h3>产品列表</h3>
        {params.is_removed === "0" ? (
          <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
            新增
          </Button>
        ) : null}
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
            dataIndex: "name",
          },
          {
            title: "产品编码",
            dataIndex: "encoding",
          },
          {
            title: "运营商",
            dataIndex: "operator_id",
            render: (value) => (
              <span>
                {operatorOptions.find((item) => item.id === value)?.name}
              </span>
            ),
          },
          {
            title: "生产方式",
            render: (value, channel) => (
              <>
                {params.is_removed === "0" ? (
                  <Dropdown
                    trigger={["click"]}
                    overlay={
                      <Menu
                        items={modeOptions.map((item) => ({
                          label: (
                            <span
                              onClick={() =>
                                editChannel({
                                  id: channel.id,
                                  is_auto_product: item.value,
                                })
                              }
                            >
                              {item.name}
                            </span>
                          ),
                          key: item.value,
                        }))}
                      />
                    }
                  >
                    <ButtonNoPadding
                      style={{
                        color:
                          channel.is_auto_product !== undefined
                            ? "#1890ff"
                            : "#999",
                      }}
                      type={"link"}
                      onClick={(e) => e.preventDefault()}
                    >
                      {modeOptions.find(
                        (item) => item.value === channel.is_auto_product
                      )?.name || "选择生产方式"}
                      <DownOutlined />
                    </ButtonNoPadding>
                  </Dropdown>
                ) : (
                  <span>
                    {
                      modeOptions.find(
                        (item) => item.value === channel.is_auto_product
                      )?.name
                    }
                  </span>
                )}
              </>
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
              <>
                {params.is_removed === "0" ? (
                  <More channel={channel} />
                ) : (
                  <Button
                    type="link"
                    onClick={() => confirmUpChannel(channel.id)}
                  >
                    上架
                  </Button>
                )}
              </>
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

const More = ({ channel }: { channel: Channel }) => {
  const navigate = useNavigate();
  const link = (id: number) =>
    navigate(`/product/channels/goods_list?product_id=${id}`);
  const { startEdit } = useChannelModal();
  const { mutate: downChannel } = useDownChannel(useChannelsQueryKey());

  const confirmDownChannel = (id: number) => {
    Modal.confirm({
      title: "确定下架该产品吗？",
      content: "点击确定下架",
      okText: "确定",
      cancelText: "取消",
      onOk: () => downChannel(String(id)),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => startEdit(String(channel.id))}>编辑</span>,
      key: "edit",
    },
    {
      label: <span onClick={() => confirmDownChannel(channel.id)}>下架</span>,
      key: "down",
    },
    {
      label: <span onClick={() => link(channel.id)}>查看关联商品</span>,
      key: "link",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
