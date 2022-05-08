import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Steps,
} from "antd";
import { useGoodsListQueryKey, usePublishModal } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { usePublishGoods } from "service/product";
import { cleanObject } from "utils";
import "assets/style/ageLimit.css";
import { useState } from "react";
import { OssUpload } from "components/oss-upload";
import { RichTextEditor } from "components/rich-text-editor";
import styled from "@emotion/styled";

const operatorOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];

export const PublishModal = () => {
  const [form] = useForm();
  const [step, setStep] = useState(0);
  const [detail, setDetail] = useState("");
  const [remark, setRemark] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const { publishModalOpen, close } = usePublishModal();

  const { mutateAsync, error, isLoading } = usePublishGoods(
    useGoodsListQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(cleanObject(form.getFieldsValue()));
      closeModal();
    });
  };

  return (
    <Drawer
      title={"发布商品"}
      width={"100rem"}
      forceRender={true}
      onClose={closeModal}
      visible={publishModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Steps current={step}>
        <Steps.Step title="定义销售页信息" description="对外宣传销售话术" />
        <Steps.Step title="设置代理商可见" description="设置哪些代理商可销售" />
        <Steps.Step title="确认发布" description="上线销售发展用户" />
      </Steps>
      <Divider />
      {step === 0 ? (
        <Wrap>
          <Form form={form} layout="vertical">
            <ErrorBox error={error} />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="product_id"
                  label="选择基础产品"
                  rules={[{ required: true, message: "请选择基础产品" }]}
                >
                  <Select placeholder="请选择基础产品">
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
                  name="name"
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
                  name="code"
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
                      required: true,
                      type: "array",
                      max: 3,
                      message: "请输入商品卖点",
                    },
                  ]}
                  tooltip="不超过3组词，例：费用低，流量大，免租金等，不易过长"
                >
                  <Select mode="tags" placeholder="输入后回车生产商品卖点" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="needImg" label="销售页上传照片">
              <Radio.Group>
                <Radio value={false}>无需上传</Radio>
                <Radio value={true}>需要上传</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="img"
              label="商品主图"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload />
            </Form.Item>
            <Form.Item label="商品详情" required>
              <RichTextEditor content={detail} setContent={setDetail} />
            </Form.Item>
            <Form.Item label="其他备注">
              <RichTextEditor content={remark} setContent={setRemark} />
            </Form.Item>
          </Form>
        </Wrap>
      ) : step === 1 ? (
        <Wrap>
          <Form form={form} layout="vertical">
            <ErrorBox error={error} />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="product_id"
                  label="选择基础产品"
                  rules={[{ required: true, message: "请选择基础产品" }]}
                >
                  <Select placeholder="请选择基础产品">
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
                  name="name"
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
                  name="code"
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
                      required: true,
                      type: "array",
                      max: 3,
                      message: "请输入商品卖点",
                    },
                  ]}
                  tooltip="不超过3组词，例：费用低，流量大，免租金等，不易过长"
                >
                  <Select mode="tags" placeholder="输入后回车生产商品卖点" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="needImg" label="销售页上传照片">
              <Radio.Group>
                <Radio value={false}>无需上传</Radio>
                <Radio value={true}>需要上传</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="img"
              label="商品主图"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload />
            </Form.Item>
            <Form.Item label="商品详情" required>
              <RichTextEditor content={detail} setContent={setDetail} />
            </Form.Item>
            <Form.Item label="其他备注">
              <RichTextEditor content={remark} setContent={setRemark} />
            </Form.Item>
          </Form>
        </Wrap>
      ) : (
        <Wrap>
          <Form form={form} layout="vertical">
            <ErrorBox error={error} />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="product_id"
                  label="选择基础产品"
                  rules={[{ required: true, message: "请选择基础产品" }]}
                >
                  <Select placeholder="请选择基础产品">
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
                  name="name"
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
                  name="code"
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
                      required: true,
                      type: "array",
                      max: 3,
                      message: "请输入商品卖点",
                    },
                  ]}
                  tooltip="不超过3组词，例：费用低，流量大，免租金等，不易过长"
                >
                  <Select mode="tags" placeholder="输入后回车生产商品卖点" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="needImg" label="销售页上传照片">
              <Radio.Group>
                <Radio value={false}>无需上传</Radio>
                <Radio value={true}>需要上传</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="img"
              label="商品主图"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload />
            </Form.Item>
            <Form.Item label="商品详情" required>
              <RichTextEditor content={detail} setContent={setDetail} />
            </Form.Item>
            <Form.Item label="其他备注">
              <RichTextEditor content={remark} setContent={setRemark} />
            </Form.Item>
          </Form>
        </Wrap>
      )}
    </Drawer>
  );
};

const Wrap = styled.div`
  margin: 0 auto;
  width: 700px;
`;
