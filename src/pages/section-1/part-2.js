import React from 'react'
import { navigate } from 'gatsby'

import App from '../../components/App/App'
import { PureTestPage as TestPage } from '../../layouts/TestPage'
import { PureTestPart as TestPart } from '../../layouts/TestPart'
import { PureTestPartHeader as Header } from '../../layouts/TestPartHeader'
import { PureBodyCopy as BodyCopy } from '../../components/BodyCopy'
import { PureStandardTitle as Title } from '../../components/StandardTitle'
import { PureSubtitle as Subtitle } from '../../components/Subtitle'
import { PureButton as Button } from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import PlainButton from '../../components/PlainButton'
import AudioPlayer from '../../components/AudioPlayer'
import { PureDemarkedCopy as DemarkedCopy } from '../../components/DemarkedCopy'
import { WordInput } from '../../components/StringInputs'

import useTitle from '../../hooks/use-title'
import useAnswerForm from '../../hooks/use-answer-form'

import audio from '../../audio/section-1-part-2.mp3'

const q1Choice = word => <WordInput name="answer-1[]">{word}</WordInput>
const q2Choice = word => <WordInput name="answer-2[]">{word}</WordInput>
const q3Choice = word => <WordInput name="answer-3[]">{word}</WordInput>

function Section1Part2Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    sectionId: 'section-1-part-2',
    onSuccess: () => navigate('/section-2')
  })

  return (
    <form onSubmit={onSubmit}>
      <App>
        <TestPage>
          <TestPage.SideBar>
            <Sidebar current="section-1" />
          </TestPage.SideBar>
          <TestPage.TestPart>
            <TestPart>
              <TestPart.Header>
                <Header>
                  <Header.Title>
                    <Title>{title}</Title>
                  </Header.Title>
                  <Header.Subtitle>
                    <Subtitle part={[2, 2]}>
                      Quiz 3 | Section 1: Identify the Focus Words
                    </Subtitle>
                  </Header.Subtitle>
                </Header>
              </TestPart.Header>
              <TestPart.Body>
                <TestPart.Instruction>
                  <BodyCopy>
                    <p>
                      Listen to the following dialogue. As you listen, click on
                      the focus words in the same manner as the previous part.
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
                        <div data-question={1} key="question">
                          I want to get in shape. {q1Choice('What')}
                          {q1Choice('should')}
                          {q1Choice('I')}
                          {q1Choice('do')}?
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Person B',
                        [
                          'Umm... You can go swimming or cycling.',
                          <div data-question={2} key="question">
                            {q2Choice('Both')}
                            {q2Choice('help')}
                            {q2Choice('you')}
                            {q2Choice('get')}
                            {q2Choice('fit')}
                            {q2Choice('and')}
                            {q2Choice('lose')}
                            {q2Choice('weight')}
                            {q2Choice('quickly')}
                          </div>
                        ]
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Person A',
                        [
                          'Cycling sounds exciting.',
                          <div data-question={3} key="question">
                            Unfortunately,
                            {q3Choice('I')}
                            {q3Choice("don't")}
                            {q3Choice('have')}
                            {q3Choice('a')}
                            {q3Choice('bicycle')}
                          </div>
                        ]
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Person B',
                        'Then, go swimming. All you need is a suit.'
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

export default Section1Part2Page
