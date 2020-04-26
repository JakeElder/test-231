import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureSideBar as SideBar } from '../layouts/SideBar'
import { PureIdent as Ident } from '../components/Ident'
import { PureSection as Section } from '../components/Section'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'

import useSession from '../hooks/use-session'

const Title = styled.h1`
  font-size: 34px;
  font-weight: 500;
`

function TestUnavailablePage() {
  const session = useSession()

  if (session !== null) {
    navigate('/introduction')
    return null
  }

  return (
    <TestPage>
      <TestPage.SideBar>
        <SideBar>
          <SideBar.Ident>
            <Ident />
          </SideBar.Ident>
          <SideBar.Plot>
            <Section type="present" completable={false}>
              Test Unavailable
            </Section>
          </SideBar.Plot>
        </SideBar>
      </TestPage.SideBar>
      <TestPage.TestPart>
        <TestPart>
          <TestPart.Header>
            <Header>
              <Header.Title noSubtitle>
                <Title>Test Unavailable</Title>
              </Header.Title>
            </Header>
          </TestPart.Header>
          <TestPart.Body>
            <BodyCopy>
              <h2>This test url has not been recognised</h2>
              <p>
                If you feel like this is the result of an error, please contact
                the tutor responsible for administering the test.
              </p>
            </BodyCopy>
          </TestPart.Body>
        </TestPart>
      </TestPage.TestPart>
    </TestPage>
  )
}

export default TestUnavailablePage
