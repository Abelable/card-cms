import { Modal, Button, Tree } from "antd";
import { ErrorBox } from "components/lib";
import { useUpdateRolePermission } from "service/role";
import { usePermissionModal } from "../util";

import type { DataNode, TreeProps } from "antd/es/tree";
import { Key, useEffect, useState } from "react";

export const PermissionModal = () => {
  const { permissionModalOpen, editingPermissionRoleId, permission, close } =
    usePermissionModal();
  const { mutateAsync, isLoading, error } = useUpdateRolePermission();

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  const treeData: DataNode[] = [
    {
      title: "首页",
      key: "home",
    },
    {
      title: "我的供应商",
      key: "suppliers",
    },
    {
      title: "我的代理商",
      key: "agents",
    },
    {
      title: "产品管理中心",
      key: "product",
      children: [
        {
          title: "产品渠道管理",
          key: "channels",
        },
        {
          title: "在售商品管理",
          key: "sales",
        },
      ],
    },
    {
      title: "订单中心",
      key: "order",
      children: [
        {
          title: "订单处理",
          key: "handle",
        },
        {
          title: "订单处理 > 导出信息脱敏并加密码",
          key: "encryption",
        },
        {
          title: "转单配置",
          key: "convert",
        },
        {
          title: "抓单管理",
          key: "grab",
        },
        {
          title: "回调记录",
          key: "record",
        },
      ],
    },
    {
      title: "生产管理中心",
      key: "produce",
      children: [
        {
          title: "生产发货",
          key: "deliver",
        },
        {
          title: "自动生产配置",
          key: "configure",
        },
        {
          title: "批量导入",
          key: "import",
        },
      ],
    },
    {
      title: "系统管理",
      key: "system",
      children: [
        {
          title: "黑名单配置",
          key: "blacklist",
        },
        {
          title: "地址库映射",
          key: "address_list",
        },
      ],
    },
    {
      title: "账户管理",
      key: "account",
      children: [
        {
          title: "我的团队",
          key: "member",
        },
        {
          title: "岗位管理",
          key: "role",
        },
      ],
    },
  ];

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys as Key[]);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys as Key[]);
  };

  const onExpand: TreeProps["onExpand"] = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys as Key[]);
  };

  const confirm = async () => {
    await mutateAsync({ id: +editingPermissionRoleId, perms: checkedKeys });
    closeModal();
  };

  const closeModal = () => {
    close();
  };

  useEffect(() => {
    if (permission && permission.length) {
      setCheckedKeys(permission);
    }
  }, [permission]);

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
        selectedKeys={selectedKeys}
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        onExpand={onExpand}
        treeData={treeData}
      />
    </Modal>
  );
};
