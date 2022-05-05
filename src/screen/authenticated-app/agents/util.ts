import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useAgentsSearchParams = () => {
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

export const useAgentsQueryKey = () => {
  const [params] = useAgentsSearchParams();
  return ["agents", params];
};

export const useAgentModal = () => {
  const [{ agentCreate }, setAgentsModalOpen] = useUrlQueryParams([
    "agentCreate",
  ]);
  const [{ editingAgentId }, setEditingAgentId] = useUrlQueryParams([
    "editingAgentId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setAgentsModalOpen({ agentCreate: true }),
    [setAgentsModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingAgentId({ editingAgentId: id }),
    [setEditingAgentId]
  );
  const close = useCallback(
    () => setUrlParams({ agentCreate: "", editingAgentId: "" }),
    [setUrlParams]
  );

  return {
    agentModalOpen: agentCreate === "true" || !!editingAgentId,
    editingAgentId,
    open,
    startEdit,
    close,
  };
};

export const useAgentShopModal = () => {
  const [{ agentIdOfEditingShop }, setEditingAgentId] = useUrlQueryParams([
    "agentIdOfEditingShop",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const startEdit = useCallback(
    (id: string) => setEditingAgentId({ agentIdOfEditingShop: id }),
    [setEditingAgentId]
  );
  const close = useCallback(
    () => setUrlParams({ agentIdOfEditingShop: "" }),
    [setUrlParams]
  );

  return {
    agentShopModalOpen: !!agentIdOfEditingShop,
    agentIdOfEditingShop,
    startEdit,
    close,
  };
};

export const useAgentActivationModal = () => {
  const [{ agentIdOfEditingActivation }, setEditingAgentId] = useUrlQueryParams(
    ["agentIdOfEditingActivation"]
  );
  const setUrlParams = useSetUrlSearchParams();
  const startEdit = useCallback(
    (id: string) => setEditingAgentId({ agentIdOfEditingActivation: id }),
    [setEditingAgentId]
  );
  const close = useCallback(
    () => setUrlParams({ agentIdOfEditingActivation: "" }),
    [setUrlParams]
  );

  return {
    agentActivationModalOpen: !!agentIdOfEditingActivation,
    agentIdOfEditingActivation,
    startEdit,
    close,
  };
};

export const useAgentRechargeModal = () => {
  const [{ agentIdOfEditingRecharge }, setEditingAgentId] = useUrlQueryParams([
    "agentIdOfEditingRecharge",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const startEdit = useCallback(
    (id: string) => setEditingAgentId({ agentIdOfEditingRecharge: id }),
    [setEditingAgentId]
  );
  const close = useCallback(
    () => setUrlParams({ agentIdOfEditingRecharge: "" }),
    [setUrlParams]
  );

  return {
    agentRechargeModalOpen: !!agentIdOfEditingRecharge,
    agentIdOfEditingRecharge,
    startEdit,
    close,
  };
};
