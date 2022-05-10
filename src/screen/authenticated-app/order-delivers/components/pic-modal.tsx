import styled from "@emotion/styled";
import { Modal, Image } from "antd";
import { useForm } from "antd/lib/form/Form";
import { usePicModal } from "../util";

export const PicModal = () => {
  const [form] = useForm();
  const { picModalOpen, close } = usePicModal();

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={"查看照片"}
      visible={picModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Row>
        <Pic src={""} />
        <Pic src={""} />
      </Row>
    </Modal>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pic = styled(Image)`
  width: 22rem;
  height: 14rem;
`;
