import { Modal } from "antd";
import { useRecordModal } from "../util";

export const RecordModal = () => {
  const { recordModalOpen, close } = useRecordModal();

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"操作记录"}
      visible={recordModalOpen}
      onCancel={closeModal}
      footer={null}
    ></Modal>
  );
};
