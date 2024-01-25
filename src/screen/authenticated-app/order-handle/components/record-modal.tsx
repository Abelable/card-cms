import styled from "@emotion/styled";
import { Descriptions, Empty, Modal, Spin } from "antd";
import { useRecordModal } from "../util";
import { Row } from "components/lib";

export const RecordModal = () => {
  const { recordModalOpen, logList, close, isLoading } = useRecordModal();
  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"操作记录"}
      width={800}
      visible={recordModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <>
          {logList && logList.length ? (
            <Descriptions size={"small"} column={1}>
              {logList.map((item, index) => (
                <Descriptions.Item key={index}>
                  <Row gap>
                    <div>{item.created_at}</div>
                    <div>{item.desc}</div>
                  </Row>
                </Descriptions.Item>
              ))}
            </Descriptions>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      )}
    </Modal>
  );
};

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
