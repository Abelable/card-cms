import styled from "@emotion/styled";
import { Form, Modal, Radio, Select, Space, Button, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAgentOptions } from "service/agent";
import { useEditGoodsAgent } from "service/product";
import { GoodsListSearchParams } from "types/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useGoodsListQueryKey, useAgentModal } from "../util";

export const AgentModal = ({
  params,
}: {
  params: Partial<GoodsListSearchParams>;
}) => {
  const agentOptions = useAgentOptions();
  const [form] = useForm();
  const {
    agentModalOpen,
    goodsIdOfEditingAgent,
    editingGoods,
    isLoading: initLoading,
    close,
  } = useAgentModal();
  const { mutateAsync, isLoading, error } = useEditGoodsAgent(
    useGoodsListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (editingGoods) {
      // const { , agent_id } = editingGoods;
      // form.setFieldsValue({ visible_type, agent_id });
      form.setFieldsValue(editingGoods);
    }
  }, [editingGoods, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: goodsIdOfEditingAgent || "",
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  const confirmAndUp = () => {
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
      onCancel={closeModal}
      visible={agentModalOpen}
      confirmLoading={isLoading}
      footer={
        params.is_removed === "0" ? (
          <Button type={"primary"} onClick={() => confirm()}>
            保存
          </Button>
        ) : (
          <>
            <Button onClick={() => confirm()}>保存</Button>
            <Button type={"primary"} onClick={() => confirmAndUp()}>
              保存并上架
            </Button>
          </>
        )
      }
    >
      <ErrorBox error={error} />
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="visible_status"
            label="代理商可见设置"
            rules={[{ required: true, message: "请选择代理商可见设置" }]}
          >
            <Radio.Group>
              <Space direction={"vertical"}>
                <Radio value={1}>仅自己可见</Radio>
                <Radio value={2}>全部代理商可见</Radio>
                <Radio value={3}>选择代理商可见</Radio>
                <Radio value={4}>选择代理商不可见</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.visible_status !== currentValues.visible_status
            }
          >
            {({ getFieldValue }) =>
              [3, 4].includes(getFieldValue("visible_status")) && (
                <Form.Item name="agent_id" label="选择代理商">
                  <Select mode="tags" placeholder="请选择代理商">
                    {agentOptions.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            }
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
