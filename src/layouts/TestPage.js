import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export function PureTestPage({ children, ...rest }) {
  return <Root {...rest}>{children}</Root>
}

const SideBar = (() => {
  const Root = styled.div`
    flex: 0 0 300px;
  `
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

const TestPart = (() => {
  const Root = styled.div`
    flex: 1;
  `
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

PureTestPage.SideBar = SideBar
PureTestPage.TestPart = TestPart
