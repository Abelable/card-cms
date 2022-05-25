import { Button, Modal } from "antd";
import { useExportProductModal } from "../util";

export const ExportProductModal = () => {
  const { exportProducModalOpen, close } = useExportProductModal();

  const exportFilter = () => {
    closeModal();
  };

  const exportAll = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"导出生产"}
      visible={exportProducModalOpen}
      onCancel={closeModal}
      footer={
        <>
          <Button onClick={exportFilter}>按条件导出生产</Button>
          <Button type={"primary"} onClick={exportAll}>
            导出全部待生产
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
