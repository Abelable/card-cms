import { Form, Modal, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDeliverSimple } from "service/order";
import { useBlackModal, useOrderDeliversQueryKey } from "../util";

export const BlackModal = () => {
  const [form] = useForm();
  const { blackModalOpen, close } = useBlackModal();
  const { mutateAsync, isLoading, error } = useEditDeliverSimple(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={"添加黑名单"}
      visible={blackModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="remark"
          label="备注原因"
          rules={[{ required: true, message: "请输入具体原因" }]}
        >
          <Checkbox.Group>
            <Checkbox value="A" style={{ lineHeight: "32px" }}>
              A
            </Checkbox>
            <Checkbox value="A" style={{ lineHeight: "32px" }}>
              A
            </Checkbox>
            <Checkbox value="A" style={{ lineHeight: "32px" }}>
              A
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
