import { Form, Modal, Select, Button, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddProduct, useEditProduct } from "service/order";
import { Product } from "types/order";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useProductsQueryKey, useProductModal } from "../util";

const supplierOptions = [
  { id: 1, name: "移动" },
  { id: 2, name: "联通" },
  { id: 3, name: "电信" },
];

export const ProductModal = ({ products }: { products: Product[] }) => {
  const [form] = useForm();
  const { productModalOpen, editingProductId, close } = useProductModal();
  const product =
    products?.find((item) => item.id === Number(editingProductId)) || undefined;
  const useMutationProduct = editingProductId ? useEditProduct : useAddProduct;
  const { mutateAsync, isLoading, error } = useMutationProduct(
    useProductsQueryKey()
  );

  useDeepCompareEffect(() => {
    if (product) {
      const { supplier_id, product_encoding, supplier_product_encoding } =
        product;
      form.setFieldsValue({
        supplier_id,
        product_encoding,
        supplier_product_encoding,
      });
    }
  }, [product, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingProductId || "",
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingProductId ? "修改自动生产产品" : "添加自动生产产品"}
      onCancel={closeModal}
      visible={productModalOpen}
      confirmLoading={isLoading}
      footer={
        <>
          <Button onClick={closeModal}>取消</Button>
          <Button type={"primary"} onClick={() => confirm()}>
            确定
          </Button>
        </>
      }
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
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
        <Form.Item
          name="code"
          label="本地编码"
          rules={[{ required: true, message: "请输入本地编码" }]}
        >
          <Input placeholder="请输入本地编码" />
        </Form.Item>
        <Form.Item
          name="upper_product_code"
          label="上游编码"
          rules={[{ required: true, message: "请输入上游编码" }]}
        >
          <Input placeholder="请输入上游编码" />
        </Form.Item>
        <Form.Item name="contact_name" label="触点标识名称">
          <Input placeholder="请输入触点标识名称" />
        </Form.Item>
      </Form>
      <Button type="primary" danger>
        检测
      </Button>
      <div>未设置过自动生产，点确定设置吧</div>
    </Modal>
  );
};
