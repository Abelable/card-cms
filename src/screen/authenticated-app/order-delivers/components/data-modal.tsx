import { Form, Input, Modal, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import useDeepCompareEffect from "use-deep-compare-effect";
import styled from "@emotion/styled";
import { useEditDeliverData } from "service/order";
import { useExpressOptions } from "service/common";
import { useDataModal, useOrderDeliversQueryKey } from "../util";

export const DataModal = () => {
  const [form] = useForm();
  const expressOptions = useExpressOptions();
  const {
    dataModalOpen,
    editingDeliver,
    close,
    isLoading: initLoading,
  } = useDataModal();
  const { mutateAsync, isLoading, error } = useEditDeliverData(
    useOrderDeliversQueryKey()
  );

  useDeepCompareEffect(() => {
    if (editingDeliver) {
      const { express_name, ...rest } = editingDeliver;
      form.setFieldsValue({ express_name: express_name || undefined, ...rest });
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
      title={"录入生产数据"}
      visible={dataModalOpen}
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
            name="product_no"
            label="生产号码"
            rules={[{ required: true, message: "请输入生产号码" }]}
          >
            <Input placeholder="请输入生产号码" />
          </Form.Item>
          <Form.Item
            name="express_name"
            label="物流公司"
            rules={[{ required: true, message: "请选择物流公司" }]}
          >
            <Select placeholder="请选择物流公司">
              {expressOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="express_no"
            label="运单号"
            rules={[{ required: true, message: "请输入运单号" }]}
          >
            <Input placeholder="请输入运单号" />
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
