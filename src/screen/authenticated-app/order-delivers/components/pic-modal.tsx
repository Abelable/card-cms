import styled from "@emotion/styled";
import { Modal, Image } from "antd";
import { Deliver } from "types/order";
import { usePicModal } from "../util";
import { useEffect, useState } from "react";

export const PicModal = ({ orderList }: { orderList: Deliver[] }) => {
  const { picModalOpen, showPicDeliverId, close } = usePicModal();
  const order = orderList.find((item) => item.id === showPicDeliverId);
  const [frontPhoto, setFrontPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");

  useEffect(() => {
    if (order) {
      setFrontPhoto(order.idcard_front_photo);
      setBackPhoto(order.idcard_back_photo);
    }
  }, [order]);

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
        <Pic src={frontPhoto} />
        <Pic src={backPhoto} />
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
