import { Modal, Button, Spin, message } from "antd";
import copy from "copy-to-clipboard";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useLinkModal } from "../util";
import styled from "@emotion/styled";

export const LinkModal = () => {
  const { linkModalOpen, goodsExtension, close, isLoading } = useLinkModal();

  const copyLink = () => {
    copy(goodsExtension ? goodsExtension[0] : "");
    message.success("复制成功");
  };

  const open = () => {
    window.location.href = goodsExtension ? goodsExtension[0] : "";
  };

  const download = () => {
    const node = document.getElementById("code");
    domtoimage.toBlob(node as Node).then((blob) => saveAs(blob));
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
          <QRCodeWrap id="code" onClick={() => download()}>
            <QRCode value={goodsExtension ? goodsExtension[0] : ""} />
          </QRCodeWrap>
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

const QRCodeWrap = styled.div`
  cursor: pointer;
`;
