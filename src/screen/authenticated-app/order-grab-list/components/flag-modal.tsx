import { Form, Modal, Select, Spin } from "antd";
import { ErrorBox } from "components/lib";

import { useEffect } from "react";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { useFlagModal } from "../util";
import { useUpdateFlagSetting } from "service/order";

import type { Option } from "types/order";

export const FlagModal = ({ flagOptions }: { flagOptions: Option[] }) => {
  const [form] = useForm();
  const {
    flagModalOpen,
    flagSetting,
    isLoading: initLoading,
    close,
  } = useFlagModal();
  const { mutateAsync, isLoading, error } = useUpdateFlagSetting();

  useEffect(() => {
    if (flagModalOpen && flagSetting) {
      form.setFieldsValue(flagSetting);
    }
  }, [form, flagModalOpen, flagSetting]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title="标旗设置"
      visible={flagModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <>
          <ErrorBox error={error} />
          <Form form={form}>
            <Form.Item
              name="sync_order"
              label="抓单标旗"
              rules={[{ required: true, message: "请选择标旗" }]}
            >
              <Select placeholder="请选择标旗">
                {flagOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="production_error"
              label="生产失败"
              rules={[{ required: true, message: "请选择标旗" }]}
            >
              <Select placeholder="请选择标旗">
                {flagOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="shipping_error"
              label="发货失败"
              rules={[{ required: true, message: "请选择标旗" }]}
            >
              <Select placeholder="请选择标旗">
                {flagOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </>
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
