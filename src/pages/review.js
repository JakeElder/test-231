// Vendor
import 'reset-css'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

// Components
import GlobalStyles from '../components/GlobalStyles'
import { PureReviewPage as Review } from '../layouts/ReviewPage'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureStandardTitle as StandardTitle } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PureReviewSectionHeader as SectionHeader } from '../components/ReviewSectionHeader'

// Section Components
import * as S1P1 from '../client-pages/section-1-part-1'
import * as S1P2 from '../client-pages/section-1-part-2'
import * as S2 from '../client-pages/section-2'
import * as S3 from '../client-pages/section-3'
import * as S4 from '../client-pages/section-4'

// Contexts
import SessionContext from '../contexts/SessionContext'

// Services
import * as Session from '../services/session'

// Hooks
import useTitle from '../hooks/use-title'

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
    Session.where({ complete: true }).then(setSessions)
  }, [])

  return sessions
}

function SingleReview({ session }) {
  return (
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

      <SessionContext.Provider
        value={{
          sectionId: 'section-1-part-1',
          data: session
        }}
      >
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
      </SessionContext.Provider>

      <SessionContext.Provider
        value={{
          sectionId: 'section-1-part-2',
          data: session
        }}
      >
        <Review.Section>
          <Review.Heading>
            <SectionHeader>Section 1 Part 2</SectionHeader>
          </Review.Heading>
          <Review.Instruction>
            <S1P2.Instruction />
          </Review.Instruction>
          <Review.AudioPlayer>
            <S1P2.Audio />
          </Review.AudioPlayer>
          <Review.Response>
            <S1P2.Question />
          </Review.Response>
        </Review.Section>
      </SessionContext.Provider>

      <SessionContext.Provider
        value={{
          sectionId: 'section-2',
          data: session
        }}
      >
        <Review.Section>
          <Review.Heading>
            <SectionHeader>Section 2</SectionHeader>
          </Review.Heading>
          <Review.Instruction>
            <S2.Instruction />
          </Review.Instruction>
          <Review.AudioPlayer>
            <S2.Audio />
          </Review.AudioPlayer>
          <Review.Response>
            <S2.Question />
          </Review.Response>
        </Review.Section>
      </SessionContext.Provider>

      <SessionContext.Provider
        value={{
          sectionId: 'section-3',
          data: session
        }}
      >
        <Review.Section>
          <Review.Heading>
            <SectionHeader>Section 3</SectionHeader>
          </Review.Heading>
          <Review.Instruction>
            <S3.Instruction />
          </Review.Instruction>
          <Review.AudioPlayer>
            <S3.Audio />
          </Review.AudioPlayer>
          <Review.Response>
            <S3.Question />
          </Review.Response>
        </Review.Section>
      </SessionContext.Provider>

      <SessionContext.Provider
        value={{
          sectionId: 'section-4',
          data: session
        }}
      >
        <Review.Section>
          <Review.Heading>
            <SectionHeader>Section 4</SectionHeader>
          </Review.Heading>
          <Review.Instruction>
            <S4.Instruction />
          </Review.Instruction>
          <Review.AudioPlayer>
            <S4.Audio />
          </Review.AudioPlayer>
          <Review.Response>
            <S4.Question />
          </Review.Response>
        </Review.Section>
      </SessionContext.Provider>
    </Review>
  )
}

function ReviewPage() {
  const sessions = useSessions()
  const title = useTitle()

  if (sessions === null) {
    return null
  }

  return (
    <GlobalStyles>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{title}</title>
      </Helmet>
      <Root>
        {sessions.map(s => (
          <SingleReview key={s.id} session={s} />
        ))}
      </Root>
    </GlobalStyles>
  )
}

export default ReviewPage
