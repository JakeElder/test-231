import React from 'react'
import styled from 'styled-components'

import { chunkOverlap } from '../utils/array-utils'
import { getSectionDividerType } from '../utils/plot'

export function PurePlot({ children }) {

  const dividerTypes = chunkOverlap(
    React.Children.toArray(children)
  ).map(([top, bottom]) => getSectionDividerType())

  return children
}

export default props => <PurePlot {...props} />
