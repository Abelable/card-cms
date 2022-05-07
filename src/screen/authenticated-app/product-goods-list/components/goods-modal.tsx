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
} from "antd";
import { useGoodsModal, useGoodsListQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Goods } from "types/product";
import { useAddGoods, useEditGoods } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import styled from "@emotion/styled";
import "assets/style/ageLimit.css";
import { Row as CustomRow } from "components/lib";
import { useState } from "react";

const operatorOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];
const supplierOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];
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
  "1个月",
  "2个月",
  "3个月",
  "4个月",
  "5个月",
  "6个月",
  "7个月",
  "8个月",
  "9个月",
  "10个月",
  "11个月",
  "12个月",
];

export const GoodsModal = ({ goodsList }: { goodsList: Goods[] }) => {
  const [form] = useForm();
  const [type, setType] = useState(1);

  const { goodsModalOpen, editingGoodsId, close } = useGoodsModal();
  const goods =
    goodsList?.find((item) => item.id === Number(editingGoodsId)) || undefined;

  const useMutationGoods = editingGoodsId ? useEditGoods : useAddGoods;
  const { mutateAsync, error, isLoading } = useMutationGoods(
    useGoodsListQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    console.log(form.getFieldsValue());
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          id: editingGoodsId || "",
          ...form.getFieldsValue(),
        })
      );
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    goods && form.setFieldsValue(goods);
  }, [form, goods]);

  return (
    <Drawer
      title={editingGoodsId ? "修改基础产品信息" : "定义基础产品信息"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={goodsModalOpen}
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
              name="goodsList_name"
              label="产品名称"
              rules={[{ required: true, message: "请输入产品名称" }]}
            >
              <Input placeholder="请输入产品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goodsList_code"
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
              <span style={{ marginRight: "2rem" }}>是否需要身份证号码：</span>
              <Form.Item name="need_id_number" style={{ marginBottom: 0 }}>
                <Radio.Group>
                  <Radio value={false}>不需要</Radio>
                  <Radio value={true}>需要</Radio>
                </Radio.Group>
              </Form.Item>
            </Row>
            <Row style={{ alignItems: "center" }}>
              <span style={{ marginRight: "2rem" }}>是否需要身份证照片：</span>
              <Form.Item name="need_id_card_pic" style={{ marginBottom: 0 }}>
                <Radio.Group>
                  <Radio value={false}>不需要</Radio>
                  <Radio value={true}>需要</Radio>
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
                      <span style={{ marginRight: "2rem" }}>不发货地址：</span>
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
                      <span style={{ marginRight: "2rem" }}>只发货地址：</span>
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
                <Form.Item name="min_age" style={{ marginBottom: 0 }}>
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
                <Form.Item name="max_age" style={{ marginBottom: 0 }}>
                  <Input
                    className="max-age"
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
                <span style={{ marginRight: "2rem" }}>单人开卡数量限制：</span>
                <Form.Item
                  name="card_number_limit"
                  style={{ marginBottom: 0, width: "100%" }}
                >
                  <Select placeholder="不限制">
                    {[1, 2, 3, 4, 5].map((item) => (
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
                  name="card_test_cycle"
                  style={{ marginBottom: 0, width: "100%" }}
                >
                  <Select placeholder="不限制">
                    {cycleOptions.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
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
                            <Select.Option key={item} value={item}>
                              {item}
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
                            <Select.Option key={item} value={item}>
                              {item}
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
                            <Select.Option key={item} value={item}>
                              {item}
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
                            <Select.Option key={item} value={item}>
                              {item}
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
        <Form.Item label="黑名单" name="enable_automatic_blacklist_filtering">
          <Checkbox>电信诈骗黑名单用户自动过滤</Checkbox>
        </Form.Item>
      </Form>
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
