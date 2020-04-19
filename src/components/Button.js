import React from 'react'
import styled, { css } from 'styled-components'

const disabledStyles = css`
  background: #dfdfdf;
  font-size: 20px;
  color: #bebebe;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
`

const Root = styled.span`
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 300;
  background-color: #a371b0;
  color: #fff;
  white-space: nowrap;
  display: inline-block;
  padding: 0 18px;
  border-radius: 2px;
  cursor: pointer;
  ${props => props.disabled && disabledStyles}
`

export function PureButton({ children, disabled }) {
  return <Root disabled={disabled}>{children}</Root>
}

export default props => <PureButton {...props} />
