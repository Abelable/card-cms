import { Form, Modal, Button, Input, Select } from "antd";
import { ErrorBox } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useAddMember, useEditMember } from "service/member";
import { useMemberListQueryKey, useMemberModal } from "../util";

import type { MemberItem } from "types/member";
import type { RoleOption } from "types/role";

export const MemberModal = ({
  roleOptions,
  memberList,
}: {
  memberList: MemberItem[];
  roleOptions: RoleOption[];
}) => {
  const [form] = useForm();
  const { memberModalOpen, editingMemberId, close } = useMemberModal();
  const member =
    memberList?.find((item) => item.id === Number(editingMemberId)) ||
    undefined;
  const useMutationMember = editingMemberId ? useEditMember : useAddMember;
  const { mutateAsync, isLoading, error } = useMutationMember(
    useMemberListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (member) {
      const { name, username, role_id } = member;
      form.setFieldsValue({ name, username, role_id });
    }
  }, [member, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingMemberId || "",
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
      title={editingMemberId ? "编辑员工" : "添加员工"}
      onCancel={closeModal}
      visible={memberModalOpen}
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
          name="username"
          label="账户名"
          rules={[{ required: true, message: "请输入账户名" }]}
        >
          <Input placeholder="请输入账户名" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="name"
          label="昵称"
          rules={[{ required: true, message: "请输入昵称" }]}
        >
          <Input placeholder="请输入昵称" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="岗位"
          rules={[{ required: true, message: "请选择岗位" }]}
        >
          <Select placeholder="请选择岗位">
            {roleOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {!editingMemberId ? (
          <>
            <Form.Item
              name="password"
              label="登录密码"
              rules={[
                {
                  required: true,
                  pattern: /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
                  message: "8-16位字符，必须包括字母和数字",
                },
              ]}
            >
              <Input.Password
                placeholder="请输入登录密码"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="password_confirm"
              label="确认密码"
              validateTrigger="onBlur"
              rules={[
                ({ getFieldValue }) => ({
                  required: true,
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("两次密码不一致，请重新输入");
                    }
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="请再次输入登录密码"
                autoComplete="new-password"
              />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
      </Form>
    </Modal>
  );
};
