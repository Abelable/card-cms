import { Form, Modal, Button, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useAddRole, useEditRole } from "service/role";
import { useRoleListQueryKey, useRoleModal } from "../util";
import type { RoleItem } from "types/role";

export const RoleModal = ({ roleList }: { roleList: RoleItem[] }) => {
  const [form] = useForm();
  const { roleModalOpen, editingRoleId, close } = useRoleModal();
  const role =
    roleList?.find((item) => item.id === Number(editingRoleId)) || undefined;
  const useMutationRole = editingRoleId ? useEditRole : useAddRole;
  const { mutateAsync, isLoading, error } = useMutationRole(
    useRoleListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (role) {
      const { name, desc } = role;
      form.setFieldsValue({ name, desc });
    }
  }, [role, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingRoleId || "",
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
      title={editingRoleId ? "编辑岗位" : "添加岗位"}
      onCancel={closeModal}
      visible={roleModalOpen}
      confirmLoading={isLoading}
      footer={
        <>
          <Button onClick={closeModal}>取消</Button>
          <Button type={"primary"} onClick={() => confirm()}>
            确定
          </Button>
        </>
      }
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="岗位名称"
          rules={[{ required: true, message: "请输入岗位名称" }]}
        >
          <Input placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input.TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
