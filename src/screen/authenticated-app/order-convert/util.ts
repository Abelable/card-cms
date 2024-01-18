import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useRuleListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "page", "per_page"]);
  return [
    useMemo(
      () => ({
        ...params,
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useRuleListQueryKey = () => {
  const [params] = useRuleListSearchParams();
  return ["rule_list", params];
};

export const useRuleModal = () => {
  const [{ ruleCreate }, setRuleModalOpen] = useUrlQueryParams(["ruleCreate"]);
  const [{ editingRuleId }, setEditingRuleId] = useUrlQueryParams([
    "editingRuleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setRuleModalOpen({ ruleCreate: true }),
    [setRuleModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingRuleId({ editingRuleId: id }),
    [setEditingRuleId]
  );
  const close = useCallback(
    () => setUrlParams({ ruleCreate: "", editingRuleId: "" }),
    [setUrlParams]
  );

  return {
    ruleModalOpen: ruleCreate === "true" || !!editingRuleId,
    editingRuleId,
    open,
    startEdit,
    close,
  };
};
