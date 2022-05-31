import { Button, Form, Input, Modal, Radio, Select, Space } from "antd";
import { useExportProductModal } from "../util";
import { useExportOrderProduct } from "service/order";
import { useForm } from "antd/lib/form/Form";
import type { AgentOption } from "types/agent";
import type { ChannelEncodingOption } from "types/product";

export const ExportProductModal = ({
  agentOptions,
  channelEncodingOptions,
}: {
  agentOptions: AgentOption[];
  channelEncodingOptions: ChannelEncodingOption[];
}) => {
  const [form] = useForm();
  const { exportProducModalOpen, close } = useExportProductModal();
  const exportOrderProduct = useExportOrderProduct();

  const exportFilter = () => {
    form.validateFields().then(async () => {
      const { type, agentId, encodings, password } = form.getFieldsValue();
      if (type === 1) {
        exportOrderProduct({ agentId, password });
      } else {
        exportOrderProduct({ encodings, password });
      }
      closeModal();
    });
  };

  const exportAll = () => {
    form.validateFields().then(async () => {
      exportOrderProduct({ password: form.getFieldsValue().password });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={"导出生产"}
      visible={exportProducModalOpen}
      onCancel={closeModal}
      footer={
        <>
          <Button onClick={exportFilter}>按条件导出生产</Button>
          <Button type={"primary"} onClick={exportAll}>
            导出全部待生产
          </Button>
        </>
      }
    >
      <Form
        initialValues={{
          type: 1,
        }}
        form={form}
      >
        <Form.Item name="type" style={{ marginBottom: 10 }}>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  name="agentId"
                  label="选择代理商导出"
                  style={{ marginBottom: 10 }}
                >
                  <Select
                    style={{ width: "32rem" }}
                    showSearch
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="请选择代理商"
                  >
                    {agentOptions.map(({ id, name }) => (
                      <Select.Option key={id} value={id}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Radio>
              <Radio value={2}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  name="encodings"
                  label="选择产品编码导出"
                >
                  <Select
                    onClick={(e) => e.preventDefault()}
                    mode="tags"
                    style={{ width: "32rem" }}
                    showSearch
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="请选择产品编码"
                  >
                    {channelEncodingOptions.map(({ encoding }) => (
                      <Select.Option key={encoding} value={encoding}>
                        {encoding}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="password"
          label="导出密码"
          rules={[{ required: true, message: "请输入导出密码" }]}
        >
          <Input placeholder="请输入导出密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
