import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Divider,
  Empty,
  Steps,
  message,
  Spin,
} from "antd";
import { ButtonNoPadding, ErrorBox } from "components/lib";
import infoIllus from "assets/images/illustration_1.png";
import codeIllus from "assets/images/illustration_2.png";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import copy from "copy-to-clipboard";
import { useSettingModal, useShopListQueryKey } from "../util";
import { useEditShopSetting, useShopAuthUrl } from "service/order";

import type { Shop } from "types/order";

export const SettingModal = ({ shopList }: { shopList: Shop[] }) => {
  const [form] = useForm();
  const [step, setStep] = useState(0);
  const [authParams, setAuthParams] = useState({
    shop_id: "",
    app_name: "",
    app_key: "",
    app_secret: "",
  });

  const { shopSettingModalOpen, settingShopId, close } = useSettingModal();
  const shopInfo = shopList.find((item) => item.shop_id === settingShopId);
  const { data: authInfo, isLoading: authInfoLoading } =
    useShopAuthUrl(authParams);
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
  const copyUrl = (url: string) => {
    copy(url);
    message.success("复制成功");
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

  useEffect(() => {
    if (shopSettingModalOpen && shopInfo?.refresh_token) {
      const { app_name, app_key, app_secret } = shopInfo;
      setAuthParams({ shop_id: settingShopId, app_name, app_key, app_secret });
    }
  }, [shopSettingModalOpen, shopInfo, settingShopId]);

  return (
    <Drawer
      title={shopInfo?.refresh_token ? "重新配置" : "店铺授权操作"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={shopSettingModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        shopInfo?.refresh_token ? (
          <Space>
            <Button onClick={closeModal}>取消</Button>
            <Button onClick={submit} loading={isLoading} type="primary">
              确认配置
            </Button>
          </Space>
        ) : step === 0 ? (
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
      {!shopInfo?.refresh_token ? (
        <Steps current={step} style={{ marginBottom: "2.4rem" }}>
          <Steps.Step title="填写回调地址" />
          <Steps.Step title="获取授权码，确认配置" />
        </Steps>
      ) : (
        <></>
      )}
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        {shopInfo?.refresh_token ? (
          <>
            <Wrap>
              <Divider orientation="left">
                1. 复制下方地址在浏览器打开<Tips>（具体见下方图示说明）</Tips>
              </Divider>
              {authInfoLoading ? (
                <Loading>
                  <Spin />
                </Loading>
              ) : (
                <div>
                  {authInfo?.url}
                  <ButtonNoPadding
                    style={{ marginLeft: "1.2rem" }}
                    type={"link"}
                    onClick={() => copyUrl(authInfo?.url || "")}
                  >
                    复制地址
                  </ButtonNoPadding>
                </div>
              )}

              <Divider orientation="left">
                2. 登录店铺账号后复制生成的授权码
              </Divider>
              <Form.Item
                name="code"
                label="授权码"
                rules={[{ required: true, message: "请输入授权码" }]}
              >
                <Input placeholder="请输入授权码" />
              </Form.Item>
            </Wrap>
            <Divider>图示说明</Divider>
            <WarningTips>
              注意：请确保在浏览器退出拼多多店铺的登录后操作，或者在浏览器按ctrl+shift+n打开无痕模式粘贴地址前往（请使用以下浏览器：谷歌Chrome、360系列、搜狗、微软Edge浏览器）
            </WarningTips>
            <Illus src={codeIllus} alt="" />
          </>
        ) : step === 0 ? (
          <>
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
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.app_key !== currentValues.app_key
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("app_key") ? (
                    <div>
                      {`https://91haoka.cn/api/store/business/${getFieldValue(
                        "app_key"
                      )}/notify`}
                      <ButtonNoPadding
                        style={{ marginLeft: "1.2rem" }}
                        type={"link"}
                        onClick={() =>
                          copyUrl(
                            `https://91haoka.cn/api/store/business/${getFieldValue(
                              "app_key"
                            )}/notify`
                          )
                        }
                      >
                        复制地址
                      </ButtonNoPadding>
                    </div>
                  ) : (
                    <Empty description="暂无回调地址，请先输入client_id" />
                  )
                }
              </Form.Item>
            </Wrap>
            <Divider>图示说明</Divider>
            <Illus src={infoIllus} alt="" />
          </>
        ) : (
          <>
            <Wrap>
              <Divider orientation="left">
                1. 复制下方地址在浏览器打开<Tips>（具体见下方图示说明）</Tips>
              </Divider>
              {authInfoLoading ? (
                <Loading>
                  <Spin />
                </Loading>
              ) : (
                <div>
                  {authInfo?.url}
                  <ButtonNoPadding
                    style={{ marginLeft: "1.2rem" }}
                    type={"link"}
                    onClick={() => copyUrl(authInfo?.url || "")}
                  >
                    复制地址
                  </ButtonNoPadding>
                </div>
              )}

              <Divider orientation="left">
                2. 登录店铺账号后复制生成的授权码
              </Divider>
              <Form.Item
                name="code"
                label="授权码"
                rules={[{ required: true, message: "请输入授权码" }]}
              >
                <Input placeholder="请输入授权码" />
              </Form.Item>
            </Wrap>
            <Divider>图示说明</Divider>
            <WarningTips>
              注意：请确保在浏览器退出拼多多店铺的登录后操作，或者在浏览器按ctrl+shift+n打开无痕模式粘贴地址前往（请使用以下浏览器：谷歌Chrome、360系列、搜狗、微软Edge浏览器）
            </WarningTips>
            <Illus src={codeIllus} alt="" />
          </>
        )}
      </Form>
    </Drawer>
  );
};

const Wrap = styled.div`
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
  border: 1px solid #eee;
`;

const WarningTips = styled.div`
  margin: 1.2rem 0;
  color: #ff4d4f;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
