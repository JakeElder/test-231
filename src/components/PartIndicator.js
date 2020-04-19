import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-weight: 200;
  font-size: 15px;
  display: flex;
  align-items: baseline;
  color: #797979;
`

const Current = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  height: 24px;
  line-height: 24px;
  padding: 0 5px;
  margin-right: 5px;
`

export function PurePartIndicator({ part }) {
  const [current, of] = part
  return (
    <Root>
      <Current>part {current}</Current> of {of}
    </Root>
  )
}

export default props => <PurePartIndicator {...props} />
