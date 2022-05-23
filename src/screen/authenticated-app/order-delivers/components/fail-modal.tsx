import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDeliversStatus } from "service/order";
import { useFailModal, useOrderDeliversQueryKey } from "../util";

export const FailModal = () => {
  const [form] = useForm();
  const { failModalOpen, failDeliverIds, close } = useFailModal();
  const { mutateAsync, isLoading, error } = useEditDeliversStatus(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: failDeliverIds || "",
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
      title={"标记为生产失败"}
      visible={failModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label="备注原因"
          rules={[{ required: true, message: "请输入具体原因" }]}
        >
          <Input placeholder="请输入具体原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
