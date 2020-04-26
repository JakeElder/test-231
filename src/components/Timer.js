import React from 'react'
import styled from 'styled-components'

import { formatDuration } from '../utils/number-utils'
import useSession from '../hooks/use-session'

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
  width: 90px;
  text-align: center;
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

export function PureTimer({ passed, allocated, loading }) {
  if (loading) {
    return <Root />
  }

  return (
    <Root>
      <Passed data-time-passed>{formatDuration(passed)}</Passed>
      <Divider />
      <Allotted>{formatDuration(allocated)}</Allotted>
    </Root>
  )
}

function Timer() {
  const [session] = useSession()
  if (session === null) {
    return <PureTimer loading />
  }
  return (
    <PureTimer passed={session.timePassed} allocated={session.timeAllocated} />
  )
}

export default Timer
