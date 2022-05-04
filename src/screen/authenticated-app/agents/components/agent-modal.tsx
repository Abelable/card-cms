import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddAgent, useEditAgent } from "service/agent";
import { Agent } from "types/agent";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useAgentsQueryKey, useAgentModal } from "../util";

export const AgentModal = ({ agents }: { agents: Agent[] }) => {
  const [form] = useForm();
  const { agentModalOpen, editingAgentId, close } = useAgentModal();
  const agent =
    agents?.find((item) => item.id === Number(editingAgentId)) || undefined;
  const useMutationAgent = editingAgentId ? useEditAgent : useAddAgent;
  const { mutateAsync, isLoading, error } = useMutationAgent(
    useAgentsQueryKey()
  );

  useDeepCompareEffect(() => {
    if (agent) form.setFieldsValue(agent);
  }, [agent, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: editingAgentId || "",
          ...form.getFieldsValue(),
        })
      );
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingAgentId ? "编辑供应商信息" : "添加供应商"}
      visible={agentModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="供应商公司名称"
          rules={[{ required: true, message: "请输入公司名称" }]}
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: "请输入联系电话" }]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
