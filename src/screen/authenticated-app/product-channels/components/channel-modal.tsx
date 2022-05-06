import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
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
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: "请输入联系电话" }]}
            >
              <Input placeholder="请输入联系电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: "请输入邮箱" }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="activation_days"
              label="激活状态回传的有效天数（自订单创建时起）"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入有效天数"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="recharge_days"
              label="充值金额回传的有效天数（自订单创建时起）"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入有效天数"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
