import { Button, Modal } from "antd";
import { useExportModal } from "../util";

export const ExportModal = () => {
  const { exportModalOpen, close } = useExportModal();

  const check = () => {
    closeModal();
  };

  const generate = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"导出生产"}
      visible={exportModalOpen}
      onCancel={closeModal}
      footer={
        <>
          <Button onClick={generate}>生成报表</Button>
          <Button type={"primary"} onClick={check}>
            查看已生成的报表
          </Button>
        </>
      }
    >
      <div style={{ color: "#666" }}>
        <div>1.为了保证您的查询性能，两次导出的时间请间隔5分钟</div>
        <div>2.我们将为您保留已生成的数据，便于您随时导出使用</div>
      </div>
    </Modal>
  );
};
