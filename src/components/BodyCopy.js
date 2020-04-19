import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  h1,
  h2,
  h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.3;
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
