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
import { WordInput, PureWordInput as W } from '../components/StringInputs'

import useTitle from '../hooks/use-title'
import useAnswerForm from '../hooks/use-answer-form'

import audio from '../audio/section-1-part-1.mp3'

const q1Choice = word => <WordInput name="answer-1[]">{word}</WordInput>
const q2Choice = word => <WordInput name="answer-2[]">{word}</WordInput>
const q3Choice = word => <WordInput name="answer-3[]">{word}</WordInput>

function Instruction() {
  return (
    <BodyCopy>
      <p>
        <em>Listen to the following dialogue.</em>
      </p>
      <p>
        click the focus words in each clickable section, numbers 1 through 6.
        For example, <W disabled>are</W>
        <W disabled>you</W>
        <W disabled selected>
          listening
        </W>
        <W disabled>to</W>
        <W disabled>me</W>? Some of the statements may have more than one focus
        word. You will hear each dialogue <em>twice</em>.
      </p>
    </BodyCopy>
  )
}

function Question() {
  return (
    <DemarkedCopy>
      <DemarkedCopy.Line>
        {['Person A', 'I am so happy. I passed the test.']}
      </DemarkedCopy.Line>
      <DemarkedCopy.Line>
        {[
          'Person B',
          <div data-question={1} key="question">
            {q1Choice('Which')}
            {q1Choice('test')}
            {q1Choice('do')}
            {q1Choice('you')}
            {q1Choice('mean')}?
          </div>
        ]}
      </DemarkedCopy.Line>
      <DemarkedCopy.Line>
        {[
          'Person A',
          <div data-question={2} key="question">
            {q2Choice("It's")}
            {q2Choice('the')}
            {q2Choice('driving')}
            {q2Choice('test')}.
          </div>
        ]}
      </DemarkedCopy.Line>
      <DemarkedCopy.Line>
        {[
          'Person B',
          [
            'Congratulations!',
            <div data-question={3} key="question">
              {q3Choice('Now')}
              {q3Choice('you')}
              {q3Choice('can')}
              {q3Choice('give')}
              {q3Choice('me')}
              {q3Choice('a')}
              {q3Choice('ride')}
              {q3Choice('to')}
              {q3Choice('school')}.
            </div>
          ]
        ]}
      </DemarkedCopy.Line>
    </DemarkedCopy>
  )
}

function Audio() {
  return <AudioPlayer src={audio} />
}

function Section1Part1Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    sectionId: 'section-1-part-1',
    onSuccess: () => navigate('/section-1/part-2')
  })

  return (
    <form onSubmit={onSubmit}>
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
                  <Subtitle part={[1, 2]}>
                    Quiz 3 | Section 1: Identify the Focus Words
                  </Subtitle>
                </Header.Subtitle>
              </Header>
            </TestPart.Header>
            <TestPart.Body>
              <TestPart.Instruction>
                <Instruction />
              </TestPart.Instruction>
              <TestPart.AudioPlayer>
                <Audio />
              </TestPart.AudioPlayer>
              <TestPart.AnswerArea>
                <Question />
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

export default Section1Part1Page
export { Instruction }
export { Audio }
export { Question }
