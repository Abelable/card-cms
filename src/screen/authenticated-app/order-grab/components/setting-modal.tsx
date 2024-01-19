import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Divider,
  Empty,
  Steps,
} from "antd";
import { ErrorBox } from "components/lib";
import infoIllus from "assets/images/illustration_1.png";

import { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { useSettingModal, useShopListQueryKey } from "../util";
import { useEditShopSetting, useShopAuthUrl } from "service/order";

export const SettingModal = () => {
  const [form] = useForm();
  const [step, setStep] = useState(0);
  const [authParams, setAuthParams] = useState({
    shop_id: "",
    app_name: "",
    app_key: "",
    app_secret: "",
  });

  const authUrl = useShopAuthUrl(authParams);
  console.log("authUrl", authUrl);
  const { shopSettingModalOpen, settingShopId, close } = useSettingModal();
  const { mutateAsync, error, isLoading } = useEditShopSetting(
    useShopListQueryKey()
  );

  const toSecondStep = () => {
    form.validateFields().then(async () => {
      const { app_name, app_key, app_secret } = form.getFieldsValue();
      setAuthParams({ shop_id: settingShopId, app_name, app_key, app_secret });
      setStep(1);
    });
  };

  const submit = () => {
    form.validateFields().then(async () => {
      const { code } = form.getFieldsValue();
      await mutateAsync({
        shop_id: settingShopId,
        code,
      });
      closeModal();
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      title="店铺授权操作"
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={shopSettingModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        step === 0 ? (
          <Button onClick={toSecondStep} type="primary">
            下一步
          </Button>
        ) : step === 1 ? (
          <Space>
            <Button onClick={() => setStep(0)}>上一步</Button>
            <Button onClick={submit} loading={isLoading} type="primary">
              确认配置
            </Button>
          </Space>
        ) : (
          <></>
        )
      }
    >
      <Steps current={step}>
        <Steps.Step title="填写回调地址" />
        <Steps.Step title="获取授权码，确认配置" />
      </Steps>
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        {step === 0 ? (
          <Wrap>
            <Divider orientation="left">
              1. 填写基本信息<Tips>（获取方法见下方图示说明）</Tips>
            </Divider>
            <Form.Item
              name="app_name"
              label="店铺绑定的应用名称"
              rules={[{ required: true, message: "请输入应用名称" }]}
            >
              <Input placeholder="请输入应用名称" />
            </Form.Item>
            <Form.Item
              name="app_key"
              label="client_id"
              rules={[{ required: true, message: "请输入client_id" }]}
            >
              <Input placeholder="请输入client_id" />
            </Form.Item>
            <Form.Item
              name="app_secret"
              label="client_secret"
              rules={[{ required: true, message: "请输入client_secret" }]}
            >
              <Input placeholder="请输入client_secret" />
            </Form.Item>
            <Divider orientation="left">
              2. 前往应用填写回调地址
              <Tips>（填写client_id之后复制回调地址）</Tips>
            </Divider>
            <Empty description="暂无回调地址，请先输入client_id" />
            <Divider>图示说明</Divider>
            <Illus src={infoIllus} alt="" />
          </Wrap>
        ) : (
          <Form.Item
            name="code"
            label="授权码"
            rules={[{ required: true, message: "请输入授权码" }]}
          >
            <Input placeholder="请输入授权码" />
          </Form.Item>
        )}
      </Form>
    </Drawer>
  );
};

const Wrap = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  padding-top: 0;
  border: 1px solid #ddd;
  border-radius: 1.2rem;
`;

const Tips = styled.span`
  color: #999;
  font-size: 1.4rem;
  font-weight: 400;
`;

const Illus = styled.img`
  width: 100%;
`;
