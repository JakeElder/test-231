import React from 'react'

import { PureBodyCopy as BodyCopy } from './BodyCopy'

export function PureInstruction({ children }) {
  return <BodyCopy>{children}</BodyCopy>
}
