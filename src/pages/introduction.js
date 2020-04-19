import React from 'react'
import { Link } from 'gatsby'

import App from '../components/App/App'
import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureSideBar as SideBar } from '../layouts/SideBar'
import Ident from '../components/Ident'
import { PureSection as Section } from '../components/Section'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'
import { PureStandardTitle as Title } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PurePlot as Plot } from '../components/Plot'
import Timer from '../components/Timer'
import { PureButton as Button } from '../components/Button'

function IntroductionPage() {
  return (
    <App>
      <TestPage>
        <TestPage.SideBar>
          <SideBar>
            <SideBar.Ident>
              <Ident />
            </SideBar.Ident>
            <SideBar.Plot>
              <Plot>
                <Section current>Introduction</Section>
                <Section>Section 1</Section>
                <Section>Section 2</Section>
                <Section>Section 3</Section>
                <Section>Section 4</Section>
                <Section>Summary</Section>
              </Plot>
            </SideBar.Plot>
            <SideBar.Timer>
              <Timer passed={0} allotted={15 * 60 * 1000} />
            </SideBar.Timer>
          </SideBar>
        </TestPage.SideBar>
        <TestPage.TestPart>
          <TestPart>
            <TestPart.Header>
              <Header>
                <Header.Title>
                  <Title>English 231: English Phonetics</Title>
                </Header.Title>
                <Header.Subtitle>
                  <Subtitle>Quiz 3 | Introduction</Subtitle>
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
