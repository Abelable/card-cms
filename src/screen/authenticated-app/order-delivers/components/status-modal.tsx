import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditDeliversStatus } from "service/order";
import { useStatusModal, useOrderDeliversQueryKey } from "../util";

const statusOptions = [
  { id: 1, name: "待发货" },
  { id: 2, name: "待收货" },
  { id: 3, name: "已收货" },
];

export const StatusModal = () => {
  const [form] = useForm();
  const { statusModalOpen, editingDeliverIds, close } = useStatusModal();
  const { mutateAsync, isLoading, error } = useEditDeliversStatus(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingDeliverIds || "",
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
        editingDeliverIds && editingDeliverIds.includes(",")
          ? "批量修改状态"
          : "修改状态"
      }
      visible={statusModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="status"
          label="选择状态"
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <Select placeholder="请选择状态">
            {statusOptions.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="reason" label="备注原因">
          <Input.TextArea rows={4} placeholder="请输入原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
