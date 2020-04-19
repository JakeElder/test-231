import React from 'react'
import styled from 'styled-components'

import Container from '../components/TestPartContainer'

const Root = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

export function PureTestPart({ children }) {
  return <Root>{children}</Root>
}

const Header = (() => {
  const Root = styled.div`
    margin-bottom: 36px;
    flex: 0;
  `
  return function({ children }) {
    return (
      <Root>
        <Container>{children}</Container>
      </Root>
    )
  }
})()

const Body = (() => {
  const Root = styled.div`
    flex: 1;
  `
  return function({ children }) {
    return (
      <Root>
        <Container>{children}</Container>
      </Root>
    )
  }
})()

const Footer = (() => {
  const Root = styled.div`
    background: #fafafa;
  `
  const Main = styled.div`
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
  return function({ children }) {
    return (
      <Root>
        <Container>
          <Main>{children}</Main>
        </Container>
      </Root>
    )
  }
})()

PureTestPart.Header = Header
PureTestPart.Body = Body
PureTestPart.Footer = Footer