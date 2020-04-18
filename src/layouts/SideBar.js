import React from 'react'
import styled from 'styled-components'

import SideBarContainer from '../components/SideBarContainer'

const Root = styled.div`
  background: #494949;
  width: 300px;
  padding-bottom: 30px;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`

export function PureSideBar({ children }) {
  return <Root>{children}</Root>
}

const Ident = (() => {
  const Root = styled.div`
    flex-shrink: 0;
    height: 124px;
    box-sizing: border-box;
    padding-top: 34px;
  `
  return function({ children }) {
    return (
      <Root>
        <SideBarContainer>{children}</SideBarContainer>
      </Root>
    )
  }
})()

const Plot = (() => {
  const Root = styled.div`
    flex: 1;
  `
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

const Timer = (() => {
  const Root = styled.div`
    flex-shrink: 0;
    padding-top: 40px;
  `
  return function({ children }) {
    return (
      <Root>
        <SideBarContainer>{children}</SideBarContainer>
      </Root>
    )
  }
})()

PureSideBar.Ident = Ident
PureSideBar.Plot = Plot
PureSideBar.Timer = Timer
