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
    onSuccess: () => navigate('/section-4')
  })

  return (
    <form onSubmit={onSubmit}>
      <App>
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
                      <em>specific syllable</em> that is the tonic syllable. You
                      will hear each sentence twice.
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
                          {r(1, 'y')} is the best {r(2, 'pol')}
                          {r(2, 'i')}
                          {r(2, 'cy')}.
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Sentence 2',
                        <div data-sentence={2} key="question">
                          {r(3, 'Po')}
                          {r(3, 'li')}
                          {r(3, 'tic')}
                          {r(3, 'ians')} hardly keep their {r(4, 'prom')}
                          {r(4, 'ise')}.
                        </div>
                      ]}
                    </DemarkedCopy.Line>
                    <DemarkedCopy.Line>
                      {[
                        'Sentence 3',
                        <div data-sentence={3} key="question">
                          My
                          {r(5, 'Fam')}
                          {r(5, 'i')}
                          {r(5, 'ly')} will be in New York this {r(6, 'win')}
                          {r(6, 'ter')}.
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

export default Section3Page
