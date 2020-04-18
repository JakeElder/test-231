import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 124px;
  border-bottom: 1px solid #999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
`

export function PureTestPartHeader({ children }) {
  return <Root>{children}</Root>
}

const MainTitle = (() => {
  const Root = styled.div`
    margin-bottom: 12px;
  `
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

const MainSubTitle = (() => {
  const Root = styled.div`
    margin-bottom: 25px;
  `
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

PureTestPartHeader.MainTitle = MainTitle
PureTestPartHeader.MainSubTitle = MainSubTitle
