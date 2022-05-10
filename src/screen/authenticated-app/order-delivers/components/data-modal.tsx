import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDeliversStatus } from "service/order";
import { useDataModal, useOrderDeliversQueryKey } from "../util";

const expressOptions = [
  { id: 1, name: "圆通" },
  { id: 2, name: "申通" },
  { id: 3, name: "中通" },
];

export const DataModal = () => {
  const [form] = useForm();
  const { dataModalOpen, dataDeliverId, close } = useDataModal();
  const { mutateAsync, isLoading, error } = useEditDeliversStatus(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: dataDeliverId || "",
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
      title={"录入生产数据"}
      visible={dataModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="production_number"
          label="生产号码"
          rules={[{ required: true, message: "请输入生产号码" }]}
        >
          <Input placeholder="请输入生产号码" />
        </Form.Item>
        <Form.Item
          name="express_company"
          label="物流公司"
          rules={[{ required: true, message: "请选择物流公司" }]}
        >
          <Select placeholder="请选择物流公司">
            {expressOptions.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="express_code"
          label="运单号"
          rules={[{ required: true, message: "请输入运单号" }]}
        >
          <Input placeholder="请输入运单号" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
