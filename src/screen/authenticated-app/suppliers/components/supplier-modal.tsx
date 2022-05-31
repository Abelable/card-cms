import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddSupplier, useEditSupplier } from "service/supplier";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useSuppliersQueryKey, useSupplierModal } from "../util";
import type { Supplier } from "types/supplier";

export const SupplierModal = ({ suppliers }: { suppliers: Supplier[] }) => {
  const [form] = useForm();
  const { supplierModalOpen, editingSupplierId, close } = useSupplierModal();
  const supplier =
    suppliers?.find((item) => item.id === editingSupplierId) || undefined;
  const useMutationSupplier = editingSupplierId
    ? useEditSupplier
    : useAddSupplier;
  const { mutateAsync, isLoading, error } = useMutationSupplier(
    useSuppliersQueryKey()
  );

  useDeepCompareEffect(() => {
    if (supplier) form.setFieldsValue(supplier);
  }, [supplier, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: editingSupplierId || "",
          ...form.getFieldsValue(),
        })
      );
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingSupplierId ? "编辑供应商信息" : "添加供应商"}
      visible={supplierModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="供应商公司名称"
          rules={[{ required: true, message: "请输入公司名称" }]}
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: "请输入联系电话" }]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
