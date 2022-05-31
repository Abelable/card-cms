import styled from "@emotion/styled";
import { Descriptions, Empty, Modal, Spin } from "antd";
import { useRecordModal } from "../util";

export const RecordModal = () => {
  const { recordModalOpen, editingDeliver, close, isLoading } =
    useRecordModal();
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
          {editingDeliver?.operation_logs.length ? (
            <Descriptions size={"small"} column={1}>
              {editingDeliver?.operation_logs.map((item, index) => (
                <Descriptions.Item key={index}>
                  {item.content}
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
