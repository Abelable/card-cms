import { Form, Modal, Select } from "antd";
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
      title={
        failDeliverIds && failDeliverIds.includes(",")
          ? "批量标记失败"
          : "标记为生产失败"
      }
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
          <Select mode="tags" placeholder="输入后回车生成原因">
            {["手持照片不清晰", "手持照片不完整"].map((item) => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
