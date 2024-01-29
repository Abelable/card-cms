import { Input, message, Modal, Select } from "antd";
import { ErrorBox, Row } from "components/lib";

import { useState } from "react";
import { useGoodsByCode } from "service/product";
import { useUpdateOrderGoods } from "service/order";
import { useOrderListQueryKey, useReapplyModal } from "../util";

import type { GoodsOption } from "types/product";

export const ReapplyModal = ({
  goodsOptions,
}: {
  goodsOptions: GoodsOption[];
}) => {
  const { reapplyModalOpen, reapplyOrderId, close } = useReapplyModal();
  const [goodsId, setGoodsId] = useState<number | undefined>();
  const [goodsCode, setGoodsCode] = useState("");

  const goodsInfo = useGoodsByCode(goodsCode);
  const { mutateAsync, isLoading, error } = useUpdateOrderGoods(
    useOrderListQueryKey()
  );

  const confirm = async () => {
    if (!goodsId && !goodsCode) {
      message.error("请选择商品或通过编码查询商品！");
      return;
    }
    try {
      await mutateAsync({
        order_id: reapplyOrderId,
        goods_id: goodsId || goodsInfo?.id || 0,
      });
      closeModal();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal
      title={"修改商品"}
      visible={reapplyModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Row>
        <div>通过商品名称修改：</div>
        <Select
          style={{ width: "34.6rem" }}
          onSelect={(id: number) => setGoodsId(id)}
          onClear={() => setGoodsId(undefined)}
          allowClear
          placeholder="请选择商品"
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {goodsOptions.map(({ id, name }) => (
            <Select.Option key={id} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <Row style={{ marginTop: "3.2rem" }}>
        <div>通过商品编码修改：</div>
        <Input
          style={{ width: "34.6rem" }}
          onChange={(e) => setGoodsCode(e.target.value)}
          placeholder="请输入商品编码"
        />
      </Row>
      <Row style={{ marginTop: "3.2rem" }}>
        <div>查询结果：</div>
        <div>{goodsInfo ? goodsInfo.name : "没有查询到商品"}</div>
      </Row>
    </Modal>
  );
};
