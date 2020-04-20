import React from 'react'

import App from '../components/App/App'
import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'
import { PureStandardTitle as Title } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import Sidebar from '../components/Sidebar'

import useTitle from '../hooks/use-title'

function IntroductionPage() {
  const title = useTitle()

  return (
    <App>
      <TestPage>
        <TestPage.SideBar>
          <Sidebar current="summary" />
        </TestPage.SideBar>
        <TestPage.TestPart>
          <TestPart>
            <TestPart.Header>
              <Header>
                <Header.Title>
                  <Title>{title}</Title>
                </Header.Title>
                <Header.Subtitle>
                  <Subtitle>Quiz 3 | Summary</Subtitle>
                </Header.Subtitle>
              </Header>
            </TestPart.Header>
            <TestPart.Body>
              <BodyCopy>
                <h1>Test Complete</h1>
                <p>
                  You have answered all the questions in this test. The tutor
                  issuing this test will review your results. And report back
                  with your results.
                </p>
                <p>You may now close this window.</p>
              </BodyCopy>
            </TestPart.Body>
          </TestPart>
        </TestPage.TestPart>
      </TestPage>
    </App>
  )
}

export default IntroductionPage
