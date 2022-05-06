import {
  Button,
  Cascader,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { useChannelModal, useChannelsQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Channel } from "types/product";
import { useAddChannel, useEditChannel } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import styled from "@emotion/styled";

const operatorOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];
const supplierOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];
const regionOptions = [
  {
    value: "1",
    label: "浙江省",
    children: [
      {
        value: "1",
        label: "杭州市",
        children: [
          {
            value: "1",
            label: "西湖区",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "江苏省",
    children: [
      {
        value: "1",
        label: "南京市",
        children: [
          {
            value: "1",
            label: "中华门",
          },
        ],
      },
    ],
  },
];

export const ChannelModal = ({ channels }: { channels: Channel[] }) => {
  const [form] = useForm();

  const { channelModalOpen, editingChannelId, close } = useChannelModal();
  const channel =
    channels?.find((item) => item.id === Number(editingChannelId)) || undefined;

  const useMutationChannel = editingChannelId ? useEditChannel : useAddChannel;
  const { mutateAsync, error, isLoading } = useMutationChannel(
    useChannelsQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: editingChannelId || "",
          ...form.getFieldsValue(),
        })
      );
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    channel && form.setFieldsValue(channel);
  }, [form, channel]);

  return (
    <Drawer
      title={editingChannelId ? "修改基础产品信息" : "定义基础产品信息"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={channelModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="operator_id"
              label="运营商"
              rules={[{ required: true, message: "请选择运营商" }]}
            >
              <Select placeholder="请选择运营商">
                {operatorOptions.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="supplier_id"
              label="供应商"
              rules={[{ required: true, message: "请选择供应商" }]}
            >
              <Select placeholder="请选择供应商">
                {supplierOptions.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="goods_name"
              label="产品名称"
              rules={[{ required: true, message: "请输入产品名称" }]}
            >
              <Input placeholder="请输入产品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goods_code"
              label="产品编码"
              rules={[{ required: true, message: "请输入产品编码" }]}
            >
              <Input placeholder="请输入产品编码" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ownership"
              label="归属地"
              rules={[{ required: true, message: "请选择归属地" }]}
            >
              <Cascader options={regionOptions} placeholder="请选择归属地" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="生产定义" required>
          <Wrap>
            <Form.Item name="need_id_number" style={{ marginBottom: "1rem" }}>
              <span style={{ marginRight: "2rem" }}>是否需要身份证号码：</span>
              <Radio.Group defaultValue={0}>
                <Radio value={0}>不需要</Radio>
                <Radio value={1}>需要</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="need_id_card_pic" style={{ marginBottom: 0 }}>
              <span style={{ marginRight: "2rem" }}>是否需要身份证照片：</span>
              <Radio.Group defaultValue={0}>
                <Radio value={0}>不需要</Radio>
                <Radio value={1}>需要</Radio>
              </Radio.Group>
            </Form.Item>
          </Wrap>
        </Form.Item>
        <Form.Item label="限制条件">
          <Wrap>
            <Form.Item
              name="deliver_area_type"
              style={{ marginBottom: "1rem" }}
            >
              <Radio.Group defaultValue={1}>
                <Space direction="vertical">
                  <Radio value={1}>
                    <Form.Item
                      name="deliver_area"
                      style={{ marginBottom: "1rem" }}
                    >
                      <AddressWrap>
                        <span style={{ marginRight: "2rem" }}>
                          不发货地址：
                        </span>
                        <Cascader
                          options={regionOptions}
                          placeholder="请选择地址"
                        />
                      </AddressWrap>
                    </Form.Item>
                  </Radio>
                  <Radio value={2}>
                    <Form.Item name="deliver_area">
                      <AddressWrap>
                        <span style={{ marginRight: "2rem" }}>
                          只发货地址：
                        </span>
                        <Cascader
                          options={regionOptions}
                          placeholder="请选择地址"
                        />
                      </AddressWrap>
                    </Form.Item>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Wrap>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Wrap = styled.div`
  padding: 2.4rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
`;
const AddressWrap = styled.div`
  display: flex;
  align-items: center;
  width: 50rem;
  white-space: nowrap;
`;
