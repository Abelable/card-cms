import { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { useAddAddress, useEditAddress } from "service/address";
import { useAddressListQueryKey, useAddressModal } from "../util";

import { Form, Modal, Button, Input, Col, Row, Select } from "antd";
import { ErrorBox } from "components/lib";
import { DoubleRightOutlined } from "@ant-design/icons";

import type { SupplierOption } from "types/supplier";

export const AddressModal = ({
  supplierOptions,
}: {
  supplierOptions: SupplierOption[];
}) => {
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
      title={editingAddressId ? "修改映射" : "单个/批量添加映射"}
      width={1000}
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
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="supplier_id"
              label="选择供应商"
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
          <Col span={11}>
            <Form.Item
              name="jm_text"
              label="久梦地址库"
              rules={[{ required: true, message: "请输入久梦地址库" }]}
            >
              <Input.TextArea
                rows={12}
                placeholder={`直接复制Excel的省市区如：
浙江 000000 杭州 001100 余杭区 001101
浙江 000000 杭州 001100 西湖区 001102`}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <IconWrap>
              <DoubleRightOutlined />
            </IconWrap>
          </Col>
          <Col span={11}>
            <Form.Item
              name="supplier_text"
              label="上游地址"
              rules={[{ required: true, message: "请输入上游地址" }]}
            >
              <Input.TextArea
                rows={12}
                placeholder={`直接复制Excel的省市区如：
浙江 210000 杭州 211100 余杭镇 211101
浙江 210000 杭州 211100 西湖镇 211102`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
