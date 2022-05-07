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
  Image,
} from "antd";
import { SearchPanelProps } from "./search-panel";
import { Channel, modeOption } from "types/product";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useDownChannel, useEditChannel } from "service/product";
import { useChannelModal, useChannelsQueryKey } from "../util";
import { useNavigate } from "react-router";

interface ListProps extends TableProps<Channel>, SearchPanelProps {
  modeOptions: modeOption[];
  error: Error | unknown;
}

export const List = ({
  error,
  modeOptions,
  params,
  setParams,
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
        <h3>商品列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "商品名称",
            render: (value, goods) => (
              <div style={{ display: "flex" }}>
                <Image width={80} height={80} src={goods.img} />
                <GoodsInfoWrap>
                  <div style={{ marginBottom: "1rem" }}>{goods.name}</div>
                  {goods.tags ? (
                    goods.tags.map((item, index) => (
                      <Tag key={index}>{item}</Tag>
                    ))
                  ) : (
                    <></>
                  )}
                </GoodsInfoWrap>
              </div>
            ),
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
          {
            title: "操作",
            render(value, channel) {
              return <More channel={channel} />;
            },
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
  const link = (id: number) => navigate(`/channels/goods_list?id=${id}`);
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
      key: "delete",
    },
    {
      label: <span onClick={() => link(channel.id)}>查看分销商品</span>,
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

const GoodsInfoWrap = styled.div`
  margin-left: 2rem;
  flex: 1;
  height: 80px;
`;
