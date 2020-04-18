import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
display: flex;
height: 100%;
`

export function PureTestPage({ children }) {
  return <Root>{children}</Root>
}

const SideBar = (() => {
  const Root = styled.div``
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

const TestPart = (() => {
  const Root = styled.div``
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

PureTestPage.SideBar = SideBar
PureTestPage.TestPart = TestPart
