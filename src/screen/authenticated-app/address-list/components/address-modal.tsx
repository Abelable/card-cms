import styled from "@emotion/styled";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useForm } from "antd/lib/form/Form";
import { useAddAddress, useEditAddress } from "service/address";
import { useAddressListQueryKey, useAddressModal } from "../util";

import { Form, Modal, Button, Input, Col, Row, Select } from "antd";
import { ErrorBox } from "components/lib";
import { DoubleRightOutlined } from "@ant-design/icons";

import type { SupplierOption } from "types/supplier";
import type { Address, AddressMappingItem } from "types/address";

export const AddressModal = ({
  supplierOptions,
  addressList,
}: {
  supplierOptions: SupplierOption[];
  addressList: Address[];
}) => {
  const [form] = useForm();
  const { addressModalOpen, editingAddressId, close } = useAddressModal();
  const address =
    addressList?.find((item) => item.id === Number(editingAddressId)) ||
    undefined;

  const useMutationAddress = editingAddressId ? useEditAddress : useAddAddress;
  const { mutateAsync, isLoading, error } = useMutationAddress(
    useAddressListQueryKey()
  );

  useDeepCompareEffect(() => {
    if (address) {
      form.setFieldsValue({
        jm_text: `${address.un.post_province_name} ${address.un.post_province_code} ${address.un.post_city_name} ${address.un.post_city_code} ${address.un.post_district_name} ${address.un.post_district_code}`,
        supplier_text: `${address.post_province_name} ${address.post_province_code} ${address.post_city_name} ${address.post_city_code} ${address.post_district_name} ${address.post_district_code}`,
      });
    }
  }, [address, form]);

  // const [text, setText] = useState("");
  // const formatText = () => {
  //   if (text.length) {
  //     const codeList = text.match(/\d+/g) || [];
  //     const descList =
  //       text.replace(/\s*/g, "").replace(/\d+/g, ",").split(",") || [];

  //     form.setFieldsValue({
  //       province_name: descList[0] || "",
  //       province_code: codeList[0] || "",
  //       city_name: descList[1] || "",
  //       city_code: codeList[1] || "",
  //       area_name: descList[2] || "",
  //       area_code: codeList[2] || "",
  //     });
  //   }
  // };

  const confirm = () => {
    form.validateFields().then(async () => {
      if (editingAddressId) {
        const { jm_text, supplier_text } = form.getFieldsValue();

        const jmList = jm_text.split(/\s+/g);
        const list = supplier_text.split(/\s+/g);
        const mapping = [
          {
            jm_post_province_name: jmList[0] || "",
            jm_post_province_code: jmList[1] || "",
            jm_post_city_name: jmList[2] || "",
            jm_post_city_code: jmList[3] || "",
            jm_post_district_name: jmList[4] || "",
            jm_post_district_code: jmList[5] || "",
            post_province_name: list[0] || "",
            post_province_code: list[1] || "",
            post_city_name: list[2] || "",
            post_city_code: list[3] || "",
            post_district_name: list[4] || "",
            post_district_code: list[5] || "",
          },
        ];

        await mutateAsync({
          id: +editingAddressId,
          mapping,
          supplier_id: address?.supplier_id as number,
        });
      } else {
        const { supplier_id, jm_text, supplier_text } = form.getFieldsValue();

        const jmAddressList = jm_text.split(/\n/g).map((item: string) => {
          const list = item.split(/\t/g);
          return {
            jm_post_province_name: list[0] || "",
            jm_post_province_code: list[1] || "",
            jm_post_city_name: list[2] || "",
            jm_post_city_code: list[3] || "",
            jm_post_district_name: list[4] || "",
            jm_post_district_code: list[5] || "",
          };
        });
        const supplierAddressList = supplier_text
          .split(/\n/g)
          .map((item: string) => {
            const list = item.split(/\t/g);
            return {
              post_province_name: list[0] || "",
              post_province_code: list[1] || "",
              post_city_name: list[2] || "",
              post_city_code: list[3] || "",
              post_district_name: list[4] || "",
              post_district_code: list[5] || "",
            };
          });
        const mapping = jmAddressList.map(
          (item: Partial<AddressMappingItem>, index: number) => ({
            ...item,
            ...supplierAddressList[index],
          })
        );

        await mutateAsync({
          mapping,
          supplier_id,
        });
      }
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
        {editingAddressId ? (
          <></>
        ) : (
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
        )}

        {editingAddressId ? (
          <Row gutter={16}>
            <Col span={11}>
              <Form.Item
                name="jm_text"
                label="久梦地址库"
                rules={[{ required: true, message: "请输入久梦地址库" }]}
              >
                <Input placeholder="请输入久梦地址库" />
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
                label={`上游地址（${
                  supplierOptions.find(
                    (item) => item.id === address?.supplier_id
                  )?.name
                }）`}
                rules={[{ required: true, message: "请输入上游地址" }]}
              >
                <Input placeholder="请输入上游地址" />
              </Form.Item>
            </Col>
          </Row>
        ) : (
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
        )}
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
