import { Button, Modal, Radio, Select, Space } from "antd";
import { useExportProductModal } from "../util";
import styled from "@emotion/styled";
import { useState } from "react";
import { Row } from "components/lib";
import { useAgentOptions } from "service/agent";
import { useChannelEncodingOptions } from "service/product";

export const ExportProductModal = () => {
  const { exportProducModalOpen, close } = useExportProductModal();
  const agentOptions = useAgentOptions();
  const channelOptions = useChannelEncodingOptions();
  const [type, setType] = useState(1);
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const [productEncodings, setProductEncodings] = useState<
    string[] | undefined
  >(undefined);

  const exportFilter = () => {
    if (type === 1) {
      console.log(agentId);
    } else {
      console.log(productEncodings);
    }
    // closeModal();
  };

  const exportAll = () => {
    closeModal();
  };

  const closeModal = () => {
    setType(1);
    setAgentId(undefined);
    setProductEncodings(undefined);
    close();
  };

  return (
    <Modal
      title={"导出生产"}
      visible={exportProducModalOpen}
      onCancel={closeModal}
      footer={
        <>
          <Button onClick={exportFilter}>按条件导出生产</Button>
          <Button type={"primary"} onClick={exportAll}>
            导出全部待生产
          </Button>
        </>
      }
    >
      <Radio.Group value={type} onChange={(e: any) => setType(e.target.value)}>
        <Space direction="vertical">
          <Radio value={1}>
            <Row>
              <Title>选择代理商导出</Title>
              <Select
                style={{ width: "31rem" }}
                value={agentId}
                allowClear={true}
                onSelect={(id: number) => setAgentId(id)}
                onClear={() => setAgentId(undefined)}
                showSearch
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                placeholder="请选择代理商"
              >
                {agentOptions.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Row>
          </Radio>
          <Radio value={2}>
            <Row onClick={(e) => e.preventDefault()}>
              <Title>选择产品编码导出</Title>
              <Select
                mode="tags"
                style={{ width: "31rem" }}
                value={productEncodings}
                allowClear={true}
                onChange={(encodings: string[]) =>
                  setProductEncodings(encodings)
                }
                onClear={() => setProductEncodings(undefined)}
                showSearch
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                placeholder="请选择产品编码"
              >
                {channelOptions.map(({ encoding, name }) => (
                  <Select.Option key={encoding} value={encoding}>
                    {encoding}
                  </Select.Option>
                ))}
              </Select>
            </Row>
          </Radio>
        </Space>
      </Radio.Group>
    </Modal>
  );
};

const Title = styled.div`
  width: 13rem;
`;
