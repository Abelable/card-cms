import styled from "@emotion/styled";
import { Modal, Image, Spin } from "antd";
import { usePicModal } from "../util";

export const PicModal = () => {
  const { picModalOpen, editingDeliver, close, isLoading } = usePicModal();

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      width={760}
      title={"证件照片"}
      visible={picModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Row>
          <Pic src={editingDeliver?.idcard_front_photo} />
          <Pic src={editingDeliver?.idcard_back_photo} />
          <Pic src={editingDeliver?.bareheaded_photo} />
        </Row>
      )}
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

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
