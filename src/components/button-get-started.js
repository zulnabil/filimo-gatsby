import React from "react"
import styled from "styled-components"

const BtnWrapper = styled.div`
  cursor: pointer;
  margin: auto;
  display: flex;
  border-radius: 15px;
  width: 160px;
  height: 50px;
  background: ${props =>
    props.clicked
      ? "linear-gradient(134.06deg, #DB501F 15.56%, #BA391D 83.35%)"
      : "linear-gradient(134.06deg, #BA391D 15.56%, #DB501F 83.35%)"};
  box-shadow: ${props =>
    props.clicked
      ? "-10px -10px 20px rgba(255, 255, 255, 0.10), 10px 10px 20px rgba(0, 0, 0, 0.5)"
      : "-10px -10px 20px rgba(255, 255, 255, 0.10), 10px 10px 20px rgba(0, 0, 0, 0.5)"};
  transition: all 0.2s;
`

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 12px;
  width: 154px;
  height: 44px;
  text-shadow: none;

  background: ${props =>
    props.clicked
      ? "linear-gradient(135.09deg, #BB241B 1.07%, #E65721 83.33%)"
      : "linear-gradient(135.09deg, #E65721 17.07%, #BB241B 83.33%)"};

  transition: all 0.2s;

  &:hover {
    background: linear-gradient(134deg, #e76536 15%, #cf4020 83%);
  }
`

const ButtonGetStarted = ({ children, clicked, onClick }) => (
  <BtnWrapper clicked={clicked} onClick={onClick}>
    <Btn clicked={clicked}>{children}</Btn>
  </BtnWrapper>
)

export default ButtonGetStarted
