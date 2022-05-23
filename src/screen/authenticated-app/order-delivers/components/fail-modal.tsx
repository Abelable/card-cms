import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDelivers } from "service/order";
import { useFailModal, useOrderDeliversQueryKey } from "../util";

export const FailModal = () => {
  const [form] = useForm();
  const { failModalOpen, failDeliverIds, close } = useFailModal();
  const { mutateAsync, isLoading, error } = useEditDelivers(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      const { product_failed_reason } = form.getFieldsValue();
      await mutateAsync({
        ids: failDeliverIds.split(","),
        status: 3,
        product_failed_reason,
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
          name="product_failed_reason"
          label="备注原因"
          rules={[{ required: true, message: "请输入具体原因" }]}
        >
          <Input placeholder="请输入具体原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
