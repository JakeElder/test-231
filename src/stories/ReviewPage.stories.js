import React from 'react'
import styled from 'styled-components'

import { PureReviewPage } from '../layouts/ReviewPage'
import { Default as Header } from './TestPartHeader.stories'
import { Default as SectionHeader } from './ReviewSectionHeader.stories'
import { Default as Instruction } from './Instruction.stories'

export default {
  title: 'Layout :: Review Page',
  component: PureReviewPage
}

export const Default = () => (
  <PureReviewPage>
    <PureReviewPage.Header>
      <Header />
    </PureReviewPage.Header>
    <PureReviewPage.Section>
      <PureReviewPage.Heading>
        <SectionHeader />
      </PureReviewPage.Heading>
      <PureReviewPage.Instruction>
        <Instruction />
      </PureReviewPage.Instruction>
    </PureReviewPage.Section>
  </PureReviewPage>
)
