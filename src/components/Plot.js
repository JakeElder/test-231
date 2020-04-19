import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import SideBarContainer from './SideBarContainer'

import { chunkOverlap } from '../utils/array-utils'
import { getFinalisedSectionTypes, getSectionDividerType } from '../utils/plot'

const Divider = (() => {
  const Partial = (() => {
    const Root = styled.div`
      background: #f3f3f3;
    `
    const Main = styled.div`
      height: 1px;
      background: #e9e9e9;
    `
    return () => (
      <Root>
        <SideBarContainer>
          <Main />
        </SideBarContainer>
      </Root>
    )
  })()

  const Full = styled.div`
    height: 1px;
    background-color: #e9e9e9;
  `

  return ({ type }) => {
    if (type === 'none') {
      return null
    }

    if (type === 'partial') {
      return <Partial />
    }

    if (type === 'full') {
      return <Full />
    }
  }
})()

const ElementWrapper = (() => {
  const Root = styled.div`
    position: relative;
    :after {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      top: 0;
      right: 0;
      background: #e9e9e9;
    }
  `

  return ({ children }) => {
    if (_.get(children, 'props.type') === 'present') {
      return children
    }
    return <Root>{children}</Root>
  }
})()

const Root = styled.div`
  max-width: 300px;
`

export function PurePlot({ children, finished = false }) {
  // Get sections as a normal array
  const sections = React.Children.toArray(children)

  // Identify what type they should be
  const sectionTypes = getFinalisedSectionTypes(finished, sections)

  // Inject the correct type in to each section
  const finalisedSections = sectionTypes.map((type, index) =>
    React.cloneElement(sections[index], { type })
  )

  // Determine what types of dividers are needed
  const dividerTypes = chunkOverlap(sectionTypes).map(sectionTypes =>
    getSectionDividerType(...sectionTypes)
  )

  // Interleave dividers
  const sectionsWithDividers = dividerTypes
    .map((type, index) => [
      <Divider key={`divider-${index}`} type={type} />,
      finalisedSections[index]
    ])
    .flat()
    .filter(e => e)

  // Wrap everything with ElementWrapper to terminate them
  const finalElements = sectionsWithDividers.map(e => (
    <ElementWrapper key={`${e.key}-wrapper`}>{e}</ElementWrapper>
  ))

  return <Root>{finalElements}</Root>
}

export default props => <PurePlot {...props} />
