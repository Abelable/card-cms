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
} from "antd";
import { useGoodsModal, useGoodsListQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Goods } from "types/product";
import { useAddGoods, useEditGoods } from "service/product";
import useDeepCompareEffect from "use-deep-compare-effect";
import { cleanObject } from "utils";
import { useState } from "react";
import { OssUpload } from "components/oss-upload";
import { RichTextEditor } from "components/rich-text-editor";

const operatorOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];

export const GoodsModal = ({ goodsList }: { goodsList: Goods[] }) => {
  const [form] = useForm();

  const [detail, setDetail] = useState("");
  const [remark, setRemark] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

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
      title={editingGoodsId ? "修改商品销售页信息" : "定义商品销售页信息"}
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
                  type: "array",
                  max: 3,
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
        <Form.Item label="强制同步" name="isForce" valuePropName="checked">
          <Checkbox>强制同步分销商此商品详情页</Checkbox>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
