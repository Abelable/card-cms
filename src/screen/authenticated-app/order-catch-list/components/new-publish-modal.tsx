import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Steps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { Row as CustomRow, ErrorBox } from "components/lib";
import { Uploader } from "components/uploader";
import { RichTextEditor } from "components/rich-text-editor";

import { useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import styled from "@emotion/styled";
import "assets/style/hideLeftBorder.css";

import { useAddChannel, useAddGoods, useEditChannel } from "service/product";
import { cleanObject } from "utils";
import { useGoodsListQueryKey, useNewPublishModal } from "../util";
import {
  useDefaultWarningSetting,
  useOperatorOptions,
  useRegionOptions,
  useUpdateDefaultWarningSetting,
} from "service/common";
import { useChannelsQueryKey } from "screen/authenticated-app/product-channels/util";

import type { RegionItem } from "types/common";
import type { SupplierOption } from "types/supplier";
import type { ChannelForm, GoodsForm } from "types/product";
import type { AgentOption } from "types/agent";

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

export const NewPublishModal = ({
  supplierOptions,
  agentOptions,
}: {
  agentOptions: AgentOption[];
  supplierOptions: SupplierOption[];
}) => {
  const [form] = useForm();
  const { data: regionOptions } = useRegionOptions();
  const { data: defaultWarningSetting } = useDefaultWarningSetting();
  const { mutate: updateDefaultWarningSetting } =
    useUpdateDefaultWarningSetting();
  const operatorOptions = useOperatorOptions();
  const [step, setStep] = useState(0);
  const [type, setType] = useState(1);

  const [detail, setDetail] = useState("");
  const [remark, setRemark] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const { newPublishModalOpen, close } = useNewPublishModal();
  const [productInfo, setProductInfo] = useState<
    Partial<ChannelForm> | undefined
  >(undefined);
  const {
    mutateAsync: addProduct,
    error: addProductError,
    isLoading: addProductLoading,
  } = useAddChannel(useChannelsQueryKey());
  const {
    mutateAsync: editProduct,
    error: editProductError,
    isLoading: editProductLoading,
  } = useEditChannel(useChannelsQueryKey());

  const [tempGoodsInfo, setTempGoodsInfo] = useState<Partial<GoodsForm>>();

  const toSecondStep = () => {
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

      if (productInfo) {
        const editProductInfo = {
          ...productInfo,
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
        };
        setProductInfo(editProductInfo);
        await editProduct(cleanObject(editProductInfo));
      } else {
        const res = await addProduct(
          cleanObject({
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
        setProductInfo(res);
      }
      setStep(1);
    });
  };

  const toFirstStep = () => {
    setStep(0);
    if (productInfo) {
      const {
        is_used_global_prewarn_setting,
        province_id,
        city_id,
        dont_ship_addresses,
        ...rest
      } = productInfo;
      setType(is_used_global_prewarn_setting === 1 ? 1 : 2);

      // 处理不发货地区
      const non_shipping_region_obj: { [key: string]: number[][] } = {};
      if (dont_ship_addresses) {
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
      }
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
  };

  const toThirdStep = () => {
    form.validateFields().then(() => {
      const { tags, img, goods_encoding, goods_name, ...rest } =
        form.getFieldsValue();
      const sale_point = tags ? tags.join() : "";
      const main_picture = img
        ? img[0].xhr
          ? JSON.parse(img[0].xhr.response).data.relative_url
          : img[0].url
        : "";

      setTempGoodsInfo({
        product_id: productInfo?.id,
        encoding: goods_encoding,
        name: goods_name,
        sale_point,
        main_picture,
        detail,
        remark,
        ...rest,
      });
      setStep(2);
    });
  };

  const { mutateAsync, error, isLoading } = useAddGoods(useGoodsListQueryKey());

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          ...tempGoodsInfo,
          ...form.getFieldsValue(),
        })
      );
      setStep(3);
    });
  };

  const closeModal = () => {
    form.resetFields();
    setStep(0);
    setDetail("");
    setRemark("");
    close();
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
  }, [form, defaultWarningSetting]);

  return (
    <Drawer
      title={"发布商品"}
      width={"120rem"}
      forceRender={true}
      onClose={closeModal}
      visible={newPublishModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        step === 0 ? (
          <Button
            onClick={toSecondStep}
            loading={addProductLoading || editProductLoading}
            type="primary"
          >
            下一步
          </Button>
        ) : step === 1 ? (
          <Space>
            <Button onClick={toFirstStep}>上一步</Button>
            <Button onClick={toThirdStep} type="primary">
              下一步
            </Button>
          </Space>
        ) : step === 2 ? (
          <Space>
            <Button onClick={() => setStep(1)}>上一步</Button>
            <Button onClick={submit} loading={isLoading} type="primary">
              发布商品
            </Button>
          </Space>
        ) : (
          <></>
        )
      }
    >
      <Steps current={step}>
        <Steps.Step title="定义基础产品信息" description="定义产品规则" />
        <Steps.Step title="定义销售页信息" description="对外宣传销售话术" />
        <Steps.Step title="设置代理商可见" description="设置哪些代理商可销售" />
        <Steps.Step title="确认发布" description="上线销售发展用户" />
      </Steps>
      <Divider />
      <FormWrap>
        <Form
          initialValues={{
            is_required_idcard: 1,
            is_required_idphoto: 1,
            per_person_card_num_limit: 0,
            per_person_card_num_limit_check_period: 0,
            phone_repeated_prewarn_num_check_period: 0,
            address_repeated_prewarn_num_check_period: 0,
            is_filter_blacklist: 0,
          }}
          form={form}
          layout="vertical"
        >
          <ErrorBox error={addProductError || editProductError || error} />
          {step === 0 ? (
            <>
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
                    <span style={{ marginRight: "2rem" }}>
                      年龄限制（周岁）：
                    </span>
                    <Input.Group compact>
                      <Form.Item
                        name="min_age_limit"
                        style={{ marginBottom: 0 }}
                      >
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
                      <Form.Item
                        name="max_age_limit"
                        style={{ marginBottom: 0 }}
                      >
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
                            <span onClick={() => setType(1)}>
                              使用全局默认方案
                            </span>
                          ),
                          key: 1,
                        },
                        {
                          label: (
                            <span onClick={() => setType(2)}>
                              使用自定义方案
                            </span>
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
                            <span style={{ marginRight: "2rem" }}>
                              检测周期：
                            </span>
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
                            <span style={{ marginRight: "2rem" }}>
                              检测周期：
                            </span>
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
                            <span style={{ marginRight: "2rem" }}>
                              检测周期：
                            </span>
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
                            <span style={{ marginRight: "2rem" }}>
                              检测周期：
                            </span>
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
            </>
          ) : step === 1 ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item required label="选择基础产品">
                    <Select defaultValue={productInfo?.name} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="goods_name"
                    label="商品名称"
                    rules={[{ required: true, message: "请输入商品名称" }]}
                    tooltip="对外展示的产品标题，能清晰描述概括产品，例：北京19元月租大王卡赠2GB流量"
                  >
                    <Input placeholder="请输入商品名称" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="goods_encoding"
                    label="商品编码"
                    rules={[{ required: true, message: "请输入商品编码" }]}
                  >
                    <Input placeholder="请输入商品编码" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tags"
                    label="商品卖点"
                    rules={[
                      {
                        type: "array",
                        max: 3,
                      },
                    ]}
                    tooltip="不超过3组词，例：费用低，流量大，免租金等，不易过长"
                  >
                    <Select mode="tags" placeholder="输入后回车生成商品卖点" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="销售页上传照片">
                <Radio.Group value={productInfo?.is_required_idphoto} disabled>
                  <Radio value={0}>无需上传</Radio>
                  <Radio value={1}>需要上传</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="img"
                label="商品主图"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Uploader maxCount={1} />
              </Form.Item>
              <Form.Item label="商品详情" required>
                <RichTextEditor content={detail} setContent={setDetail} />
              </Form.Item>
              <Form.Item label="其他备注">
                <RichTextEditor content={remark} setContent={setRemark} />
              </Form.Item>
            </>
          ) : step === 2 ? (
            <>
              <Form.Item
                name="visible_status"
                label="代理商可见设置"
                rules={[{ required: true, message: "请选择代理商可见设置" }]}
              >
                <Radio.Group>
                  <Radio value={1}>仅自己可见</Radio>
                  <Radio value={2}>全部代理商可见</Radio>
                  <Radio value={3}>选择代理商可见</Radio>
                  <Radio value={4}>选择代理商不可见</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.visible_status !== currentValues.visible_status
                }
              >
                {({ getFieldValue }) =>
                  [3, 4].includes(getFieldValue("visible_status")) && (
                    <Form.Item
                      name="agent_ids"
                      label="选择代理商"
                      rules={[{ required: true, message: "请选择代理商" }]}
                    >
                      <Select mode="tags" placeholder="请选择代理商">
                        {agentOptions.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )
                }
              </Form.Item>
            </>
          ) : (
            <Result status="success" title="发布成功" />
          )}
        </Form>
      </FormWrap>
    </Drawer>
  );
};

const FormWrap = styled.div`
  margin: 0 auto;
  width: 680px;
`;

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
