import React from 'react'
import styled from 'styled-components'

import { formatDuration } from '../utils/number-utils'

const Root = styled.div`
  max-width: 300px;
  color: #777;
  display: flex;
  align-items: center;
  font-weight: 200;
  background-color: #fff;
  height: 68px;
  justify-content: center;
  max-width: 256px;
`

const Passed = styled.div`
  font-size: 37px;
`

const Divider = styled.div`
  margin-left: 11px;
  margin-right: 16px;
  color: #aaa;
  font-size: 18px;
  :after {
    content: '/';
  }
`

const Allotted = styled.div`
  font-size: 18px;
`

export function PureTimer({ passed, allotted }) {
  return (
    <Root>
      <Passed>{formatDuration(passed)}</Passed>
      <Divider />
      <Allotted>{formatDuration(allotted)}</Allotted>
    </Root>
  )
}

function Timer() {
  return <PureTimer passed={0} allotted={15 * 60 * 1000} />
}

export default Timer
