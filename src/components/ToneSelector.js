import React from 'react'
import styled from 'styled-components'

import { PureToneInput } from './StringInputs'

const Root = styled.div`
  display: flex;
`

const Falling = styled.div`
  margin: 0 5px;
`

export function PureToneSelector({ name, selected }) {
  return (
    <Root>
      <PureToneInput
        type="rising"
        name={name}
        selected={selected === 'rising'}
      />
      <Falling>
        <PureToneInput
          type="falling"
          name={name}
          selected={selected === 'falling'}
        />
      </Falling>
      <PureToneInput
        type="level"
        name={name}
        selected={selected === 'falling'}
      />
    </Root>
  )
}
