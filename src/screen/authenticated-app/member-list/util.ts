import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useMemberListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "per_page"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useMemberListQueryKey = () => {
  const [params] = useMemberListSearchParams();
  return ["member_list", params];
};

export const useMemberModal = () => {
  const [{ memberCreate }, setMemberModalOpen] = useUrlQueryParams([
    "memberCreate",
  ]);
  const [{ editingMemberId }, setEditingMemberId] = useUrlQueryParams([
    "editingMemberId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setMemberModalOpen({ memberCreate: true }),
    [setMemberModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingMemberId({ editingMemberId: id }),
    [setEditingMemberId]
  );
  const close = useCallback(
    () => setUrlParams({ memberCreate: "", editingMemberId: "" }),
    [setUrlParams]
  );

  return {
    memberModalOpen: memberCreate === "true" || !!editingMemberId,
    editingMemberId,
    open,
    startEdit,
    close,
  };
};

export const usePwdModal = () => {
  const [{ resetPwdMemberId }, setEditingMemberId] = useUrlQueryParams([
    "resetPwdMemberId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const open = useCallback(
    (id: string) => setEditingMemberId({ resetPwdMemberId: id }),
    [setEditingMemberId]
  );
  const close = useCallback(
    () => setUrlParams({ resetPwdMemberId: "" }),
    [setUrlParams]
  );

  return {
    pwdModalOpen: !!resetPwdMemberId,
    resetPwdMemberId,
    open,
    close,
  };
};
