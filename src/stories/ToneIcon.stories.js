import React from 'react'
import { PureToneIcon } from '../components/ToneIcon'

export default {
  title: 'Tone Icon',
  component: PureToneIcon
}

export const Rising = () => <PureToneIcon type="rising" />
export const Falling = () => <PureToneIcon type="falling" />
export const Level = () => <PureToneIcon type="level" />
export const White = () => (
  <>
    <PureToneIcon type="rising" white />
    <PureToneIcon type="falling" white />
    <PureToneIcon type="level" white />
  </>
)
