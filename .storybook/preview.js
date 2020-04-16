import React from 'react'
import { addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import '!style-loader!css-loader!../src/components/App/App.css'
import '!style-loader!css-loader!./storybook.css'
import GlobalStyles from '../src/components/GlobalStyles'

addDecorator(storyFn => <GlobalStyles>{storyFn()}</GlobalStyles>)
addDecorator(centered)
