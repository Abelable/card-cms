import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useAgentModal, useAgentsQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Agent } from "types/agent";
import { useAddAgent, useEditAgent } from "service/agent";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";

export const AgentModal = ({ agents }: { agents: Agent[] }) => {
  const [form] = useForm();

  const { agentModalOpen, editingAgentId, close } = useAgentModal();
  const agent =
    agents?.find((item) => item.id === Number(editingAgentId)) || undefined;

  const useMutationAgent = editingAgentId ? useEditAgent : useAddAgent;
  const { mutateAsync, error, isLoading } = useMutationAgent(
    useAgentsQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
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

  useDeepCompareEffect(() => {
    agent && form.setFieldsValue(agent);
  }, [form, agent]);

  return (
    <Drawer
      title={editingAgentId ? "编辑代理商信息" : "新增代理商"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={agentModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="头图标题"
              rules={[{ required: true, message: "请输入头图标题" }]}
            >
              <Input placeholder="请输入头图标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sort" label="头图排序">
              <Input placeholder="请输入头图序号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateRange"
              label="投放时间"
              rules={[{ required: true, message: "请选择投放时间" }]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="is_show"
              label="是否展示"
              rules={[{ required: true, message: "请选择展示或隐藏" }]}
            >
              <Select placeholder="请选择展示或隐藏">
                {[
                  { name: "展示", value: "1" },
                  { name: "隐藏", value: "0" },
                ].map((item, index) => (
                  <Select.Option key={index} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
