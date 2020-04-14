import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Root = styled.div`
  border: 1px solid;
  border-color: ${props => props.theme.lines.grey[2]};
  padding: 4px;
  border-radius: 2px;
  background-color: #fff;
`

const RoundedImg = styled(Img)`
  border-radius: 1px;
`

const FramedImage = ({ image, className }) => {
  return (
    <Root className={className}>
      <RoundedImg fluid={image.fluid} />
    </Root>
  )
}

export default FramedImage
