import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useFlagSetting } from "service/order";

export const useShopListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "shop_type",
    "page",
    "per_page",
  ]);
  return [
    useMemo(
      () => ({
        shop_type: params.shop_type || "10",
        page: Number(params.page) || 1,
        per_page: Number(params.per_page) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useShopListQueryKey = () => {
  const [params] = useShopListSearchParams();
  return ["shop_list", params];
};

export const useFlagModal = () => {
  const [{ shopType, flagModalVisible }, setFlagModalVisible] =
    useUrlQueryParams(["shopType", "flagModalVisible"]);
  const open = useCallback(
    (shopType: string) =>
      setFlagModalVisible({ shopType, flagModalVisible: true }),
    [setFlagModalVisible]
  );
  const setUrlParams = useSetUrlSearchParams();

  const { data: flagSetting, isLoading } = useFlagSetting(
    shopType,
    flagModalVisible === "true"
  );

  const close = useCallback(
    () => setUrlParams({ shopType: "", flagModalVisible: "" }),
    [setUrlParams]
  );
  return {
    flagModalOpen: flagModalVisible === "true",
    open,
    close,
    flagSetting,
    isLoading,
  };
};

export const useApplyModal = () => {
  const [{ shopApplyModalVisible }, setShopApplyModalVisible] =
    useUrlQueryParams(["shopApplyModalVisible"]);
  const open = useCallback(
    () => setShopApplyModalVisible({ shopApplyModalVisible: true }),
    [setShopApplyModalVisible]
  );
  const setUrlParams = useSetUrlSearchParams();
  const close = useCallback(
    () => setUrlParams({ shopApplyModalVisible: "" }),
    [setUrlParams]
  );
  return {
    shopApplyModalOpen: shopApplyModalVisible === "true",
    open,
    close,
  };
};

export const useSettingModal = () => {
  const [{ settingShopId }, setEditingShopId] = useUrlQueryParams([
    "settingShopId",
  ]);
  const open = useCallback(
    (id: string) => setEditingShopId({ settingShopId: id }),
    [setEditingShopId]
  );
  const setUrlParams = useSetUrlSearchParams();
  const close = useCallback(
    () => setUrlParams({ settingShopId: "" }),
    [setUrlParams]
  );
  return {
    shopSettingModalOpen: !!settingShopId,
    settingShopId,
    open,
    close,
  };
};
