import { Cascader, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDeliversStatus } from "service/order";
import { useInfoModal, useOrderDeliversQueryKey } from "../util";

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
          {
            value: "2",
            label: "上城区",
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

export const InfoModal = () => {
  const [form] = useForm();
  const { infoModalOpen, infoDeliverId, close } = useInfoModal();
  const { mutateAsync, isLoading, error } = useEditDeliversStatus(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: infoDeliverId || "",
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={"修改订单信息"}
      visible={infoModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="consignee_name"
          label="收货人姓名"
          rules={[{ required: true, message: "请输入收货人姓名" }]}
        >
          <Input placeholder="请输入收货人姓名" />
        </Form.Item>
        <Form.Item
          name="id_card_name"
          label="身份证姓名"
          rules={[{ required: true, message: "请输入身份证姓名" }]}
        >
          <Input placeholder="请输入身份证姓名" />
        </Form.Item>
        <Form.Item
          name="id_card_code"
          label="身份证号"
          rules={[{ required: true, message: "请输入身份证号" }]}
        >
          <Input placeholder="请输入身份证号" />
        </Form.Item>
        <Form.Item
          name="consignee_phone"
          label="联系电话"
          rules={[{ required: true, message: "请输入联系电话" }]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item
          name="address_region"
          label="收货地址"
          rules={[{ required: true, message: "请选择收货地址" }]}
        >
          <Cascader options={regionOptions} placeholder="请选择收货地址" />
        </Form.Item>
        <Form.Item
          name="address_detail"
          label="详细地址"
          rules={[{ required: true, message: "请输入详细地址" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入详细地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
