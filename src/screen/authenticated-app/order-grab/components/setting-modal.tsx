import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import { useSettingModal, useShopListQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddShop, useEditShop } from "service/order";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";

export const SettingModal = () => {
  const [form] = useForm();

  const { shopSettingModalOpen, settingShopId, close } = useSettingModal();

  const useMutationShop = settingShopId ? useEditShop : useAddShop;
  const { mutateAsync, error, isLoading } = useMutationShop(
    useShopListQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: settingShopId || "",
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
      title={settingShopId ? "编辑代理商信息" : "新增代理商"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={shopSettingModalOpen}
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
              name="company"
              label="代理商公司名称"
              rules={[{ required: true, message: "请输入公司名称" }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="store"
              label="店铺名备注"
              rules={[{ required: true, message: "请输入店铺名备注" }]}
            >
              <Input placeholder="请输入店铺名备注" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="channel_id"
              label="渠道id"
              rules={[{ required: true, message: "请输入渠道id" }]}
            >
              <Input placeholder="请输入渠道id" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contact"
              label="联系人姓名"
              rules={[{ required: true, message: "请输入联系人姓名" }]}
            >
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: "请输入联系电话" }]}
            >
              <Input placeholder="请输入联系电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: "请输入邮箱" }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="activate_effective_day"
              label="激活状态回传的有效天数（自订单创建时起）"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入有效天数"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="recharge_effective_day"
              label="充值金额回传的有效天数（自订单创建时起）"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入有效天数"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
