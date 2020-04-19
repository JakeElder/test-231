import React from 'react'
import styled, { css } from 'styled-components'

const common = {
  base: css`
    display: inline-block;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
  `,
  selected: css`
    color: #fff;
    background-color: #2764da;
  `,
  unselected: css``,
  enabled: css`
    cursor: pointer;
  `,
  disabled: css`
    cursor: not-allowed;
  `
}

const bounded = {
  base: css`
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
  `,
  selected: css`
    border-color: transparent;
  `,
  unselected: css`
    border-color: #e3e3e3;
  `,
  enabled: css``,
  disabled: css``
}

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  visibility: hidden;
  position: absolute;
  pointer-events: none;
`

export const PureWordInput = (() => {
  const base = css`
    ${common.base}
    ${bounded.base}
    & + & {
      margin-left: 2px;
    }
    padding: 0 4px;
  `
  const unselected = css`
    ${common.unselected}
    ${bounded.unselected}
  `
  const selected = css`
    ${common.selected}
    ${bounded.selected}
  `
  const enabled = css`
    ${common.enabled}
    ${bounded.enabled}
  `
  const disabled = css`
    ${common.disabled}
    ${bounded.disabled}
  `

  const Word = styled.span`
    ${base}
    ${props => (props.selected ? selected : unselected)}
    ${props => (props.disabled ? disabled : enabled)}
  `

  return function({ children: word, selected, disabled, name }) {
    const control = name ? (
      <Checkbox name={name} value={word} selected={selected} />
    ) : null
    return (
      <Word selected={selected} disabled={disabled}>
        {word}
        {control}
      </Word>
    )
  }
})()

export const PureSyllableInput = (() => {
  const base = css`
    ${common.base}
    padding-left: 2px;
    padding-right: 2px;
    & + & {
      margin-left: 1px;
    }
  `
  const unselected = css`
    ${common.unselected}
    background-color: #f0f0f0;
  `
  const selected = css`
    ${common.selected}
  `
  const enabled = css`
    ${common.enabled}
  `
  const disabled = css`
    ${common.disabled}
  `

  const Word = styled.span`
    ${base}
    ${props => (props.selected ? selected : unselected)}
    ${props => (props.disabled ? disabled : enabled)}
  `

  return function({ children: word, selected, disabled, name }) {
    const control = name ? (
      <Checkbox name={name} value={word} selected={selected} />
    ) : null
    return (
      <Word selected={selected} disabled={disabled}>
        {word}
        {control}
      </Word>
    )
  }
})()

export const PureSpaceInput = (() => {
  const base = css`
    ${common.base}
    ${bounded.base}
    padding-left: 2px;
    padding-right: 2px;
    margin-left: 3px;
    margin-right: 3px;
  `
  const unselected = css`
    ${common.unselected}
    ${bounded.unselected}
    color: #dfdfdf;
  `
  const selected = css`
    ${common.selected}
    ${bounded.selected}
  `
  const enabled = css`
    ${common.enabled}
    ${bounded.enabled}
  `
  const disabled = css`
    ${common.disabled}
    ${bounded.disabled}
  `

  const Word = styled.span`
    ${base}
    ${props => (props.selected ? selected : unselected)}
    ${props => (props.disabled ? disabled : enabled)}
    &:before {
      content: '/';
    }
  `

  return function({ selected, disabled, name }) {
    const control = name ? <Checkbox name={name} selected={selected} /> : null
    return (
      <Word selected={selected} disabled={disabled}>
        {control}
      </Word>
    )
  }
})()
