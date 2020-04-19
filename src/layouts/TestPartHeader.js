import React from 'react'
import styled, { css } from 'styled-components'

const Root = styled.div`
  height: 124px;
  border-bottom: 1px solid #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
`

export function PureTestPartHeader({ children }) {
  return <Root>{children}</Root>
}

const Title = (() => {
  const margin = css`
    margin: 6px 0 12px 0;
  `
  const Root = styled.div`
    ${props => (props.noSubtitle ? '' : margin)}
  `
  return function({ children, noSubtitle = false }) {
    return <Root noSubtitle={noSubtitle}>{children}</Root>
  }
})()

const Subtitle = (() => {
  const Root = styled.div``
  return function({ children }) {
    return <Root>{children}</Root>
  }
})()

PureTestPartHeader.Title = Title
PureTestPartHeader.Subtitle = Subtitle
