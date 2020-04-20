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
    padding: 36px 0 60px 0;
    overflow: scroll;
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

const AnswerArea = styled.div``

const AudioPlayer = styled.div`
  & + ${AnswerArea} {
    margin-top: 30px;
  }
`

const Instruction = styled.div`
  & + ${AudioPlayer} {
    margin-top: 26px;
  }
`

PureTestPart.Header = Header
PureTestPart.Body = Body
PureTestPart.Footer = Footer
PureTestPart.Instruction = Instruction
PureTestPart.AudioPlayer = AudioPlayer
PureTestPart.AnswerArea = AnswerArea
