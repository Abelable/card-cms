import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/home": "首页",
  "/suppliers": "我的供应商",
  "/suppliers/goods_list": "查看供应商产品",
  "/agents": "我的代理商",
  "/agents/goods_list": "查看代理商商品",
  "/product": "产品管理中心",
  "/product/channels": "产品渠道管理",
  "/product/channels/goods_list": "关联商品",
  "/product/sales": "在售商品管理",
  "/product/sales/agent": "查看代理商",
  "/order": "订单中心",
  "/order/handle": "订单处理",
  "/order/convert": "转单配置",
  "/order/grab": "抓单管理",
  "/order/log": "回调记录",
  "/produce": "生产管理中心",
  "/produce/deliver": "生产发货",
  "/produce/deliver/report_forms": "导出订单",
  "/produce/configure": "自动生产配置",
  "/produce/import": "批量导入",
  "/system": "系统管理",
  "/system/blacklist": "黑名单配置",
  "/system/address_list": "地址库映射",
  "/account": "账户管理",
  "/account/member": "我的团队",
  "/account/role": "岗位管理",
};

export const NavigationBar = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Wrap>
      <div>当前位置：</div>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-bottom: 0.4rem;
`;
