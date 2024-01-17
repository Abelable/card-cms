import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useFlagSetting } from "service/order";

export const useOrderGrabListSearchParams = () => {
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

export const useOrderGrabListQueryKey = () => {
  const [params] = useOrderGrabListSearchParams();
  return ["order_grab_list", params];
};

export const useFlagModal = () => {
  const [{ flagModalVisible }, setFlagModalVisible] = useUrlQueryParams([
    "flagModalVisible",
  ]);
  const open = useCallback(
    () => setFlagModalVisible({ flagModalVisible: true }),
    [setFlagModalVisible]
  );
  const setUrlParams = useSetUrlSearchParams();

  const { data: flagSetting, isLoading } = useFlagSetting(
    flagModalVisible === "true"
  );

  const close = useCallback(
    () => setUrlParams({ flagModalVisible: "" }),
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
