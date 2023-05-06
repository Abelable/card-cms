import { Dispatch, SetStateAction } from "react";
import { Form, Modal, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useBlackDelivers } from "service/order";
import { useBlackModal, useOrderDeliversQueryKey } from "../util";

export const BlackModal = ({
  setSelectedRowKeys,
}: {
  setSelectedRowKeys: Dispatch<SetStateAction<never[]>>;
}) => {
  const [form] = useForm();
  const { blackModalOpen, blackDeliverId, close } = useBlackModal();
  const { mutateAsync, isLoading, error } = useBlackDelivers(
    useOrderDeliversQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      const { selections } = form.getFieldsValue();
      await mutateAsync({
        ids: blackDeliverId.split(","),
        is_phone: selections.includes("1"),
        is_idcard: selections.includes("2"),
        is_address: selections.includes("3"),
      });
      setSelectedRowKeys([]);
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          selections: ["1", "2", "3"],
        }}
      >
        <Form.Item
          name="selections"
          label="点击确定添加订单的以下信息为黑名单"
          rules={[{ required: true, message: "请选择至少一个信息" }]}
        >
          <Checkbox.Group>
            <Checkbox value="1">手机号</Checkbox>
            <Checkbox value="2">身份证号</Checkbox>
            <Checkbox value="3">收货地址</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
