import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  Radio,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useChannelModal, useChannelsQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Channel } from "types/product";
import { useAddChannel, useEditChannel } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import styled from "@emotion/styled";
import "assets/style/hideLeftBorder.css";
import { Row as CustomRow } from "components/lib";
import { useState } from "react";
import { OperatorOption } from "types/common";
import { SupplierOption } from "types/supplier";

const regionOptions = [
  {
    value: "1",
    label: "浙江省",
    children: [
      {
        value: "1",
        label: "杭州市",
        children: [
          {
            value: "1",
            label: "西湖区",
          },
          {
            value: "2",
            label: "上城区",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "江苏省",
    children: [
      {
        value: "1",
        label: "南京市",
        children: [
          {
            value: "1",
            label: "中华门",
          },
        ],
      },
    ],
  },
];
const cycleOptions = [
  { value: 1, label: "1个月" },
  { value: 2, label: "2个月" },
  { value: 3, label: "3个月" },
  { value: 4, label: "4个月" },
  { value: 5, label: "5个月" },
  { value: 6, label: "6个月" },
  { value: 7, label: "7个月" },
  { value: 8, label: "8个月" },
  { value: 9, label: "9个月" },
  { value: 10, label: "10个月" },
  { value: 11, label: "11个月" },
  { value: 12, label: "12个月" },
];

export const ChannelModal = ({
  operatorOptions,
  supplierOptions,
  channels,
}: {
  operatorOptions: OperatorOption[];
  supplierOptions: SupplierOption[];
  channels: Channel[];
}) => {
  const [form] = useForm();
  const [type, setType] = useState(1);
  const { channelModalOpen, editingChannelId, editingChannel, close } =
    useChannelModal();

  const useMutationChannel = editingChannelId ? useEditChannel : useAddChannel;
  const { mutateAsync, error, isLoading } = useMutationChannel(
    useChannelsQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: editingChannelId || "",
          ...form.getFieldsValue(),
        })
      );
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    form.setFieldsValue(editingChannel);
  }, [form, editingChannel]);

  return (
    <Drawer
      title={editingChannelId ? "修改基础产品信息" : "定义基础产品信息"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={channelModalOpen}
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
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Form form={form} layout="vertical">
          <ErrorBox error={error} />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="operator_id"
                label="运营商"
                rules={[{ required: true, message: "请选择运营商" }]}
              >
                <Select placeholder="请选择运营商">
                  {operatorOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="supplier_id"
                label="供应商"
                rules={[{ required: true, message: "请选择供应商" }]}
              >
                <Select placeholder="请选择供应商">
                  {supplierOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="产品名称"
                rules={[{ required: true, message: "请输入产品名称" }]}
              >
                <Input placeholder="请输入产品名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="encoding"
                label="产品编码"
                rules={[{ required: true, message: "请输入产品编码" }]}
              >
                <Input placeholder="请输入产品编码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ownership"
                label="归属地"
                rules={[{ required: true, message: "请选择归属地" }]}
              >
                <Cascader options={regionOptions} placeholder="请选择归属地" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="生产定义" required>
            <Wrap padding={2.4}>
              <Row style={{ alignItems: "center" }}>
                <span style={{ marginRight: "2rem" }}>
                  是否需要身份证号码：
                </span>
                <Form.Item
                  name="is_required_idcard"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group>
                    <Radio value={0}>不需要</Radio>
                    <Radio value={1}>需要</Radio>
                  </Radio.Group>
                </Form.Item>
              </Row>
              <Row style={{ alignItems: "center" }}>
                <span style={{ marginRight: "2rem" }}>
                  是否需要身份证照片：
                </span>
                <Form.Item
                  name="is_required_idphoto"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group>
                    <Radio value={0}>不需要</Radio>
                    <Radio value={1}>需要</Radio>
                  </Radio.Group>
                </Form.Item>
              </Row>
            </Wrap>
          </Form.Item>
          <Form.Item label="限制条件">
            <Wrap padding={2.4}>
              <Form.Item name="deliver_area_type">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value={1}>
                      <CustomFormItem width={50} marginBottom={0}>
                        <span style={{ marginRight: "2rem" }}>
                          不发货地址：
                        </span>
                        <Form.Item
                          name="deliver_area"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Cascader
                            style={{ width: "100%" }}
                            options={regionOptions}
                            multiple
                            maxTagCount="responsive"
                            placeholder="请选择地址"
                            onClick={(e) => e.preventDefault()}
                          />
                        </Form.Item>
                      </CustomFormItem>
                    </Radio>
                    <Radio value={2}>
                      <CustomFormItem width={50} marginBottom={0}>
                        <span style={{ marginRight: "2rem" }}>
                          只发货地址：
                        </span>
                        <Form.Item
                          name="only_deliver_area"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Cascader
                            options={regionOptions}
                            multiple
                            maxTagCount="responsive"
                            placeholder="请选择地址"
                            onClick={(e) => e.preventDefault()}
                          />
                        </Form.Item>
                      </CustomFormItem>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <CustomFormItem>
                <span style={{ marginRight: "2rem" }}>年龄限制（周岁）：</span>
                <Input.Group compact>
                  <Form.Item name="min_age_limit" style={{ marginBottom: 0 }}>
                    <Input
                      style={{ width: 100, textAlign: "center" }}
                      placeholder="最小年龄"
                    />
                  </Form.Item>
                  <Input
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: "none",
                      background: "#fff",
                    }}
                    placeholder="~"
                    disabled
                  />
                  <Form.Item name="max_age_limit" style={{ marginBottom: 0 }}>
                    <Input
                      className="hide-left-border"
                      style={{
                        width: 100,
                        textAlign: "center",
                      }}
                      placeholder="最大年龄"
                    />
                  </Form.Item>
                </Input.Group>
              </CustomFormItem>
              <CustomRow gap>
                <CustomFormItem width={30}>
                  <span style={{ marginRight: "2rem" }}>
                    单人开卡数量限制：
                  </span>
                  <Form.Item
                    name="per_person_card_num_limit"
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <Select placeholder="不限制">
                      {[1, 2, 3, 4, 5, 10].map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CustomFormItem>
                <CustomFormItem width={30}>
                  <span style={{ marginRight: "2rem" }}>检测周期：</span>
                  <Form.Item
                    name="per_person_card_num_limit_check_period"
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <Select placeholder="不限制">
                      {cycleOptions.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CustomFormItem>
              </CustomRow>
            </Wrap>
          </Form.Item>
          <Form.Item label="风险预警设置">
            <Wrap>
              <TypeMenu>
                <Menu
                  mode="horizontal"
                  selectedKeys={[String(type)]}
                  items={[
                    {
                      label: (
                        <span onClick={() => setType(1)}>使用全局默认方案</span>
                      ),
                      key: 1,
                    },
                    {
                      label: (
                        <span onClick={() => setType(2)}>使用自定义方案</span>
                      ),
                      key: 2,
                    },
                  ]}
                />
              </TypeMenu>
              <div style={{ padding: "2.4rem" }}>
                {type === 1 ? (
                  <>
                    <CustomRow gap marginBottom={2.4}>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>
                          联系电话重复：
                        </span>
                        <Form.Item
                          name="default_phone_repeat_limit"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="不限制"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="default_phone_test_cycle"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select placeholder="不限制">
                            {cycleOptions.map((item) => (
                              <Select.Option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <CustomRow gap marginBottom={2.4}>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>
                          收货地址重复：
                        </span>
                        <Form.Item
                          name="default_address_repeat_limit"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="不限制"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="default_address_test_cycle"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select placeholder="不限制">
                            {cycleOptions.map((item) => (
                              <Select.Option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <CustomRow gap>
                      <Button type={"primary"}>修改默认方案</Button>
                      <div style={{ color: "red" }}>
                        注：修改默认方案会导致使用默认方案的所有基础产品风控规则变更
                      </div>
                    </CustomRow>
                  </>
                ) : (
                  <>
                    <CustomRow gap marginBottom={2.4}>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>
                          联系电话重复：
                        </span>
                        <Form.Item
                          name="phone_repeat_limit"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="不限制"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="phone_test_cycle"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select placeholder="不限制">
                            {cycleOptions.map((item) => (
                              <Select.Option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <CustomRow gap marginBottom={2.4}>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>
                          收货地址重复：
                        </span>
                        <Form.Item
                          name="address_repeat_limit"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="不限制"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="address_test_cycle"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select placeholder="不限制">
                            {cycleOptions.map((item) => (
                              <Select.Option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <Button type={"primary"}>保存自定义</Button>
                  </>
                )}
              </div>
            </Wrap>
          </Form.Item>
          <Form.Item
            label="黑名单"
            name="enable_automatic_blacklist_filtering"
            valuePropName="checked"
          >
            <Checkbox>电信诈骗黑名单用户自动过滤</Checkbox>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

const Wrap = styled.div<{
  padding?: number;
}>`
  padding: ${(props) => props.padding + "rem"};
  background: #f9f9f9;
  border-radius: 0.5rem;
  border: 1px solid #f9f9f9;
  overflow: hidden;
`;

const CustomFormItem = styled.div<{
  width?: number;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    props.marginBottom !== undefined ? `${props.marginBottom}rem` : "2.4rem"};
  width: ${(props) => props.width + "rem"};
  white-space: nowrap;
`;

const TypeMenu = styled.div`
  background: #fff;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
