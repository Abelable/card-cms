import { Form, Modal, Button, Input, Col, Row, Divider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, Row as CustomRow } from "components/lib";
import { useState } from "react";
import { useAddAddress, useEditAddress } from "service/address";
import { useAddressListQueryKey, useAddressModal } from "../util";

export const AddressModal = () => {
  const [form] = useForm();
  const { addressModalOpen, editingAddressId, close } = useAddressModal();

  const useMutationAddress = editingAddressId ? useEditAddress : useAddAddress;
  const { mutateAsync, isLoading, error } = useMutationAddress(
    useAddressListQueryKey()
  );

  const [text, setText] = useState("");
  const formatText = () => {
    if (text.length) {
      const codeList = text.match(/\d+/g) || [];
      const descList =
        text.replace(/\s*/g, "").replace(/\d+/g, ",").split(",") || [];

      form.setFieldsValue({
        province_name: descList[0] || "",
        province_code: codeList[0] || "",
        city_name: descList[1] || "",
        city_code: codeList[1] || "",
        area_name: descList[2] || "",
        area_code: codeList[2] || "",
      });
    }
  };

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingAddressId || "",
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
      title={editingAddressId ? "修改地址库" : "添加地址库"}
      onCancel={closeModal}
      visible={addressModalOpen}
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
      {editingAddressId ? (
        <></>
      ) : (
        <CustomRow gap>
          <Input
            onChange={(e) => setText(e.target.value)}
            placeholder="复制Excel省市区，粘贴到此处"
          />
          <Button
            onClick={() => formatText()}
            type={"primary"}
            style={{ marginRight: 0 }}
          >
            生成省市区
          </Button>
        </CustomRow>
      )}
      <Divider />
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="province_name"
              label="省"
              rules={[{ required: true, message: "请输入省" }]}
            >
              <Input placeholder="请输入省" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="province_code"
              label="省code"
              rules={[{ required: true, message: "请输入省code" }]}
            >
              <Input placeholder="请输入省code" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city_name"
              label="市"
              rules={[{ required: true, message: "请输入市" }]}
            >
              <Input placeholder="请输入市" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city_code"
              label="市code"
              rules={[{ required: true, message: "请输入市code" }]}
            >
              <Input placeholder="请输入市code" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="area_name"
              label="区"
              rules={[{ required: true, message: "请输入区" }]}
            >
              <Input placeholder="请输入区" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="area_code"
              label="区code"
              rules={[{ required: true, message: "请输入区code" }]}
            >
              <Input placeholder="请输入区code" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
