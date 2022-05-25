import { Button, Modal } from "antd";
import { useExportDelivers } from "service/order";
import { DeliversSearchParams } from "types/order";
import { useExportModal } from "../util";

export const ExportModal = ({
  params,
}: {
  params: Partial<DeliversSearchParams>;
}) => {
  const { exportModalOpen, close } = useExportModal();
  const exportDelivers = useExportDelivers();

  const generate = () => {
    exportDelivers(params);
    closeModal();
  };

  const check = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"为了给您提供更好的查询性能以及体检"}
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
