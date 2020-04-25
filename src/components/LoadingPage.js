import React from 'react'
import styled from 'styled-components'

import App from '../components/App/App'
import { PureTestPage as TestPage } from '../layouts/TestPage'
import { PureSideBar as SideBar } from '../layouts/SideBar'
import { PureIdent as Ident } from '../components/Ident'
import { PureTestPart as TestPart } from '../layouts/TestPart'
import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'

function LoadingPage() {
  return (
    <App>
      <TestPage>
        <TestPage.SideBar>
          <SideBar>
            <SideBar.Ident>
              <Ident />
            </SideBar.Ident>
          </SideBar>
        </TestPage.SideBar>
        <TestPage.TestPart>
          <TestPart>
            <TestPart.Header>
              <Header>
              </Header>
            </TestPart.Header>
            <TestPart.Body>
            </TestPart.Body>
            <TestPart.Footer>
            </TestPart.Footer>
          </TestPart>
        </TestPage.TestPart>
      </TestPage>
    </App>
  )
}

export default LoadingPage
