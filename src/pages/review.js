import 'reset-css'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import GlobalStyles from '../components/GlobalStyles'
import { Question as Section1Part1Question } from '../client-pages/section-1-part-1'
import { Question as Section1Part2Question } from '../client-pages/section-1-part-2'

import SessionContext from '../contexts/SessionContext'

import * as Session from '../services/session'

import '../components/App/App.css'

const Root = styled.div`
  width: 210mm;
  margin: auto;
  padding: 40px;
  box-sizing: border-box;
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
        <SessionContext.Provider value={{
          sectionId: 'section-1-part-1',
          data: session
        }}>
          <Section1Part1Question />
        </SessionContext.Provider>
        <SessionContext.Provider value={{
          sectionId: 'section-1-part-2',
          data: session
        }}>
          <Section1Part2Question />
        </SessionContext.Provider>
      </Root>
    </GlobalStyles>
  )
}

export default ReviewPage
