import { Modal, Button, Tree } from "antd";
import { ErrorBox } from "components/lib";
import { useUpdateRolePermission } from "service/role";
import { usePermissionModal } from "../util";

import type { DataNode, TreeProps } from "antd/es/tree";

export const PermissionModal = () => {
  const { permissionModalOpen, editingPermissionRoleId, permission, close } =
    usePermissionModal();
  const { mutateAsync, isLoading, error } = useUpdateRolePermission();

  const treeData: DataNode[] = [
    {
      title: "我的供应商",
      key: "0-0",
    },
    {
      title: "我的代理商",
      key: "0-1",
    },
    {
      title: "产品管理中心",
      key: "0-2",
      children: [
        {
          title: "产品渠道管理",
          key: "0-2-0",
        },
        {
          title: "在售商品管理",
          key: "0-2-1",
        },
      ],
    },
    {
      title: "订单中心",
      key: "0-3",
      children: [
        {
          title: "订单处理",
          key: "0-3-0",
        },
        {
          title: "转单配置",
          key: "0-3-1",
        },
        {
          title: "抓单管理",
          key: "0-3-2",
        },
      ],
    },
    {
      title: "生产管理中心",
      key: "0-4",
      children: [
        {
          title: "生产发货",
          key: "0-4-0",
        },
        {
          title: "自动生产配置",
          key: "0-4-1",
        },
        {
          title: "批量导入",
          key: "0-4-2",
        },
      ],
    },
    {
      title: "系统管理",
      key: "0-5",
      children: [
        {
          title: "黑名单配置",
          key: "0-5-0",
        },
        {
          title: "地址库映射",
          key: "0-5-1",
        },
      ],
    },
    {
      title: "账户管理",
      key: "0-6",
      children: [
        {
          title: "我的团队",
          key: "0-6-0",
        },
        {
          title: "岗位管理",
          key: "0-6-1",
        },
      ],
    },
  ];

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const confirm = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title="权限配置"
      onCancel={closeModal}
      visible={permissionModalOpen}
      confirmLoading={isLoading}
      footer={
        <>
          <Button onClick={closeModal}>取消</Button>
          <Button type={"primary"} onClick={() => confirm()}>
            确定
          </Button>
        </>
      }
    >
      <ErrorBox error={error} />
      <Tree
        checkable
        defaultExpandedKeys={["0-0"]}
        defaultSelectedKeys={["0-0"]}
        defaultCheckedKeys={["0-0"]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    </Modal>
  );
};
