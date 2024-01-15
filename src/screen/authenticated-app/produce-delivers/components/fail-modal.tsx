import { Form, Input, Modal, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Dispatch, SetStateAction } from "react";
import { useEditDelivers } from "service/produce";
import { useFailModal, useProduceDeliversQueryKey } from "../util";
import styled from "@emotion/styled";

export const FailModal = ({
  failReasons,
  setBatchStatus,
  setSelectedRowKeys,
}: {
  failReasons: string[] | undefined;
  setBatchStatus: Dispatch<SetStateAction<number | undefined>>;
  setSelectedRowKeys: Dispatch<SetStateAction<never[]>>;
}) => {
  const [form] = useForm();
  const { failModalOpen, failDeliverIds, close } = useFailModal();
  const { mutateAsync, isLoading, error } = useEditDelivers(
    useProduceDeliversQueryKey()
  );

  const select = (remark: string) => form.setFieldsValue({ remark });

  const confirm = () => {
    form.validateFields().then(async () => {
      const { remark } = form.getFieldsValue();
      await mutateAsync({
        ids: failDeliverIds.split(","),
        status: 3,
        remark,
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
          name="remark"
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
