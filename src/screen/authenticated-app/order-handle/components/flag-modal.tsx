import styled from "@emotion/styled";
import { Form, Input, message, Modal, Spin, Radio } from "antd";
import { FlagFilled } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditOrderFlagRemark } from "service/order";
import { useFlagModal, useOrderListQueryKey } from "../util";

import type { Option } from "types/order";

export const FlagModal = ({ flagOptions }: { flagOptions: Option[] }) => {
  const [form] = useForm();
  const {
    flagModalOpen,
    flag,
    flagOrderId,
    flagRemark,
    close,
    isLoading: initLoading,
  } = useFlagModal();
  const { mutateAsync, isLoading } = useEditOrderFlagRemark(
    useOrderListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (flagOrderId) {
      form.setFieldsValue({
        tag: flag,
        jiumeng_desc: flagRemark,
      });
    }
  }, [flagOrderId, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      try {
        await mutateAsync({ order_id: flagOrderId, ...form.getFieldsValue() });
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
      title={"标旗设置"}
      visible={flagModalOpen}
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
          <Form.Item name="tag" label="标旗">
            <Radio.Group>
              {[{ name: "灰", value: "0" }, ...flagOptions].map(({ value }) => (
                <Radio key={value} value={value}>
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
