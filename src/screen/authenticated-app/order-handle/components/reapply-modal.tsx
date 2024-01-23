import { Form, Input, message, Modal, Select } from "antd";

import { useForm } from "antd/lib/form/Form";
import { useReapplyModal } from "../util";

import type { GoodsOption } from "types/product";

export const ReapplyModal = ({
  goodsOptions,
}: {
  goodsOptions: GoodsOption[];
}) => {
  const [form] = useForm();
  const { reapplyModalOpen, close } = useReapplyModal();

  const confirm = () => {
    form.validateFields().then(async () => {
      try {
        closeModal();
      } catch (error: any) {
        message.error(error.message);
      }
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={"修改商品"}
      visible={reapplyModalOpen}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="rule_id"
          label="通过商品名称修改"
          rules={[{ required: true, message: "请选择商品" }]}
        >
          <Select
            placeholder="请选择商品"
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {goodsOptions.map(({ id, name }) => (
              <Select.Option key={id} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="goods_sn"
          label="通过商品编码修改"
          rules={[{ required: true, message: "请输入商品编码" }]}
        >
          <Input placeholder="请输入商品编码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
