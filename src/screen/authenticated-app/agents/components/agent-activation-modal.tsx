import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditAgent } from "service/agent";
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
  const { mutateAsync, isLoading, error } = useEditAgent(useAgentsQueryKey());

  useDeepCompareEffect(() => {
    if (agent)
      form.setFieldsValue({ activation_days: agent.activate_effective_day });
  }, [agent, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { activation_days } = form.getFieldsValue();
      await mutateAsync(
        cleanObject({
          id: agentIdOfEditingActivation || "",
          activation_days,
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
      <Form form={form}>
        <Form.Item name="activate_effective_day" label="有效天数">
          <InputNumber style={{ width: "100%" }} placeholder="请输入有效天数" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
