import styled from "@emotion/styled";
import pdd from "assets/images/pdd.png";
import { useFlagModal } from "../util";

export const PlatformBar = () => {
  const { open } = useFlagModal();

  return (
    <Platform>
      <PlatFormBgImg src={pdd} />
      <FlagBtn onClick={open}>订单标旗设置</FlagBtn>
    </Platform>
  );
};

const Platform = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1.6rem;
  height: 8.8rem;
  background: #f72c50;
`;
const PlatFormBgImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 8.4rem;
`;
const FlagBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4rem;
  padding: 0 2rem;
  height: 4rem;
  color: #f72c50;
  border-radius: 2rem;
  background: #fff;
  cursor: pointer;
  z-index: 1;
`;
