import React from 'react'
import { navigate } from 'gatsby'

import App from '../components/App/App'
import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../components/BodyCopy'
import { PureStandardTitle as Title } from '../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../components/Subtitle'
import { PureButton as Button } from '../components/Button'
import Sidebar from '../components/Sidebar'
import PlainButton from '../components/PlainButton'
import AudioPlayer from '../components/AudioPlayer'
import { PureDemarkedCopy as DemarkedCopy } from '../components/DemarkedCopy'
import { PureToneInput } from '../components/StringInputs'
import { ToneSelector } from '../components/ToneSelector'

import useTitle from '../hooks/use-title'

import useAnswerForm from '../hooks/use-answer-form'

function Section4Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/summary')
  })

  return (
    <form onSubmit={onSubmit}>
      <App>
        <TestPage>
          <TestPage.SideBar>
            <Sidebar current="section-4" />
          </TestPage.SideBar>
          <TestPage.TestPart>
            <TestPart>
              <TestPart.Header>
                <Header>
                  <Header.Title>
                    <Title>{title}</Title>
                  </Header.Title>
                  <Header.Subtitle>
                    <Subtitle>
                      Quiz 3 | Section 4: Identify the Intonation Pattern
                    </Subtitle>
                  </Header.Subtitle>
                </Header>
              </TestPart.Header>
              <TestPart.Body>
                <TestPart.Instruction>
                  <BodyCopy>
                    <p>
                      Indicate the rising, falling or level intonation patterns
                      in the blanks provided. The first one has been done for
                      you. Wou may hear the dialogue <em>twice</em>.
                    </p>
                  </BodyCopy>
                </TestPart.Instruction>
                <TestPart.AudioPlayer>
                  <AudioPlayer />
                </TestPart.AudioPlayer>
                <TestPart.AnswerArea>
                  <DemarkedCopy>
                    <DemarkedCopy.Line>
                      {[
                        'Person A',
                        <div data-sentence={1} key="question">
                          Where are you going?
                          <ToneSelector name="question-1" />
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Person B',
                        [
                          <div data-sentence={2} key="question">
                            We are heading out to dinner now.
                            <ToneSelector name="question-2" />
                          </div>,
                          <div data-sentence={3} key="question">
                            Do you want to join us?
                            <ToneSelector name="question-3" />
                          </div>
                        ]
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Person A',
                        <div data-sentence={4} key="question">
                          Tonight, I have planned
                          <ToneSelector name="question-4" /> to study for the exam tomorrow.
                          <ToneSelector name="question-5" />
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                  </DemarkedCopy>
                </TestPart.AnswerArea>
              </TestPart.Body>
              <TestPart.Footer>
                <PlainButton disabled={isSubmitting}>
                  <Button disabled={isSubmitting}>Continue</Button>
                </PlainButton>
              </TestPart.Footer>
            </TestPart>
          </TestPage.TestPart>
        </TestPage>
      </App>
    </form>
  )
}

export default Section4Page
