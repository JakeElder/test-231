import React from 'react'
import styled from 'styled-components'

import PlayIcon from './PlayIcon'
import PauseIcon from './PauseIcon'

import { formatDuration } from '../utils/number-utils'

const Root = styled.div`
  background: #5f5f5f;
  width: 300px;
  height: 40px;
  padding-left: 17px;
  display: flex;
  align-items: center;
  border-radius: 2px;
`

const PlayPauseButtons = styled.div`
  display: flex;
  margin-right: 14px;
`

const PlayButton = styled.div`
  svg {
    vertical-align: top;
  }
  margin-right: 3px;
`

const PauseButton = styled.div`
  svg {
    vertical-align: top;
  }
`

const Timeline = styled.div`
  width: 130px;
  height: 19px;
  background: #fff;
  border-radius: 2px;
  margin-right: 23px;
  overflow: hidden;
  :before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.position}%;
    background: #84b5eb;
  }
`

const TimeInfo = styled.div`
  display: flex;
  font-size: 13px;
`

const Position = styled.div`
  color: #f0f0f0;
`

const Divider = styled.div`
  margin: 0 4px;
  :after {
    color: #838383;
    content: '/';
  }
`

const Duration = styled.div`
  color: #838383;
`

function LoadingAudioPlayer() {
  return <Root />
}

function PlayingAudioPlayer({ playing, position, duration }) {
  const formattedPosition = formatDuration(position)
  const formattedDuration = formatDuration(duration)
  const completePercent = (100 / duration) * position
  return (
    <Root>
      <PlayPauseButtons>
        <PlayButton>
          <PlayIcon on={!playing} />
        </PlayButton>
        <PauseButton>
          <PauseIcon on={playing} />
        </PauseButton>
      </PlayPauseButtons>
      <Timeline position={completePercent} />
      <TimeInfo>
        <Position>{formattedPosition}</Position>
        <Divider />
        <Duration>{formattedDuration}</Duration>
      </TimeInfo>
    </Root>
  )
}

export function PureAudioPlayer({ loading, wat, ...rest }) {
  if (loading) {
    return <LoadingAudioPlayer />
  }
  return <PlayingAudioPlayer {...rest} />
}

function AudioPlayer() {
  return <PureAudioPlayer position={0} duration={60 * 3 * 1000} />
}

export default AudioPlayer
