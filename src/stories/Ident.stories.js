import React from 'react'
import { PureIdent } from '../components/Ident'

export default {
  title: 'Ident',
  component: PureIdent
}

export const Loading = () => <PureIdent name={null} institute={null} />
export const Default = () => (
  <PureIdent name="Jake Elder" institute="Chiang Mai University" />
)
