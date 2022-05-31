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
import { useAddChannel, useEditChannel } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import styled from "@emotion/styled";
import "assets/style/hideLeftBorder.css";
import { Row as CustomRow } from "components/lib";
import { useState } from "react";
import { useUpdateDefaultWarningSetting } from "service/common";
import type {
  OperatorOption,
  RegionItem,
  RegionOption,
  WarningSetting,
} from "types/common";
import type { SupplierOption } from "types/supplier";

const limitOptions = [
  { value: 0, label: "不限制" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const cycleOptions = [
  { value: 0, label: "不限制" },
  { value: 30, label: "1个月" },
  { value: 60, label: "2个月" },
  { value: 90, label: "3个月" },
  { value: 120, label: "4个月" },
  { value: 150, label: "5个月" },
  { value: 180, label: "6个月" },
  { value: 210, label: "7个月" },
  { value: 240, label: "8个月" },
  { value: 270, label: "9个月" },
  { value: 300, label: "10个月" },
  { value: 330, label: "11个月" },
  { value: 360, label: "12个月" },
];

const halfCycleOptions = [
  { value: 0, label: "不限制" },
  { value: 30, label: "1个月" },
  { value: 60, label: "2个月" },
  { value: 90, label: "3个月" },
  { value: 120, label: "4个月" },
  { value: 150, label: "5个月" },
  { value: 180, label: "6个月" },
];

export const ChannelModal = ({
  regionOptions,
  defaultWarningSetting,
  operatorOptions,
  supplierOptions,
}: {
  regionOptions: RegionOption[] | undefined;
  defaultWarningSetting: WarningSetting | undefined;
  operatorOptions: OperatorOption[];
  supplierOptions: SupplierOption[];
}) => {
  const [form] = useForm();
  const [type, setType] = useState(1);
  const {
    channelModalOpen,
    editingChannelId,
    editingChannel,
    close,
    isLoading: initLoading,
  } = useChannelModal();

  const useMutationChannel = editingChannelId ? useEditChannel : useAddChannel;
  const { mutateAsync, error, isLoading } = useMutationChannel(
    useChannelsQueryKey()
  );
  const { mutate: updateDefaultWarningSetting } =
    useUpdateDefaultWarningSetting();

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const {
        ownership,
        non_shipping_region,
        default_phone_repeated_prewarn_num,
        default_phone_repeated_prewarn_num_check_period,
        default_address_repeated_prewarn_num,
        default_address_repeated_prewarn_num_check_period,
        phone_repeated_prewarn_num,
        phone_repeated_prewarn_num_check_period,
        address_repeated_prewarn_num,
        address_repeated_prewarn_num_check_period,
        ...rest
      } = form.getFieldsValue();

      const dont_ship_addresses: RegionItem[] = [];
      if (non_shipping_region) {
        non_shipping_region.forEach((item: number[]) => {
          if (item.length === 1) {
            regionOptions
              ?.find((province) => province.id === item[0])
              ?.children?.forEach((city) => {
                dont_ship_addresses.push({
                  province_id: item[0],
                  city_id: city.id,
                });
              });
          } else {
            dont_ship_addresses.push({
              province_id: item[0],
              city_id: item[1],
            });
          }
        });
      }

      await mutateAsync(
        cleanObject({
          ...editingChannel,
          is_used_global_prewarn_setting: type === 1 ? 1 : 0,
          phone_repeated_prewarn_num:
            type === 1
              ? default_phone_repeated_prewarn_num
              : phone_repeated_prewarn_num,
          phone_repeated_prewarn_num_check_period:
            type === 1
              ? default_phone_repeated_prewarn_num_check_period
              : phone_repeated_prewarn_num_check_period,
          address_repeated_prewarn_num:
            type === 1
              ? default_address_repeated_prewarn_num
              : address_repeated_prewarn_num,
          address_repeated_prewarn_num_check_period:
            type === 1
              ? default_address_repeated_prewarn_num_check_period
              : address_repeated_prewarn_num_check_period,
          province_id: ownership[0],
          city_id: ownership[1],
          dont_ship_addresses,
          ...rest,
        })
      );
      closeModal();
    });
  };

  const saveDefaultWarningSetting = () => {
    const {
      default_phone_repeated_prewarn_num: phone_repeated_prewarn_num,
      default_phone_repeated_prewarn_num_check_period:
        phone_repeated_prewarn_num_check_period,
      default_address_repeated_prewarn_num: address_repeated_prewarn_num,
      default_address_repeated_prewarn_num_check_period:
        address_repeated_prewarn_num_check_period,
    } = form.getFieldsValue();
    updateDefaultWarningSetting({
      phone_repeated_prewarn_num,
      phone_repeated_prewarn_num_check_period,
      address_repeated_prewarn_num,
      address_repeated_prewarn_num_check_period,
    });
  };

  useDeepCompareEffect(() => {
    if (editingChannel) {
      const {
        is_used_global_prewarn_setting,
        province_id,
        city_id,
        dont_ship_addresses,
        ...rest
      } = editingChannel;
      setType(is_used_global_prewarn_setting === 1 ? 1 : 2);

      // 处理不发货地区
      const non_shipping_region_obj: { [key: string]: number[][] } = {};
      dont_ship_addresses.forEach((item) => {
        if (!non_shipping_region_obj[`${item.province_id}`]) {
          non_shipping_region_obj[`${item.province_id}`] = [
            [item.province_id, item.city_id],
          ];
        } else {
          non_shipping_region_obj[`${item.province_id}`].push([
            item.province_id,
            item.city_id,
          ]);
        }
      });
      let non_shipping_region: number[][] = [];
      Object.keys(non_shipping_region_obj).forEach((key) => {
        if (
          regionOptions?.find((item) => item.id === Number(key))?.children
            ?.length === non_shipping_region_obj[key].length
        ) {
          non_shipping_region.push([Number(key)]);
        } else {
          non_shipping_region = [
            ...non_shipping_region,
            ...non_shipping_region_obj[key],
          ];
        }
      });

      form.setFieldsValue({
        ownership: [province_id, city_id],
        non_shipping_region,
        ...rest,
      });
    }
    if (defaultWarningSetting) {
      form.setFieldsValue({
        default_phone_repeated_prewarn_num: Number(
          defaultWarningSetting?.phone_repeated_prewarn_num
        ),
        default_phone_repeated_prewarn_num_check_period: Number(
          defaultWarningSetting?.phone_repeated_prewarn_num_check_period
        ),
        default_address_repeated_prewarn_num: Number(
          defaultWarningSetting?.address_repeated_prewarn_num
        ),
        default_address_repeated_prewarn_num_check_period: Number(
          defaultWarningSetting?.address_repeated_prewarn_num_check_period
        ),
      });
    }
  }, [editingChannel, form, defaultWarningSetting]);

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
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Form
          initialValues={{
            is_required_idcard: 1,
            is_required_idphoto: 1,
            per_person_card_num_limit: 0,
            per_person_card_num_limit_check_period: 0,
            phone_repeated_prewarn_num_check_period: 0,
            address_repeated_prewarn_num_check_period: 0,
          }}
          form={form}
          layout="vertical"
        >
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
                <Cascader
                  fieldNames={{ label: "name", value: "id" }}
                  options={regionOptions}
                  placeholder="请选择归属地"
                />
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
              <CustomFormItem width={50}>
                <span style={{ marginRight: "2rem" }}>不发货地区：</span>
                <Form.Item
                  name="non_shipping_region"
                  style={{ marginBottom: 0, width: "100%" }}
                >
                  <Cascader
                    fieldNames={{ label: "name", value: "id" }}
                    style={{ width: "100%" }}
                    options={regionOptions}
                    multiple
                    maxTagCount="responsive"
                    placeholder="请选择不发货地区"
                    onClick={(e) => e.preventDefault()}
                  />
                </Form.Item>
              </CustomFormItem>
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
                    <Select>
                      {limitOptions.map((item, index) => (
                        <Select.Option key={index} value={item.value}>
                          {item.label}
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
                    <Select>
                      {cycleOptions.map((item, index) => (
                        <Select.Option key={index} value={item.value}>
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
                          name="default_phone_repeated_prewarn_num"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="输入上限数量"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="default_phone_repeated_prewarn_num_check_period"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select>
                            {halfCycleOptions.map((item, index) => (
                              <Select.Option key={index} value={item.value}>
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
                          name="default_address_repeated_prewarn_num"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="输入上限数量"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="default_address_repeated_prewarn_num_check_period"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select>
                            {halfCycleOptions.map((item, index) => (
                              <Select.Option key={index} value={item.value}>
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <CustomRow gap>
                      <Button
                        type={"primary"}
                        onClick={saveDefaultWarningSetting}
                      >
                        修改默认方案
                      </Button>
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
                          name="phone_repeated_prewarn_num"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="输入上限数量"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="phone_repeated_prewarn_num_check_period"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select>
                            {halfCycleOptions.map((item, index) => (
                              <Select.Option key={index} value={item.value}>
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                    <CustomRow gap>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>
                          收货地址重复：
                        </span>
                        <Form.Item
                          name="address_repeated_prewarn_num"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder="输入上限数量"
                          />
                        </Form.Item>
                      </CustomFormItem>
                      <CustomFormItem width={30}>
                        <span style={{ marginRight: "2rem" }}>检测周期：</span>
                        <Form.Item
                          name="address_repeated_prewarn_num_check_period"
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <Select>
                            {halfCycleOptions.map((item, index) => (
                              <Select.Option key={index} value={item.value}>
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </CustomFormItem>
                    </CustomRow>
                  </>
                )}
              </div>
            </Wrap>
          </Form.Item>
          <Form.Item
            label="黑名单"
            name="is_filter_blacklist"
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
