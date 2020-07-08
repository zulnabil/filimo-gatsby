import React from "react"
import styled from "styled-components"

const BtnWrapper = styled.div`
  display: flex;
  border-radius: 100%;
  position: absolute;
  width: 45px;
  height: 45px;
  top: 30px;
  right: 30px;
  background: ${props =>
    props.clicked
      ? "linear-gradient(134.06deg, #292e32 15.56%, #23262a 83.35%)"
      : "linear-gradient(134.06deg, #23262a 15.56%, #292e32 83.35%)"};
  box-shadow: ${props =>
    props.clicked
      ? "-5px -5px 12px rgba(81, 87, 97, 0.85), 5px 5px 12px rgba(0, 0, 0, 0.4)"
      : "-4px -4px 16px rgba(81, 87, 97, 0.85), 4px 4px 16px rgba(0, 0, 0, 0.4)"};
  transition: all 0.2s;
`

const Btn = styled.div`
  display: flex;
  margin: auto;
  border-radius: 100%;
  width: 41px;
  height: 41px;

  background: ${props =>
    props.clicked
      ? "linear-gradient(135.09deg, #1e2124 40.54%, #2c3035 83.33%)"
      : "linear-gradient(135.09deg, #2c3035 40.54%, #1e2124 83.33%)"};

  transition: all 0.2s;
`

const ButtonSmall = ({ children, clicked, onClick }) => (
  <BtnWrapper clicked={clicked} onClick={onClick}>
    <Btn clicked={clicked}>{children}</Btn>
  </BtnWrapper>
)

export default ButtonSmall
