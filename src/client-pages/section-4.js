import React from 'react'
import { navigate } from 'gatsby'

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
import { PureToneSelector, ToneSelector } from '../components/ToneSelector'

import useTitle from '../hooks/use-title'
import useAnswerForm from '../hooks/use-answer-form'

import audio from '../audio/section-4.mp3'

function Section4Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    sectionId: 'section-4',
    onSuccess: () => navigate('/summary')
  })

  return (
    <form onSubmit={onSubmit}>
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
                    Indicate the rising, falling or level intonation patterns in
                    the blanks provided. The first one has been done for you.
                    You may hear the dialogue <em>twice</em>.
                  </p>
                </BodyCopy>
              </TestPart.Instruction>
              <TestPart.AudioPlayer>
                <AudioPlayer src={audio} />
              </TestPart.AudioPlayer>
              <TestPart.AnswerArea>
                <DemarkedCopy>
                  <DemarkedCopy.Line>
                    {[
                      'Person A',
                      <div key="copy">
                        Where are you going?
                        <PureToneSelector selected="falling" disabled />
                      </div>
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line data-line={2}>
                    {[
                      'Person B',
                      [
                        <div key="q1">
                          We are heading out to dinner now.
                          <ToneSelector name="answer-1" />
                        </div>,
                        <div key="q2">
                          Do you want to join us?
                          <ToneSelector name="answer-2" />
                        </div>
                      ]
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line data-line={3}>
                    {[
                      'Person A',
                      <div key="q">
                        Tonight, I have planned
                        <ToneSelector name="answer-3" /> to study for the exam
                        tomorrow.
                        <ToneSelector name="answer-4" />
                      </div>
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line data-line={4}>
                    {[
                      'Person B',
                      <div key="q">
                        And you think you can do without dinner tonight.
                        <ToneSelector name="answer-5" />
                      </div>
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line data-line={5}>
                    {[
                      'Person A',
                      <div key="q">
                        No! I bought some sandwiches from HB7.{' '}
                        <ToneSelector name="answer-6" />
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
    </form>
  )
}

export default Section4Page
