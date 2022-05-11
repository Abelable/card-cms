import styled from "@emotion/styled";
import { Modal, Image } from "antd";
import { usePicModal } from "../util";

export const PicModal = () => {
  const { picModalOpen, close } = usePicModal();

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"证件照片"}
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
