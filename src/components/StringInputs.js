import React from 'react'
import styled, { css } from 'styled-components'

import { PureToneIcon } from './ToneIcon'

import useCheckbox from '../hooks/use-checkbox'

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
    cursor: default;
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

const input = css`
  visibility: hidden;
  position: absolute;
  pointer-events: none;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  ${input}
`

const Radio = styled.input.attrs({ type: 'radio' })`
  ${input}
`

export const PureWordInput = (() => {
  const base = css`
    ${common.base}
    ${bounded.base}
    :not(:last-of-type) {
      margin-right: 2px;
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

  return function({ children: word, selected, disabled, name, onClick }) {
    const control = name ? (
      <Checkbox name={name} value={word} checked={selected} readOnly />
    ) : null
    return (
      <Word selected={selected} disabled={disabled} onClick={onClick}>
        {word}
        {control}
      </Word>
    )
  }
})()

export function WordInput({ children: word, name, ...rest }) {
  const { checked, ...props } = useCheckbox(name, word)

  return (
    <PureWordInput selected={checked} {...props} {...rest}>
      {word}
    </PureWordInput>
  )
}

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

  const Syllable = styled.span`
    ${base}
    ${props => (props.selected ? selected : unselected)}
    ${props => (props.disabled ? disabled : enabled)}
  `

  return function({ children: syllable, selected, disabled, name, onClick }) {
    const control = name ? (
      <Checkbox
        name={name}
        value={syllable}
        checked={selected}
        disabled={disabled}
        readOnly
      />
    ) : null
    return (
      <Syllable selected={selected} disabled={disabled} onClick={onClick}>
        {syllable}
        {control}
      </Syllable>
    )
  }
})()

export function SyllableInput({ children: syllable, name, ...rest }) {
  const { checked, ...props } = useCheckbox(name, syllable)
  return (
    <PureSyllableInput selected={checked} {...props} {...rest}>
      {syllable}
    </PureSyllableInput>
  )
}

export const PureSpaceInput = (() => {
  const base = css`
    ${common.base}
    ${bounded.base}
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 3px;
    margin-right: 3px;
  `
  const unselected = css`
    ${common.unselected}
    ${bounded.unselected}
    color: #fff;
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

  return function({ selected, disabled, name, value, onClick }) {
    const control = name ? (
      <Checkbox
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        readOnly
      />
    ) : null
    return (
      <Word
        data-space-input
        selected={selected}
        disabled={disabled}
        onClick={onClick}
      >
        {control}
      </Word>
    )
  }
})()

export function SpaceInput({ value, name, ...rest }) {
  const { checked, ...props } = useCheckbox(name, value)
  return (
    <PureSpaceInput selected={checked} {...props} value={value} {...rest} />
  )
}

export const PureToneInput = (() => {
  const base = css`
    ${common.base}
    ${bounded.base}
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
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

  const Box = styled.span`
    ${base}
    ${props => (props.selected ? selected : unselected)}
    ${props => (props.disabled ? disabled : enabled)}
   }
  `

  return function({ type, selected, disabled, name, onClick }) {
    const control = name ? (
      <Radio
        name={name}
        checked={selected}
        value={type}
        disabled={disabled}
        readOnly
      />
    ) : null

    const extra = { [`data-${type}-tone-input`]: true }

    return (
      <Box selected={selected} disabled={disabled} onClick={onClick} {...extra}>
        <PureToneIcon type={type} white={selected} />
        {control}
      </Box>
    )
  }
})()
