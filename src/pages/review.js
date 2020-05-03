// Vendor
import 'reset-css'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Components
import GlobalStyles from '../components/GlobalStyles'
import { PureReviewPage as Review } from '../layouts/ReviewPage'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureStandardTitle as StandardTitle } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PureReviewSectionHeader as SectionHeader } from '../components/ReviewSectionHeader'

// Section Components
import * as S1P1 from '../client-pages/section-1-part-1'

// Contexts
import SessionContext from '../contexts/SessionContext'

// Services
import * as Session from '../services/session'

// Global CSS
import '../components/App/App.css'

const Root = styled.div`
  width: 210mm;
  margin: auto;
  padding: 0 40px 0 40px;
  box-sizing: border-box;
  -webkit-print-color-adjust: exact !important;
`

function useSessions() {
  const [sessions, setSessions] = useState(null)

  useEffect(() => {
    Session.all().then(setSessions)
  }, [])

  return sessions
}

function ReviewPage() {
  const sessions = useSessions()

  if (sessions === null) {
    return null
  }

  const session = sessions[0]

  return (
    <GlobalStyles>
      <Root>
        <SessionContext.Provider
          value={{
            sectionId: 'section-1-part-1',
            data: session
          }}
        >
          <Review>
            <Review.Header>
              <Header>
                <Header.Title>
                  <StandardTitle>English 231: English Phonetics</StandardTitle>
                </Header.Title>
                <Header.Subtitle>
                  <Subtitle>Quiz 3 | Answers | {session.name}</Subtitle>
                </Header.Subtitle>
              </Header>
            </Review.Header>

            <Review.Section>
              <Review.Heading>
                <SectionHeader>Section 1 Part 1</SectionHeader>
              </Review.Heading>
              <Review.Instruction>
                <S1P1.Instruction />
              </Review.Instruction>
              <Review.AudioPlayer>
                <S1P1.Audio />
              </Review.AudioPlayer>
              <Review.Response>
                <S1P1.Question />
              </Review.Response>
            </Review.Section>
          </Review>
        </SessionContext.Provider>
      </Root>
    </GlobalStyles>
  )
}

export default ReviewPage
