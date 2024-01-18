import { Form, Modal, Button, Input, Select } from "antd";
import { ErrorBox } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useAddRule, useEditRule } from "service/order";
import { useRuleListQueryKey, useRuleModal } from "../util";

import type { GoodsOption } from "types/product";
import type { Rule, ShopOption } from "types/order";

export const RuleModal = ({
  ruleList,
  goodsOptions,
  shopOptions,
}: {
  ruleList: Rule[];
  goodsOptions: GoodsOption[];
  shopOptions: ShopOption[];
}) => {
  const [form] = useForm();
  const { ruleModalOpen, editingRuleId, close } = useRuleModal();
  const rule =
    ruleList?.find((item) => item.id === Number(editingRuleId)) || undefined;
  const useMutationRule = editingRuleId ? useEditRule : useAddRule;
  const { mutateAsync, isLoading, error } = useMutationRule(
    useRuleListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (rule) {
      const { name, shop_id, rule_id } = rule;
      form.setFieldsValue({
        name,
        shop_id,
        rule_id: rule_id.split(",").map((item) => +item),
      });
    }
  }, [rule, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { rule_id, ...rest } = form.getFieldsValue();
      await mutateAsync({
        id: editingRuleId || "",
        status: editingRuleId ? rule?.status : 2,
        rule_id: rule_id.join(),
        ...rest,
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
      title={editingRuleId ? "编辑规则" : "添加规则"}
      onCancel={closeModal}
      visible={ruleModalOpen}
      confirmLoading={isLoading}
      footer={
        <>
          <Button onClick={closeModal}>取消</Button>
          <Button type={"primary"} onClick={() => confirm()}>
            确定
          </Button>
        </>
      }
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="计划名称"
          rules={[{ required: true, message: "请输入计划名称" }]}
        >
          <Input placeholder="请输入计划名称" />
        </Form.Item>
        <Form.Item
          name="rule_id"
          label="商品规则"
          rules={[{ required: true, message: "请依次选择商品" }]}
        >
          <Select
            mode="multiple"
            placeholder="请依次选择商品"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={goodsOptions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="shop_id"
          label="电商店铺"
          rules={[{ required: true, message: "请选择电商店铺" }]}
        >
          <Select placeholder="请选择电商店铺">
            {shopOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
