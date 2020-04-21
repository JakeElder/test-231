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
import { SpaceInput, PureSpaceInput as S } from '../components/StringInputs'

import useTitle from '../hooks/use-title'
import useAnswerForm from '../hooks/use-answer-form'

import audio from '../audio/section-2.mp3'

const q1Choice = v => <SpaceInput key={v} name="answer-1[]" value={v} />
const q2Choice = v => <SpaceInput key={v} name="answer-2[]" value={v} />
const q3Choice = v => <SpaceInput key={v} name="answer-3[]" value={v} />

function Section2Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    sectionId: 'section-2',
    onSuccess: () => navigate('/section-3')
  })

  return (
    <form onSubmit={onSubmit}>
      <App>
        <TestPage>
          <TestPage.SideBar>
            <Sidebar current="section-2" />
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
                      Quiz 3 | Section 2: Identify the Thought Groups
                    </Subtitle>
                  </Header.Subtitle>
                </Header>
              </TestPart.Header>
              <TestPart.Body>
                <TestPart.Instruction>
                  <BodyCopy>
                    <p>
                      Listen to the following sentences. Mark the slash at the
                      end of each thought group. For example: I<S />
                      know
                      <S disabled />
                      when
                      <S disabled />
                      to
                      <S disabled />
                      pause
                      <S selected disabled />
                      and
                      <S disabled />
                      you?
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
                        'Sentence 1',
                        <div data-question={1} key="question">
                          {'The students wanted to meet the dean but they have to wait tilll tomorrow'
                            .split(' ')
                            .map((w, idx) => [w, q1Choice(idx)])
                            .flat()
                            .slice(0, -1)}
                          .
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Sentence 2',
                        <div data-question={2} key="question">
                          {'Adam said Jane wanted to buy a new house'
                            .split(' ')
                            .map((w, idx) => [w, q2Choice(idx)])
                            .flat()
                            .slice(0, -1)}
                          .
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Sentence 3',
                        <div data-question={3} key="question">
                          {'Before moving to Phuket Jane was a trainer at a fitness center'
                            .split(' ')
                            .map((w, idx) => [w, q3Choice(idx)])
                            .flat()
                            .slice(0, -1)}
                          .
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

export default Section2Page
