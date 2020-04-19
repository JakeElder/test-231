import React from 'react'
import styled, { css } from 'styled-components'

const base = css`
  & + & {
    margin-left: 2px;
  }
  display: inline-block;
  border-radius: 2px;
  height: 24px;
  line-height: 24px;
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
`

const selected = css`
  border-color: transparent;
  color: #fff;
  background-color: #2764da;
`

const unselected = css`
  border-color: #e3e3e3;
`

const enabled = css`
  cursor: pointer;
`

const disabled = css`
  cursor: not-allowed;
`

const Root = styled.span`
  ${base}
  ${props => (props.selected ? selected : unselected)}
  ${props => (props.disabled ? disabled : enabled)}
`

const Input = styled.input`
  visibility: hidden;
  position: absolute;
  pointer-events: none;
`

export function PureWordInput({ children: word, selected, disabled, name }) {
  const control = name ? (
    <Input type="checkbox" name={name} value={word} selected={selected} />
  ) : null
  return (
    <Root selected={selected} disabled={disabled}>
      {word}
      {control}
    </Root>
  )
}

export default props => <PureWordInput {...props} />
