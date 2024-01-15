import styled from "@emotion/styled";
import { Form, Modal, Radio, Select, Button, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditGoods, useUpGoods } from "service/product";
import { useOrderGrabListQueryKey, useAgentModal } from "../util";
import type { GoodsListSearchParams } from "types/product";
import { AgentOption } from "types/agent";

export const AgentModal = ({
  agentOptions,
  params,
}: {
  agentOptions: AgentOption[];
  params: Partial<GoodsListSearchParams>;
}) => {
  const [form] = useForm();
  const {
    agentModalOpen,
    goodsIdOfEditingAgent,
    editingGoods,
    isLoading: initLoading,
    close,
  } = useAgentModal();
  const { mutateAsync, isLoading, error } = useEditGoods(
    useOrderGrabListQueryKey()
  );
  const { mutate: upGoods } = useUpGoods(useOrderGrabListQueryKey());

  useDeepCompareEffect(() => {
    if (editingGoods) {
      const { visible_status, agent_ids } = editingGoods;
      form.setFieldsValue({ visible_status, agent_ids });
    }
  }, [editingGoods, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingGoods,
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  const confirmAndUp = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingGoods,
        ...form.getFieldsValue(),
      });
      upGoods(Number(goodsIdOfEditingAgent));
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
      width={600}
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
              <Radio value={1}>仅自己可见</Radio>
              <Radio value={2}>全部代理商可见</Radio>
              <Radio value={3}>选择代理商可见</Radio>
              <Radio value={4}>选择代理商不可见</Radio>
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
                <Form.Item
                  name="agent_ids"
                  label="选择代理商"
                  rules={[{ required: true, message: "请选择代理商" }]}
                >
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
