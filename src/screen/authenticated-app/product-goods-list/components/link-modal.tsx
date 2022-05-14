import { Modal, Button, Image } from "antd";
import { Goods } from "types/product";
import { useLinkModal } from "../util";
import styled from "@emotion/styled";

export const LinkModal = ({ goodsList }: { goodsList: Goods[] }) => {
  const { linkModalOpen, goodsIdOfLink, close } = useLinkModal();
  const goods =
    goodsList?.find((item) => item.id === Number(goodsIdOfLink)) || undefined;

  const copy = () => {
    closeModal();
  };

  const open = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"推广链接"}
      onCancel={closeModal}
      visible={linkModalOpen}
      footer={
        <>
          <Button onClick={() => copy()}>复制链接</Button>
          <Button type={"primary"} onClick={() => open()}>
            打开链接
          </Button>
        </>
      }
    >
      <Wrap>
        <div style={{ marginBottom: "2.4rem" }}>
          下载链接地址：http://www.baidu.com
        </div>
        <Image width={160} height={160} src={goods?.main_picture} />
      </Wrap>
    </Modal>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
