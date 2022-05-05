import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddAgent, useEditAgent } from "service/agent";
import { Agent } from "types/agent";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useAgentsQueryKey, useAgentActivationModal } from "../util";

export const AgentActivationModal = ({ agents }: { agents: Agent[] }) => {
  const [form] = useForm();
  const { agentActivationModalOpen, agentIdOfEditingActivation, close } =
    useAgentActivationModal();
  const agent =
    agents?.find((item) => item.id === Number(agentIdOfEditingActivation)) ||
    undefined;
  const useMutationAgent = agentIdOfEditingActivation
    ? useEditAgent
    : useAddAgent;
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
          id: agentIdOfEditingActivation || "",
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
      title={"编辑激活状态回传的有效天数"}
      visible={agentActivationModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="activation_days"
          label="有效天数"
          rules={[{ required: true, message: "请输入有效天数" }]}
        >
          <InputNumber placeholder="请输入有效天数" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
