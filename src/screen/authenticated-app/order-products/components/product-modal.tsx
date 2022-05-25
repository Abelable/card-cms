import { Form, Modal, Select, Button, Input, Alert } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddProduct, useEditProduct } from "service/order";
import { Product } from "types/order";
import { SupplierOption } from "types/supplier";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useProductsQueryKey, useProductModal } from "../util";
import styled from "@emotion/styled";
import { useHttp } from "service/http";
import { useState } from "react";

export const ProductModal = ({
  supplierOptions,
  products,
}: {
  supplierOptions: SupplierOption[];
  products: Product[];
}) => {
  const client = useHttp();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
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

  const test = () => {
    form.validateFields().then(async () => {
      try {
        const res = await client("/api/v1/admin/supplier-product/check", {
          data: form.getFieldsValue(),
          method: "POST",
        });
        setSuccessMsg(res.message);
      } catch (error: any) {
        setErrMsg(error.message);
      }
    });
  };

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
    setSuccessMsg("");
    setErrMsg("");
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
          name="product_encoding"
          label="本地编码"
          rules={[{ required: true, message: "请输入本地编码" }]}
        >
          <Input placeholder="请输入本地编码" />
        </Form.Item>
        <Form.Item
          name="supplier_product_encoding"
          label="上游编码"
          rules={[{ required: true, message: "请输入上游编码" }]}
        >
          <Input placeholder="请输入上游编码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={test}>
            检测
          </Button>
          {successMsg && <Tips message={successMsg} type="success" />}
          {errMsg && <Tips message={errMsg} type="error" />}
        </Form.Item>
        {editingProductId ? (
          <Form.Item name="trigger_mark" label="触点标识名称">
            <Input placeholder="请输入触点标识名称" />
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
};

const Tips = styled(Alert)`
  margin-top: 1.2rem;
`;
