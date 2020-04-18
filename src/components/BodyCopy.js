import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 24px;
  }

  p {
    line-height: 1.5;
  }

  p:not(:last-child) {
    margin-bottom: 18px;
  }
`

export function PureBodyCopy({ children }) {
  return <Root>{children}</Root>
}

export default props => <PureBodyCopy {...props} />
