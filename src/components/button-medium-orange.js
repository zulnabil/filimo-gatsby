import React from "react"
import styled from "styled-components"

const BtnWrapper = styled.div`
  display: flex;
  border-radius: 100%;
  width: 90px;
  height: 90px;
  background: ${props =>
    props.clicked
      ? "linear-gradient(134.06deg, #DB501F 15.56%, #BA391D 83.35%)"
      : "linear-gradient(134.06deg, #BA391D 15.56%, #DB501F 83.35%)"};
  box-shadow: ${props =>
    props.clicked
      ? "-9px -9px 20px rgba(81, 87, 97, 0.70), 15px 15px 26px rgba(0, 0, 0, 0.45)"
      : "-8px -8px 18px rgba(81, 87, 97, 0.65), 14px 14px 24px rgba(0, 0, 0, 0.4)"};
  transition: all 0.2s;
`

const Btn = styled.div`
  display: flex;
  margin: auto;
  border-radius: 100%;
  width: 84px;
  height: 84px;

  background: ${props =>
    props.clicked
      ? "linear-gradient(135.09deg, #BB241B 1.07%, #E65721 83.33%)"
      : "linear-gradient(135.09deg, #E65721 17.07%, #BB241B 83.33%)"};

  transition: all 0.2s;
`

const ButtonMediumOrange = ({ children, clicked, onClick }) => (
  <BtnWrapper clicked={clicked} onClick={onClick}>
    <Btn clicked={clicked}>{children}</Btn>
  </BtnWrapper>
)

export default ButtonMediumOrange
