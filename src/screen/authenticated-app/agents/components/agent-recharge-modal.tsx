import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddAgent, useEditAgent } from "service/agent";
import { Agent } from "types/agent";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useAgentsQueryKey, useAgentRechargeModal } from "../util";

export const AgentRechargeModal = ({ agents }: { agents: Agent[] }) => {
  const [form] = useForm();
  const { agentRechargeModalOpen, agentIdOfEditingRecharge, close } =
    useAgentRechargeModal();
  const agent =
    agents?.find((item) => item.id === Number(agentIdOfEditingRecharge)) ||
    undefined;
  const useMutationAgent = agentIdOfEditingRecharge
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
          id: agentIdOfEditingRecharge || "",
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
      title={"编辑充值金额回传的有效天数"}
      visible={agentRechargeModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="recharge_days"
          label="有效天数"
          rules={[{ required: true, message: "请输入有效天数" }]}
        >
          <InputNumber placeholder="请输入有效天数" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
