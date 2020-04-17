import React from 'react'
import { PurePlot } from '../components/Plot'
import { PureSection } from '../components/Section'

export default {
  title: 'Plot',
  component: PurePlot
}

export const BeforeStarting = () => {
  return (
    <PurePlot>
      <PureSection>Introduction</PureSection>
      <PureSection>Section 1</PureSection>
      <PureSection>Section 2</PureSection>
      <PureSection>Section 3</PureSection>
      <PureSection>Section 4</PureSection>
      <PureSection>Summary</PureSection>
    </PurePlot>
  )
}

export const FirstSectionCurrent = () => {
  return (
    <PurePlot>
      <PureSection current>Introduction</PureSection>
      <PureSection>Section 1</PureSection>
      <PureSection>Section 2</PureSection>
      <PureSection>Section 3</PureSection>
      <PureSection>Section 4</PureSection>
      <PureSection>Summary</PureSection>
    </PurePlot>
  )
}

export const InProgress = () => {
  return (
    <PurePlot>
      <PureSection>Introduction</PureSection>
      <PureSection>Section 1</PureSection>
      <PureSection current>Section 2</PureSection>
      <PureSection>Section 3</PureSection>
      <PureSection>Section 4</PureSection>
      <PureSection>Summary</PureSection>
    </PurePlot>
  )
}

export const LastSectionCurrent = () => {
  return (
    <PurePlot>
      <PureSection>Introduction</PureSection>
      <PureSection>Section 1</PureSection>
      <PureSection >Section 2</PureSection>
      <PureSection>Section 3</PureSection>
      <PureSection>Section 4</PureSection>
      <PureSection current>Summary</PureSection>
    </PurePlot>
  )
}

export const Finished = () => {
  return (
    <PurePlot finished>
      <PureSection>Introduction</PureSection>
      <PureSection>Section 1</PureSection>
      <PureSection>Section 2</PureSection>
      <PureSection>Section 3</PureSection>
      <PureSection>Section 4</PureSection>
      <PureSection>Summary</PureSection>
    </PurePlot>
  )
}
