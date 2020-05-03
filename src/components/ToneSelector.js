import React from 'react'
import styled from 'styled-components'

import { PureToneInput } from './StringInputs'

import useRadio from '../hooks/use-radio'

const Root = styled.div`
  display: inline-flex;
  position: relative;
  top: 1px;
  margin-left: 4px;
`

const Falling = styled.div`
  margin: 0 3px;
`

export function PureToneSelector({
  name,
  selected,
  onSelect = () => {},
  disabled
}) {
  return (
    <Root>
      <PureToneInput
        type="rising"
        name={name}
        selected={selected === 'rising'}
        onClick={() => onSelect('rising')}
        disabled={disabled}
      />
      <Falling>
        <PureToneInput
          type="falling"
          name={name}
          selected={selected === 'falling'}
          onClick={() => onSelect('falling')}
          disabled={disabled}
        />
      </Falling>
      <PureToneInput
        type="level"
        name={name}
        selected={selected === 'level'}
        onClick={() => onSelect('level')}
        disabled={disabled}
      />
    </Root>
  )
}

export function ToneSelector({ name }) {
  const radios = {
    rising: useRadio(name, 'rising'),
    falling: useRadio(name, 'falling'),
    level: useRadio(name, 'level')
  }

  const selected = (() => {
    switch (true) {
      case radios.rising.selected:
        return 'rising'
      case radios.falling.selected:
        return 'falling'
      case radios.level.selected:
        return 'level'
      default:
        return
    }
  })()

  function onSelect(tone) {
    radios[tone].select()
  }

  return (
    <PureToneSelector
      disabled={Object.values(radios).some(r => r.disabled)}
      name={name}
      selected={selected}
      onSelect={onSelect}
    />
  )
}
