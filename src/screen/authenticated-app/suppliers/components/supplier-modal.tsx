import { Form, Input, Modal, Radio } from "antd";
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
    suppliers?.find((item) => item.id === Number(editingSupplierId)) ||
    undefined;
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
        {editingSupplierId ? (
          <></>
        ) : (
          <>
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
            <Form.Item
              name="use_base_liantong_api"
              label="是否需要复制联通代码"
              tooltip="若选择需要：点击确定后，系统将开启'联通代码复制'任务，请于5分钟后再进行操作"
            >
              <Radio.Group>
                <Radio value={0}>不需要</Radio>
                <Radio value={1}>需要</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        <Form.Item name="referrer_code" label="发展人ID">
          <Input placeholder="请输入发展人ID" />
        </Form.Item>
        <Form.Item name="channel" label="触点编码">
          <Input placeholder="请输入触点编码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
