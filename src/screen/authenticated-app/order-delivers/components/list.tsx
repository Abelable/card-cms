import styled from "@emotion/styled";
import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  message,
  Space,
  Divider,
  Tooltip,
} from "antd";
import {
  CopyOutlined,
  DownloadOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import { ErrorBox, Row } from "components/lib";
import { FileUpload } from "components/file-upload";
import { useQueryClient } from "react-query";
import copy from "copy-to-clipboard";
import {
  useDataModal,
  useDetailModal,
  useExportProductModal,
  useFailModal,
  useInfoModal,
  useOrderDeliversQueryKey,
  usePicModal,
  useRecordModal,
  useStatusModal,
} from "../util";
import { useDownloadTemplate } from "service/common";
import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";
import type { Deliver } from "types/order";

interface ListProps
  extends TableProps<Deliver>,
    Omit<SearchPanelProps, "agentOptions"> {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  error: Error | unknown;
}

export const List = ({
  error,
  orderStatusOptions,
  selectedRowKeys,
  setSelectedRowKeys,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const downloadTemplate = useDownloadTemplate();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  const { open: openExportProductModal } = useExportProductModal();
  const { open: openPicModal } = usePicModal();
  const { open: openRecordModal } = useRecordModal();
  const { startEdit: editStatus } = useStatusModal();
  const { startEdit: failDeliver } = useFailModal();
  const { open: openDataModal } = useDataModal();
  const { open: openInfoModal } = useInfoModal();
  const { open: openDetailModal } = useDetailModal();
  const copyInfo = (info: string) => {
    copy(info);
    message.success("复制成功");
  };

  const queryClient = useQueryClient();
  const queryKey = useOrderDeliversQueryKey();
  const handleSuccess = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      queryClient.invalidateQueries(queryKey);
      message.success(info.file.response.message);
    }
  };

  return (
    <Container>
      <Header between={true}>
        <h3>订单生产列表</h3>
        <Row gap>
          <Button type={"primary"} onClick={() => openExportProductModal()}>
            导出生产
          </Button>
          <Divider
            style={{ height: "3rem", marginLeft: 0 }}
            type={"vertical"}
          />
          <div style={{ marginRight: "1rem" }}>
            <FileUpload
              scene={1}
              name="导入生产数据"
              onChange={handleSuccess}
            />
          </div>
          <Tooltip title="下载生产模版">
            <Button
              onClick={() => downloadTemplate(1)}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
          <Divider
            style={{ height: "3rem", marginLeft: 0 }}
            type={"vertical"}
          />
          <div style={{ marginRight: "1rem" }}>
            <FileUpload
              scene={2}
              name="导入激活数据"
              onChange={handleSuccess}
            />
          </div>
          <Tooltip title="下载激活模版">
            <Button
              onClick={() => downloadTemplate(2)}
              style={{ marginRight: 0 }}
              size="small"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Tooltip>
        </Row>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "订单信息",
            fixed: "left",
            width: "32rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>订单id：{deliver.order_no}</div>
                  <Copy
                    onClick={() => copyInfo(deliver.order_no)}
                    style={{ color: "#1890ff" }}
                  />
                </Row>
                <Row>
                  <div>订单来源：{deliver.source}</div>
                  <Copy
                    onClick={() => copyInfo(deliver.source)}
                    style={{ color: "#1890ff" }}
                  />
                </Row>
                <Row>
                  <div>下游订单编号：{deliver.outer_order_no}</div>
                  <Copy
                    onClick={() => copyInfo(deliver.outer_order_no)}
                    style={{ color: "#1890ff" }}
                  />
                </Row>
                <div>平台创建时间：{deliver.created_at}</div>
              </Space>
            ),
          },
          {
            title: "产品信息",
            width: "26rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>产品名称：{deliver.product?.name}</div>
                <div>产品编码：{deliver.product?.encoding}</div>
              </Space>
            ),
          },
          {
            title: "证件信息&收货信息",
            width: "30rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Row>
                  <div>证件姓名：{deliver.buyer}</div>
                  <Tooltip title="查看证件照片">
                    <Check
                      onClick={() => openPicModal((deliver as Deliver).id)}
                    />
                  </Tooltip>
                </Row>
                <div>证件号码：{deliver.idcard}</div>
                <div>收件人：{deliver.receiver}</div>
                <div>联系电话：{deliver.phone}</div>
                <div>收货地址：{deliver.detail_address}</div>
              </Space>
            ),
          },
          {
            title: "订单状态",
            width: "18rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>
                  {
                    orderStatusOptions.find(
                      (item) => item.id === deliver.status
                    )?.name
                  }
                </div>
                <Link type={"link"} onClick={() => openRecordModal(deliver.id)}>
                  查看操作记录
                </Link>
                <div>
                  激活状态：{deliver.is_activated === 1 ? "已激活" : "未激活"}
                </div>
                <div>充值金额：{deliver.recharge_amount}元</div>
              </Space>
            ),
          },
          {
            title: "失败原因",
            width: "20rem",
            render: (value, deliver) => (
              <>{deliver.product_failed_reason || deliver.remark}</>
            ),
          },
          {
            title: "生产信息",
            width: "30rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <div>生产号码：{deliver.product_no}</div>
                <div>物流公司：{deliver.express_name}</div>
                <div>物流单号：{deliver.express_no}</div>
              </Space>
            ),
          },
          {
            title: "操作",
            fixed: "right",
            width: "12rem",
            render: (value, deliver) => (
              <Space direction={"vertical"}>
                <Link type={"link"} onClick={() => openDetailModal(deliver.id)}>
                  查看详情
                </Link>
                {deliver.status !== 3 ? (
                  <Link type={"link"} onClick={() => failDeliver(deliver.id)}>
                    生产失败
                  </Link>
                ) : null}
                <Link type={"link"} onClick={() => openDataModal(deliver.id)}>
                  录入生产数据
                </Link>
                <Link type={"link"} onClick={() => editStatus(deliver.id)}>
                  修改状态
                </Link>
                <Link type={"link"} onClick={() => openInfoModal(deliver.id)}>
                  修改订单信息
                </Link>
              </Space>
            ),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;

const Copy = styled(CopyOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;

const Check = styled(IdcardOutlined)`
  margin-left: 0.5rem;
  color: #1890ff;
  cursor: pointer;
`;

const Link = styled(Button)`
  padding: 0;
  height: fit-content;
  line-height: 1;
`;
