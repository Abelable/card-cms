import { Modal, Button, Image, Spin } from "antd";
import copy from "copy-to-clipboard";
import { useLinkModal } from "../util";
import styled from "@emotion/styled";

export const LinkModal = () => {
  const { linkModalOpen, goodsExtension, close, isLoading } = useLinkModal();
  console.log(goodsExtension);

  const copyLink = () => {
    copy(goodsExtension ? goodsExtension[0] : "");
    closeModal();
  };

  const open = () => {
    window.location.href = goodsExtension ? goodsExtension[0] : "";
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
          <Button onClick={() => copyLink()}>复制链接</Button>
          <Button type={"primary"} onClick={() => open()}>
            打开链接
          </Button>
        </>
      }
    >
      {isLoading ? (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      ) : (
        <Wrap>
          <div style={{ marginBottom: "2.4rem" }}>
            下单链接地址：{goodsExtension ? goodsExtension[0] : ""}
          </div>
          <Image
            width={160}
            height={160}
            src={goodsExtension ? goodsExtension[0] : ""}
          />
        </Wrap>
      )}
    </Modal>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
