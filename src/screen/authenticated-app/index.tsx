import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useUserInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";
import { Home } from "./home";
import { Suppliers } from "./suppliers";
import { SupplierGoodsList } from "./supplier-goods-list";
import { Agents } from "./agents";
import { AgentGoodsList } from "./agent-goods-list";
import { ProductChannels } from "./product-channels";
import { ProductChannelGoodsList } from "./product-channel-goods-list";
import { ProductGoodsList } from "./product-goods-list";
import { ProductGoodsAgents } from "./product-goods-agents";
import { OrderProducts } from "./order-products";
import { OrderImports } from "./order-imports";
import { Blacklist } from "./blacklist";
import { AddressList } from "./address-list";
import { OrderDelivers } from "./order-delivers";
import { OrderReportForms } from "./order-report-forms";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserSwitchOutlined,
  GoldOutlined,
  NodeIndexOutlined,
  SnippetsOutlined,
  ToolOutlined,
  SettingOutlined,
  ImportOutlined,
  RobotOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import logo from "assets/images/logo.png";
import { UserInfo } from "types/auth";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: userInfo } = useUserInfo();
  const { logout } = useAuth();

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <MenuSider collapsed={collapsed} />
        <Layout>
          <Header>
            <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
            <User userInfo={userInfo} logout={logout} />
          </Header>
          <NavigationBar />
          <Content>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route
                path="suppliers/goods_list"
                element={<SupplierGoodsList />}
              />
              <Route path="agents" element={<Agents />} />
              <Route path="agents/goods_list" element={<AgentGoodsList />} />
              <Route path="product/channels" element={<ProductChannels />} />
              <Route
                path="product/channels/goods_list"
                element={<ProductChannelGoodsList />}
              />
              <Route path="product/sales" element={<ProductGoodsList />} />
              <Route
                path="product/sales/agent"
                element={<ProductGoodsAgents />}
              />
              <Route path="order/deliver" element={<OrderDelivers />} />
              <Route
                path="order/deliver/report_forms"
                element={<OrderReportForms />}
              />
              <Route path="order/configure" element={<OrderProducts />} />
              <Route path="order/import" element={<OrderImports />} />
              <Route path="system/blacklist" element={<Blacklist />} />
              <Route path="system/address_list" element={<AddressList />} />
              <Route
                path={"*"}
                element={<Navigate to={"home"} replace={true} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuSider = ({ collapsed }: { collapsed: boolean }) => {
  const { defaultOpenKey, selectedKey } = useRouteType();

  const items: MenuProps["items"] = [
    {
      label: <Link to={"home"}>首页</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"suppliers"}>我的供应商</Link>,
      key: "suppliers",
      icon: <ShopOutlined />,
    },
    {
      label: <Link to={"agents"}>我的代理商</Link>,
      key: "agents",
      icon: <UserSwitchOutlined />,
    },
    {
      label: "产品管理中心",
      key: "product",
      icon: <GoldOutlined />,
      children: [
        {
          label: <Link to={"product/channels"}>产品渠道管理</Link>,
          key: "channels",
          icon: <NodeIndexOutlined />,
        },
        {
          label: <Link to={"product/sales"}>在售商品管理</Link>,
          key: "sales",
          icon: <ShoppingOutlined />,
        },
      ],
    },
    {
      label: "订单管理中心",
      key: "order",
      icon: <SnippetsOutlined />,
      children: [
        {
          label: <Link to={"order/deliver"}>生产发货</Link>,
          key: "deliver",
          icon: <ToolOutlined />,
        },
        {
          label: <Link to={"order/configure"}>自动生产配置</Link>,
          key: "configure",
          icon: <RobotOutlined />,
        },
        {
          label: <Link to={"order/import"}>批量导入</Link>,
          key: "import",
          icon: <ImportOutlined />,
        },
      ],
    },
    {
      label: "系统管理",
      key: "system",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to={"system/blacklist"}>黑名单配置</Link>,
          key: "blacklist",
          icon: <UserDeleteOutlined />,
        },
        {
          label: <Link to={"system/address_list"}>地址库维护</Link>,
          key: "address_list",
          icon: <UserDeleteOutlined />,
        },
      ],
    },
  ];

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>久梦号卡系统后台</div>
        </Logo>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[selectedKey]}
        items={items}
      />
    </Layout.Sider>
  );
};

interface Collapsed {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Trigger = ({ collapsed, setCollapsed }: Collapsed) => {
  return (
    <div onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <Unfold /> : <Fold />}
    </div>
  );
};

const User = ({
  userInfo,
  logout,
}: {
  userInfo: UserInfo | undefined;
  logout: () => void;
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <UserInner>
        <div style={{ lineHeight: 1.5, marginRight: "1rem" }}>
          <div>欢迎您！</div>
          <div>{userInfo?.username}</div>
        </div>
        <CaretDownOutlined style={{ fontSize: "1.2rem" }} />
      </UserInner>
    </Dropdown>
  );
};

const UserInner = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  padding-left: ${(props) => (props.collapsed ? "2.6rem" : "1.6rem")};
  transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  > div {
    margin-left: 1rem;
    flex: 1;
    height: 2.2rem;
    color: #fff;
    overflow: hidden;
    opacity: ${(props) => (props.collapsed ? 0 : 1)};
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const LogoImg = styled.img<{ size?: number }>`
  width: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  height: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  border-radius: 50%;
  cursor: pointer;
`;

const Header = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 2.4rem;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 21 41 / 8%);
  z-index: 10;
`;

const Unfold = styled(MenuUnfoldOutlined)`
  padding: 0 2.4rem;
  font-size: 1.8rem;
  line-height: 6.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Fold = Unfold.withComponent(MenuFoldOutlined);

const Content = styled(Layout.Content)`
  height: 100%;
`;
