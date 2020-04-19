import React from 'react'

import { PureSideBar as SideBar } from '../layouts/SideBar'
import Ident from '../components/Ident'
import { PurePlot as Plot } from '../components/Plot'
import { PureSection as Section } from '../components/Section'
import Timer from '../components/Timer'

function Sidebar({ current }) {
  return (
    <SideBar>
      <SideBar.Ident>
        <Ident />
      </SideBar.Ident>
      <SideBar.Plot>
        <Plot>
          <Section current={current === 'introduction'}>Introduction</Section>
          <Section current={current === 'section-1'}>Section 1</Section>
          <Section current={current === 'section-2'}>Section 2</Section>
          <Section current={current === 'section-3'}>Section 3</Section>
          <Section current={current === 'section-4'}>Section 4</Section>
          <Section current={current === 'section-5'}>Summary</Section>
        </Plot>
      </SideBar.Plot>
      <SideBar.Timer>
        <Timer />
      </SideBar.Timer>
    </SideBar>
  )
}

export default Sidebar
