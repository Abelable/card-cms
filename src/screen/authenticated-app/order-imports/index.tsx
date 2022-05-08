import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useImports } from "service/order";
import { toNumber } from "utils";
import { List } from "./components/list";
import { useImportsSearchParams } from "./util";
import { Button, Divider, Tooltip } from "antd";
import { DownloadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { FileUpload } from "components/file-upload";

export const OrderImports = () => {
  const [params, setParams] = useImportsSearchParams();
  const { data, isLoading, error } = useImports(params);

  return (
    <Container>
      <Main>
        <Wrap gap>
          <Button icon={<DownloadOutlined />}>下载订单模版</Button>
          <FileUpload name="导入订单" />
          <Divider
            style={{ height: "3rem", marginRight: "2.8rem" }}
            type={"vertical"}
          />
          <Button icon={<DownloadOutlined />}>下载照片模版</Button>
          <FileUpload name="上传照片" />
          <Tooltip title="照片包上传后识别匹配大概需要等待30分钟">
            <QuestionCircleOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
          <Divider
            style={{ height: "3rem", marginRight: "2.8rem" }}
            type={"vertical"}
          />
          <Button icon={<DownloadOutlined />}>下载拼多多模版</Button>
          <FileUpload name="拼多多证件导入" />
          <Divider
            style={{ height: "3rem", marginRight: "2.8rem" }}
            type={"vertical"}
          />
          <FileUpload name="导入天猫信息" />
          <Divider
            style={{ height: "3rem", marginRight: "2.8rem" }}
            type={"vertical"}
          />
          <FileUpload name="导入有赞信息" />
        </Wrap>
        <List
          error={error}
          params={params}
          setParams={setParams}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.meta.pagination.current_page),
            pageSize: toNumber(data?.meta.pagination.per_page),
            total: toNumber(data?.meta.pagination.total),
          }}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const Wrap = styled(Row)`
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;
