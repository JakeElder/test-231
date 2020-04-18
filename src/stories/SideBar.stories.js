import React from 'react'
import styled from 'styled-components'

import { PureSideBar } from '../layouts/SideBar'
import { Default as Ident } from './Ident.stories'
import * as Plots from './Plot.stories'
import { Default as Timer } from './Timer.stories'

const SideBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
`

export default {
  title: 'SideBar',
  component: PureSideBar,
  decorators: [storyFn => <SideBarWrapper>{storyFn()}</SideBarWrapper>]
}

function Structure({ children }) {
  return (
    <PureSideBar>
      <PureSideBar.Ident>
        <Ident />
      </PureSideBar.Ident>
      <PureSideBar.Plot>{children}</PureSideBar.Plot>
      <PureSideBar.Timer>
        <Timer />
      </PureSideBar.Timer>
    </PureSideBar>
  )
}

export const BeforeStarting = () => (
  <Structure>
    <Plots.BeforeStarting />
  </Structure>
)

export const FirstSectionCurrent = () => (
  <Structure>
    <Plots.FirstSectionCurrent />
  </Structure>
)

export const InProgress = () => (
  <Structure>
    <Plots.InProgress />
  </Structure>
)

export const Finished = () => (
  <Structure>
    <Plots.Finished />
  </Structure>
)
