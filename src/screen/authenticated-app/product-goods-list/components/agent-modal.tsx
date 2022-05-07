import { Form, Modal, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditGoodsAgent } from "service/product";
import { Goods } from "types/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useGoodsListQueryKey, useAgentModal } from "../util";

const AgentOptions = [
  { id: 1, name: "联通" },
  { id: 1, name: "电信" },
  { id: 1, name: "移动" },
];

export const AgentModal = ({ goodsList }: { goodsList: Goods[] }) => {
  const [form] = useForm();
  const { agentModalOpen, goodsIdOfEditingAgent, close } = useAgentModal();
  const goods =
    goodsList?.find((item) => item.id === Number(goodsIdOfEditingAgent)) ||
    undefined;
  const { mutateAsync, isLoading, error } = useEditGoodsAgent(
    useGoodsListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (goods) {
      const { visible_type, agent_id } = goods;
      form.setFieldsValue({ visible_type, agent_id });
    }
  }, [goods, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: goodsIdOfEditingAgent || "",
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
      title={"修改代理商可见"}
      visible={agentModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="visible_type"
          label="代理商可见设置"
          rules={[{ required: true, message: "请选择代理商可见设置" }]}
        >
          <Radio.Group>
            <Radio value={1}>仅自己可见</Radio>
            <Radio value={2}>全部代理商可见</Radio>
            <Radio value={3}>选择代理商可见</Radio>
            <Radio value={4}>选择代理商不可见</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="agent_id" label="选择代理商">
          <Select placeholder="请选择代理商">
            {AgentOptions.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
