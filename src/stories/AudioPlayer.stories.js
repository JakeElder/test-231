import React from 'react'
import { PureAudioPlayer } from '../components/AudioPlayer'

export default {
  title: 'Audio Player',
  component: PureAudioPlayer
}

export const Loading = () => <PureAudioPlayer loading />
export const Default = () => (
  <PureAudioPlayer position={0} duration={180 * 1000} />
)
export const Playing = () => (
  <PureAudioPlayer playing position={60 * 1000} duration={180 * 1000} />
)
