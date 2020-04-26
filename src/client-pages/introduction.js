import React, { useState } from 'react'
import { navigate } from 'gatsby'
import axios from 'axios'

import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'
import { PureStandardTitle as Title } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PureButton as Button } from '../components/Button'
import Sidebar from '../components/Sidebar'
import PlainButton from '../components/PlainButton'

import useTitle from '../hooks/use-title'
import useSession from '../hooks/use-session'

function IntroductionPage() {
  const title = useTitle()
  const [commencing, setCommencing] = useState(false)
  const [session] = useSession()

  async function onContinueClick() {
    setCommencing(true)
    await axios.post(`/api/session/${session.id}/commencement`, {})
    navigate('/section-1/part-1')
  }

  return (
    <TestPage>
      <TestPage.SideBar>
        <Sidebar current="introduction" />
      </TestPage.SideBar>
        <TestPage.TestPart>
          <TestPart>
            <TestPart.Header>
              <Header>
                <Header.Title>
                  <Title>{title}</Title>
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
                  parts.
                </p>

                <p>
                  You will be required to answer the questions by first reading
                  the instructions then playing an audio clip and selecting the
                  answers using the provided interface.
                </p>

                <p>
                  As some questions require that you listen to an audio clip,
                  please ensure you are in a suitable environment, have
                  headphones equipped where necessary and have your volume
                  turned up to a reasonable level.
                </p>
              </BodyCopy>
            </TestPart.Body>
            <TestPart.Footer>
              <PlainButton
                disabled={commencing}
                type="button"
                onClick={onContinueClick}
              >
                <Button disabled={commencing}>Continue</Button>
              </PlainButton>
            </TestPart.Footer>
          </TestPart>
        </TestPage.TestPart>
    </TestPage>
  )
}

export default IntroductionPage
