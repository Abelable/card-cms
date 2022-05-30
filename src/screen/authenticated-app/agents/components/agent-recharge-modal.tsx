import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditAgent } from "service/agent";
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
  const { mutateAsync, isLoading, error } = useEditAgent(useAgentsQueryKey());

  useDeepCompareEffect(() => {
    if (agent)
      form.setFieldsValue({ recharge_days: agent.recharge_effective_day });
  }, [agent, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { recharge_days } = form.getFieldsValue();
      await mutateAsync(
        cleanObject({
          id: agentIdOfEditingRecharge || "",
          recharge_days,
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
      <Form form={form}>
        <Form.Item name="recharge_effective_day" label="有效天数">
          <InputNumber style={{ width: "100%" }} placeholder="请输入有效天数" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
