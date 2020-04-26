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
import { SyllableInput } from '../components/StringInputs'

import useTitle from '../hooks/use-title'
import useAnswerForm from '../hooks/use-answer-form'

import audio from '../audio/section-3.mp3'

const r = (n, v) => (
  <SyllableInput key={v} name={`answer-${n}`}>
    {v}
  </SyllableInput>
)

function Section3Page() {
  const title = useTitle()

  const { onSubmit, isSubmitting } = useAnswerForm({
    sectionId: 'section-3',
    onSuccess: () => navigate('/section-4')
  })

  return (
    <form onSubmit={onSubmit}>
      <TestPage>
        <TestPage.SideBar>
          <Sidebar current="section-3" />
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
                    Quiz 3 | Section 3: Identify the Tonic Syllable
                  </Subtitle>
                </Header.Subtitle>
              </Header>
            </TestPart.Header>
            <TestPart.Body>
              <TestPart.Instruction>
                <BodyCopy>
                  <p>
                    <em>Listen to the following sentences.</em>
                  </p>
                  <p>
                    Mark the <em>tonic syllable</em>. You must mark the{' '}
                    <em>specific syllable</em> that is the tonic syllable. In a
                    multisyllabic word, made of two syllables or more, selecting
                    the entire word result in <em>0</em>. You will hear each
                    dialogue <em>twice</em>.
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
                      <div data-sentence={1} key="question">
                        {r(1, 'Hon')}
                        {r(1, 'est')}
                        {r(1, 'y')} {r(1, 'is')} {r(1, 'the')} {r(1, 'best')}{' '}
                        {r(1, 'pol')}
                        {r(1, 'i')}
                        {r(1, 'cy')}.
                      </div>
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line>
                    {[
                      'Sentence 2',
                      <div data-sentence={2} key="question">
                        {r(2, 'My')} {r(2, 'Fam')}
                        {r(2, 'i')}
                        {r(2, 'ly')} {r(2, 'will')} {r(2, 'be')} {r(2, 'in')}{' '}
                        {r(2, 'New')} {r(2, 'York')} {r(2, 'this')}{' '}
                        {r(2, 'win')}
                        {r(2, 'ter')}.
                      </div>
                    ]}
                  </DemarkedCopy.Line>
                  <DemarkedCopy.Line>
                    {[
                      'Sentence 3',
                      <div data-sentence={3} key="question">
                        {r(3, 'Do')} {r(3, 'we')} {r(3, 'have')} {r(3, 'home')}
                        {r(3, 'work')} {r(3, 'to')}
                        {r(3, 'night')}?
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

export default Section3Page
