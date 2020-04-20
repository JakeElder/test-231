import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'

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
  cursor: pointer;
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

const Progress = styled.div`
  content: '';
  display: block;
  height: 100%;
  width: ${props => props.position}%;
  background: #84b5eb;
`

const Timeline = styled.div`
  width: 130px;
  height: 18px;
  background: #fff;
  border-radius: 2px;
  margin-right: 28px;
  overflow: hidden;
`

const TimeInfo = styled.div`
  display: flex;
  font-size: 12px;
`

const Position = styled.div`
  color: #f0f0f0;
  width: 32px;
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

function PlayingAudioPlayer({ playing, position, duration, onToggleClick }) {
  const formattedPosition = formatDuration(position)
  const formattedDuration = formatDuration(duration)
  const completePercent = (100 / duration) * position
  return (
    <Root>
      <PlayPauseButtons onClick={onToggleClick}>
        <PlayButton>
          <PlayIcon on={!playing} />
        </PlayButton>
        <PauseButton>
          <PauseIcon on={playing} />
        </PauseButton>
      </PlayPauseButtons>
      <Timeline position={completePercent}>
        <Progress style={{ width: `${completePercent}%` }} />
      </Timeline>
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

function AudioPlayer({ src }) {
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    return () => {
      clearInterval(intervalId)
      sound.current.stop()
      sound.current.off()
      sound.current.unload()
      sound.current = null
    }
  }, [])

  const sound = useRef(null)

  if (sound.current === null) {
    sound.current = new Howl({
      src: [src],
      onload() {
        setLoaded(true)
      },
      onplay() {
        setPlaying(true)
        setIntervalId(
          setInterval(() => {
            if (sound.current) {
              setPosition(sound.current.seek() * 1000)
            }
          }, 100)
        )
      },
      onpause() {
        setPlaying(false)
        clearInterval(intervalId)
      }
    })
  }

  function toggle() {
    if (playing) {
      sound.current.pause()
      return
    }
    sound.current.play()
  }

  if (loaded) {
    return (
      <PureAudioPlayer
        position={position}
        playing={playing}
        duration={sound.current.duration() * 1000}
        onToggleClick={toggle}
      />
    )
  }

  return <PureAudioPlayer loading />
}

export default AudioPlayer
