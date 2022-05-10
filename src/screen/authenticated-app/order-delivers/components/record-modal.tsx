import { Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRecordModal } from "../util";

export const RecordModal = () => {
  const [form] = useForm();
  const { recordModalOpen, close } = useRecordModal();

  const closeModal = () => {
    form.resetFields();
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
