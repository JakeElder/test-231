import React from 'react'
import styled from 'styled-components'

import { PureReviewPage } from '../layouts/ReviewPage'
import { Default as Header } from './TestPartHeader.stories'
import { Default as SectionHeader } from './ReviewSectionHeader.stories'

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
    </PureReviewPage.Section>
  </PureReviewPage>
)
