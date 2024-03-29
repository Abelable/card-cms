import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useShopListQueryKey, useApplyModal } from "../util";
import { useApplyShop } from "service/order";

export const ApplyModal = ({ shop_type }: { shop_type: string }) => {
  const [form] = useForm();
  const { shopApplyModalOpen, close } = useApplyModal();
  const { mutateAsync, isLoading, error } = useApplyShop(useShopListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      const { shop_name } = form.getFieldsValue();
      await mutateAsync({
        shop_type,
        shop_name,
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
      title="申请添加店铺"
      visible={shopApplyModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
      okText="提交申请"
    >
      <ErrorBox error={error} />
      <Form form={form}>
        <Form.Item
          name="shop_name"
          label="店铺名称"
          rules={[{ required: true, message: "请输入店铺名称" }]}
        >
          <Input placeholder="请输入店铺名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
