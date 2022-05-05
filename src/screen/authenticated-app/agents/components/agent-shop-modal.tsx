import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddAgent, useEditAgent } from "service/agent";
import { Agent } from "types/agent";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useAgentsQueryKey, useAgentShopModal } from "../util";

export const AgentShopModal = ({ agents }: { agents: Agent[] }) => {
  const [form] = useForm();
  const { agentShopModalOpen, agentIdOfEditingShop, close } =
    useAgentShopModal();
  const agent =
    agents?.find((item) => item.id === Number(agentIdOfEditingShop)) ||
    undefined;
  const useMutationAgent = agentIdOfEditingShop ? useEditAgent : useAddAgent;
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
          id: agentIdOfEditingShop || "",
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
      title={"编辑代理商店铺名称"}
      visible={agentShopModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="store"
          label="代理商店铺名称"
          rules={[{ required: true, message: "请输入店铺名称" }]}
        >
          <Input placeholder="请输入店铺名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
