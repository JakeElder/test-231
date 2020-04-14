import React from 'react'
import styled from 'styled-components'

import Container from './Container'
import AboutPiyapodokCards from './AboutPiyapodokCards'

import useBlock from '../hooks/use-block'
import useLang from '../hooks/use-lang'

const Root = styled(Container)`
  padding-top: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Heading = styled.h1`
  font-size: 34px;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #333;
`

const Copy = styled.div`
  font-size: 18px;
  line-height: 1.5;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 40px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`

const AboutPiyapodokBlock = ({ className }) => {
  const lang = useLang()
  const { heading, primaryCopy } = useBlock('about-piyapodok-dhammastan', lang)

  return (
    <Root className={className}>
      <Heading>{heading.text}</Heading>
      <Copy dangerouslySetInnerHTML={{ __html: primaryCopy.html }} />
      <AboutPiyapodokCards />
    </Root>
  )
}

export default AboutPiyapodokBlock
