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
