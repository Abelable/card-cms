import styled from "@emotion/styled";
import { Form, Input, message, Modal, Spin, Radio } from "antd";
import { FlagFilled } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditOrder } from "service/order";
import { useInfoModal, useOrderListQueryKey } from "../util";

import type { Option } from "types/order";

export const FlagModal = ({ flagOptions }: { flagOptions: Option[] }) => {
  const [form] = useForm();
  const {
    infoModalOpen,
    editingOrder,
    close,
    isLoading: initLoading,
  } = useInfoModal();
  const { mutateAsync, isLoading } = useEditOrder(useOrderListQueryKey());

  useDeepCompareEffect(() => {
    if (editingOrder) {
      const { province_id, city_id, area_id, ...rest } = editingOrder;
      form.setFieldsValue({
        address_region: [province_id, city_id, area_id],
        ...rest,
      });
    }
  }, [editingOrder, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { address_region, ...rest } = form.getFieldsValue();
      try {
        await mutateAsync({
          ...editingOrder,
          province_id: address_region[0],
          city_id: address_region[1],
          area_id: address_region[2],
          ...rest,
        });
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
      title={"修改订单信息"}
      visible={infoModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Form form={form}>
          <Form.Item name="flag" label="标签">
            <Radio.Group>
              {[{ name: "灰", value: "0" }, ...flagOptions].map(({ value }) => (
                <Radio value={value}>
                  <FlagFilled
                    style={{
                      color: [
                        "rgb(228, 223, 215)",
                        "rgb(238, 63, 77)",
                        "rgb(235, 177, 13)",
                        "rgb(34, 148, 83)",
                        "rgb(39, 117, 182)",
                        "rgb(128, 118, 163)",
                      ][+value],
                    }}
                  />
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="desc" label="系统备注">
            <Input.TextArea rows={4} placeholder="请输入系统备注" />
          </Form.Item>
          <Form.Item name="jiumeng_desc" label="久梦备注">
            <Input.TextArea rows={4} placeholder="请输入久梦备注" />
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
