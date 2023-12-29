import { Form, Modal, Button, Input } from "antd";
import { ErrorBox, Row } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useResetMemberPwd } from "service/member";
import { usePwdModal } from "../util";

import type { MemberItem } from "types/member";

export const PwdModal = ({ memberList }: { memberList: MemberItem[] }) => {
  const [form] = useForm();
  const { pwdModalOpen, resetPwdMemberId, close } = usePwdModal();
  const member =
    memberList?.find((item) => item.id === Number(resetPwdMemberId)) ||
    undefined;
  const { mutateAsync, isLoading, error } = useResetMemberPwd();

  useDeepCompareEffect(() => {
    if (member) {
      const { username } = member;
      form.setFieldsValue({ username });
    }
  }, [member, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: resetPwdMemberId,
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
      title="重制密码"
      onCancel={closeModal}
      visible={pwdModalOpen}
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
      <div
        style={{ marginBottom: "2rem" }}
      >{`账户名: ${member?.username}`}</div>
      <Form form={form} layout="vertical">
        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              pattern: /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
              message: "8-16位字符，必须包括字母和数字",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入新密码"
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
      </Form>
    </Modal>
  );
};
