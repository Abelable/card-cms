import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useExportDelivers } from "service/order";
import { useExportModal } from "../util";
import type { DeliversSearchParams } from "types/order";

export const ExportModal = ({
  params,
}: {
  params: Partial<DeliversSearchParams>;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { exportModalOpen, close } = useExportModal();
  const exportDelivers = useExportDelivers();

  const generate = async () => {
    setIsLoading(true);
    try {
      await exportDelivers(params);
      navigate("/order/deliver/report_forms");
      setIsLoading(false);
    } catch (error) {
      message.error((error as Error).message);
      setIsLoading(false);
    }
  };

  const check = () => navigate("/order/deliver/report_forms");

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
          <Button loading={isLoading} onClick={generate}>
            生成报表
          </Button>
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
