/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"
import { Menu } from "styled-icons/boxicons-regular/Menu"
import posed from "react-pose"
import { TransitionState } from "gatsby-plugin-transition-link"

import ButtonSmall from "./button-small"

// import Header from "./header"
// import "./layout.css"

const Container = styled.div`
  position: relative;
  text-align: center;
  max-width: 500px;
  margin: auto;
  overflow: hidden;
  min-height: 100vh;
`

const IconMenu = styled(Menu)`
  margin: auto;
  color: white;
  opacity: 0.65;
  width: 16px;
  height: 16px;
`

const Fade = posed.div({
  visible: {
    x: "0%",
    opacity: 1,
    beforeChildren: true,
    staggerChildren: 100,
  },
  hidden: {
    x: "-100%",
    opacity: 0,
    afterChildren: true,
  },
  initialPose: "hidden",
})

const Layout = ({ children, havemenu }) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      <TransitionState>
        {({ mount, transitionStatus }) => (
          <Fade
            pose={
              ["entering", "entered"].includes(transitionStatus)
                ? "visible"
                : "hidden"
            }
          >
            <GlobalStyle />
            <Container>
              {havemenu ? (
                <ButtonSmall clicked={clicked} onClick={handleClick}>
                  <IconMenu />
                </ButtonSmall>
              ) : null}
              {/* <Child> */}
              {children}
              {/* </Child> */}
            </Container>
          </Fade>
        )}
      </TransitionState>
      {/* <GlobalStyle />
      <Container>
        {havemenu ? (
          <ButtonSmall clicked={clicked} onClick={handleClick}>
            <IconMenu />
          </ButtonSmall>
        ) : null}
        {children}
      </Container> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
