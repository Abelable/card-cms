import { Form, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useFlagModal } from "../util";
import { useEditPDDFlag } from "service/order";
import { Option } from "types/order";

export const FlagModal = ({ tagOptions }: { tagOptions: Option[] }) => {
  const [form] = useForm();
  const { flagModalOpen, close } = useFlagModal();
  const { mutateAsync, isLoading, error } = useEditPDDFlag();

  const confirm = () => {
    form.validateFields().then(async () => {
      const { grab_flag, produce_fail_flag, delivery_fail_flag } =
        form.getFieldsValue();
      await mutateAsync({
        grab_flag,
        produce_fail_flag,
        delivery_fail_flag,
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
      title="标旗设置"
      visible={flagModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form}>
        <Form.Item
          name="grab_flag"
          label="抓单标旗"
          rules={[{ required: true, message: "请选择标旗" }]}
        >
          <Select placeholder="请选择标旗">
            {tagOptions.map(({ name, value }) => (
              <Select.Option key={value} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="produce_fail_flag"
          label="生产失败"
          rules={[{ required: true, message: "请选择标旗" }]}
        >
          <Select placeholder="请选择标旗">
            {tagOptions.map(({ name, value }) => (
              <Select.Option key={value} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="delivery_fail_flag"
          label="发货失败"
          rules={[{ required: true, message: "请选择标旗" }]}
        >
          <Select placeholder="请选择标旗">
            {tagOptions.map(({ name, value }) => (
              <Select.Option key={value} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
