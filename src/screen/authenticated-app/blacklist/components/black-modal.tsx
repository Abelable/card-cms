import { Form, Modal, Button, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddBlack, useEditBlack } from "service/system";
import { BlackItem } from "types/system";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useBlacklistQueryKey, useBlackModal } from "../util";

export const BlackModal = ({ blacklist }: { blacklist: BlackItem[] }) => {
  const [form] = useForm();
  const { blackModalOpen, editingBlackId, close } = useBlackModal();
  const black =
    blacklist?.find((item) => item.id === Number(editingBlackId)) || undefined;
  const useMutationBlack = editingBlackId ? useEditBlack : useAddBlack;
  const { mutateAsync, isLoading, error } = useMutationBlack(
    useBlacklistQueryKey()
  );

  useDeepCompareEffect(() => {
    if (black) {
      const { idcard, phone, address } = black;
      form.setFieldsValue({ idcard, phone, address });
    }
  }, [black, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingBlackId || "",
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
      title={editingBlackId ? "编辑黑名单" : "添加黑名单"}
      onCancel={closeModal}
      visible={blackModalOpen}
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
          name="idcard"
          label="身份证号"
          rules={[{ required: true, message: "请输入身份证号" }]}
        >
          <Input placeholder="请输入身份证号" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: "请输入联系电话" }]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item name="address" label="收货地址">
          <Input placeholder="请输入收货地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
