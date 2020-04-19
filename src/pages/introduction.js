import React from 'react'
import { Link } from 'gatsby'

import App from '../components/App/App'
import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'
import { PureStandardTitle as Title } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PureButton as Button } from '../components/Button'
import Sidebar from '../components/Sidebar'

import useTitle from '../hooks/use-title'

function IntroductionPage() {
  const title = useTitle()

  return (
    <App>
      <TestPage>
        <TestPage.SideBar>
          <Sidebar current="introduction" />
        </TestPage.SideBar>
        <TestPage.TestPart>
          <TestPart>
            <TestPart.Header>
              <Header>
                <Header.Title>
                  <Title>{title.main}</Title>
                </Header.Title>
                <Header.Subtitle>
                  <Subtitle>{title.sub}</Subtitle>
                </Header.Subtitle>
              </Header>
            </TestPart.Header>
            <TestPart.Body>
              <BodyCopy>
                <h1>Welcome to English 231: English Phonetics Quiz 3</h1>

                <p>
                  This test is comprised of 4 sections, some of which contain
                  multiple sections.
                </p>

                <p>
                  You will be required to answer the questions by reading the
                  instructions, and selecting the answers using the provided
                  interface.
                </p>

                <p>
                  Some questions will require that you listen to an audio clip,
                  so please ensure you are in a suitable environment, have
                  headphones equipped where necessary and have your volume
                  turned up to a reasonable level.
                </p>
              </BodyCopy>
            </TestPart.Body>
            <TestPart.Footer>
              <Link to="/section-1/part-1">
                <Button>Continue</Button>
              </Link>
            </TestPart.Footer>
          </TestPart>
        </TestPage.TestPart>
      </TestPage>
    </App>
  )
}

export default IntroductionPage
