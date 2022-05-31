import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Steps,
} from "antd";
import { useGoodsListQueryKey, usePublishModal } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddGoods } from "service/product";
import { cleanObject } from "utils";
import { useState } from "react";
import { Uploader } from "components/uploader";
import { RichTextEditor } from "components/rich-text-editor";
import styled from "@emotion/styled";
import type { AgentOption } from "types/agent";
import type { GoodsForm, ProductOption } from "types/product";

export const PublishModal = ({
  productOptions,
  agentOptions,
}: {
  productOptions: ProductOption[] | undefined;
  agentOptions: AgentOption[];
}) => {
  const [form] = useForm();
  const [step, setStep] = useState(0);
  const [detail, setDetail] = useState("");
  const [remark, setRemark] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const { publishModalOpen, close } = usePublishModal();

  const { mutateAsync, error, isLoading } = useAddGoods(useGoodsListQueryKey());

  const [tempGoodsInfo, setTempGoodsInfo] = useState<Partial<GoodsForm>>();

  const next = () => {
    form.validateFields().then(() => {
      const { tags, img, ...rest } = form.getFieldsValue();
      const sale_point = tags ? tags.join() : "";
      const main_picture = img
        ? img[0].xhr
          ? JSON.parse(img[0].xhr.response).data.relative_url
          : img[0].url
        : "";

      setTempGoodsInfo({
        sale_point,
        main_picture,
        detail,
        remark,
        ...rest,
      });
      setStep(1);
    });
  };

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(
        cleanObject({
          ...tempGoodsInfo,
          ...form.getFieldsValue(),
        })
      );
      setStep(2);
    });
  };

  const closeModal = () => {
    form.resetFields();
    setStep(0);
    close();
  };

  return (
    <Drawer
      title={"发布商品"}
      width={"100rem"}
      forceRender={true}
      onClose={closeModal}
      visible={publishModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        step === 0 ? (
          <Button onClick={next} type="primary">
            下一步
          </Button>
        ) : step === 1 ? (
          <Space>
            <Button onClick={() => setStep(0)}>上一步</Button>
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
        <Steps.Step title="定义销售页信息" description="对外宣传销售话术" />
        <Steps.Step title="设置代理商可见" description="设置哪些代理商可销售" />
        <Steps.Step title="确认发布" description="上线销售发展用户" />
      </Steps>
      <Divider />
      <Wrap>
        <Form form={form} layout="vertical">
          <ErrorBox error={error} />
          {step === 0 ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="product_id"
                    label="选择基础产品"
                    rules={[{ required: true, message: "请选择基础产品" }]}
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      placeholder="请选择基础产品"
                    >
                      {productOptions?.map(({ id, name }) => (
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
                    name="encoding"
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
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.product_id !== currentValues.product_id
                }
              >
                {({ getFieldValue }) => (
                  <Form.Item label="销售页上传照片">
                    <Radio.Group
                      value={
                        productOptions?.find(
                          (item) => item.id === getFieldValue("product_id")
                        )?.is_required_idphoto
                      }
                      disabled
                    >
                      <Radio value={0}>无需上传</Radio>
                      <Radio value={1}>需要上传</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
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
          ) : step === 1 ? (
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
                          <Select.Option key={item.id} value={`${item.id}`}>
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
      </Wrap>
    </Drawer>
  );
};

const Wrap = styled.div`
  margin: 0 auto;
  width: 680px;
`;
