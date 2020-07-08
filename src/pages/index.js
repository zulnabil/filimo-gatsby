import React, { useState } from "react"
import { Link } from 'gatsby'
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ButtonMediumOrange from "../components/button-medium-orange"
import Image from "../components/image"
import ButtonGetStarted from "../components/button-get-started"
import TransitionLink from "gatsby-plugin-transition-link"
import posed from "react-pose"

const TxtSubFilimo = styled.p`
  font-size: 24px;
  font-weight: normal;
  line-height: 18px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`

const TxtFilimo = styled.p`
  margin-top: 60px;
  font-size: 48px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
`

const TxtDesc = styled.p`
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`

const TxtGetStarted = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
`

const Child = posed.div({
  visible: { y: 0, opacity: 1 },
  hidden: { y: 50, opacity: 0 },
  initialPose: "hidden",
})

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Welcome" />
      <Child>
        <TxtFilimo>Filimo</TxtFilimo>
      </Child>
      <Child>
        <TxtSubFilimo>Feel your emotion</TxtSubFilimo>
      </Child>
      <Child>
        <div style={{ maxWidth: `300px`, margin: `1.45rem auto` }}>
          <Image />
        </div>
      </Child>
      <Child>
        <TxtDesc>
          Filimo adalah kecerdasan buatan yang
          <br />
          dapat mengenali emosi manusia.
          <br />
          Kamu cukup merekam suara lewat Filimo,
          <br />
          kemudian Filimo akan mengenali emosi kamu.
        </TxtDesc>
      </Child>
      <Child>
        <div style={{ width: 160, margin: "auto" }}>
          <Link
            to="analyze"
            // exit={{
            //   length: 0.5,
            // }}
            // entry={{
            //   delay: 0.5,
            // }}
          >
            <ButtonGetStarted>
              <TxtGetStarted>Mulai Sekarang</TxtGetStarted>
            </ButtonGetStarted>
          </Link>
        </div>
      </Child>
    </Layout>
  )
}

export default IndexPage
