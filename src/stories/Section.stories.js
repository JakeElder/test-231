import React from 'react'
import { PureSection } from '../components/Section'

export default {
  title: 'Section',
  component: PureSection
}

const label = 'Section 1'

export const Past = () => <PureSection type="past">{label}</PureSection>
export const Present = () => <PureSection type="present">{label}</PureSection>
export const Future = () => <PureSection type="future">{label}</PureSection>
export const WithoutCheck = () => (
  <PureSection type="present" completable={false}>
    {label}
  </PureSection>
)
