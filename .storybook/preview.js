import React from 'react'
import { addDecorator } from '@storybook/react'
import styled from 'styled-components'

import { addParameters } from '@storybook/react'

import '!style-loader!css-loader!../src/components/App/App.css'
import GlobalStyles from '../src/components/GlobalStyles'

const Pad = styled.div`
  padding: 20px;
`

addParameters({
  backgrounds: [
    { name: 'White', value: '#fff', default: true },
    { name: 'Not Quite White', value: '#f5f5f5' }
  ]
})

addDecorator(storyFn => (
  <GlobalStyles>
    <Pad>{storyFn()}</Pad>
  </GlobalStyles>
))
