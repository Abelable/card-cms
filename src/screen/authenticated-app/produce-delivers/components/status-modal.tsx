import styled from "@emotion/styled";
import { Form, Input, Modal, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditDeliverSimple } from "service/produce";
import { useStatusModal, useProduceDeliversQueryKey } from "../util";
import type { ProduceStatusOption } from "types/produce";

export const StatusModal = ({
  produceStatusOptions,
}: {
  produceStatusOptions: ProduceStatusOption[];
}) => {
  const [form] = useForm();
  const {
    statusModalOpen,
    editingDeliver,
    close,
    isLoading: initLoading,
  } = useStatusModal();
  const { mutateAsync, isLoading, error } = useEditDeliverSimple(
    useProduceDeliversQueryKey()
  );

  useDeepCompareEffect(() => {
    if (editingDeliver) {
      form.setFieldsValue(editingDeliver);
    }
  }, [editingDeliver, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingDeliver,
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
      title={"修改状态"}
      visible={statusModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="选择状态"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select placeholder="请选择状态">
              {produceStatusOptions.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.status !== currentValues.status
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("status") === 3 && (
                <Form.Item
                  name="remark"
                  label="备注原因"
                  rules={[{ required: true, message: "请输入具体原因" }]}
                >
                  <Input placeholder="请输入具体原因" />
                </Form.Item>
              )
            }
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
