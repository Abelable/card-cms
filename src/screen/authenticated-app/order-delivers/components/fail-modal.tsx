import { Form, Input, Modal, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Dispatch, SetStateAction } from "react";
import { useEditDelivers } from "service/order";
import { useFailReasons } from "service/product";
import { useFailModal, useOrderDeliversQueryKey } from "../util";
import styled from "@emotion/styled";

export const FailModal = ({
  setBatchStatus,
  setSelectedRowKeys,
}: {
  setBatchStatus: Dispatch<SetStateAction<number | undefined>>;
  setSelectedRowKeys: Dispatch<SetStateAction<never[]>>;
}) => {
  const [form] = useForm();
  const { data: failReasons } = useFailReasons();
  const { failModalOpen, failDeliverIds, close } = useFailModal();
  const { mutateAsync, isLoading, error } = useEditDelivers(
    useOrderDeliversQueryKey()
  );

  const select = (product_failed_reason: string) =>
    form.setFieldsValue({ product_failed_reason });

  const confirm = () => {
    form.validateFields().then(async () => {
      const { product_failed_reason } = form.getFieldsValue();
      await mutateAsync({
        ids: failDeliverIds.split(","),
        status: 3,
        product_failed_reason,
      });
      setSelectedRowKeys([]);
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
    setBatchStatus(undefined);
  };

  return (
    <Modal
      title={"标记为生产失败"}
      visible={failModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="product_failed_reason"
          label="备注原因"
          rules={[{ required: true, message: "请输入具体原因" }]}
        >
          <Input placeholder="请输入具体原因" />
        </Form.Item>
        <Form.Item
          label="快速原因"
          rules={[{ required: true, message: "请输入具体原因" }]}
        >
          {failReasons?.map((item: string, index: number) => (
            <CustomTags key={index} onClick={() => select(item)}>
              {item}
            </CustomTags>
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CustomTags = styled(Tag)`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
