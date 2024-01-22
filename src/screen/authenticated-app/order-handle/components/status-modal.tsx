import { Form, Input, Modal, Select, Spin } from "antd";
import { ErrorBox } from "components/lib";

import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditDeliverSimple } from "service/produce";
import { useStatusModal, useOrderListQueryKey } from "../util";

import type { StatusOption } from "types/order";

export const StatusModal = ({
  orderStatusOptions,
}: {
  orderStatusOptions: StatusOption[];
}) => {
  const [form] = useForm();
  const {
    statusModalOpen,
    editingOrder,
    close,
    isLoading: initLoading,
  } = useStatusModal();
  const { mutateAsync, isLoading, error } = useEditDeliverSimple(
    useOrderListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (editingOrder) {
      form.setFieldsValue(editingOrder);
    }
  }, [editingOrder, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingOrder,
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
              {orderStatusOptions.map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  {label}
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
