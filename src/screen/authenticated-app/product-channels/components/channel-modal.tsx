import {
  Button,
  Cascader,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { useChannelModal, useChannelsQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Channel } from "types/product";
import { useAddChannel, useEditChannel } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import styled from "@emotion/styled";
import "assets/style/ageLimit.css";

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

export const ChannelModal = ({ channels }: { channels: Channel[] }) => {
  const [form] = useForm();

  const { channelModalOpen, editingChannelId, close } = useChannelModal();
  const channel =
    channels?.find((item) => item.id === Number(editingChannelId)) || undefined;

  const useMutationChannel = editingChannelId ? useEditChannel : useAddChannel;
  const { mutateAsync, error, isLoading } = useMutationChannel(
    useChannelsQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    console.log(form.getFieldsValue());
    // form.validateFields().then(async () => {
    //   await mutateAsync(
    //     cleanObject({
    //       id: editingChannelId || "",
    //       ...form.getFieldsValue(),
    //     })
    //   );
    //   closeModal();
    // });
  };

  useDeepCompareEffect(() => {
    channel && form.setFieldsValue(channel);
  }, [form, channel]);

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
              name="goods_name"
              label="产品名称"
              rules={[{ required: true, message: "请输入产品名称" }]}
            >
              <Input placeholder="请输入产品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goods_code"
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
          <Wrap>
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
          <Wrap>
            <Form.Item name="deliver_area_type">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>
                    <CustomFormItem width={50} marginBottom={1}>
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
                    <CustomFormItem width={50}>
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
            <CustomFormItem>
              <span style={{ marginRight: "2rem" }}>单人开卡数量限制：</span>
              <Form.Item name="card_number_limit" style={{ marginBottom: 0 }}>
                <Select placeholder="不限制">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </CustomFormItem>
          </Wrap>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Wrap = styled.div`
  padding: 2.4rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
`;

const CustomFormItem = styled.div<{
  width?: number;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}rem` : "2.4rem"};
  width: ${(props) => props.width + "rem"};
  white-space: nowrap;
`;
