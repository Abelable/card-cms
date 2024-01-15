import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { RichTextEditor } from "components/rich-text-editor";
import { Uploader } from "components/uploader";
import { ErrorBox } from "components/lib";
import { useForm } from "antd/lib/form/Form";
import styled from "@emotion/styled";
import { useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useEditGoods } from "service/product";
import { cleanObject } from "utils";
import { useGoodsModal, useGoodsListQueryKey } from "../util";
import type { ProductOption } from "types/product";

export const GoodsModal = ({
  productOptions,
}: {
  productOptions: ProductOption[] | undefined;
}) => {
  const [form] = useForm();
  const [detail, setDetail] = useState("");
  const [remark, setRemark] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const {
    goodsModalOpen,
    editingGoods,
    close,
    isLoading: initLoading,
  } = useGoodsModal();

  const { mutateAsync, error, isLoading } = useEditGoods(
    useGoodsListQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const submit = () => {
    form.validateFields().then(async () => {
      const { tags, img, ...rest } = form.getFieldsValue();
      const sale_point = tags.join();
      const main_picture =
        img && img.length
          ? img[0].xhr
            ? JSON.parse(img[0].xhr.response).data.relative_url
            : img[0].url.replace(
                "//jiumengkeji.oss-cn-beijing.aliyuncs.com",
                ""
              )
          : "";
      await mutateAsync(
        cleanObject({
          ...editingGoods,
          sale_point,
          main_picture,
          detail,
          remark,
          ...rest,
        })
      );
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingGoods) {
      const { sale_point, main_picture, detail, remark, ...rest } =
        editingGoods;
      const tags = sale_point.split(",");
      const img = main_picture
        ? [{ url: main_picture, thumbUrl: main_picture }]
        : undefined;
      form.setFieldsValue({ tags, img, ...rest });
      setDetail(detail);
      setRemark(remark);
    }
  }, [form, editingGoods]);

  return (
    <Drawer
      title={"修改商品销售页信息"}
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
      {initLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
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
          <Form.Item
            label="强制同步"
            name="is_forced_sync"
            valuePropName="checked"
          >
            <Checkbox>强制同步分销商此商品详情页</Checkbox>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
