import React from 'react'
import { PureDemarkedCopy } from '../components/DemarkedCopy'

export default {
  title: 'Demarked Copy',
  component: PureDemarkedCopy
}

export const Default = () => (
  <PureDemarkedCopy>
    <PureDemarkedCopy.Line>
      {['Person A', 'I am so happy. I passed the test']}
    </PureDemarkedCopy.Line>
    <PureDemarkedCopy.Line>
      {['Person B', 'White test do you mean?']}
    </PureDemarkedCopy.Line>
    <PureDemarkedCopy.Line>
      {['Person B', 'White test do you mean?']}
    </PureDemarkedCopy.Line>
  </PureDemarkedCopy>
)
